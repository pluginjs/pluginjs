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
import { bindEvent, bindEventOnce, removeEvent } from '@pluginjs/events'
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
    this.initStyle()
    this.initViewport()
    this.bind()
    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  reset() {
    this.animation = this.options.animation
    this.duration = this.options.duration
    this.easing = this.options.easing
    this.delay = this.options.delay
    this.order = this.options.order
    this.anchor = this.options.anchor
    this.once = this.options.once
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

    Breakpoints.on('change', function () {
      removeClass(`${that.classes.NAMESPACE}-${that.animation}`, that.element)
      if (that.screenOptions[this.current.name]) {
        Object.keys(that.screenOptions[this.current.name]).forEach(key => {
          that[key] = that.screenOptions[this.current.name][key]
        })
      } else {
        that.reset()
      }

      that.initStyle()
    })
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

  initViewport() {
    if (!this.anchor) {
      this.viewElement = this.element
    } else {
      this.viewElement = closest(this.anchor, this.element)
        ? closest(this.anchor, this.element)
        : query(this.anchor)
    }

    if (!this.viewElement) {
      throw new Error('Can not find anchor element')
    }

    this.viewport = Viewport.of(this.viewElement, {
      container: this.options.container,
      offset: this.options.offset,
      threshold: this.options.threshold
    })
  }

  initEasing() {
    return Easings[this.easing] ? Easings[this.easing] : 'ease'
  }

  bind() {
    if (this.once) {
      bindEventOnce(
        'viewport:enter',
        () => {
          if (!this.is('disabled')) {
            addClass(
              `${this.classes.NAMESPACE}-${this.animation}`,
              this.element
            )

            this.enterHandle()
          }
        },
        this.viewElement
      )
    } else {
      bindEvent(
        'viewport:enter',
        () => {
          if (!this.is('disabled')) {
            addClass(
              `${this.classes.NAMESPACE}-${this.animation}`,
              this.element
            )

            this.enterHandle()
          }
        },
        this.viewElement
      )

      bindEvent(
        'viewport:leave',
        () => {
          if (!this.is('disabled')) {
            this.hide()
          }
        },
        this.viewElement
      )
    }
  }

  unbind() {
    if (!this.once) {
      removeEvent('viewport:enter', this.viewElement)
      removeEvent('viewport:leave', this.viewElement)
    }
  }

  enterHandle() {
    if (this.delay > 0 || this.order > 1) {
      bindEventOnce(
        'animationstart',
        () => {
          this.show()
          this.trigger(EVENTS.SHOW)
        },
        this.element
      )
    } else {
      this.show()
      this.trigger(EVENTS.SHOW)
    }

    this.trigger(EVENTS.ENTER)
  }

  hide() {
    removeClass(this.classes.ANIMATED, this.element)
    removeClass(`${this.classes.NAMESPACE}-${this.animation}`, this.element)
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
    removeClass(this.classes.ANIMATED, this.element)
    removeClass(`${this.classes.NAMESPACE}-${this.animation}`, this.element)

    this.trigger(EVENTS.DESTROY)
  }

  disable() {
    if (!this.is('disabled')) {
      this.unbind()
      addClass(this.classes.DISABLED, this.element)
      this.enter('disabled')
    }
    removeClass(this.classes.NAMESPACE, this.element)
    removeClass(`${this.classes.NAMESPACE}-${this.animation}`, this.element)
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
      addClass(`${this.classes.NAMESPACE}-${this.animation}`, this.element)

      this.enterHandle()
    }
    this.trigger(EVENTS.ENABLE)
  }
}

export default Reveal
