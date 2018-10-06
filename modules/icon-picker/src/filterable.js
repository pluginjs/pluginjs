import { parseHTML, detach, insertBefore, query, appendTo } from '@pluginjs/dom'
import { bindEvent } from '@pluginjs/events'
import { addClass, removeClass } from '@pluginjs/classes'
import { isNull } from '@pluginjs/is'
import { events as EVENTS } from './constant'
import templateEngine from '@pluginjs/template'
import { each } from '@pluginjs/utils'

export default class Filterable {
  constructor(instance) {
    this.instance = instance
    this.element = insertBefore(
      templateEngine.render(instance.options.templates.filter.call(instance), {
        classes: instance.classes,
        placeholder: instance.translate('searchText')
      }),
      instance.$main
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
    appendTo(this.$notFound, this.instance.$main)

    this.notfound = true
  }

  hideNotFound() {
    if (!this.notfound) {
      return
    }

    if (this.$notFound) {
      detach(this.$notFound)
    }

    this.notfound = false
  }

  showItem(item) {
    if (item.hided) {
      if (this.instance.DROPDOWN) {
        this.instance.DROPDOWN.showItem(item.$dom)
      }

      item.hided = false
    }
  }

  hideItem(item) {
    if (typeof item.hided === 'undefined' || item.hided === false) {
      if (this.instance.DROPDOWN) {
        this.instance.DROPDOWN.hideItem(item.$dom)
      }

      item.hided = true
    }
  }

  showGroup(group) {
    if (group.hided) {
      removeClass(this.instance.classes.GROUPHIDED, group.$dom)

      group.hided = false
    }
  }

  hideGroup(group) {
    if (typeof group.hided === 'undefined' || group.hided === false) {
      addClass(this.instance.classes.GROUPHIDED, group.$dom)

      group.hided = true
    }
  }

  filter(query) {
    const { filter } = this.instance.options

    let found = 0
    const pack = this.instance.getCurrentPack()
    const items = this.instance.getCurrentPackItems()

    if (pack.classifiable) {
      each(items, (name, group) => {
        let groupFound = 0

        each(group.items, (k, item) => {
          if (filter(item.icon, query)) {
            this.showItem(item)
            found++
            groupFound++
          } else {
            this.hideItem(item)
          }
        })

        if (groupFound) {
          this.showGroup(group)
        } else {
          this.hideGroup(group)
        }
      })
    } else {
      each(items, (k, item) => {
        if (filter(item.icon, query)) {
          this.showItem(item)
          found++
        } else {
          this.hideItem(item)
        }
      })
    }

    if (found) {
      this.hideNotFound()
    } else {
      this.showNotFound()
    }
  }

  refreshDefault() {
    this.hideNotFound()
    this.$input.value = ''

    const pack = this.instance.getCurrentPack()
    const items = this.instance.getCurrentPackItems()

    if (pack.classifiable) {
      each(items, (name, group) => {
        each(group.items, (k, item) => {
          this.showItem(item)
        })

        this.showGroup(group)
      })
    } else {
      each(items, (k, item) => {
        this.showItem(item)
      })
    }
  }
}
