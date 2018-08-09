// import util from '../../util'
import templateEngine from '@pluginjs/template'
import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import { append, parseHTML, query } from '@pluginjs/dom'

class listEvent {
  constructor(data, list) {
    this.data = data
    this.list = list
    this.classes = list.classes
    this.$element = list.getElement('listEvent')
    append(this.$element, list.$element)
    this.init()
  }

  init() {
    const { month, day, year, weekday } = this.data[0]
    const t = `${month} ${day}, ${year} (<span>${weekday}</span>)`
    this.head = query(`.${this.classes.LISTEVENTHEAD}`, this.$element)
    this.head.innerHTML = t
    this.events = []

    for (let i = 0; i < this.data.length; i++) {
      const item = this.createItem(this.data[i])
      this.events.push(item)
      append(item, this.$element)
    }
  }

  createItem(data) {
    const template = this.list.options.templates.listEventItem
    let html = ''
    html = templateEngine.render(template.call(this), {
      class: this.classes,
      data
    })
    return parseHTML(html)
  }

  update() {
    let flag = 0
    const { currentClass } = this.list.instance
    this.events.map((element, index) => {  /*eslint-disable-line */
      if (
        currentClass != this.list.instance.translate('all') &&  /*eslint-disable-line */
        this.data[index].classType !== currentClass
      ) {
        element.style.display = 'none'
        flag++
      } else {
        element.style.display = ''
      }
    })
    if (flag === this.events.length) {
      this.hide()
    } else {
      this.show()
    }
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

export default listEvent
