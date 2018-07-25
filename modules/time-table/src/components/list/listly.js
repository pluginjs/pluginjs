import util from '../../util'
import listEvent from './listEvent'
import templateEngine from '@pluginjs/template'
import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import { append, parseHTML, query } from '@pluginjs/dom'

class Listly {
  constructor(instance, element) {
    this.instance = instance
    this.options = instance.options
    this.classes = instance.classes

    this.$element = element

    this.init()
  }

  init() {
    this.items = {}
    this.parseData(this.options.data)

    this.createEvents()
  }

  createEvents() {
    for (const key in this.items) {
      if (Object.prototype.hasOwnProperty.call(this.items, key)) {
        const data = this.items[key].data
        const instance = new listEvent(data, this)
        this.items[key].instance = instance
      }
    }
  }

  update() {
    //  xuanhuan   items  meiyou d gei ta hide
    for (const key in this.items) {
      if (Object.prototype.hasOwnProperty.call(this.items, key)) {
        this.items[key].instance.update()
      }
    }
  }

  parseData(datas) {
    // sort date  !!
    datas.sort((a, b) => {
      const x = new Date(a.start.split(' ')[0])
      const y = new Date(b.start.split(' ')[0])
      return x > y ? 1 : -1
    })

    datas.map(data => {
      const { start, end, id, title, content } = data
      const [localeDateString, startTime] = start.split(' ')
      const classType = data.class
      const endTime = end.split(' ')[1]
      const timeBucket = `${startTime} - ${endTime}`
      let [year, month, day] = localeDateString.split('-')
      month = this.addZero(month)
      day = this.addZero(day)
      const localeDate = `${year}-${month}-${day}`
      month = this.instance.month[parseInt(month)]
      let weekday = new Date(localeDate).getDay()
      weekday = weekday === 0 ? 7 : weekday
      weekday = this.instance.fullWeek[weekday - 1]

      const listData = {
        endTime,
        startTime,
        timeBucket,
        classType,
        title,
        content,
        year,
        month,
        weekday,
        day
      }

      if (this.items[localeDate]) {
        if (this.items[localeDate].data instanceof Array) {
          this.items[localeDate].data.push(listData)
        } else {
          this.items[localeDate].data = []
          this.items[localeDate].data.push(listData)
        }
      } else {
        this.items[localeDate] = {}
        if (this.items[localeDate].data instanceof Array) {
          this.items[localeDate].data.push(listData)
        } else {
          this.items[localeDate].data = []
          this.items[localeDate].data.push(listData)
        }
      }
    })
  }

  addZero(num) {
    if (num.length === 1) {
      return `0${num}`
    }

    return num
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
    if (!hasClass(this.classes.HIDE, this.$element)) {
      addClass(this.classes.HIDE, this.$element)
    }
  }

  show() {
    if (hasClass(this.classes.HIDE, this.$element)) {
      removeClass(this.classes.HIDE, this.$element)
    }
  }
}

export default Listly
