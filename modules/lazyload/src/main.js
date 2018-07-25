import Component from '@pluginjs/component'
import { eventable, register, stateable, optionable } from '@pluginjs/decorator'
import {
  defaults as DEFAULTS,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'
import animate from './animate'
import { curry, debounce, throttle } from '@pluginjs/utils'
import viewport from '@pluginjs/viewport'

@eventable(EVENTS)
@stateable()
@optionable(true)
@register(NAMESPACE, {
  defaults: DEFAULTS,
  methods: METHODS
})
class Lazyload extends Component {
  beforeLoadHook = [() => this.animationLifeCycle('start')]

  afterLoadHook = [() => this.animationLifeCycle('finish')]

  errorHook = []

  delayType = 'throttle'

  animation = 'fade'

  _animationDelay = false

  _isLoad = false

  _delay = 0

  constructor(element, options = {}) {
    super(NAMESPACE, element)
    this.initOptions(DEFAULTS, options)
    this.isHorizontal = Boolean(this.options.horizontal)
    this.initStates()
    this.initialize()
  }

  initialize() {
    const config = ['src', 'retina', 'srcset', 'delay', 'animation']

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
      const getMapper = curry(
        (isImg, src) => (isImg ? setAttr(srcType, src) : setBackground(src))
      )
      const mapper = getMapper(isImg)
      mapper(src)
    }

    const { render, delay, delayType } = this

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
      switch (delayType) {
        case 'debounce':
          return debounce(lifeCycle(render), delay || 100)
        case 'throttle':
          return throttle(lifeCycle(render), delay)
        default:
          return lifeCycle(render)
      }
    }
    this.handler = handler()
    this.observer = viewport(this.element)
    this.bind()
    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  get animation() {
    return this._animation
  }

  set animation(v) {
    if (typeof v === 'object') {
      this._animation = v
      this._animation.name = 'custom'
    } else if (!v) {
      this._animation = false
    } else {
      this._animation = animate[v]
      this._animation.name = v
    }
  }

  get animationDelay() {
    return this._animationDelay
  }

  set animationDelay(v) {
    this._animationDelay = parseInt(v, 10)
  }

  get delay() {
    return this._delay
  }

  set delay(v) {
    this._delay = parseInt(v, 10)
  }

  mapStyleObjectToNode(obj, node) {
    const style = Object.entries(obj).reduce(
      (state, [key, value]) => `${state}${key}:${value};`,
      node.getAttribute('style') || ''
    )
    node.setAttribute('style', style)
  }

  animationLifeCycle(v) {
    if (!this.animation) {
      return false
    }
    const defaultDelay = 1000
    switch (v) {
      case 'start':
        this.mapStyleObjectToNode(this.animation.start, this.element)
        break
      case 'finish':
        window.setTimeout(() => {
          this.mapStyleObjectToNode(this.animation.finish, this.element)
          this.destroy()
        }, this.animationDelay || defaultDelay)
        break
      default:
        return false
    }
    return false
  }

  bind() {
    this.observer.on('enter', this.handler, this)
  }

  unbind() {
    this.observer.off('enter', this.handler)
  }

  setAnimation(v) {
    this.animation = v
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
