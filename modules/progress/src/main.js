import Component from '@pluginjs/component'
import templateEngine from '@pluginjs/template'
import easing from '@pluginjs/easing'
import { isPercentage } from '@pluginjs/is'
import { getTime } from '@pluginjs/utils'
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
    super(NAMESPACE, element)

    this.initOptions(DEFAULTS, options)
    this.initClasses(CLASSES)

    if (this.options.bootstrap) {
      this.target = query(`.${this.classes.BAR}`, this.element)
    } else {
      this.target = this.element

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

    this.easing = easing.get(this.options.easing) || easing.get('ease')

    this.min = this.target.getAttribute('aria-valuemin')
    this.max = this.target.getAttribute('aria-valuemax')
    this.min = this.min ? parseInt(this.min, 10) : this.options.min
    this.max = this.max ? parseInt(this.max, 10) : this.options.max
    this.first = this.target.getAttribute('aria-valuenow')
    this.first = this.first ? parseInt(this.first, 10) : this.min

    this.now = this.first
    this.goal = this.options.goal
    this._frameId = null

    this.initStates()
    this.initialize()
  }

  initialize() {
    this.bar = query(`.${this.classes.BAR}`, this.element)
    this.value = query(`.${this.classes.VALUE}`, this.element)

    if (this.options.label) {
      this.label = parseHTML(
        templateEngine.compile(this.options.templates.label())({
          classes: this.classes,
          content: this.options.label
        })
      )

      append(this.label, this.bar)
    }

    this.reset()

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  getPercentage(n) {
    return Math.round((100 * (n - this.min)) / (this.max - this.min))
  }

  go(goal) {
    if (!this.is('disabled')) {
      const that = this
      this.clear()

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

      const start = this.now
      const startTime = getTime()
      const animation = time => {
        const distance = (time - startTime) / this.options.speed
        let next = Math.round(
          this.easing(distance / 100) * (this.max - this.min)
        )

        if (goal > start) {
          next = start + next
          if (next > goal) {
            next = goal
          }
        } else {
          next = start - next
          if (next < goal) {
            next = goal
          }
        }

        that.update(next)
        if (next === goal) {
          window.cancelAnimationFrame(that._frameId)
          that._frameId = null

          if (that.now === that.goal) {
            that.trigger('finish')
          }
        } else {
          that._frameId = window.requestAnimationFrame(animation)
        }
      }

      that._frameId = window.requestAnimationFrame(animation)
    }
  }

  update(n) {
    this.now = n
    const percenage = this.getPercentage(this.now)
    const style = this.cssProp
    this.bar.style[style] = `${percenage}%`
    this.target.setAttribute('aria-valuenow', this.now)
    if (this.value && typeof this.options.valueCallback === 'function') {
      this.value.innerHTML = this.options.valueCallback.call(this, [this.now])
    }

    this.trigger(EVENTS.UPDATE, n)
  }

  clear() {
    if (this._frameId) {
      window.cancelAnimationFrame(this._frameId)
      this._frameId = null
    }
  }

  get() {
    return this.now
  }

  start() {
    if (!this.is('disabled')) {
      this.clear()
      this.trigger(EVENTS.START)
      this.go(this.goal)
    }
  }

  reset() {
    if (!this.is('disabled')) {
      this.clear()
      this.update(this.first)
      this.trigger(EVENTS.RESET)
    }
  }

  stop() {
    this.clear()
    this.trigger(EVENTS.STOP)
  }

  finish() {
    if (!this.is('disabled')) {
      this.clear()
      this.update(this.goal)
      this.trigger(EVENTS.FINISH)
    }
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
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default Progress
