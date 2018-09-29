/* eslint-disable no-console */
import Component from '@pluginjs/component'
import templateEngine from '@pluginjs/template'
import { compose, curry, deepMerge } from '@pluginjs/utils'
import { addClass, hasClass } from '@pluginjs/classes'
import { closest, wrap, parentWith, parseHTML } from '@pluginjs/dom'
import { isString, isNan } from '@pluginjs/is'
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

import Loader from '@pluginjs/loader'

import Image from './modules/image'
import Background from './modules/background'
import Video from './modules/video'
import Element from './modules/element'

import Maybe from './maybe'

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

    this.updateWindowProps()

    this.setupStates()
    this.initialize()
  }

  initialize() {
    this.initContainer()
    this.initLoader()
    this.initSpeed()
    this.direction = this.options.direction || 'down'

    if (this.options.mode) {
      this.initMode()
    }

    console.log(this)
    this.isHorizontal = Boolean(this.options.horizontal)
    this.render()
    this.bind()
    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  initContainer() {
    this.container = {}
    this.container.el = closest(`.${this.classes.CONTAINER}`, this.element)
    if (!this.container.el) {
      if (this.options.container) {
        addClass(
          this.classes.CONTAINER,
          closest(this.options.container, this.element)
        )
      } else {
        wrap(`<div class="${this.classes.CONTAINER}"></div>`, this.element)
      }

      this.container.el = parentWith(
        hasClass(this.classes.CONTAINER),
        this.element
      )
    }

    this.container.options = this.datasetToOptions(this.container.el.dataset)
    this.container.offset = this.computeOffset(this.container.el)

    if (this.container.options.height) {
      this.container.el.style.height = this.setContainerHeight()
    }

    this.container.height = this.container.el.clientHeight
  }

  setContainerHeight() {
    const attrHeight = this.container.options.height

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

    this.loader = Loader.of(this.container.el, loaderConfig)
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

    if (this.speed === 0) {
      this.speed = -Math.PI
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
      case 'element':
        this.mode = new Element(this)
        break
      default:
        break
    }
  }

  computeOffset(el) {
    const rectTop = el.getBoundingClientRect().top
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    return rectTop + scrollTop
  }

  createElement(type) {
    const template = this.options.templates[type]
    let html = ''

    html = templateEngine.render(template.call(this), {
      classes: this.classes
    })

    return parseHTML(html)
  }

  datasetToOptions(dataset) {
    return Object.entries(dataset).reduce((result, [k, v]) => {
      try {
        const content = JSON.parse(`{"data": ${v.replace(/'/g, '"')}}`).data
        return {
          ...result,
          [k]: content
        }
      } catch (err) {
        return {
          ...result,
          [k]: v
        }
      }
    }, {})
  }

  // ready to delete render after translate function complete

  render() {
    const mode = this.options.animate
    const getDocumentHeight = () => {
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

    const getScrollTop = () => {
      const { documentElement, body } = document
      return (
        window.pageYOffset || documentElement.scrollTop || body.scrollTop || 0
      )
    }

    const offsetCheck = scrollTop => {
      if (this.options.offset) {
        if (scrollTop < this.options.offset) {
          return null
        }
        return scrollTop - this.options.offset
      }
      return scrollTop
    }

    const computePercent = curry((documentHeight, scrollTop) => {
      const multiple = 100
      return Math.round((scrollTop / documentHeight) * multiple)
    })

    const getMaxValue = (max, min) => {
      const multiple = 100
      return (max - min) / multiple
    }

    const either = (left, right) => {
      if (left || left === 0) {
        return left
      }
      return right
    }

    const computeOffset = (max, min, percent) =>
      percent *
        getMaxValue(
          either(this.options.max, max),
          either(this.options.min, min)
        ) +
      either(this.options.min, min)

    const modeMatch = curry((mode, percent) => {
      const multiple = 1000
      const speed = this.options.speed / multiple
      const rotate = 360
      switch (mode) {
        case 'translateY':
          this.element.style.transform = `translate3d(0, ${computeOffset(
            this.element.clientHeight / 2,
            0,
            percent
          ) *
            speed *
            1000}px, 0)`
          break
        case 'translateX':
          this.element.style.transform = `translateX(${computeOffset(
            this.element.clientWidth / 2,
            (this.element.clientWidth / 2) * -1,
            percent
          ) *
            speed *
            1000}px)`
          break
        case 'rotateZ':
          this.element.style.transform = `rotateZ(${computeOffset(
            rotate,
            0,
            percent
          ) *
            speed *
            1000}deg)`
          break
        case 'scale':
          this.element.style.transform = `scale(${computeOffset(1, 0, percent) *
            speed *
            1000})`
          break
        case 'custom':
          this.customHandle(percent)
          break
        default:
          break
      }
      return null
    })
    return Maybe.of(getScrollTop()).map(
      compose(
        modeMatch(mode),
        computePercent(getDocumentHeight()),
        offsetCheck
      )
    )
  }

  bind() {
    Pj.emitter.on(this.eventNameWithId('scroll'), this.render.bind(this))
    Pj.emitter.on(this.eventNameWithId('resize'), this.render.bind(this))
  }

  unbind() {
    Pj.emitter.off(this.eventNameWithId('scroll'))
    Pj.emitter.off(this.eventNameWithId('resize'))
  }

  updateWindowProps() {
    this.windowProps = {
      scrollTop: window.scrollY || document.documentElement.scrollTop,
      windowWidth: window.innerWidth || document.documentElement.clientWidth,
      windowHeight: window.innerHeight || document.documentElement.clientHeight,
      windowMidHeight:
        window.innerHeight / 2 || document.documentElement.clientHeight / 2
    }
  }

  resize() {
    if (this.options.mode === 'image') {
      this.mode.setModeAttributes()
    }
  }

  enterHandle() {
    this.context.trigger(EVENTS.ENTER)
    this.context.render()
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
