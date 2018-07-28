import { curry } from '@pluginjs/utils'

class Viewport {
  isIntersecting = false

  enterMiddleware = []
  exitMiddleware = []

  instance = null

  constructor(el, options) {
    this.element = el
    this.options = options
    this.observer = new IntersectionObserver(event => {
      if (event[0].isIntersecting) {
        this.isIntersecting = true
        return this.enterMiddleware.map(fn => fn())
      }
      this.isIntersecting = false
      return this.exitMiddleware.map(fn => fn())
    })
    this.observer.observe(this.element)
  }

  static of(...args) {
    return new Viewport(...args)
  }

  on(eventName, func, instance) {
    this.instance = instance
    const adder = curry((func, middleware) => middleware.concat(func))
    this.eventMapper(eventName, adder(func.bind(this.instance)))
  }

  off(eventName, func) {
    const filter = curry((func, middleware) =>
      middleware.filter(fn => fn === func)
    )
    this.eventMapper(eventName, filter(func.bind(this.instance)))
  }

  eventMapper(eventName, func) {
    if (eventName === 'enter') {
      this.enterMiddleware = func(this.enterMiddleware)
    }

    if (eventName === 'exit') {
      this.exitMiddleware = func(this.exitMiddleware)
    }
  }

  isVisible() {
    return this.isIntersecting
  }
}

const viewport = (...args) => Viewport.of(...args)

export default viewport
