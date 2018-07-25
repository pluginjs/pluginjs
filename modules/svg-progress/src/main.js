import Component from '@pluginjs/component'
import { isSupportedSvg } from '@pluginjs/feature'
import easing from '@pluginjs/easing'
import is from '@pluginjs/is'
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
import SvgElement from './svgElement'
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
@optionable(true)
@register(NAMESPACE, {
  defaults: DEFAULTS,
  methods: METHODS
})
class SvgProgress extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)

    this.initOptions(DEFAULTS, options)
    this.initClasses(CLASSES)

    this.easing = easing.get(this.options.easing) || easing.get('ease')
    addClass(this.classes.ELEMENT, this.element)

    this.min = this.element.getAttribute('aria-valuemin')
    this.max = this.element.getAttribute('aria-valuemax')
    this.min = this.min ? parseInt(this.min, 10) : this.options.min
    this.max = this.max ? parseInt(this.max, 10) : this.options.max
    this.first = this.element.getAttribute('aria-valuenow')
    const optionsFirst = this.options.first ? this.options.first : this.min
    this.first = this.first ? parseInt(this.first, 10) : optionsFirst
    this.now = this.first
    this.goal = this.options.goal

    this._frameId = null

    if (!isSupportedSvg()) {
      return
    }
    this.initStates()
    this.initialize()
  }

  initialize() {
    if (this.options.theme) {
      addClass(this.getThemeClass(), this.element)
    }
    this.number = query(`.${this.classes.NUMBER}`, this.element)
    this.content = query(`.${this.classes.CONTENT}`, this.element)

    this.size = this.options.size
    this.width = this.size
    this.height = this.size

    this.prepare()

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  prepare() {
    this.SVG = new SvgElement('svg', {
      version: '1.1',
      preserveAspectRatio: 'xMinYMin meet',
      viewBox: `0 0 ${this.width} ${this.height}`
    })

    this.buildTrack()
    this.buildBar()

    this.svg = parseHTML(`<div class="${this.classes.SVG}"></div>`)
    append(this.SVG, this.svg)
    append(this.svg, this.element)
  }

  buildTrack() {
    const height = this.size
    const width = this.size

    const barsize = this.options.barsize

    const getSvgElement = this.shapeMatch(this.options.shape)

    this.trackSvg = getSvgElement(height, width, barsize)

    this.SVG.appendChild(this.trackSvg)
  }

  shapeMatch(shape) {
    const attributes = {
      stroke: this.options.trackcolor,
      fill: this.options.fillcolor,
      'stroke-width': this.options.barsize
    }
    const d = this.options.barsize / 2
    switch (shape) {
      case 'circle': {
        return (width, height) => {
          const cx = width / 2
          const cy = height / 2
          return new SvgElement('ellipse', {
            rx: cx - d,
            ry: cy - d,
            cx,
            cy,
            ...attributes
          })
        }
      }
      case 'rectangle': {
        return (width, height) => {
          const w = width - d
          const h = height - d
          return new SvgElement('path', {
            d: `M ${d},${d} L ${w},${d} L ${w},${h} L ${d},${h} L ${d},${d}`,
            ...attributes
          })
        }
      }
      case 'semicircle': {
        return (width, height) => {
          const w = width / 2
          const h = height / 2
          const c = h - d
          return new SvgElement('path', {
            d: `M ${w},${h} m ${-1 * c},0 a ${c},${c} 0 1 1 ${height -
              2 * d},0`,
            ...attributes
          })
        }
      }
      case 'triangle': {
        return (width, height) => {
          const w = width - d
          const h = height - d
          return new SvgElement('path', {
            d: `M ${d},${h} L ${width / 2},${d} L ${w},${h} L ${d},${h}`,
            style: 'stroke-linecap: round;',
            ...attributes
          })
        }
      }
      case 'pentagon': {
        return (width, height) => {
          const x = width / 4
          const y = height === false ? width / 4 : height / 4
          return new SvgElement('path', {
            d: `M0 ${y * 2} ${x * 2} 0L ${x * 2} 0 ${x * 4} ${y * 2}L ${x *
              3} ${y * 4} ${x} ${y * 4} Z`,
            ...attributes
          })
        }
      }
      case 'hexagon': {
        return (width, height) => {
          const x = width / 4
          const y = height === false ? width / 4 : height / 4
          return new SvgElement('path', {
            d: `M0 ${y * 3} 0 ${y}L 0 ${y} ${x * 2} 0L ${x * 4} ${y}L ${x *
              4} ${y * 3}L ${x * 4} ${y * 3} ${x * 2} ${y * 4} 0 ${y * 3} Z`,
            ...attributes
          })
        }
      }
      default: {
        return false
      }
    }
  }

  buildBar() {
    const PATH = new SvgElement('path', {
      fill: 'none',
      'stroke-width': 2, // this.options.barsize,
      stroke: this.options.barcolor
    })
    this.bar = PATH
    this.SVG.appendChild(PATH)

    const drawBar = this.drawBar(this.options.shape)
    drawBar(this.first)
    this.updateBar()
  }

  drawBar(shape) {
    if (shape === 'circle') {
      return n => this.drawCircle(n)
    }
    return n => {
      this.barGoal = n
      const d = this.trackSvg.getAttribute('d')
      return this.bar.setAttribute('d', d)
    }
  }

  drawCircle(n) {
    this.barGoal = n
    const height = this.size
    const width = this.size

    const cx = width / 2
    const cy = height / 2
    const startAngle = 0

    const barsize = this.options.barsize

    const r = Math.min(cx, cy) - barsize / 2
    this.r = r
    let percentage = this.getPercentage(n)

    if (percentage === 100) {
      percentage -= 0.0001
    }
    const endAngle = startAngle + (percentage * Math.PI * 2) / 100

    const x1 = cx + r * Math.sin(startAngle)
    const x2 = cx + r * Math.sin(endAngle)
    const y1 = cy - r * Math.cos(startAngle)
    const y2 = cy - r * Math.cos(endAngle)

    // This is a flag for angles larger than than a half circle
    // It is required by the SVG arc drawing component
    let big = 0
    if (endAngle - startAngle > Math.PI) {
      big = 1
    }

    // This string holds the path details
    const d = `M${x1},${y1} A${r},${r} 0 ${big} 1 ${x2},${y2}`

    this.bar.setAttribute('d', d)
  }

  updateBar() {
    const percenage = this.getPercentage(this.now)

    const length = this.bar.getTotalLength()

    const offset = length * (1 - percenage / this.getPercentage(this.barGoal))

    this.bar.style.strokeDasharray = `${length} ${length}`
    if (this.options.shape === 'circle') {
      this.bar.style.strokeDashoffset = offset
    }
    if (this.options.shape === 'triangle') {
      this.bar.style.strokeLinecap = 'round'
    }
    this.bar.style.strokeDashoffset = isNaN(offset) ? length : offset
  }

  // Return the percentage based on the current step
  getPercentage(n) {
    return (100 * (n - this.min)) / (this.max - this.min)
  }

  go(goal) {
    if (this.is('disabled')) {
      return
    }

    const that = this
    this.clear()

    if (is.percentage(goal)) {
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
      const drawBar = this.drawBar(this.options.shape)
      drawBar(goal)
    }
    const start = that.now
    const startTime = getTime()
    const endTime =
      startTime +
      (Math.abs(start - goal) * 100 * that.options.speed) /
        (that.max - that.min)

    const animation = time => {
      let next

      if (time > endTime) {
        next = goal
      } else {
        const distance = (time - startTime) / that.options.speed
        next = Math.round(that.easing(distance / 100) * (that.max - that.min))

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
      }

      that.update(next)

      if (next === goal) {
        window.cancelAnimationFrame(that._frameId)
        that._frameId = null

        if (that.now === that.goal) {
          that.trigger(EVENTS.FINISH)
        }
      } else {
        that._frameId = window.requestAnimationFrame(animation)
      }
    }
    that._frameId = window.requestAnimationFrame(animation)
  }

  update(n) {
    this.now = n

    this.updateBar()

    this.element.setAttribute('aria-valuenow', this.now)
    if (this.number && typeof this.options.numberCallback === 'function') {
      this.number.innerHTML = this.options.numberCallback.call(this, [this.now])
    }
    if (this.content && typeof this.options.contentCallback === 'function') {
      this.content.innerHTML = this.options.contentCallback.call(this, [
        this.now
      ])
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
    if (this.is('disabled')) {
      return
    }

    this.clear()
    this.trigger(EVENTS.START)
    this.go(this.goal)
  }

  reset() {
    if (this.is('disabled')) {
      return
    }

    this.clear()
    const drawBar = this.drawBar(this.options.shape)
    drawBar(this.first)
    this.update(this.first)
    this.trigger(EVENTS.RESET)
  }

  stop() {
    if (this.is('disabled')) {
      return
    }

    this.clear()
    this.trigger(EVENTS.STOP)
  }

  finish() {
    if (this.is('disabled')) {
      return
    }

    this.clear()
    this.update(this.goal)
    this.trigger(EVENTS.FINISH)
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
      this.svg.remove()
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default SvgProgress
