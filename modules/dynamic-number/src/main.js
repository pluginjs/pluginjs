import Component from '@pluginjs/component'
import { getTime, deepMerge } from '@pluginjs/utils'
import { eventable, register, stateable } from '@pluginjs/pluginjs'
import {
  defaults as DEFAULTS,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'
import formaters from './formaters'

@eventable(EVENTS)
@stateable()
@register(
  NAMESPACE,
  {
    defaults: DEFAULTS,
    methods: METHODS
  }
)
class DynamicNumber extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)

    this.options = deepMerge(DEFAULTS, options, this.getDataOptions())
    this.options.step = parseFloat(this.options.step, 10)

    this.first = this.element.getAttribute('aria-valuenow')
    this.first = this.first ? this.first : this.options.from
    this.first = parseFloat(this.first, 10)

    this.now = this.first
    this.to = parseFloat(this.options.to, 10)

    this.privateRequestId = null
    this.initStates()
    this.initialize()
  }

  initialize() {
    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  go(to) {
    this.clear()

    if (typeof to === 'undefined') {
      to = this.to
    } else {
      to = parseFloat(to, 10)
    }

    const start = this.now
    const startTime = getTime()

    const animation = time => {
      const distance = (time - startTime) / this.options.duration
      let next = Math.abs(distance * (start - to))

      if (to > start) {
        next = start + next
        if (next > to) {
          next = to
        }
      } else {
        next = start - next
        if (next < to) {
          next = to
        }
      }

      this.update(next)

      if (next === to) {
        window.cancelAnimationFrame(this.privateRequestId)
        this.privateRequestId = null
        if (this.now === this.to) {
          this.trigger(EVENTS.FINISH)
        }
      } else {
        this.privateRequestId = window.requestAnimationFrame(animation)
      }
    }

    this.privateRequestId = window.requestAnimationFrame(animation)
  }

  update(n) {
    this.now = n

    this.element.setAttribute('aria-valuenow', this.now)
    let formated = n

    if (!isNaN(n)) {
      if (typeof this.options.format === 'function') {
        formated = this.options.format.apply(this, [n, this.options])
      } else if (typeof this.options.format === 'string') {
        if (typeof formaters[this.options.format] !== 'undefined') {
          formated = formaters[this.options.format].apply(this, [
            n,
            this.options[this.options.format]
          ])
        } else if (typeof window[this.options.format] === 'function') {
          formated = window[this.options.format].apply(this, [n, this.options])
        }
      }
    }

    this.element.innerHTML = formated
    this.trigger('update', n)
  }

  get() {
    return this.now
  }

  start() {
    if (!this.is('start')) {
      this.enter('start')
    }
    this.clear()
    this.trigger(EVENTS.START)
    this.go(this.to)
  }

  clear() {
    if (this.privateRequestId) {
      window.cancelAnimationFrame(this.privateRequestId)
      this.privateRequestId = null
    }
  }

  reset() {
    if (!this.is('reset')) {
      this.enter('reset')
    }
    this.clear()
    this.update(this.first)
    this.trigger(EVENTS.RESET)
  }

  stop() {
    if (this.is('start')) {
      this.leave('start')
    }
    this.clear()
    this.trigger(EVENTS.STOP)
  }

  finish() {
    if (this.is('start')) {
      this.leave('start')
    }
    this.clear()
    this.update(this.to)
    this.trigger(EVENTS.FINISH)
  }

  destroy() {
    if (this.is('initialized')) {
      this.leave('initialized')
    }
    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default DynamicNumber
