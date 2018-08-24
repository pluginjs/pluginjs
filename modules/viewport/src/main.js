import Component from '@pluginjs/component'
import '@pluginjs/polyfills/IntersectionObserver'
import { register, optionable } from '@pluginjs/decorator'
import { isNumber } from '@pluginjs/is'
import {
  defaults as DEFAULTS,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'

@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS
})
class Viewport extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)
    this.initOptions(DEFAULTS, options)
    this.checkRootMargin()

    this.observer = new IntersectionObserver(event => {
      if (event[0].isIntersecting) {
        this.isIntersecting = true
        return this.enterMiddleware.map(fn => fn())
      }
      this.isIntersecting = false
      return this.exitMiddleware.map(fn => fn())
    }, this.options)
    this.observer.observe(this.element)
  }

  isIntersecting = false

  enterMiddleware = []

  exitMiddleware = []

  checkRootMargin() {
    if (isNumber(this.options.rootMargin)) {
      this.options.rootMargin = `${this.options.rootMargin}px`
    }
  }

  on(eventName, func) {
    const adder = middleware => middleware.concat(func)
    this.eventMapper(eventName, adder)
  }

  off(eventName, func) {
    const filter = middleware => middleware.filter(fn => fn !== func)
    this.eventMapper(eventName, filter)
  }

  eventMapper(eventName, updater) {
    if (eventName === 'enter') {
      this.enterMiddleware = updater(this.enterMiddleware)
    }

    if (eventName === 'exit') {
      this.exitMiddleware = updater(this.exitMiddleware)
    }
  }

  isVisible() {
    return this.isIntersecting
  }

  destroy() {
    this.observer.disconnect()
    this.enterMiddleware = []
    this.isIntersecting = false
    this.enterMiddleware = []
    this.exitMiddleware = []
  }

  static of(...args) {
    return new Viewport(...args)
  }
}

const viewport = (...args) => Viewport.of(...args)

export default viewport
