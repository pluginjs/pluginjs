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
import { query } from '@pluginjs/dom'
import Detector from './Detector'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'
import viewport from '@pluginjs/viewport'

let initDevice = false
let isMobile = false
let istablet = false

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
    super(NAMESPACE, element)
    this.initOptions(DEFAULTS, options)
    this.initClasses(CLASSES)
    this.animationClass = this.getAnimationClass()

    this.initStates()
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
    this.bind()
    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  initViewport() {
    const viewElement = this.options.anchor
      ? query(this.options.anchor)
      : this.element
    if (!viewElement) {
      throw new Error('Can not find anchor element')
    }
    this.viewport = viewport(viewElement)
  }

  bind() {
    this.viewport.on('enter', this.enterHandle)
    this.viewport.on('exit', this.exitHandle)
  }

  unbind() {
    this.viewport.off('enter', this.enterHandle)
    this.viewport.off('exit', this.exitHandle)
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

        this.trigger(EVENTS.ANIMATIONEND)
      }

      if (this.options.delay) {
        bindEvent(
          {
            type: this.eventName('animationstart'),
            handler: effectStartCallback
          },
          this.element
        )
      } else {
        this.show()
      }

      bindEvent(
        {
          type: this.eventName('animationend'),
          handler: effectEndCallback
        },
        this.element
      )
    }
  }

  removeAnimation() {
    this.hide()
    removeClass(this.animationClass, this.element)
  }

  matchDevice() {
    if (!initDevice) {
      const detector = new Detector()
      isMobile = detector.mobile()
      istablet = detector.tablet()
      initDevice = true
    }

    if (
      (!this.options.mobile && isMobile) ||
      (!this.options.tablet && istablet)
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
