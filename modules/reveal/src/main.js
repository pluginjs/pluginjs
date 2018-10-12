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
import { query } from '@pluginjs/dom'
import { isMobile, isTablet } from '@pluginjs/detector'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'

import Viewport from '@pluginjs/viewport'
import Breakpoints from '@pluginjs/breakpoints'

const matchMobile = isMobile()
const matchTablet = isTablet()

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
    this.animationClass = this.getAnimationClass()

    this.setupStates()
    this.initialize()
  }

  getAnimationClass() {
    return this.options.animation
  }

  initialize() {
    if (this.is('initialized') || !this.matchDevice()) {
      return
    }

    const duration = `${this.options.duration / 1000}s`
    const delay = `${this.options.delay / 1000}s`
    const easing = this.options.easing
    const count = this.options.count

    setStyle(
      {
        'animation-duration': duration,
        'animation-timing-function': easing,
        'animation-delay': delay,
        'animation-iteration-count': count // infinite
      },
      this.element
    )

    this.initViewport()
    this.initBreakpoints()
    this.bind()
    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  initViewport() {
    this.viewElement = this.options.anchor
      ? query(this.options.anchor)
      : this.element
    if (!this.viewElement) {
      throw new Error('Can not find anchor element')
    }
    this.viewport = Viewport.of(this.viewElement)
  }

  initBreakpoints() {
    Breakpoints.init()

    const screens = Breakpoints.all()
    this.initScreenOptions(screens)

    // const that = this
    // const currentName = Breakpoints.current().name

    // console.log(this)

    // if (this.screenOptions[currentName]) {
    //   Object.keys(this.screenOptions[currentName]).forEach(key => {
    //     this[key] = this.screenOptions[currentName][key]
    //   })
    // }
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

  bind() {
    bindEvent('viewport:enter', this.enterHandle, this.viewElement)
    bindEvent('viewport:leave', this.exitHandle, this.viewElement)
    // this.viewport.on('enter', this.enterHandle)
    // this.viewport.on('exit', this.exitHandle)
  }

  unbind() {
    removeEvent('viewport:enter', this.viewElement)
    removeEvent('viewport:leave', this.viewElement)
    // this.viewport.off('enter', this.enterHandle)
    // this.viewport.off('exit', this.exitHandle)
  }

  enterHandle = () => {
    if (!this.is('disabled')) {
      this.addAnimation()
      this.trigger(EVENTS.ENTER)
    }
  }

  exitHandle = () => {
    if (!this.is('disabled')) {
      this.removeAnimation()
      this.trigger(EVENTS.EXIT)
      if (this.options.mode === 'once') {
        this.destroy()
      }
    }
  }

  addAnimation() {
    const hasAnimation = this.element.classList.contains(this.animationClass)

    if (!hasAnimation) {
      addClass(this.animationClass, this.element)

      const effectStartCallback = () => {
        this.show()
      }

      const effectEndCallback = () => {
        removeEvent(this.eventName(), this.element)

        this.trigger(EVENTS.END)
      }

      if (this.options.delay) {
        bindEvent(
          this.eventName('animationstart'),
          effectStartCallback,
          this.element
        )
      } else {
        this.show()
      }

      bindEventOnce(
        this.eventName('animationend'),
        effectEndCallback,
        this.element
      )
    }
  }

  removeAnimation() {
    this.hide()
    removeClass(this.animationClass, this.element)
  }

  matchDevice() {
    if (
      (!this.options.mobile && matchMobile) ||
      (!this.options.tablet && matchTablet)
    ) {
      return false
    }
    return true
  }

  hide() {
    addClass(this.classes.NAMESPACE, this.element)
  }

  show() {
    removeClass(this.classes.NAMESPACE, this.element)
  }

  isVisible() {
    return this.viewport.isVisible()
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()
      this.leave('initialized')
    }
    removeClass(this.classes.NAMESPACE, this.element)
    removeClass(this.animationClass, this.element)

    this.trigger(EVENTS.DESTROY)
  }

  disable() {
    if (!this.is('disabled')) {
      this.unbind()
      addClass(this.classes.DISABLED, this.element)
      this.enter('disabled')
    }
    removeClass(this.classes.NAMESPACE, this.element)
    removeClass(this.animationClass, this.element)
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
