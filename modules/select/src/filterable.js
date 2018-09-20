import { replace, parseHTML, append, detach } from '@pluginjs/dom'
import { bindEvent } from '@pluginjs/events'
import { addClass } from '@pluginjs/classes'
import { isNull } from '@pluginjs/is'
import { events as EVENTS } from './constant'
export default class Filterable {
  constructor(instance) {
    this.instance = instance
    instance.$label = replace(
      `<input type="text" autocomplete="off" placeholder="${
        instance.placeholder
      }" class="${instance.classes.FILTER} ${instance.classes.LABEL}">`,
      instance.$label
    )
    addClass(instance.classes.FILTERABLE, instance.$wrap)

    bindEvent(
      instance.eventName('input'),
      () => {
        const value = instance.$label.value
        const DROPDOWN = instance.DROPDOWN
        if (!value) {
          this.refreshDefault()
        } else {
          this.filter(instance.$label.value)
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
      instance.$label
    )

    bindEvent(
      instance.selfEventName(EVENTS.HIDE),
      () => {
        this.refreshDefault()
        this.hideNotFound()
      },
      instance.element
    )

    bindEvent(
      instance.selfEventName(EVENTS.HIDED),
      () => {
        const option = instance.getOptionByValue(instance.value)

        if (option) {
          const label = instance.getOptionLabel(option)
          if (instance.$label.value !== label) {
            instance.$label.value = label
          }
        } else {
          instance.$label.value = ''
        }
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
    append(this.$notFound, this.instance.$dropdown)

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

  showOption(option) {
    if (this.instance.DROPDOWN) {
      this.instance.DROPDOWN.showItem(option.__dom)
    }
  }

  hideOption(option) {
    if (this.instance.DROPDOWN) {
      this.instance.DROPDOWN.hideItem(option.__dom)
    }
  }

  filter(search) {
    const { filter } = this.instance.options

    let found = 0
    this.instance.items.forEach(option => {
      if (filter(option, search)) {
        this.showOption(option)
        found++
      } else {
        this.hideOption(option)
      }
    })

    if (found) {
      this.hideNotFound()
    } else {
      this.showNotFound()
    }
  }

  refreshDefault() {
    this.instance.items.forEach(option => {
      this.showOption(option)
    })
  }
}
