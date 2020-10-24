import Component from '@pluginjs/component'
import { intersectionObserverPolyfill } from '@pluginjs/polyfills'
import { eventable, register, optionable } from '@pluginjs/decorator'
import { isNumber, isString } from '@pluginjs/is'
import { query } from '@pluginjs/dom'
import {
  defaults as DEFAULTS,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'

intersectionObserverPolyfill()

@eventable(EVENTS)
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS
})
class Viewport extends Component {
  constructor(element, options = {}) {
    super(element)

    this.setupOptions(options)

    this.observer = new IntersectionObserver(
      event => {
        this.entry = event[0]
        this.trigger(EVENTS.CHANGE)
        if (event[0].isIntersecting) {
          this.isIntersecting = true
          return this.trigger(EVENTS.ENTER)
        }
        this.isIntersecting = false
        return this.trigger(EVENTS.LEAVE)
      },
      {
        root: query(this.options.container),
        rootMargin: this.getOffset(this.options.offset),
        threshold: this.options.threshold
      }
    )
    this.observer.observe(this.element)
  }

  isIntersecting = false

  getOffset(offset) {
    if (isNumber(offset)) {
      return `${offset}px`
    }

    if (isString(offset) && offset.indexOf('px') !== -1) {
      return offset
    }

    return '0px'
  }

  isVisible() {
    return this.isIntersecting
  }

  destroy() {
    this.observer.disconnect()
    this.isIntersecting = false

    super.destroy()
  }
}

export default Viewport
