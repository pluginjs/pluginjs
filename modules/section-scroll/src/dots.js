import templateEngine from '@pluginjs/template'
import { deepMerge } from '@pluginjs/utils'
import { append, parseHTML, queryAll, query } from '@pluginjs/dom'

import Pj from '@pluginjs/pluginjs'

class Dots {
  constructor(sectionScroll) {
    this.sectionScroll = sectionScroll
    this.options = sectionScroll.options
    this.classes = sectionScroll.classes
    this.sections = sectionScroll.sections
    this.init()
  }

  init() {
    this.items = this.parseItems()

    this.$dots = parseHTML(this.createHtml())
    const dot = query(`.${this.classes.DOTS}`, this.$dots)
    const o = {
      items: this.items,
      onClick: val => {
        this.sectionScroll.goTo(val)
      }
    }
    const options = deepMerge(this.options.dots, o)
    const appendToElement =
      typeof this.options.appendTo === 'string'
        ? query(this.options.appendTo)
        : this.options.appendTo

    append(this.$dots, appendToElement)

    this.dotAPI = Pj.dots(dot, options)

    if (this.options.dots === false) {
      this.$dots.style.display = 'none'
    }
  }

  setActive(id) {
    this.dotAPI('set', id)
  }

  parseItems() {
    const items = []
    // const titles = [].slice.call($(this.options.titleSelector))
    const titles = queryAll(this.options.titleSelector)

    this.sections.map((section, index) => {
      const item = {}
      item.href = `#${section.id}`
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
