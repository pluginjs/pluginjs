/* eslint-disable no-console */
import Component from '@pluginjs/component'
import templateEngine from '@pluginjs/template'
import { deepMerge, parseDataOptions } from '@pluginjs/utils'
import { addClass, hasClass } from '@pluginjs/classes'
import { closest, wrap, parentWith, parseHTML } from '@pluginjs/dom'
import { isString, isNan } from '@pluginjs/is'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { setStyle } from '@pluginjs/styled'
import Pj from '@pluginjs/factory'
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
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'

import Viewport from '@pluginjs/viewport'
import Loader from '@pluginjs/loader'

import Image from './modules/image'
import Background from './modules/background'
import Video from './modules/video'

@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS
})
class Parallax extends Component {
  constructor(element, options = {}) {
    super(element)
    this.setupOptions(options)
    this.setupClasses()

    addClass(this.classes.NAMESPACE, this.element)

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.element)
    }

    this.setupStates()
    this.initialize()
  }

  initialize() {
    this.initContainer()
    this.initViewport()
    this.initLoader()
    this.initSpeed()
    this.direction = this.options.direction || 'vertical'
    this.type = this.options.type || 'scroll'

    if (this.options.mode) {
      this.initMode()
    }

    this.bind()
    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  initContainer() {
    this.container = closest(`.${this.classes.CONTAINER}`, this.element)
    if (!this.container) {
      if (this.options.container) {
        addClass(
          this.classes.CONTAINER,
          closest(this.options.container, this.element)
        )
      } else {
        wrap(`<div class="${this.classes.CONTAINER}"></div>`, this.element)
      }

      this.container = parentWith(
        hasClass(this.classes.CONTAINER),
        this.element
      )
    }

    this.containerOptions = this.container.dataset
      ? parseDataOptions(this.container.dataset)
      : {}

    if (this.containerOptions.height) {
      this.container.style.height = this.setContainerHeight()
    }
  }

  setContainerHeight() {
    const attrHeight = this.containerOptions.height

    if (!isNan(Number(attrHeight))) {
      return `${attrHeight}px`
    }

    const suffix = attrHeight.substr(attrHeight.length - 2, attrHeight.length)

    if (suffix === 'px' || suffix === 'vh') {
      return attrHeight
    }

    throw new Error(
      `Invalid height suffix, expected "px" or "vh" but got: ${suffix}`
    )
  }

  initLoader() {
    const loaderConfig = deepMerge(
      {
        theme: 'ring',
        color: '#000000',
        size: 'lg'
      },
      this.options.loaderConfig
    )

    this.loader = Loader.of(this.container, loaderConfig)
    this.loader.show()
  }

  initSpeed() {
    this.speed = this.options.speed

    if (isString(this.speed)) {
      const attrSpeedNumber = Number(this.speed)
      if (isNan(attrSpeedNumber)) {
        console.error(
          `Invalid type for attribute speed for element: ${this.element}`
        )
        throw new Error('Invalid type for attribute speed')
      } else {
        this.speed = attrSpeedNumber
      }
    }

    return this.speed
  }

  initMode() {
    switch (this.options.mode) {
      case 'image':
        this.mode = new Image(this)
        break
      case 'background':
        this.mode = new Background(this)
        break
      case 'video':
        this.mode = new Video(this)
        break
      default:
        break
    }
  }

  initViewport() {
    this.viewport = Viewport.of(this.container)
  }

  createElement(type) {
    const template = this.options.templates[type]
    let html = ''

    html = templateEngine.render(template.call(this), {
      classes: this.classes
    })

    return parseHTML(html)
  }

  effect() {
    switch (this.type) {
      case 'opacity':
        this.opacityHandle()
        break
      case 'scale':
        this.scaleHandle()
        break
      default:
        this.scrollHandle()
        break
    }
  }

  scrollHandle() {
    const scrolled = this.container.getBoundingClientRect().y

    if (Math.abs(this.speed) > 1) {
      this.speed = 0.3
    }

    this.distance = (this.speed * scrolled) / 2.2

    let moveX
    let moveY

    if (this.direction === 'horizontal') {
      moveX = -this.distance
      moveY = '0'
    } else {
      moveX = '0'
      moveY = -this.distance
    }

    this.transform = `translate3d(${moveX}px, ${moveY}px, 0px)`

    const style = {
      transform: this.transform,
      'object-fit': 'cover'
    }

    if (this.direction === 'horizontal') {
      style.width = `${this.container.offsetWidth *
        (1 + Math.abs(this.speed) * 2)}px`
      style.height = '100%'
      style.top = 0
      style.bottom = 0
    } else {
      style.height = `${this.container.offsetHeight *
        (1 + Math.abs(this.speed) * 2)}px`
      style.width = '100%'
      style.left = 0
      style.right = 0
    }

    setStyle(style, this.mode.element)
  }

  opacityHandle() {
    if (Math.abs(this.speed) > 1) {
      this.speed = 0.6
    }

    const offset =
      Math.round((this.getScrollTop() / this.getDocumentHeight()) * 120) / 100

    this.transform = 'translate3d(0, 0, 0)'

    const style = {
      transform: this.transform,
      opacity: offset * (0.3 + this.speed),
      height: '100%',
      width: '100%'
    }

    setStyle(style, this.element)
  }

  scaleHandle() {
    if (Math.abs(this.speed) > 1) {
      this.speed = 0.3
    }

    const offset =
      Math.round((this.getScrollTop() / this.getDocumentHeight()) * 100) / 100

    this.transform = `scale(${offset * (1.5 + this.speed)})`

    setStyle(
      {
        transform: this.transform,
        height: '100%',
        top: '0',
        left: '0'
      },
      this.element
    )
  }

  getScrollTop() {
    const { documentElement, body } = document
    return (
      window.pageYOffset || documentElement.scrollTop || body.scrollTop || 0
    )
  }

  getDocumentHeight() {
    const { documentElement, body } = document
    const bodyHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      documentElement.scrollHeight,
      documentElement.offsetHeight,
      documentElement.clientHeight
    )

    return bodyHeight - documentElement.clientHeight
  }

  bind() {
    bindEvent(
      'viewport:enter',
      () => {
        this.effect()
        Pj.emitter.on(this.eventNameWithId('scroll'), this.effect.bind(this))
      },
      this.container
    )

    bindEvent(
      'viewport:leave',
      () => {
        Pj.emitter.off(this.eventNameWithId('scroll'))
      },
      this.container
    )
  }

  unbind() {
    removeEvent('viewport:enter', this.container)
    removeEvent('viewport:leave', this.container)
    Pj.emitter.off(this.eventNameWithId('scroll'))
  }

  resize() {
    this.effect()
  }

  enterHandle() {
    this.context.trigger(EVENTS.ENTER)
    this.context.effect()
  }

  enable() {
    if (this.is('disabled')) {
      // this.viewport.enable();
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      // this.viewport.disable();
      this.enter('disabled')
    }

    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default Parallax
