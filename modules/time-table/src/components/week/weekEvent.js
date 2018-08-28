import { addClass, removeClass } from '@pluginjs/classes'
import { setStyle } from '@pluginjs/styled'
import { bindEvent } from '@pluginjs/events'
import { append, query } from '@pluginjs/dom'

class weekEvent {
  constructor(data, week) {
    this.data = data
    this.week = week
    this.group = this.week.group
    this.parentElement = this.group[data.day].element

    this.init()
  }

  init() {
    // creat element
    this.element = this.week.getElement('weekEvent')
    // append
    append(this.element, this.parentElement)
    // set position top and height
    const minuteStep = 80 / 60 // baseline height / 60
    this.top =
      minuteStep *
      this.getBetweenTime(this.week.tableBegin, this.data.startTime)
    this.height =
      minuteStep * this.getBetweenTime(this.data.startTime, this.data.endTime)
    // bijiao  shi fou chongfu  set position width left
    this.width = ''
    this.position = 'left'
    const eventInstances = this.group[this.data.day].event
    eventInstances.map(instance => {  /*eslint-disable-line */
      const isCoincide = instance.coincide(this.data)
      if (isCoincide) {
        this.width = '50%'
        this.position = instance.position === 'left' ? 'right' : 'left'
      }
    })

    setStyle(
      {
        top: this.top,
        height: this.height,
        width: this.width,
        'background-color': this.data.color
      },
      this.element
    )

    if (this.position === 'left') {
      setStyle('left', 0, this.element)
    } else {
      setStyle('right', 0, this.element)
    }

    this.setContent()
    this.bind()
  }

  bind() {
    bindEvent(
      this.week.instance.eventName('mouseenter'),
      () => {
        addClass(this.week.classes.ACTIVEWEEKEVENT, this.element)
      },
      this.element
    )

    bindEvent(
      this.week.instance.eventName('mouseleave'),
      () => {
        removeClass(this.week.classes.ACTIVEWEEKEVENT, this.element)
      },
      this.element
    )
  }

  setContent() {
    this.$title = query(`.${this.week.classes.WEEKEVENTTITLE}`, this.element)
    this.$time = query(`.${this.week.classes.WEEKEVENTTIME}`, this.element)

    this.$title.textContent = this.data.title
    this.$time.textContent = this.data.timeBucket
  }

  mouseenter() {
    addClass(this.week.classes.ACTIVEWEEKEVENT, this.element)
  }

  mouseout() {
    removeClass(this.week.classes.ACTIVEWEEKEVENT, this.element)
  }

  coincide(other) {
    const s1 = this.getMinute(this.data.startTime)
    const e1 = this.getMinute(this.data.endTime)
    const s2 = this.getMinute(other.startTime)
    const e2 = this.getMinute(other.endTime)

    if (s1 > e2 || e1 < s2) {
      return false
    }
    this.width = '50%'

    setStyle('width', this.width, this.element)

    return true
  }

  getMinute(time) {
    const [h, m] = time.split(':')
    return parseInt(h) * 60 + parseInt(m)  /*eslint-disable-line */
  }

  getBetweenTime(start, end) {
    const h1 = parseInt(start.split(':')[0])  /*eslint-disable-line */
    const h2 = parseInt(end.split(':')[0])  /*eslint-disable-line */

    const m1 = parseInt(start.split(':')[1])  /*eslint-disable-line */
    const m2 = parseInt(end.split(':')[1])  /*eslint-disable-line */

    const h = h2 - h1
    const m = m2 - m1
    return h * 60 + m
  }

  destroy() {
    this.element.remove()
  }
}

export default weekEvent
