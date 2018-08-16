// import util from '../../util'
import templateEngine from '@pluginjs/template'
import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import { setStyle } from '@pluginjs/styled'
import { bindEvent } from '@pluginjs/events'
import { append, parseHTML, query, setData, insertBefore } from '@pluginjs/dom'

class monthEvents {
  constructor(element, month) {
    this.$element = element
    this.month = month
    this.classes = month.classes

    this.init()
  }

  init() {
    this.length = 0
    this.open = false
    this.more = this.month.getElement('more')
    this.wrap = this.month.getElement('eventsWrap')
    this.hideMore()
    append(this.more, this.wrap)
    append(this.wrap, this.$element)

    this.events = []

    setData('monthEvent', this, this.$element)
    // this.$element.data('monthEvent', this)

    this.bind()
  }

  bind() {
    bindEvent(
      this.month.instance.eventName('click'),
      () => {
        this.showList()
      },
      this.more
    )
  }

  showList() {
    // change wrap height and width
    addClass(this.classes.MONTHSHOWLIST, this.wrap)
    //
    this.month.activeEvent = this
    this.open = true
    this.events.map(event => {  /* eslint-disable-line */

      if (hasClass(this.classes.HIDE, event)) {
        removeClass(this.classes.HIDE, event)
      }
    })
    this.hideMore()
  }

  hideList() {
    removeClass(this.classes.MONTHSHOWLIST, this.wrap)
    //
    for (let i = 1; i < this.events.length; i++) {
      if (!hasClass(this.classes.HIDE, this.events[i])) {
        addClass(this.classes.HIDE, this.events[i])
      }
    }

    this.showMore()
  }

  addEvent(data) {
    this.length++
    const e = this.createHtml(data)
    const point = query('span', e)
    setStyle('background-color', data.color, point)
    this.events.push(e)

    insertBefore(e, this.more)
    this.update()

    // this.updateMore()
  }

  createHtml(data) {
    const template = this.month.options.templates.monthEvent
    let html = ''
    html = templateEngine.render(template.call(this), {
      class: this.classes,
      data
    })
    return parseHTML(html)
  }

  update() {
    if (this.length === 1) {
      addClass(this.classes.MONTHSINGLEEVENT, this.wrap)
    } else {
      removeClass(this.classes.MONTHSINGLEEVENT, this.wrap)
    }
    if (this.length > 2) {
      this.hideList()
    }
  }

  showMore() {
    const t = `+${this.length - 1} more`
    this.more.innerHTML = t
    if (hasClass(this.classes.HIDE, this.more)) {
      removeClass(this.classes.HIDE, this.more)
    }
  }

  hideMore() {
    if (!hasClass(this.classes.HIDE, this.more)) {
      addClass(this.classes.HIDE, this.more)
    }
  }

  destroy() {
    this.events.map(item => { /* eslint-disable-line */

      item.remove()
    })

    this.more.remove()

    setData('monthEvent', null, this.$element)
  }
}

export default monthEvents
