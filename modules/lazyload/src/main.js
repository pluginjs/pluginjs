import Component from '@pluginjs/component'
import {
  eventable,
  register,
  stateable,
  styleable,
  optionable
} from '@pluginjs/decorator'
import {
  defaults as DEFAULTS,
  events as EVENTS,
  classes as CLASSES,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'
import { addClass } from '@pluginjs/classes'
import { curry, debounce, throttle } from '@pluginjs/utils'
import viewport from '@pluginjs/viewport'

@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS
})
class Lazyload extends Component {
  beforeLoadHook = [() => this.animationLifeCycle('start')]

  afterLoadHook = [() => this.animationLifeCycle('finish')]

  errorHook = []

  delayType = 'throttle'

  _isLoad = false

  constructor(element, options = {}) {
    super(NAMESPACE, element)
    this.initOptions(DEFAULTS, options)
    this.initClasses(CLASSES)
    this.initStates()
    this.initialize()
  }

  initialize() {
    const config = ['src', 'srcset', 'delay']

    config
      .filter(key => Boolean(this.options[key]))
      .map(key => (this[key] = this.options[key]))

    this.render = () => {
      const isSrcset = Boolean(this.srcset)
      const isImg = Boolean(this.element.tagName === 'IMG')
      const setBackground = src =>
        (this.element.style.backgroundImage = `url(${src})`)
      const setAttr = curry((type, src) => this.element.setAttribute(type, src))
      const src = isSrcset ? this.srcset : this.src
      const srcType = isSrcset ? 'srcset' : 'src'
      const getMapper = curry((isImg, src) => {
        if (isImg) {
          return setAttr(srcType, src)
        }
        return setBackground(src)
      })
      const mapper = getMapper(isImg)
      mapper(src)
    }

    const lifeCycle = render => () => {
      this.beforeLoadHook.map(fn => fn())
      try {
        render()
      } catch (error) {
        if (this.errorHook.length) {
          this.errorHook.map(fn => fn())
        }
      }
      this.afterLoadHook.map(fn => fn())
      this._isLoad = true
    }

    const handler = () => {
      switch (this.delayType) {
        case 'debounce':
          return debounce(lifeCycle(this.render), this.delay || 100)
        case 'throttle':
          return throttle(lifeCycle(this.render), this.delay)
        default:
          return lifeCycle(this.render)
      }
    }
    this.handler = handler()
    this.observer = viewport(this.element)
    this.bind()
    console.log(this)
    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  animationLifeCycle(v) {
    const defaultDelay = 1000
    switch (v) {
      case 'start':
        addClass(this.classes.NAMESPACE, this.element)
        break
      case 'finish':
        window.setTimeout(() => {
          addClass(this.classes.LOADED, this.element)
          this.trigger(EVENTS.LOADED)
          this.destroy()
        }, this.animationDelay || defaultDelay)
        break
      default:
        return false
    }
    return false
  }

  bind() {
    this.observer.on('enter', this.handler)
    this.trigger(EVENTS.ENTER)
  }

  unbind() {
    this.observer.off('enter', this.handler)
  }

  setAnimationDelay(v) {
    this.animationDelay = v
  }

  setDelay(type) {
    if (type !== 'debounce' && type !== 'throttle') {
      return false
    }
    this.delayType = type
    return true
  }

  beforeLoad(fn) {
    this.beforeLoadHook.push(fn)
  }

  afterLoad(fn) {
    this.afterLoadHook.push(fn)
  }

  error(fn) {
    this.errorHook.push(fn)
  }

  load() {
    this.render()
  }

  isLoad() {
    return this._isLoad
  }

  enable() {
    if (this.is('disabled')) {
      this.bind()
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      this.unbind()
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

export default Lazyload
