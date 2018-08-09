import util from '../../util'
// import format from 'date-fns/format'
import templateEngine from '@pluginjs/template'
import WeekEvent from './weekEvent'
import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import { setStyle } from '@pluginjs/styled'
// import { bindEvent, removeEvent } from '@pluginjs/events'
import { append, parseHTML } from '@pluginjs/dom'

class Weekly {
  constructor(instance, element) {
    this.instance = instance
    this.options = instance.options
    this.classes = instance.classes

    this.element = element

    // css date
    this.stepHeight = 80

    this.init()
  }

  buildHeader() {
    this.$header = parseHTML(`<div class="${this.classes.HEADER}"></div>`)

    this.$weekHeader = parseHTML('<ul></ul>')
    this.instance.fullWeek.map(item => { /* eslint-disable-line */
      const li = `<li>${item}</li>`
      append(li, this.$weekHeader)
    })

    append(this.$weekHeader, this.$header)
    append(this.$header, this.element)
  }

  buildBaseline() {
    this.$baseline = parseHTML(`<div class="${this.classes.BASELINE}"></div>`)

    const baselineUl = parseHTML('<ul></ul>')
    let [start, end] = this.options.weekly.timeBetween.split('-')
    this.tableBegin = start
    start = parseInt(start.split(':')[0]) + 1 /* eslint-disable-line */
    end = parseInt(end.split(':')[0]) /* eslint-disable-line */
    this.timeDruation = end - start + 2
    for (let i = start; i <= end; i++) {
      const time = String(i).length === 1 ? `0${i}:00` : `${i}:00`
      const li = `<li>
                      <span>${time}</span>
                    </li>`
      append(li, baselineUl)
    }

    append(baselineUl, this.$baseline)
    append(this.$baseline, this.element)
  }

  buildTable() {
    this.$eventPanel = parseHTML(`<div class="${this.classes.EVENTS}"></div>`)

    const eventsUl = parseHTML('<ul></ul>')
    append(eventsUl, this.$eventPanel)
    for (let i = 0; i < 7; i++) {
      if (typeof this.group[i] === 'undefined') {
        this.group[i] = {}
        this.group[i].event = []
      }
      const li = parseHTML(`<li class="${this.classes.EVENTSGROUP}"></li>`)
      this.group[i].element = li
      append(li, eventsUl)
    }

    setStyle({ height: this.timeDruation * this.stepHeight }, this.$eventPanel)

    append(this.$eventPanel, this.element)
  }

  init() {
    this.group = Array(6)

    this.buildHeader()
    this.buildBaseline()
    this.buildTable()

    this.update()
    this.bind()
  }

  update() {
    this.clean()
    this.parseData(this.instance.data)

    this.updateEvent()
  }

  updateEvent() {
    this.currentWeekData.map(data => { /* eslint-disable-line */
      this.group[data.day].event.push(new WeekEvent(data, this))
    })
  }

  clean() {
    // clean this.group.event
    this.group.map(item => { /* eslint-disable-line */
      item.event.map(instance => { /* eslint-disable-line */
        instance.destroy()
      })
      item.event = []
    })
  }

  parseData(data) {
    this.currentWeekData = []
    const { currentWeek } = this.instance
    const endIndex = currentWeek.length - 1
    const weekStart = `${currentWeek[0].getFullYear()}-${currentWeek[0].getMonth() +
      1}-${currentWeek[0].getDate()}`
    const weekEnd = `${currentWeek[endIndex].getFullYear()}-${currentWeek[
      endIndex
    ].getMonth() + 1}-${currentWeek[endIndex].getDate()}`
    // serious shit bug
    data.map(item => { /* eslint-disable-line */
      const localeDateString = item.start.split(' ')[0]
      if (util.isDateBetween(localeDateString, weekStart, weekEnd)) {
        const { start, end, id, title, color } = item /* eslint-disable-line */
        const classType = item.class
        const endTime = end.split(' ')[1]
        const startTime = start.split(' ')[1]
        const timeBucket = `${startTime}-${endTime}`
        const day = util.dateParse(localeDateString).getDay()

        const weekData = {
          endTime,
          startTime,
          timeBucket,
          localeDateString,
          classType,
          title,
          day,
          color
        }
        this.currentWeekData.push(weekData)
      }
    })
  }

  bind() {
    // bindEvent({
    //   type: 'mouseenter',
    //   identity: {
    //     type: 'class',
    //     value: this.classes.WEEKEVENT
    //   },
    //   handler: e => {
    //     const target = e.target
    //     if (hasClass(this.classes.WEEKEVENT, target)) {
    //       addClass(this.classes.ACTIVEWEEKEVENT, target)
    //     } else {
    //       const weekEvent = target.closest(`.${this.classes.WEEKEVENT}`)
    //       addClass(this.classes.ACTIVEWEEKEVENT, weekEvent)
    //     }
    //   }
    // }, this.element)
    //
    // bindEvent({
    //   type: 'mouseleave',
    //   identity: {
    //     type: 'class',
    //     value: this.classes.WEEKEVENT
    //   },
    //   handler: e => {
    //     const target = e.target
    //     if (hasClass(this.classes.WEEKEVENT, target)) {
    //       removeClass(this.classes.ACTIVEWEEKEVENT, target)
    //     } else {
    //       const weekEvent = target.closest(`.${this.classes.WEEKEVENT}`)
    //       removeClass(this.classes.ACTIVEWEEKEVENT, weekEvent)
    //     }
    //   }
    // }, this.element)
  }

  getElement(type) {
    const template = this.options.templates[type]
    let html = ''
    if (template) {
      html = templateEngine.render(template.call(this), { class: this.classes })
    }
    return parseHTML(html)
  }

  hide() {
    if (!hasClass(this.classes.HIDE, this.element)) {
      addClass(this.classes.HIDE, this.element)
    }
  }

  show() {
    if (hasClass(this.classes.HIDE, this.element)) {
      removeClass(this.classes.HIDE, this.element)
    }
  }
}

export default Weekly
