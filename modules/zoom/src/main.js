/* Credit to https://desmonding.me/zooming */
import Component from '@pluginjs/component'
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
  dependencies as DEPENDENCIES,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'
import ImageLoader from '@pluginjs/image-loader'
import { bindEvent, removeEvent, bindEventOnce } from '@pluginjs/events'
import { isFunction, isString, isObject } from '@pluginjs/is'
import { addClass, removeClass } from '@pluginjs/classes'
import { setStyle } from '@pluginjs/styled'
import Pj from '@pluginjs/factory'
import Keyboard from './keyboard'
import Overlay from './overlay'

@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class Zoom extends Component {
  constructor(element, options = {}) {
    super(element)

    this.setupOptions(options)
    this.setupClasses()
    this.setupStates()

    this.image = {}
    ;['src', 'sizes', 'srcset'].forEach(prop => {
      if (this.element[prop]) {
        this.image[prop] = this.element[prop]
      }
    })

    this.original = this.options.original ? this.options.original : this.image
    this.initialize()
  }

  initialize() {
    addClass(this.classes.IMAGE, this.element)

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.element)
    }

    if (this.options.preload) {
      this.load()
    }

    this.bind()
    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  bind() {
    bindEvent(
      this.eventName('click'),
      () => {
        this.toggle()
      },
      this.element
    )

    if (this.options.closeOnResize) {
      Pj.emitter.on('resize', () => {
        this.close()
      })
    }

    if (this.options.closeOnESC || this.options.toggleOnEnter) {
      this.keyboard = new Keyboard(this)
    }
  }

  unbind() {
    removeEvent(this.eventName(), this.element)
  }

  load(done) {
    this.enter('loading')
    this.trigger(EVENTS.LOADING)

    ImageLoader.of(this.original)
      .on('loaded', () => {
        this.enter('loaded')
        if (isFunction(done)) {
          done.call(this)
        }
        this.trigger(EVENTS.LOADED)
      })
      .on('error', () => {
        this.trigger(EVENTS.ERROR)
      })
      .on('always', () => {
        this.leave('loading')
      })
  }

  open() {
    if (!this.is('opened')) {
      this.rect = this.element.getBoundingClientRect()
      addClass(this.classes.OPENED, this.element)

      const replaceImage = () => {
        if (this.is('loaded') && this.is('opened')) {
          this.replaceImage(this.original)
        }
      }

      this.enter('animating')
      bindEventOnce(
        this.eventName('transitionend'),
        () => {
          replaceImage()

          this.leave('animating')
        },
        this.element
      )

      this.zoomIn()

      if (this.options.overlay) {
        if (!this.overlay) {
          this.overlay = new Overlay(this)
        }
        this.overlay.attach()
      }
      if (this.options.closeOnScroll) {
        this.lastScrollTop = this.getScrollTop()
        Pj.emitter.on('scroll', this.onScroll.bind(this))
      }
      if (this.options.closeOnESC) {
        this.keyboard.bindESC()
      }

      this.load(() => {
        replaceImage()
      })

      this.enter('opened')
    }
  }

  close() {
    if (this.is('opened')) {
      if (this.overlay) {
        this.overlay.detach()
      }

      this.enter('animating')
      bindEventOnce(
        this.eventName('transitionend'),
        () => {
          this.replaceImage(this.image)
          removeClass(this.classes.OPENED, this.element)

          this.leave('animating')
        },
        this.element
      )

      this.zoomOut()

      if (this.options.closeOnScroll) {
        Pj.emitter.off('scroll', this.onScroll.bind(this))
      }

      if (this.options.closeOnESC) {
        this.keyboard.unbindESC()
      }
      this.leave('opened')
    }
  }

  toggle() {
    if (this.is('opened')) {
      this.close()
    } else {
      this.open()
    }
  }

  zoomIn() {
    this.translate = this.calculateTranslate()
    this.scale = this.calculateScale()
    setStyle(
      {
        transform: `translate3d(${this.translate.x}px, ${this.translate.y}px, 0)
        scale(${this.scale.x},${this.scale.y})`,
        height: `${this.rect.height}px`,
        width: `${this.rect.width}px`
      },
      this.element
    )
  }

  zoomOut() {
    setStyle(
      {
        transform: 'none'
      },
      this.element
    )
  }

  calculateTranslate() {
    const windowCenter = this.getWindowCenter()
    const targetCenter = {
      x: this.rect.left + this.rect.width / 2,
      y: this.rect.top + this.rect.height / 2
    }

    // The vector to translate image to the window center
    return {
      x: windowCenter.x - targetCenter.x,
      y: windowCenter.y - targetCenter.y
    }
  }

  calculateScale() {
    const { zoomHeight, zoomWidth, scale: scaleBase } = this.options
    if (zoomHeight && zoomWidth) {
      return {
        x: zoomWidth / this.rect.width,
        y: zoomHeight / this.rect.height
      }
    }
    const targetHalfWidth = this.rect.width / 2
    const targetHalfHeight = this.rect.height / 2
    const windowCenter = this.getWindowCenter()

    // The distance between target edge and window edge
    const targetEdgeToWindowEdge = {
      x: windowCenter.x - targetHalfWidth,
      y: windowCenter.y - targetHalfHeight
    }

    const scaleHorizontally = targetEdgeToWindowEdge.x / targetHalfWidth
    const scaleVertically = targetEdgeToWindowEdge.y / targetHalfHeight

    // The additional scale is based on the smaller value of
    // scaling horizontally and scaling vertically
    const scale = scaleBase + Math.min(scaleHorizontally, scaleVertically)

    return {
      x: scale,
      y: scale
    }
  }

  getWindowCenter() {
    const $doc = document.documentElement
    const windowWidth = Math.min($doc.clientWidth, window.innerWidth)
    const windowHeight = Math.min($doc.clientHeight, window.innerHeight)

    return {
      x: windowWidth / 2,
      y: windowHeight / 2
    }
  }

  getScrollTop() {
    return (
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0
    )
  }

  onScroll() {
    const currentScrollTop = this.getScrollTop()
    if (
      Math.abs(this.lastScrollTop - currentScrollTop) >
      this.options.scrollOffset
    ) {
      this.close()
    }
  }

  replaceImage(image) {
    if (this.currentImage === image) {
      return
    }

    if (isString(image)) {
      image = {
        src: image
      }
    }
    if (isObject(image)) {
      ;['sizes', 'src', 'srcset'].forEach(prop => {
        if (image[prop]) {
          this.element[prop] = image[prop]
        } else {
          this.element[prop] = ''
        }
      })
    }

    this.currentImage = image
  }

  enable() {
    if (this.is('disabled')) {
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      this.enter('disabled')
    }

    this.trigger(EVENTS.DISABLE)
  }

  resize() {
    this.rect = this.element.getBoundingClientRect()
  }

  destroy() {
    if (this.is('initialized')) {
      this.replaceImage(this.image)
      this.unbind()

      if (this.keyboard) {
        this.keyboard.destroy()
        this.keyboard = null
      }
      if (this.overlay) {
        this.overlay.destroy()
        this.overlay = null
      }

      removeClass(this.classes.IMAGE, this.element)
      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.element)
      }
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default Zoom
