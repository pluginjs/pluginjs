import '@pluginjs/polyfills/IntersectionObserver'

class Viewport {
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

  isIntersecting = false

  enterMiddleware = []

  exitMiddleware = []

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
