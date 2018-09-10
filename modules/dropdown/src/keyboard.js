import keyboard from '@pluginjs/keyboard'
import { bindEvent } from '@pluginjs/events'
import { addClass, removeClass } from '@pluginjs/classes'
import { events as EVENTS } from './constant'

class Keyboard {
  constructor(instance) {
    this.instance = instance

    this.KEYBOARD = keyboard(this.instance.$trigger)
    this.instance.$trigger.setAttribute('tabindex', 0)

    bindEvent(
      this.instance.eventName('focus'),
      () => {
        addClass(this.instance.classes.FOCUS, this.instance.$trigger)
      },
      this.instance.$trigger
    )

    bindEvent(
      this.instance.eventName('blur'),
      () => {
        removeClass(this.instance.classes.FOCUS, this.instance.$trigger)
      },
      this.instance.$trigger
    )

    bindEvent(
      this.instance.selfEventName(EVENTS.SHOW),
      () => {
        let $highlighted = instance.getHighlightedItem()
        if (!$highlighted) {
          $highlighted = instance.getActiveItem()

          if (!$highlighted) {
            $highlighted = instance.getItemByIndex(0)
          }

          addClass(instance.classes.HIGHLIGHTED, $highlighted)
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
        const $highlighted = instance.getHighlightedItem()
        removeClass(instance.classes.HIGHLIGHTED, $highlighted)

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
      if (!instance.is('show')) {
        return false
      }

      instance.hide()

      return null
    })

    this.KEYBOARD.down('enter', () => {
      if (instance.is('show')) {
        const $highlighted = instance.getHighlightedItem()
        if ($highlighted) {
          instance.selectItem($highlighted)
        }
      }

      return null
    })

    this.KEYBOARD.down('up', () => {
      const $highlighted = instance.getHighlightedItem()
      const $items = instance.getItems()
      const index = $items.indexOf($highlighted)

      if (index > 0) {
        instance.highlightItem(index - 1)
      }
      return false
    })

    this.KEYBOARD.down('down', () => {
      const $highlighted = instance.getHighlightedItem()
      const $items = instance.getItems()
      const index = $items.indexOf($highlighted)

      if (index < $items.length - 1) {
        instance.highlightItem(index + 1)
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
