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
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS
})
class SvgProgress extends Component {
  constructor(element, options = {}) {
    super(element)

    this.setupOptions(options)
    this.setupClasses()

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

    if (!isSupportedSvg()) {
      return
    }
    this.setupStates()
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
          return new SvgElement('circle', {
            r: cx - d,
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
            d: `M${d} ${d} L${w} ${d} L${h} ${w} L${d} ${w} Z`,
            style: 'stroke-linecap: round;stroke-linejoin: round;',
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
            d: `M${d} ${h} L${width / 2} ${d} L${w} ${h} Z`,
            style: 'stroke-linecap: round;stroke-linejoin: round;',
            ...attributes
          })
        }
      }
      case 'pentagon': {
        return (width, height) => {
          const x = (width - d) / 4
          const y = height === false ? (width - d) / 6 : (height - d) / 6
          return new SvgElement('path', {
            d: `M${d} ${(4 * y * 3) / 5} L${x * 2} ${d} L${4 * x} ${(4 *
              y *
              3) /
              5} L${(x * 4 * 4) / 5} ${6 * y} L${(x * 4) / 5} ${6 * y} Z`,
            style: 'stroke-linecap: round;stroke-linejoin: round;',
            ...attributes
          })
        }
      }
      case 'hexagon': {
        return (width, height) => {
          const x = (width - d) / 4
          const y = height === false ? (width + x - d) / 4 : (height - d) / 4
          return new SvgElement('path', {
            d: `M${d} ${y * 3} L${d} ${y} L${2 * x} ${d} L${4 * x} ${y} L${4 *
              x} ${3 * y} L${2 * x} ${4 * y} Z`,
            style: 'stroke-linecap: round;stroke-linejoin: round;',
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
      'stroke-width': this.options.barsize,
      stroke: this.options.barcolor,
      'stroke-linejoin': 'round',
      'stroke-linecap': 'round'
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

    // ThisString holds the path details
    const d = `M${x1},${y1} A${r},${r} 0 ${big} 1 ${x2},${y2}`

    this.bar.setAttribute('d', d)
  }

  updateBar() {
    const percenage = this.getPercentage(this.now)

    const length = this.bar.getTotalLength()

    const offset = length * (1 - percenage / this.getPercentage(this.barGoal))

    this.bar.style.strokeDasharray = `${length} ${length - 1}`
    // if (this.options.shape === 'circle') {
    //   this.bar.style.strokeDashoffset = offset
    // }
    if (this.options.shape === 'triangle') {
      this.bar.style.strokeLinecap = 'round'
    }
    this.bar.style.strokeDashoffset = isNaN(offset) ? length : offset
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
        const drawBar = this.drawBar(this.options.shape)
        drawBar(goal)
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
      this.svg.remove()
      this.tween.clear()
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default SvgProgress
