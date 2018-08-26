import Component from '@pluginjs/component'
import Tween from '@pluginjs/tween'
import { eventable, register, stateable, optionable } from '@pluginjs/decorator'
import {
  defaults as DEFAULTS,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'

@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS
})
class DynamicNumber extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)

    this.initOptions(DEFAULTS, options)
    this.from = this.element.getAttribute('aria-value')
    this.from = this.from ? this.from : parseFloat(this.options.from, 10)
    this.to = parseFloat(this.options.to, 10)
    this.value = null
    this.initStates()
    this.initialize()
  }

  initialize() {
    this.tween = Tween.of({
      from: this.from,
      to: this.to,
      easing: this.options.easing,
      delay: this.options.delay,
      loop: this.options.loop,
      duration: this.options.duration,
      autoplay: this.options.autoplay
    })
      .on('start', () => {
        this.trigger(EVENTS.START, this.get())
      })
      .on('stop', () => {
        this.trigger(EVENTS.STOP, this.get())
      })
      .on('complete', () => {
        this.trigger(EVENTS.COMPLETE, this.get())
      })
      .on('pause', () => {
        this.trigger(EVENTS.PAUSE, this.get())
      })
      .on('resume', () => {
        this.trigger(EVENTS.RESUME, this.get())
      })
      .on('update', value => {
        this.update(value)
      })
      .on('restart', () => {
        this.trigger(EVENTS.RESTART, this.get())
      })
      .on('reset', () => {
        this.trigger(EVENTS.RESET, this.get())
      })

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  update(value) {
    if (typeof this.options.format === 'function') {
      value = this.options.format.apply(this, [value, this.options])
    } else if (typeof window[this.options.format] === 'function') {
      value = window[this.options.format].apply(this, [value, this.options])
    }

    if (this.value === value) {
      return
    }
    this.value = value
    this.element.setAttribute('aria-value', value)
    this.element.innerHTML = value
    this.trigger(EVENTS.UPDATE, value)
  }

  get() {
    return this.value
  }

  go(to) {
    if (typeof to !== 'undefined') {
      this.tween.to(parseFloat(to, 10))
    }

    this.tween.start()
  }

  start() {
    this.go()
  }

  stop() {
    this.tween.stop()
  }

  pause() {
    this.tween.pause()
  }

  resume() {
    this.tween.resume()
  }

  restart() {
    this.tween.restart()
  }

  reset() {
    this.tween.reset()
  }

  finish() {
    this.tween.finish()
  }

  destroy() {
    if (this.is('initialized')) {
      this.leave('initialized')
      this.tween.clear()
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default DynamicNumber
