import Popper from 'popper.js'
import Component from '@pluginjs/component'
import template from '@pluginjs/template'
import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import { getStyle } from '@pluginjs/styled'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { parseHTML, query, setData, getData, append } from '@pluginjs/dom'
import { getUID, deepMerge } from '@pluginjs/utils'
import {
  register,
  styleable,
  themeable,
  eventable,
  stateable,
  optionable
} from '@pluginjs/decorator'
import {
  namespace as NAMESPACE,
  defaults as DEFAULTS,
  methods as METHODS,
  events as EVENTS,
  classes as CLASSES,
  dependencies as DEPENDENCIES
} from './constant'

const HoverState = {
  SHOW: 'show',
  OUT: 'out'
}

const Trigger = {
  HOVER: 'hover',
  FOCUS: 'focus',
  CLICK: 'click',
  MANUAL: 'manual'
}

/* Credit to bootstrap tooltip http://getbootstrap.com MIT */

@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class Tooltip extends Component {
  constructor(element, options = {}, defaults, classes) {
    if (typeof defaults === 'undefined') {
      defaults = DEFAULTS
    }

    if (typeof classes === 'undefined') {
      classes = CLASSES
    }

    super(element)

    this.initOptions(defaults, options)
    this.initClasses(classes)
    this._timeout = 0
    this._activeTrigger = {}
    this.POPPER = null
    this.$tip = null

    this.initStates()
    this.initialize()
  }

  initialize() {
    this.bind()
    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  bind() {
    const triggers = this.options.trigger.split(' ')

    triggers.forEach(trigger => {
      if (trigger === 'click') {
        this.clickTrigger = true

        bindEvent(
          this.eventName('click'),
          event => {
            this.toggle(event)
          },
          this.element
        )
      } else if (trigger !== Trigger.MANUAL) {
        let eventIn
        let eventOut

        if (trigger === Trigger.HOVER) {
          eventIn = this.eventName('mouseenter')
          eventOut = this.eventName('mouseleave')
        } else {
          eventIn = this.eventName('focusin')
          eventOut = this.eventName('focusout')
        }

        bindEvent(
          eventIn,
          event => {
            this._enter(event)
          },
          this.element
        )

        bindEvent(
          eventOut,
          event => {
            this._leave(event)
          },
          this.element
        )
      }
    })

    if (this.options.selector) {
      this.options = deepMerge(this.options, {
        trigger: this.eventName('manual'),
        selector: ''
      })
    } else {
      this.fixTitle()
    }
  }

  unbind() {
    removeEvent(this.eventName(), this.element)
    removeEvent(this.eventNameWithId('click'), window.document)
  }

  toggle(event) {
    if (event) {
      const target = event.currentTarget
      let context = getData(this.plugin, target)

      if (!context) {
        context = this.constructor
          .getInstances()
          .find(plugin => plugin.element === this.element)
        setData(this.plugin, context, target)
      }

      context._activeTrigger.click = !context._activeTrigger.click
      if (context.isWithActiveTrigger()) {
        context._enter(null, context)
      } else {
        context._leave(null, context)
      }
    } else {
      if (hasClass(this.classes.SHOW, this.getTip())) {
        this._leave(null, this)
        return
      }

      this._enter(null, this)
    }
  }

  show() {
    if (getStyle('display', this.element) === 'none') {
      throw new Error('Please use show on visible elements')
    }

    const showEvent = new CustomEvent(this.selfEventName(EVENTS.SHOW), {
      detail: [this, 'bar']
    })
    if (this.isWithContent() && !this.is('disabled')) {
      this.trigger(showEvent)

      const isInTheDom = this.element.ownerDocument.documentElement.contains(
        this.element
      )

      if (showEvent.defaultPrevented || !isInTheDom) {
        return
      }

      const $tip = this.getTip()
      const tipId = getUID(this.plugin)
      this.instanceId = tipId

      $tip.setAttribute('id', tipId)
      this.element.setAttribute('aria-describedby', tipId)

      this.setContent()

      if (this.options.theme) {
        addClass(this.getThemeClass(), $tip)
      }

      if (this.options.animation) {
        addClass(this.classes.FADE, $tip)
      }

      const placement =
        typeof this.options.placement === 'function'
          ? this.options.placement.call(this, $tip, this.element)
          : this.options.placement

      this.addPlacementClass(placement)

      const $container =
        this.options.container === false
          ? document.body
          : query(this.options.container)
      setData(this.plugin, this, $tip)

      if (!this.element.ownerDocument.documentElement.contains(this.$tip)) {
        append($tip, $container)
      }
      this.trigger(EVENTS.INSERTED)

      this.POPPER = new Popper(this.element, $tip, {
        placement,
        modifiers: {
          offset: {
            offset: this.options.offset
          },
          flip: {
            behavior: this.options.fallbackPlacement
          },
          arrow: {
            element: `.${this.classes.ARROW}`
          },
          preventOverflow: {
            boundariesElement: this.options.boundary
          }
        },
        onCreate: data => {
          if (data.originalPlacement !== data.placement) {
            this.handlePopperPlacementChange(data)
          }
        },
        onUpdate: data => {
          this.handlePopperPlacementChange(data)
        }
      })

      addClass(this.classes.SHOW, $tip)

      const complete = () => {
        const prevHoverState = this._hoverState
        this._hoverState = null
        this.enter('shown')
        this.trigger(EVENTS.SHOWN)

        if (prevHoverState === HoverState.OUT) {
          this._leave(null, this)
        }
      }

      complete()

      if (this.options.hideOutClick && this.is('shown') && this.clickTrigger) {
        bindEvent(
          this.eventNameWithId('click'),
          event => {
            if (!this.is('shown')) {
              return
            }

            if (this._hoverState === HoverState.OUT) {
              return
            }

            if (
              event.target === this.$tip ||
              this.$tip.contains(event.target)
            ) {
              return
            }

            if (
              event.target === this.element ||
              this.element.contains(event.target)
            ) {
              return
            }

            this.hide()
          },
          window.document
        )
      }
    }
  }

  hide(callback) {
    const tip = this.getTip()
    const hideEvent = new CustomEvent(this.selfEventName(EVENTS.HIDE), {
      detail: [this]
    })

    const complete = () => {
      if (this._hoverState !== HoverState.SHOW && tip.parentNode) {
        tip.parentNode.removeChild(tip)
      }

      this.element.removeAttribute('aria-describedby')
      this.trigger(EVENTS.HIDDEN)
      this.leave('shown')
      this.destroyPopper()

      if (callback) {
        callback()
      }
    }

    this.trigger(hideEvent)

    if (hideEvent.defaultPrevented) {
      return
    }

    removeClass(this.classes.SHOW, tip)

    this._activeTrigger[Trigger.CLICK] = false
    this._activeTrigger[Trigger.FOCUS] = false
    this._activeTrigger[Trigger.HOVER] = false

    complete()

    this._hoverState = ''

    if (this.options.hideOutClick && this.clickTrigger && !this.is('shown')) {
      removeEvent(this.eventNameWithId('click'), window.document)
    }
  }

  update() {
    if (this.POPPER !== null) {
      this.POPPER.scheduleUpdate()
    }
  }

  isWithContent() {
    return Boolean(this.getTitle())
  }

  addPlacementClass(placement) {
    addClass(
      this.getClass(this.classes.PLACEMENT, 'placement', placement),
      this.getTip()
    )
  }

  getTip() {
    if (!this.$tip) {
      this.$tip = parseHTML(this.createTip())
    }

    return this.$tip
  }

  createTip() {
    return template.render(this.options.template.call(this), {
      classes: this.classes
    })
  }

  setContent() {
    const $tip = this.getTip()

    this.setElementContent(
      query(`.${this.classes.TOOLTIPINNER}`, $tip),
      this.getTitle()
    )

    removeClass(this.classes.FADE, this.classes.SHOW, $tip)

    this.destroyPopper()
  }

  setElementContent($element, content) {
    const html = this.options.html
    if (typeof content === 'object' && content.nodeType) {
      // content is a DOM node or a jQuery
      if (html) {
        if (!parent(content) === $element) {
          $element.innerHTML = ''
          $element.append(content)
        }
      } else {
        $element.textContent = parseHTML(content).textContent
      }
    } else {
      $element[html ? 'innerHTML' : 'textContent'] = content
    }
  }

  getTitle() {
    let title = this.element.getAttribute('data-original-title')

    if (!title) {
      if (typeof this.options.title === 'function') {
        title = this.options.title.call(this.element)
      } else {
        title = this.options.title
      }
    }

    return title
  }

  fixTitle() {
    const titleType = typeof this.element.getAttribute('data-original-title')
    if (this.element.getAttribute('title') || titleType !== 'string') {
      this.element.setAttribute(
        'data-original-title',
        this.element.getAttribute('title') || ''
      )
      this.element.setAttribute('title', '')
    }
  }

  _enter(event, context) {
    context = context || getData(this.plugin, event.currentTarget)

    if (!context) {
      context = this.constructor
        .getInstances()
        .find(plugin => plugin.element === this.element)

      setData(this.plugin, context, event.currentTarget)
    }

    if (event) {
      context._activeTrigger[
        event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER
      ] = true
    }

    if (
      hasClass(this.classes.SHOW, context.getTip()) ||
      context._hoverState === HoverState.SHOW
    ) {
      context._hoverState = HoverState.SHOW
      return
    }

    clearTimeout(context._timeout)

    context._hoverState = HoverState.SHOW

    if (!context.options.delay || !context.options.delay.show) {
      context.show()
      return
    }

    context._timeout = setTimeout(() => {
      if (context._hoverState === HoverState.SHOW) {
        context.show()
      }
    }, context.options.delay.show)
  }

  _leave(event, context) {
    context = context || getData(this.plugin, event.currentTarget)

    if (!context) {
      context = this.constructor
        .getInstances()
        .find(plugin => plugin.element === this.element)

      setData(this.plugin, context, event.currentTarget)
    }

    if (event) {
      context._activeTrigger[
        event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER
      ] = false
    }

    if (context.isWithActiveTrigger()) {
      return
    }

    clearTimeout(context._timeout)

    context._hoverState = HoverState.OUT

    if (!context.options.delay || !context.options.delay.hide) {
      context.hide()
      return
    }

    context._timeout = setTimeout(() => {
      if (context._hoverState === HoverState.OUT) {
        context.hide()
      }
    }, context.options.delay.hide)
  }

  isWithActiveTrigger() {
    for (const trigger in this._activeTrigger) {
      if (this._activeTrigger[trigger]) {
        return true
      }
    }

    return false
  }

  getDelegateOptions() {
    const options = {}

    if (this.options) {
      for (const key in this.options) {
        if (DEFAULTS[key] !== this.options[key]) {
          options[key] = this.options[key]
        }
      }
    }

    return options
  }

  handlePopperPlacementChange(popperData) {
    const popperInstance = popperData.instance
    this.$tip = popperInstance.popper
    const lastPlacement = getData('lastPlacement', this.$tip)

    if (lastPlacement !== popperData.placement) {
      if (lastPlacement) {
        removeClass(
          this.getClass(this.classes.ATTACHMENT, 'placement', lastPlacement),
          this.$tip
        )
      }

      this.addPlacementClass(popperData.placement)
    }

    setData('lastPlacement', popperData.placement, this.$tip)
  }

  enable() {
    if (this.is('disabled')) {
      removeClass(this.classes.DISABLED, this.element)
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      addClass(this.classes.DISABLED, this.element)
      this.enter('disabled')
    }

    this.trigger(EVENTS.DISABLE)
  }

  destroyPopper() {
    if (this.POPPER !== null) {
      this.POPPER.destroy()
    }
  }

  destroy() {
    if (this.is('initialized')) {
      clearTimeout(this._timeout)
      this.destroyPopper()

      this.unbind()

      if (this.$tip) {
        this.$tip.remove()
      }

      this._timeout = null
      this._activeTrigger = null
      this.POPPER = null
      this.$tip = null

      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default Tooltip
