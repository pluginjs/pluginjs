import templateEngine from '@pluginjs/template'
import { append, parseHTML, queryAll, query } from '@pluginjs/dom'
import { isArray, isString, isObject } from '@pluginjs/is'
import PJDots from '@pluginjs/dots'
import Tooltip from '@pluginjs/tooltip'

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

    if (this.options.tooltip) {
      this.initTooltip()
    }
  }

  initTooltip() {
    const dotPlacement = this.options.placement === 'left' ? 'right' : 'left'

    this.api.dots.forEach((dot, index) => {
      const defaultOptions = {
        trigger: 'hover',
        title: this.titleList[index],
        placement: dotPlacement
      }
      const options = isObject(this.options.tooltip)
        ? Object.assign({}, this.options.tooltip, defaultOptions)
        : defaultOptions

      Tooltip.of(dot, options)
    })
  }

  setActive(id) {
    this.api.set(id)
  }

  parseItems() {
    const items = []
    this.titleList = this.initTitle()

    this.sections.forEach((section, index) => {
      const item = {}
      item.href = `#${section.getAttribute('id')}`
      item.text = this.titleList[index] ? this.titleList[index] : ''
      items.push(item)
    })

    return items
  }

  initTitle() {
    let titleList = []

    if (!this.options.titleSelector) {
      return titleList
    }

    if (isString(this.options.titleSelector)) {
      titleList = queryAll(this.options.titleSelector, this.element).map(
        title => {
          return title.innerHTML
        }
      )
    } else if (isArray(this.options.titleSelector)) {
      this.options.titleSelector.forEach(title => {
        if (isString(title)) {
          titleList.push(title)
        }
      })
    }
    return titleList
  }

  createHtml() {
    const placement =
      this.options.placement === 'left' ? this.classes.LEFT : this.classes.RIGHT
    const html = templateEngine.render(this.options.template.call(this), {
      classes: this.classes,
      placement
    })
    return html
  }
}

export default Dots
