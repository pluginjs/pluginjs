import { bindEvent } from '@pluginjs/events'
import { isNull } from '@pluginjs/is'
import { events as EVENTS } from './constant'
export default class Filterable {
  constructor(instance) {
    this.instance = instance
    this.$items = this.instance.DROPDOWN.getItems()

    bindEvent(
      instance.eventName('input'),
      () => {
        const value = instance.element.value
        const DROPDOWN = instance.DROPDOWN
        if (!value) {
          this.refreshDefault()
        } else {
          this.filter(instance.element.value)
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
      instance.element
    )

    bindEvent(
      instance.selfEventName(EVENTS.HIDE),
      () => {
        this.refreshDefault()
      },
      instance.element
    )
  }

  showItem($item) {
    if (this.instance.DROPDOWN) {
      this.instance.DROPDOWN.showItem($item)
    }
  }

  hideItem($item) {
    if (this.instance.DROPDOWN) {
      this.instance.DROPDOWN.hideItem($item)
    }
  }

  filter(search) {
    let found = 0
    this.$items.forEach($item => {
      if ($item.dataset.value.startsWith(search)) {
        this.showItem($item)
        found++
      } else {
        this.hideItem($item)
      }
    })

    if (!found) {
      this.instance.DROPDOWN.hide()
    }
  }

  refreshDefault() {
    this.$items.forEach($item => {
      this.showItem($item)
    })
  }
}
