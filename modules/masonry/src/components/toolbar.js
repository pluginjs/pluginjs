import templateEngine from '@pluginjs/template'
import { prepend, find, wrap } from '@pluginjs/dom'
import { addClass } from '@pluginjs/classes'
import { bindEvent } from '@pluginjs/events'

import Filters from '@pluginjs/filters'
import Dropdown from '@pluginjs/dropdown'

class Toolbar {
  constructor(instance, options) {
    this.instance = instance
    this.options = options
    this.classes = this.instance.classes

    this.init()
  }

  init(update = false) {
    if (update) {
      find(`.${this.classes.TOOLBAR}`, this.wrap).remove()
    }

    if (this.options.filters) {
      this.filters = templateEngine.render(
        this.instance.options.templates.filters.call(this),
        {
          classes: this.classes
        }
      )
    }

    if (this.options.sort) {
      this.sort = templateEngine.render(
        this.instance.options.templates.sort.call(this),
        {
          classes: this.classes
        }
      )
    }

    if (this.options.reverse) {
      this.reverse = templateEngine.render(
        this.instance.options.templates.reverse.call(this),
        {
          classes: this.classes
        }
      )
    }

    this.toolbar = templateEngine.render(
      this.instance.options.templates.toolbar.call(this),
      {
        classes: this.classes,
        filters: this.filters,
        sort: this.sort,
        reverse: this.reverse
      }
    )

    this.wrap = update
      ? this.wrap
      : wrap(
          `<div class="${this.instance.classes.WRAPPER}"></div>`,
          this.instance.element
        )

    prepend(this.toolbar, this.wrap)

    this.handleFilters()
    this.handleSort()
    this.handleReverse()
  }

  handleFilters() {
    if (!this.options.filters) {
      return
    }

    const that = this
    const tags = this.instance.tags
    const items = [
      {
        text: 'all',
        id: 'all'
      }
    ]
    const config = {
      theme: this.instance.options.filtertheme,
      default: 'all',
      responsive: true,
      onChange(tag) {
        that.instance.filter(tag !== 'all' ? [tag] : [])
      }
    }

    tags.forEach(tag => {
      items.push({
        text: tag,
        id: tag
      })
    })

    config.items = items

    this.$filters = find(`.${this.classes.FILTERS}`, this.wrap)

    Filters.of(this.$filters, config)
  }

  handleSort() {
    if (!this.options.sort) {
      return
    }

    const that = this
    let sorts = ['default']
    const config = {
      imitateSelect: true,
      target: false,
      select: this.instance.sortby || 'default',
      onChange(data) {
        const sortby = data === 'default' ? '' : data
        that.$sortinner.innerHTML = data
        that.instance.sort(sortby)
      }
    }

    this.instance.chunks.forEach(chunk => {
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
    this.$sortinner = find(`.${this.classes.SORTINNER}`, this.wrap)
    this.$sortinner.innerHTML = sorts[0].label
    Dropdown.of(this.$sortinner, config)
  }

  handleReverse() {
    if (!this.options.reverse) {
      return
    }

    this.$reverse = find(`.${this.classes.REVERSE}`, this.wrap)
    if (this.instance.options.sortDirection === 'min') {
      addClass(this.classes.REVERSEMIN, this.$reverse)
    }

    bindEvent(
      this.instance.eventName('click'),
      () => {
        this.instance.reverse()
      },
      this.$reverse
    )
  }
}

export default Toolbar
