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
import { query, append } from '@pluginjs/dom'

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
    this.now = this.now ? this.options.now : new Date()
    this.initStates()
    this.initialize()
  }

  initialize() {
    let countdown = null
    setInterval(() => {
      const nowTime = new Date().getTime()
      const endTime = new Date(this.due).getTime()
      if (endTime >= nowTime) {
        const leftTime = endTime - nowTime
        const years =
          new Date(this.due).getFullYear() - new Date().getFullYear()
        const months = Math.abs(
          years * 12 + new Date(this.due).getMonth() - new Date().getMonth()
        )
        const weeks = Math.floor(leftTime / 1000 / 60 / 60 / 24 / 7)
        const days = Math.floor(leftTime / 1000 / 60 / 60 / 24)
        const hours = Math.floor(leftTime / 1000 / 60 / 60) % 24
        const minutes = Math.floor(leftTime / 1000 / 60) % 60
        const seconds = Math.floor(leftTime / 1000) % 60
        const checkout = i => {
          if (i < 10) {
            i = `0${i}`
          }
          return i
        }
        const yearDOM = query(`.${this.classes.YEAR}`, this.element)
        const monthDOM = query(`.${this.classes.MONTH}`, this.element)
        const weekDOM = query(`.${this.classes.WEEK}`, this.element)
        const dayDOM = query(`.${this.classes.DAY}`, this.element)
        const hourDOM = query(`.${this.classes.HOUR}`, this.element)
        const minuteDOM = query(`.${this.classes.MINUTES}`, this.element)
        const secondDOM = query(`.${this.classes.SECONDS}`, this.element)
        if (yearDOM) {
          yearDOM.innerHTML = years
        }
        if (monthDOM) {
          monthDOM.innerHTML = checkout(months)
        }
        if (weekDOM) {
          weekDOM.innerHTML = checkout(weeks)
        }
        if (dayDOM) {
          dayDOM.innerHTML = checkout(days)
        }
        if (hourDOM) {
          hourDOM.innerHTML = checkout(hours)
        }
        if (minuteDOM) {
          minuteDOM.innerHTML = checkout(minutes)
        }
        if (secondDOM) {
          secondDOM.innerHTML = checkout(seconds)
        }
      }
    }, 1000)
    if (this.type !== 'progress') {
      const allCounter = this.format.split(/,|，|\s+/)
      countdown = allCounter.map((i, index) => {
        return `<div class="countdown-inner">
          <span class="countdown-number countdown-${
            DORMATEDIRECTIVEKEYS[i]
          }"></span>
          <span class="countdown-label">${
            this.label !== null
              ? this.label.split(/,|，|\s+/)[index]
              : DORMATEDIRECTIVEKEYS[i]
          }</span>
        </div>`
      })
      countdown = countdown.join('')
      append(`${countdown}`, this.element)
    }
  }
}
