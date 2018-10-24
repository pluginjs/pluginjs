import templateEngine from '@pluginjs/template'
import { prepend, find } from '@pluginjs/dom'
import { addClass } from '@pluginjs/classes'
import { bindEvent } from '@pluginjs/events'

import Filters from '@pluginjs/filters'
import Dropdown from '@pluginjs/dropdown'

class Toolbar {
  constructor(instance, opts) {
    this.api = instance
    this.opts = opts
    this.classes = this.api.classes

    this.init()
  }

  init() {
    if (this.opts.filters) {
      this.filters = templateEngine.render(
        this.api.options.templates.filters.call(this),
        {
          classes: this.classes
        }
      )
    }

    if (this.opts.sort) {
      this.sort = templateEngine.render(
        this.api.options.templates.sort.call(this),
        {
          classes: this.classes
        }
      )
    }

    if (this.opts.reverse) {
      this.reverse = templateEngine.render(
        this.api.options.templates.reverse.call(this),
        {
          classes: this.classes
        }
      )
    }

    this.toolbar = templateEngine.render(
      this.api.options.templates.toolbar.call(this),
      {
        classes: this.classes,
        filters: this.filters,
        sort: this.sort,
        reverse: this.reverse
      }
    )

    prepend(this.toolbar, this.api.element)

    this.handleFilters()
    this.handleSort()
    this.handleReverse()
  }

  handleFilters() {
    if (!this.opts.filters) {
      return
    }

    const that = this
    const tags = this.api.tags
    const items = [
      {
        text: 'all',
        id: 'all'
      }
    ]
    const config = {
      theme: this.api.options.filtertheme,
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

    this.$filters = find(`.${this.classes.FILTERS}`, this.api.element)
    Filters.of(this.$filters, config)
  }

  handleSort() {
    if (!this.opts.sort) {
      return
    }

    const that = this
    let sorts = ['default']
    const config = {
      imitateSelect: true,
      target: false,
      select: this.api.sortby || 'default',
      onChange(data) {
        const sortby = data === 'default' ? '' : data
        that.$sortinner.innerHTML = data
        that.api.sort(sortby)
      }
    }

    this.api.chunks.forEach(chunk => {
      for (const key in chunk.sort) {
        if (Object.prototype.hasOwnProperty.call(chunk.sort, key)) {
          sorts.push(key)
        }
      }
    })

    sorts = Array.from(new Set(sorts))
    sorts.forEach((sort, index) => {
      sorts[index] = {
        label: sort,
        value: sort
      }
    })
    config.data = sorts
    this.$sortinner = find(`.${this.classes.SORTINNER}`, this.api.element)
    this.$sortinner.innerHTML = sorts[0].label
    Dropdown.of(this.$sortinner, config)
  }

  handleReverse() {
    if (!this.opts.reverse) {
      return
    }

    this.$reverse = find(`.${this.classes.REVERSE}`, this.api.element)
    if (this.api.options.sortDirection === 'min') {
      addClass(this.classes.REVERSEMIN, this.$reverse)
    }

    bindEvent(
      this.api.eventName('click'),
      () => {
        this.api.reverse()
      },
      this.$reverse
    )
  }
}

export default Toolbar
