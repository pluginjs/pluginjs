import { append, prepend, find, parseHTML } from '@pluginjs/dom'
import { addClass } from '@pluginjs/classes'
import { bindEvent } from '@pluginjs/events'

import Filters from '@pluginjs/filters'
import Dropdown from '@pluginjs/dropdown'

class Filterbar {
  constructor(instanced, opts) {
    this.api = instanced
    this.opts = opts
    this.classes = this.api.classes

    this.init()
  }

  init() {
    prepend(`<div class="${this.classes.FILTERBAR}"></div>`, this.api.element)
    this.$filterbar = find(`.${this.classes.FILTERBAR}`, this.api.element)

    if (this.opts.filters) {
      this.handleFilters()
    }

    if (this.opts.sort) {
      this.handleSort()
    }

    if (this.opts.reverse) {
      this.handleReverse()
    }
  }

  handleFilters() {
    const that = this
    const tags = this.api.tags
    const items = [
      {
        text: 'all',
        id: 'all'
      }
    ]
    const config = {
      theme: 'line',
      default: 'all',
      responsive: true,
      onChange(tag) {
        that.api.filter(tag !== 'all' ? [tag] : [])
      }
    }

    tags.forEach(tag => {
      items.push({
        text: tag,
        id: tag
      })
    })

    config.items = items
    append(`<div class="${this.classes.FILTERS}"></div>`, this.$filterbar)
    const $filters = find(`.${this.classes.FILTERS}`, this.api.element)

    Filters.of($filters, config)
  }

  handleSort() {
    const that = this
    let sorts = ['default']
    const config = {
      imitateSelect: true,
      select: this.api.sortby || 'default',
      onChange(data) {
        const sortby = data.innerText === 'default' ? '' : data.innerText
        that.api.sort(sortby)
      }
    }
    /* eslint-disable */
    this.api.chunks.forEach(chunk => {
      for (const key in chunk.sort) {
        sorts.push(key)
      }
    })
    /* eslint-enable */

    sorts = Array.from(new Set(sorts))
    sorts.forEach((sort, index) => {
      sorts[index] = { label: sort }
    })
    config.data = sorts
    append(`<div class="${this.classes.SORT}"></div>`, this.$filterbar)
    const $sort = find(`.${this.classes.SORT}`, this.$filterbar)
    Dropdown.of($sort, config)
  }

  handleReverse() {
    this.$reverse = parseHTML(
      `<i class="${this.classes.REVERSE} icon-chevron-down"></i>`
    )

    append(this.$reverse, this.$filterbar)
    if (this.api.options.sortDirection === 'min') {
      addClass(this.classes.REVERSEMIN, this.$reverse)
    }

    bindEvent(
      {
        type: this.api.eventName('click'),
        handler: () => {
          this.api.reverse()
        }
      },
      this.$reverse
    )
  }
}

export default Filterbar
