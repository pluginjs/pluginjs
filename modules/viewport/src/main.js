import Component from '@pluginjs/component'
import '@pluginjs/polyfills/IntersectionObserver'
import { eventable, register, optionable } from '@pluginjs/decorator'
import { isNumber, isString } from '@pluginjs/is'
import {
  defaults as DEFAULTS,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'

@eventable(EVENTS)
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS
})
class Viewport extends Component {
  constructor(element, options = {}) {
    super(element)
    this.initOptions(DEFAULTS, options)
    this.observer = new IntersectionObserver(
      event => {
        if (event[0].isIntersecting) {
          this.isIntersecting = true
          return this.trigger(EVENTS.ENTER)
        }
        this.isIntersecting = false
        return this.trigger(EVENTS.LEAVE)
      },
      {
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
