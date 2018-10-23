import Pj from '@pluginjs/factory'
import templateEngine from '@pluginjs/template'
import { isNumber, isString, isFunction } from '@pluginjs/is'
import GlobalComponent from '@pluginjs/global-component'
import { reflow } from '@pluginjs/utils'
import { addClass, removeClass } from '@pluginjs/classes'
import { setStyle } from '@pluginjs/styled'
import { bindEvent, bindEventOnce } from '@pluginjs/events'
import { append, parseHTML, query, remove, data } from '@pluginjs/dom'
import Breakpoints from '@pluginjs/breakpoints'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  optionable
} from '@pluginjs/decorator'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  events as EVENTS,
  namespace as NAMESPACE
} from './constant'

@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, false)
@register(NAMESPACE)
class Notice extends GlobalComponent {
  constructor(options = {}) {
    super()
    this.setupOptions(options)
    this.setupClasses()
    this.setupStates()
    this.initialize()
  }

  show() {
    const instances = Pj.notice.getInstances()

    instances.forEach(instance => {
      if (instance.is('shown')) {
        instance.hide()
      }
    })

    this.setStyles()
    this.animate()
    this.bind()
    append(this.$element, window.document.body)
    this.enter('shown')
    this.trigger(EVENTS.SHOW)
  }

  animate() {
    reflow(this.$element)
    if (this.options.layout === 'top') {
      addClass(`${this.classes.NAMESPACE}-Intop`, this.$element)
    } else {
      addClass(`${this.classes.NAMESPACE}-Inbottom`, this.$element)
    }
  }

  setStyles() {
    if (this.options.backgroundImage) {
      const url = `url(${this.options.backgroundImage})`
      setStyle(
        {
          backgroundImage: url
        },
        this.$element
      )
    }

    if (this.options.textColor) {
      setStyle(
        {
          color: this.options.textColor
        },
        this.$element
      )
    }

    if (this.options.backgroundColor) {
      setStyle(
        {
          backgroundColor: this.options.backgroundColor
        },
        this.$element
      )
    }

    if (this.options.type) {
      addClass(
        this.getClass(this.classes.TYPE, 'type', this.options.type),
        this.$element
      )
    }
    if (this.options.layout) {
      addClass(
        this.getClass(this.classes.LOCATION, 'location', this.options.layout),
        this.$element
      )
    }
    if (this.options.actionsAlign) {
      addClass(
        this.getClass(
          this.classes.ACTIONSLOCATION,
          'location',
          this.options.actionsAlign
        ),
        this.$element
      )
    }
    if (this.options.withClose) {
      addClass(this.classes.WITHCLOSE, this.$element)
    }
  }

  bind() {
    if (this.options.withClose) {
      bindEvent(
        this.eventName('click'),
        () => {
          this.hide()
        },
        this.$closeBtn
      )
    }

    if (this.options.buttons) {
      bindEvent(
        this.eventName('click'),
        event => {
          if (!event.target.classList.contains(this.classes.BUTTON)) {
            return false
          }
          const action = data('action', event.target)

          if (!action || typeof this.options.buttons[action] === 'undefined') {
            return false
          }

          const button = this.options.buttons[action]

          if (isFunction(button.fn)) {
            button.fn(this.hide.bind(this))
          } else {
            this.hide()
          }

          return false
        },
        this.$buttons
      )
    }

    if (isNumber(this.options.duration)) {
      let settime = setTimeout(() => {
        this.hide()
      }, this.options.duration)

      bindEvent(
        this.eventName('mouseenter'),
        () => {
          clearInterval(settime)
        },
        this.$element
      )
      bindEvent(
        this.eventName('mouseleave'),
        () => {
          settime = setTimeout(() => {
            if (this.is('initialized')) {
              this.hide()
            }
          }, this.options.duration)
        },
        this.$element
      )
    }
  }

  hide() {
    this.trigger(EVENTS.HIDE)
    if (this.options.layout === 'top') {
      removeClass(`${this.classes.NAMESPACE}-Intop`, this.$element)
      addClass(`${this.classes.NAMESPACE}-Outtop`, this.$element)
    } else {
      removeClass(`${this.classes.NAMESPACE}-Inbottom`, this.$element)
      addClass(`${this.classes.NAMESPACE}-Outbottom`, this.$element)
    }

    bindEventOnce(
      this.eventName('animationend'),
      () => {
        this.destroy()
      },
      this.$element
    )

    this.leave('shown')
  }

  initialize() {
    this.$element = parseHTML(this.createHtml())
    this.$content = query(`.${this.classes.CONTENT}`, this.$element)
    this.$buttons = query(`.${this.classes.BUTTONS}`, this.$element)
    this.$container = query(`.${this.classes.CONTAINER}`, this.$element)
    this.$actions = query(`.${this.classes.ACTIONS}`, this.$element)
    this.$closeBtn = query(`.${this.classes.CLOSE}`, this.$element)

    if (this.options.content !== '') {
      this.setContent(this.options.content)
      this.setContentloction(this.options.contentAlignment)
    }

    if (this.options.fixedWidth) {
      addClass(this.classes.FIXED, this.$element)
    }

    if (this.options.backgroundImage) {
      addClass(this.classes.BACKGROUND, this.$element)
    }

    if (this.options.breakpoint) {
      this.initBreakpoints()
    }

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  initBreakpoints() {
    Breakpoints.init()
    if (isString(this.options.breakpoint) && this.ensureBreakpoint()) {
      const breakpoint = this.options.breakpoint
      const that = this
      if (Breakpoints.is(`${breakpoint}-`)) {
        addClass(this.classes.RESPONSIVE, this.$element)
      }
      Breakpoints.to(breakpoint, {
        enter() {
          addClass(that.classes.RESPONSIVE, that.$element)
        },
        leave() {
          removeClass(that.classes.RESPONSIVE, that.$element)
        }
      })
    }
  }

  ensureBreakpoint() {
    if (Breakpoints.all().includes(this.options.breakpoint)) {
      return true
    }

    return false
  }

  setContent(content) {
    if (this.options.html) {
      this.$content.innerHTML = content
    } else {
      this.$content.textContent = content
    }
  }

  setContentloction(contentLocation) {
    if (contentLocation) {
      addClass(
        this.getClass(
          this.classes.CONTENTLOCATION,
          'location',
          this.options.contentAlignment
        ),
        this.$element
      )
    }
  }

  destroy() {
    if (this.is('initialized')) {
      this.leave('initialized')
    }
    this.trigger(EVENTS.DESTROY)
    remove(this.$element)

    super.destroy()
  }

  createHtml() {
    let close = ''
    let content = ''
    let buttons = ''

    if (this.options.withClose) {
      close = templateEngine.render(this.options.templates.close.call(this), {
        classes: this.classes
      })
    }

    if (this.options.content !== '') {
      content = templateEngine.render(
        this.options.templates.content.call(this),
        { classes: this.classes }
      )
    }

    if (this.options.buttons) {
      buttons = templateEngine.render(
        this.options.templates.buttons.call(this),
        {
          classes: this.classes,
          buttons: this.createBtns()
        }
      )
    }

    const html = templateEngine.render(this.options.template.call(this), {
      classes: this.classes,
      close,
      content,
      buttons
    })
    return html
  }

  creatBtn(action, button) {
    return templateEngine.render(this.options.templates.button.call(this), {
      classes: this.classes,
      custom: button.classes,
      label: button.label,
      action
    })
  }

  createBtns() {
    const buttons = this.options.buttons
    let result = ''
    for (const key in buttons) {
      if (Object.prototype.hasOwnProperty.call(buttons, key)) {
        result += this.creatBtn(key, buttons[key])
      }
    }
    return result
  }

  static show(options = {}) {
    const instance = new Notice(options)
    instance.show()
    return instance
  }

  static hideAll() {
    const instances = this.getInstances()

    instances.forEach(instance => instance.hide())
    return true
  }
}

export default Notice
