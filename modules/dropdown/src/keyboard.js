import keyboard from '@pluginjs/keyboard'
import { bindEvent } from '@pluginjs/events'
import { addClass, removeClass } from '@pluginjs/classes'
import { events as EVENTS } from './constant'
import { prevWith, nextWith } from '@pluginjs/dom'

class Keyboard {
  constructor(instance) {
    this.instance = instance

    this.KEYBOARD = keyboard(this.instance.$trigger)
    this.instance.$trigger.setAttribute('tabindex', 0)

    bindEvent(
      this.instance.eventName('focus'),
      () => {
        if (instance.is('disabled')) {
          return
        }
        addClass(this.instance.classes.FOCUS, this.instance.$trigger)

        this.KEYBOARD.down('space', () => {
          instance.toggle()
        })
      },
      this.instance.$trigger
    )

    bindEvent(
      this.instance.eventName('blur'),
      () => {
        if (instance.is('disabled')) {
          return
        }
        removeClass(this.instance.classes.FOCUS, this.instance.$trigger)

        this.KEYBOARD.down('enter')
      },
      this.instance.$trigger
    )

    bindEvent(
      this.instance.selfEventName(EVENTS.SHOW),
      () => {
        let $highlighted = instance.getHighlightedItem()
        if (!$highlighted) {
          $highlighted = instance.getActiveItem()

          instance.highlightItem(0)
        }

        if (!this.instance.is('keyboard')) {
          this.bind()

          this.instance.enter('keyboard')
        }
      },
      this.instance.element
    )

    bindEvent(
      this.instance.selfEventName(EVENTS.HIDE),
      () => {
        instance.unHighlightItem()

        if (this.instance.is('keyboard')) {
          this.unbind()
          this.instance.leave('keyboard')
        }
      },
      this.instance.element
    )
  }

  bind() {
    const instance = this.instance

    this.KEYBOARD.down('esc', () => {
      if (!instance.is('shown')) {
        return false
      }

      instance.hide()
      return null
    })

    this.KEYBOARD.down('enter', () => {
      if (instance.is('shown')) {
        const $highlighted = instance.getHighlightedItem()

        if ($highlighted && !instance.isItemDisabled($highlighted)) {
          instance.selectItem($highlighted)
          instance.hide()
        }
      }
      return false
    })

    this.KEYBOARD.down('up', () => {
      const $highlighted = instance.getHighlightedItem()
      const $items = instance.getItems()
      const index = $items.indexOf($highlighted)

      if (index > 0) {
        const $prev = prevWith(
          $el => !instance.isItemDisabled($el),
          $highlighted
        )
        if ($prev) {
          instance.highlightItem($prev)
        }
      }
      return false
    })

    this.KEYBOARD.down('down', () => {
      const $highlighted = instance.getHighlightedItem()
      const $items = instance.getItems()
      const index = $items.indexOf($highlighted)

      if (index < $items.length - 1) {
        const $next = nextWith(
          $el => !instance.isItemDisabled($el),
          $highlighted
        )
        if ($next) {
          instance.highlightItem($next)
        }
      }
      return false
    })
  }

  unbind() {
    this.KEYBOARD.off('down', 'up')
    this.KEYBOARD.off('down', 'down')
    this.KEYBOARD.off('down', 'enter')
    this.KEYBOARD.off('down', 'esc')
  }
}
export default Keyboard
