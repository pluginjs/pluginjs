import Component from '@pluginjs/component'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  optionable
} from '@pluginjs/decorator'
import { addClass, removeClass } from '@pluginjs/classes'
import { setStyle } from '@pluginjs/styled'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { closest, query } from '@pluginjs/dom'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'

import Viewport from '@pluginjs/viewport'
import Breakpoints from '@pluginjs/breakpoints'

import Easings from './easings'

@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS
})
class Reveal extends Component {
  constructor(element, options = {}) {
    super(element)
    this.setupOptions(options)
    this.setupClasses()
    this.setupStates()
    this.initialize()
  }

  initialize() {
    if (this.is('initialized')) {
      return
    }

    addClass(this.classes.NAMESPACE, this.element)

    this.reset()

    this.initBreakpoints()
    this.initViewport()
    this.initStyle()
    this.bind()
    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  initViewport() {
    if (!this.options.anchor) {
      this.viewElement = this.element
    } else {
      this.viewElement = closest(this.options.anchor, this.element)
        ? closest(this.options.anchor, this.element)
        : query(this.options.anchor)
    }

    if (!this.viewElement) {
      throw new Error('Can not find anchor element')
    }

    this.viewport = Viewport.of(this.viewElement, {
      container: this.container,
      offset: this.options.offset,
      threshold: this.options.threshold
    })
  }

  initBreakpoints() {
    Breakpoints.init()

    const screens = Breakpoints.all()
    this.initScreenOptions(screens)

    const that = this
    const currentName = Breakpoints.current().name

    if (this.screenOptions[currentName]) {
      Object.keys(this.screenOptions[currentName]).forEach(key => {
        this[key] = this.screenOptions[currentName][key]
      })
    }

    Breakpoints.on('change', function() {
      if (that.screenOptions[this.current.name]) {
        Object.keys(that.screenOptions[this.current.name]).forEach(key => {
          that[key] = that.screenOptions[this.current.name][key]
        })

        that.initCount()
      } else {
        that.reset()
      }

      that.initStyle()
    })
  }

  initCount() {
    if (this.loop === true) {
      this.count = 'infinite'
    } else {
      this.loop = Number(this.loop)
      this.count = 0
    }
  }

  reset() {
    Object.keys(this.options).forEach(key => {
      this[key] = this.options[key]
    })

    this.initCount()
  }

  initScreenOptions(screens) {
    this.screenOptions = {}
    Object.keys(this.options).forEach(key => {
      screens.forEach(screen => {
        const screenFirstUpper =
          screen.substring(0, 1).toUpperCase() + screen.substring(1)

        if (key.endsWith(screenFirstUpper)) {
          if (!this.screenOptions[screen]) {
            this.screenOptions[screen] = {}
          }

          this.screenOptions[screen][
            key.slice(0, key.indexOf(screenFirstUpper))
          ] = this.options[key]
        }
      })
    })
  }

  initStyle() {
    this.order = this.order < 1 ? 1 : this.order
    const duration = `${this.duration / 1000}s`
    const delay = `${(this.delay + (this.order - 1) * 100) / 1000}s`
    const easing = this.initEasing()

    setStyle(
      {
        'animation-duration': duration,
        'animation-timing-function': easing,
        'animation-delay': delay
      },
      this.element
    )
  }

  initEasing() {
    return Easings[this.easing] ? Easings[this.easing] : 'ease'
  }

  bind() {
    bindEvent('viewport:enter', this.enterHandle.bind(this), this.viewElement)
    bindEvent('viewport:leave', this.leaveHandle.bind(this), this.viewElement)
  }

  unbind() {
    removeEvent('viewport:enter', this.viewElement)
    removeEvent('viewport:leave', this.viewElement)
  }

  enterHandle() {
    if (!this.is('disabled')) {
      if (this.count !== 'infinite') {
        this.count++
      }

      this.addAnimation()
      this.trigger(EVENTS.ENTER)
    }
  }

  leaveHandle() {
    if (!this.is('disabled')) {
      this.removeAnimation()
      this.trigger(EVENTS.LEAVE)

      if (this.count !== 'infinite' && this.count === this.loop) {
        this.destroy()
      }
    }
  }

  addAnimation() {
    const hasAnimation = this.element.classList.contains(this.animation)

    if (!hasAnimation) {
      addClass(`pj-${this.animation}`, this.element)

      const effectStartCallback = () => {
        this.show()
      }

      const effectEndCallback = () => {
        removeEvent(this.eventName(), this.element)
        this.trigger(EVENTS.END)
      }

      if (this.delay || this.order > 1) {
        bindEvent(
          this.eventName('animationstart'),
          effectStartCallback,
          this.element
        )
      } else {
        this.show()
      }

      bindEvent(this.eventName('animationend'), effectEndCallback, this.element)
    }
  }

  removeAnimation() {
    this.hide()
  }

  hide() {
    removeClass(this.classes.ANIMATED, this.element)
    removeClass(`pj-${this.animation}`, this.element)
  }

  show() {
    addClass(this.classes.ANIMATED, this.element)
  }

  isVisible() {
    return this.viewport.isVisible()
  }

  getAnimation() {
    return this.options.animation
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()
      this.leave('initialized')
    }
    removeClass(this.classes.NAMESPACE, this.element)
    removeClass(this.animation, this.element)

    this.trigger(EVENTS.DESTROY)
  }

  disable() {
    if (!this.is('disabled')) {
      this.unbind()
      addClass(this.classes.DISABLED, this.element)
      this.enter('disabled')
    }
    removeClass(this.classes.NAMESPACE, this.element)
    removeClass(this.animation, this.element)
    this.trigger(EVENTS.DISABLE)
  }

  enable() {
    if (this.is('disabled')) {
      this.bind()
      removeClass(this.classes.DISABLED, this.element)
      this.leave('disabled')
    }
    // hide
    addClass(this.classes.NAMESPACE, this.element)
    if (this.isVisible()) {
      this.addAnimation()
    }
    this.trigger(EVENTS.ENABLE)
  }
}

export default Reveal
