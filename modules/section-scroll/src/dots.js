import templateEngine from '@pluginjs/template'
import { append, parseHTML, queryAll, query } from '@pluginjs/dom'
import PJDots from '@pluginjs/dots'

class Dots {
  constructor(sectionScroll) {
    this.sectionScroll = sectionScroll
    this.options = sectionScroll.options
    this.classes = sectionScroll.classes
    this.sections = sectionScroll.$sections
    this.init()
  }

  init() {
    this.items = this.parseItems()

    this.dots = parseHTML(this.createHtml())
    const dot = query(`.${this.classes.DOTS}`, this.dots)

    const appendToElement =
      typeof this.options.appendTo === 'string'
        ? query(this.options.appendTo)
        : this.options.appendTo

    append(this.dots, appendToElement)

    this.api = PJDots.of(dot, {
      ...this.options.dots,
      items: this.items,
      onClick: val => {
        this.sectionScroll.goTo(val)
      }
    })
  }

  setActive(id) {
    this.api.set(id)
  }

  parseItems() {
    const items = []
    const titles = this.options.titleSelector
      ? queryAll(this.options.titleSelector)
      : []

    this.sections.forEach((section, index) => {
      const item = {}
      item.href = `#${section.getAttribute('id')}`
      item.text = titles[index] ? titles[index].innerHTML : ''
      items.push(item)
    })

    return items
  }

  createHtml() {
    const html = templateEngine.render(this.options.template.call(this), {
      classes: this.classes
    })
    return html
  }
}

export default Dots
