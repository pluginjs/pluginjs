import Component from '@pluginjs/component'
import template from '@pluginjs/template'
import Tween from '@pluginjs/tween'
import { isPercentage } from '@pluginjs/is'
import { addClass, removeClass } from '@pluginjs/classes'
import { append, parseHTML, query } from '@pluginjs/dom'
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

@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS
})
class Progress extends Component {
  constructor(element, options = {}) {
    super(element)

    this.setupOptions(options)
    this.setupClasses()

    if (this.options.bootstrap) {
      this.$target = query(`.${this.classes.BAR}`, this.element)
    } else {
      this.$target = this.element

      addClass(this.classes.ELEMENT, this.element)
    }

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.element)
    }
    if (this.options.direction === 'horizontal') {
      this.cssProp = 'width'
    } else {
      this.cssProp = 'height'
      addClass(this.classes.VERTICAL, this.element)
    }

    this.min = this.$target.getAttribute('aria-valuemin')
    this.max = this.$target.getAttribute('aria-valuemax')
    this.min = this.min ? parseInt(this.min, 10) : this.options.min
    this.max = this.max ? parseInt(this.max, 10) : this.options.max
    this.first = this.$target.getAttribute('aria-valuenow')
    this.first = this.first ? parseInt(this.first, 10) : this.min

    this.now = this.first
    this.goal = this.options.goal
    this.$bar = query(`.${this.classes.BAR}`, this.element)

    this.setupStates()
    this.initialize()
  }

  initialize() {
    this.$label = query(`.${this.classes.LABEL}`, this.element)

    if (!this.$label && this.options.label) {
      this.$label = parseHTML(
        template.compile(this.options.templates.label())({
          classes: this.classes,
          content: this.options.label
        })
      )

      append(this.$label, this.$bar)
    }

    this.tween = Tween.of({
      from: this.first,
      to: this.goal,
      easing: this.options.easing,
      delay: this.options.delay,
      duration: this.getDuration(),
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

  getDuration() {
    return (
      (Math.abs(this.first - this.goal) * 100 * this.options.speed) /
      (this.max - this.min)
    )
  }

  getPercentage(n) {
    return Math.round((100 * (n - this.min)) / (this.max - this.min))
  }

  go(goal) {
    if (!this.is('disabled')) {
      if (isPercentage(goal)) {
        goal = parseInt(goal.replace('%', ''), 10)
        goal = Math.round(this.min + (goal / 100) * (this.max - this.min))
      }
      if (typeof goal === 'undefined') {
        goal = this.goal
      }

      if (goal > this.max) {
        goal = this.max
      } else if (goal < this.min) {
        goal = this.min
      }

      this.tween.to(goal)
      this.tween.duration(this.getDuration())
    }

    this.tween.start()
  }

  update(value) {
    if (value !== this.now) {
      this.now = value
      this.$bar.style[this.cssProp] = `${this.getPercentage(this.now)}%`
      this.$target.setAttribute('aria-valuenow', this.now)
      if (this.$label && typeof this.options.labelCallback === 'function') {
        this.$label.innerHTML = this.options.labelCallback.call(this, [
          this.now
        ])
      }

      this.trigger(EVENTS.UPDATE, value)
    }
  }

  get() {
    return this.now
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

  enable() {
    if (this.is('disabled')) {
      removeClass(this.classes.DISABLED, this.element)
      this.leave('disabled')
    }

    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      addClass(this.classes.DISABLED, this.element)
      this.enter('disabled')
    }

    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.update(this.first)
      removeClass(this.classes.ELEMENT, this.element)
      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.element)
      }
      this.tween.clear()
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default Progress
