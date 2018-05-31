import Component from '@pluginjs/component'
import { deepMerge } from '@pluginjs/utils'
import { register, stateable, styleable } from '@pluginjs/pluginjs'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  info as INFO,
  methods as METHODS,
  namespace as NAMESPACE,
  dormatDirectiveKeys as DORMATEDIRECTIVEKEYS
} from './constant'
import { query, append, parseHTML, children } from '@pluginjs/dom'
import SvgElement from './svgElement'

@styleable(CLASSES)
@stateable()
@register(
  NAMESPACE,
  {
    defaults: DEFAULTS,
    methods: METHODS
  },
  INFO
)
class Countdown extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)

    this.svgprogress = true
    this.options = deepMerge(DEFAULTS, options, this.getDataOptions())
    this.initClasses(CLASSES)

    this.type = this.options.type
    this.due = this.options.due
    this.format = this.options.format
    this.label = this.options.label ? this.options.label : null
    this.labelsite = this.options.labelsite
    this.now = this.now ? this.options.now : new Date()
    this.endTime = new Date(this.due).getTime()
    this.size = this.options.size
    this.barsize = this.options.barsize
    this.trackcolor = this.options.trackcolor
    this.barcolor = this.options.barcolor
    this.width = this.size
    this.height = this.size
    this.linecap = this.options.linecap
    this.allCounter = this.format.split(/,|，|\s+/)
    this.initStates()
    this.initialize()
  }

  initialize() {
    this.prepare()
    if (this.type === 'default') {
      this.modalDefault()
    }

    if (this.type === 'progress') {
      this.modalDefault()
      this.modalProgress()
    }

    if (this.type === 'flip') {
      this.modalFilp()
      this.flipAnimate()
    }
  }

  prepare() {
    // 倒计时
    setInterval(() => {
      const leftTime = this.leftTime(this.endTime)
      this.days = this.dayTime(leftTime)
      this.hours = this.hourTime(leftTime)
      this.minutes = this.minuteTime(leftTime)
      this.seconds = this.secondTime(leftTime)
      this.setValues(`.${this.classes.DAY}`, this.days)
      this.setValues(`.${this.classes.HOUR}`, this.hours)
      this.setValues(`.${this.classes.MINUTES}`, this.minutes)
      this.setValues(`.${this.classes.SECONDS}`, this.seconds)
      // flip的节点和值
      this.setValues(`.${this.classes.SECONDS}-before-up`, this.seconds)
      this.setValues(`.${this.classes.SECONDS}-before-down`, this.seconds)
      this.setValues(`.${this.classes.SECONDS}-active-up`, this.seconds)
      this.setValues(`.${this.classes.SECONDS}-active-down`, this.seconds)
      this.setValues(`.${this.classes.MINUTES}-before-up`, this.minutes)
      this.setValues(`.${this.classes.MINUTES}-before-down`, this.minutes)
      this.setValues(`.${this.classes.MINUTES}-active-up`, this.minutes)
      this.setValues(`.${this.classes.MINUTES}-active-down`, this.minutes)
      this.setValues(`.${this.classes.HOUR}-before-up`, this.hours)
      this.setValues(`.${this.classes.HOUR}-before-down`, this.hours)
      this.setValues(`.${this.classes.HOUR}-active-up`, this.hours)
      this.setValues(`.${this.classes.HOUR}-active-down`, this.hours)
      this.setValues(`.${this.classes.DAY}-before-up`, this.days)
      this.setValues(`.${this.classes.DAY}-before-down`, this.days)
      this.setValues(`.${this.classes.DAY}-active-up`, this.days)
      this.setValues(`.${this.classes.DAY}-active-down`, this.days)
      // 天指示进度
      this.setProgress('.dCircle', this.days, 30)
      // 小时指示进度
      this.setProgress('.hCircle', this.hours, 24)
      // 分指示进度
      this.setProgress('.mCircle', this.minutes, 60)
      // 秒指示进度
      this.setProgress('.sCircle', this.seconds, 60)
    }, 1000)
  }

  leftTime(endTime) {
    const nowTime = new Date().getTime()
    if (endTime >= nowTime) {
      return endTime - nowTime
    }
    return 0
  }

  dayTime(leftTime) {
    const dayTime = Math.floor(leftTime / 1000 / 60 / 60 / 24)
    return dayTime
  }

  hourTime(leftTime) {
    const hourTime = Math.floor(leftTime / 1000 / 60 / 60) % 24
    return hourTime
  }

  minuteTime(leftTime) {
    const minuteTime = Math.floor(leftTime / 1000 / 60) % 60
    return minuteTime
  }

  secondTime(leftTime) {
    const secondTime = Math.floor(leftTime / 1000) % 60
    return secondTime
  }

  checkout = i => {
    if (i < 10) {
      i = `0${i}`
    }
    return i
  }

  setValues(className, time) {
    let value
    const dom = query(className, this.element)
    if (dom) {
      dom.innerHTML = this.checkout(time)
      value = dom.innerHTML
    }
    return value
  }

  modalDefault() {
    let countdown = null
    if (this.labelsite === 'above') {
      countdown = this.allCounter.map((i, index) => {
        return `<div class="countdown-inner">
           <span class="countdown-label">${
             this.label !== null
               ? this.label.split(/,|，|\s+/)[index]
               : DORMATEDIRECTIVEKEYS[i]
           }</span>
            <span class="countdown-number countdown-${
              DORMATEDIRECTIVEKEYS[i]
            }">00</span>
         </div>`
      })
    } else {
      countdown = this.allCounter.map((i, index) => {
        return `<div class="countdown-inner">
            <span class="countdown-number countdown-${
              DORMATEDIRECTIVEKEYS[i]
            }">00</span>
            <span class="countdown-label">${
              this.label !== null
                ? this.label.split(/,|，|\s+/)[index]
                : DORMATEDIRECTIVEKEYS[i]
            }</span>
         </div>`
      })
    }
    countdown = countdown.join('')
    append(`${countdown}`, this.element)
  }

  // progress结构
  modalProgress() {
    this.element.classList.add('countdown-progress')
    children(this.element).forEach((item, index) => {
      const height = this.size
      const width = this.size
      const PATH = new SvgElement('circle', {
        fill: 'none',
        'stroke-width': this.barsize, // this.options.barsize,
        stroke: this.barcolor,
        r: `${this.size / 2 - 10}%`,
        cx: `${this.size / 2}%`,
        cy: `${this.size / 2}%`
      })
      this.svg = parseHTML('<span class="countdown-ring-progress"></span>')
      this.Svg = new SvgElement('svg', {
        version: '1.1',
        preserveAspectRatio: 'xMinYMin meet',
        viewBox: `0 0 ${this.width} ${this.height}`,
        class: `${this.allCounter[index]}Svg`
      })
      this.trackSvg = this.getSvgElement(height, width, this.trackcolor, index)
      this.Svg.appendChild(PATH)
      append(append(this.trackSvg, this.Svg), this.svg)
      append(this.svg, item)
    })
  }
  // progress
  getSvgElement(height, width, color, index) {
    const attributes = {
      stroke: color,
      fill: 'none',
      'stroke-width': this.barsize,
      'stroke-linecap': this.linecap,
      class: `${this.allCounter[index]}Circle`
    }
    const cx = width / 2
    const cy = height / 2
    return new SvgElement('circle', {
      r: `${cx - 10}%`,
      cx: `${cx}%`,
      cy: `${cy}%`,
      ...attributes
    })
  }

  // 进度条变化
  changeProgress(timeValue, circle, range) {
    const percent = Math.abs(`${timeValue / range}`)
    if (timeValue <= range) {
      circle.setAttribute(
        'stroke-dashoffset',
        `${Math.abs(255 - percent * 255)}%`
      )
    } else {
      // 超过比例  天:30 时:24 分:60 秒:60
      circle.setAttribute('stroke-dashoffset', '0%')
    }
  }

  // 获取进度条值
  setProgress(className, time, percent) {
    const dom = query(className, this.element)
    if (dom !== null) {
      this.changeProgress(time, dom, percent)
    }
  }

  // flip结构
  modalFilp() {
    let countdown = null
    countdown = this.allCounter.map((i, index) => {
      return `<div class="countdown-inner">
      <span class="countdown-label">${
        this.label !== null
          ? this.label.split(/,|，|\s+/)[index]
          : DORMATEDIRECTIVEKEYS[i]
      }</span>
      <span class="countdown-card countdown-card-${DORMATEDIRECTIVEKEYS[i]}">
        <span class="countdown-before">
          <a href="#">
          <span class="up">
            <span class="shadow"></span>
            <span class="countdown-number countdown-${
              DORMATEDIRECTIVEKEYS[i]
            }-before-up">00</span>
          </span>
          <span class="down">
            <span class="shadow"></span>
            <span class="countdown-number countdown-${
              DORMATEDIRECTIVEKEYS[i]
            }-before-down">00</span>
          </span>
          </a>
        </span>
        <span class="countdown-active">
        <a href="#">
        <span class="up">
          <span class="shadow"></span>
          <span class="countdown-number countdown-${
            DORMATEDIRECTIVEKEYS[i]
          }-active-up">00</span>
        </span>
        <span class="down">
          <span class="shadow"></span>
          <span class="countdown-number countdown-${
            DORMATEDIRECTIVEKEYS[i]
          }-active-down">00</span>
        </span>
        </a>
      </span>
      </span>
    </div>`
    })
    countdown = countdown.join('')
    append(`${countdown}`, this.element)
  }

  // 控制翻页效果
  flipAnimate() {
    const secondHand = query('.countdown-card-seconds', this.element)
    const minutesHand = query('.countdown-card-minutes', this.element)
    const hoursHand = query('.countdown-card-hours', this.element)
    const daysHand = query('.countdown-card-days', this.element)
    const controlFlip = (time, value, hand) => {
      if (time === value) {
        hand.classList.add('play')
        setTimeout(() => {
          hand.classList.remove('play')
        }, 500)
      }
    }
    const animateChange = () => {
      controlFlip(this.seconds, 59, minutesHand)
      controlFlip(this.minutes, 59, hoursHand)
      controlFlip(this.hours, 23, daysHand)
    }
    const changeStyle = () => {
      setInterval(changeClass, 500)
    }
    const changeClass = () => {
      secondHand.classList.contains('play')
        ? secondHand.classList.remove('play')
        : secondHand.classList.add('play')
      animateChange()
    }
    changeStyle()
  }
}
