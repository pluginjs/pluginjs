import { parseHTML, detach, insertBefore, query, appendTo } from '@pluginjs/dom'
import { bindEvent } from '@pluginjs/events'
import { addClass } from '@pluginjs/classes'
import { isNull } from '@pluginjs/is'
import { events as EVENTS } from './constant'
import templateEngine from '@pluginjs/template'

export default class Filterable {
  constructor(instance) {
    this.instance = instance
    this.element = insertBefore(
      templateEngine.render(instance.options.templates.filter.call(instance), {
        classes: instance.classes,
        placeholder: instance.translate('searchText')
      }),
      instance.$items
    )

    this.$input = query('input', this.element)
    addClass(instance.classes.FILTERABLE, instance.$wrap)

    bindEvent(
      instance.selfEventName(EVENTS.SHOWN),
      () => {
        this.$input.focus()
      },
      instance.element
    )

    bindEvent(
      instance.eventName('input'),
      () => {
        const value = this.$input.value
        const DROPDOWN = instance.DROPDOWN
        if (!value) {
          this.refreshDefault()
        } else {
          this.filter(value)
        }

        if (isNull(DROPDOWN.getHighlightedItem())) {
          DROPDOWN.highlightItem(DROPDOWN.getHighlightableItem())
        }
        if (!DROPDOWN.is('shown')) {
          DROPDOWN.show()
        } else {
          DROPDOWN.update()
        }

        instance.trigger(EVENTS.FILTER, value)
      },
      this.$input
    )

    bindEvent(
      instance.selfEventName(EVENTS.HIDE),
      () => {
        this.$input.value = ''
        this.refreshDefault()
        this.hideNotFound()
      },
      instance.element
    )
  }

  showNotFound() {
    if (this.notfound) {
      return
    }

    if (!this.$notFound) {
      this.$notFound = parseHTML(
        `<div class="${
          this.instance.classes.NOTFOUND
        }">${this.instance.translate('notFoundText')}</div>`
      )
    }
    appendTo(this.$notFound, this.instance.$items)

    if (this.instance.items.length === 0) {
      this.instance.hideEmpty()
    }

    this.notfound = true
  }

  hideNotFound() {
    if (!this.notfound) {
      return
    }

    if (this.$notFound) {
      detach(this.$notFound)
    }

    if (this.instance.items.length === 0) {
      this.instance.showEmpty()
    }

    this.notfound = false
  }

  showItem(item) {
    if (this.instance.DROPDOWN) {
      this.instance.DROPDOWN.showItem(item.__dom)
    }
  }

  hideItem(item) {
    if (this.instance.DROPDOWN) {
      this.instance.DROPDOWN.hideItem(item.__dom)
    }
  }

  filter(search) {
    const { filter } = this.instance.options

    let found = 0
    this.instance.items.forEach(item => {
      if (filter(item, search)) {
        this.showItem(item)
        found++
      } else {
        this.hideItem(item)
      }
    })

    if (found) {
      this.hideNotFound()
    } else {
      this.showNotFound()
    }
  }

  refreshDefault() {
    this.hideNotFound()
    this.$input.value = ''

    if (this.instance.items.length === 0) {
      this.instance.showEmpty()
    } else {
      this.instance.items.forEach(item => {
        this.showItem(item)
      })
    }
  }
}
