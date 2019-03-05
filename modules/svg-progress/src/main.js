import Component from '@pluginjs/component'
import { svg as isSupportedSvg } from '@pluginjs/feature'
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

import Circle from './shapes/circle'
import Hexagon from './shapes/hexagon'
import Pentagon from './shapes/pentagon'
import Rectangle from './shapes/rectangle'
import Semicircle from './shapes/semicircle'
import Triangle from './shapes/triangle'

const shapes = {}

@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS
})
class SvgProgress extends Component {
  constructor(element, options = {}) {
    super(element)

    this.setupOptions(options)
    this.setupClasses()
    this.setupStates()

    if (
      !isSupportedSvg() ||
      !Object.prototype.hasOwnProperty.call(shapes, this.options.shape)
    ) {
      return
    }

    this.min = this.element.getAttribute('aria-valuemin')
    this.max = this.element.getAttribute('aria-valuemax')
    this.min = this.min ? parseInt(this.min, 10) : this.options.min
    this.max = this.max ? parseInt(this.max, 10) : this.options.max
    this.first = this.element.getAttribute('aria-valuenow')
    if (this.first) {
      this.first = parseInt(this.first, 10)
    } else {
      this.first = this.options.first ? this.options.first : this.min
    }

    this.now = this.first
    this.goal = this.options.goal

    const size = String(this.options.size).split(' ')

    this.width = size.length > 1 ? size[0] : this.options.size
    this.height = size.length > 1 ? size[1] : this.options.size

    this.initialize()
  }

  initialize() {
    addClass(this.classes.ELEMENT, this.element)
    addClass(
      this.getClass(this.classes.SHAPE, 'shape', this.options.shape),
      this.element
    )

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.element)
    }
    this.number = query(`.${this.classes.NUMBER}`, this.element)
    this.content = query(`.${this.classes.CONTENT}`, this.element)

    this.prepare()

    this.tween = Tween.of({
      from: this.first,
      to: this.goal,
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

  prepare() {
    this.SHAPE = new shapes[this.options.shape]({
      trackcolor: this.options.trackcolor,
      fillcolor: this.options.fillcolor,
      barsize: this.options.barsize,
      barcolor: this.options.barcolor,
      size: this.options.size
    })
    this.$svg = parseHTML(`<div class="${this.classes.SVG}"></div>`)
    append(this.SHAPE.$svg, this.$svg)
    append(this.$svg, this.element)

    this.drawBar(this.max)
    this.updateBar()
  }

  drawBar(n) {
    this.barGoal = n

    this.SHAPE.drawBar(this.getPercentage(n))
  }

  updateBar() {
    this.SHAPE.updateBar(
      this.getPercentage(this.now),
      this.getPercentage(this.barGoal)
    )
  }

  getDuration() {
    return (
      (Math.abs(this.first - this.goal) * 100 * this.options.speed) /
      (this.max - this.min)
    )
  }

  // Return the percentage based on the current step
  getPercentage(n) {
    return (100 * (n - this.min)) / (this.max - this.min)
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

      if (this.barGoal < goal) {
        this.drawBar(goal)
      }

      this.tween.to(goal)
      this.tween.duration(this.getDuration())
    }

    this.tween.start()
  }

  update(n) {
    if (n !== this.now) {
      this.now = n

      this.updateBar()

      this.element.setAttribute('aria-valuenow', this.now)
      if (this.number && typeof this.options.numberCallback === 'function') {
        this.number.innerHTML = this.options.numberCallback.call(this, [
          this.now
        ])
      }
      if (this.content && typeof this.options.contentCallback === 'function') {
        this.content.innerHTML = this.options.contentCallback.call(this, [
          this.now
        ])
      }

      this.trigger(EVENTS.UPDATE, n)
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
      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.element)
      }
      this.$svg.remove()
      this.tween.clear()
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }

  static register(name, shape) {
    shapes[name] = shape
  }
}
SvgProgress.register('circle', Circle)
SvgProgress.register('hexagon', Hexagon)
SvgProgress.register('pentagon', Pentagon)
SvgProgress.register('rectangle', Rectangle)
SvgProgress.register('semicircle', Semicircle)
SvgProgress.register('triangle', Triangle)

export default SvgProgress
