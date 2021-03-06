import keyboard from '@pluginjs/keyboard'
import { bindEvent } from '@pluginjs/events'
import { addClass, removeClass } from '@pluginjs/classes'
import { events as EVENTS } from './constant'
import { isElement } from '@pluginjs/is'

class Keyboard {
  constructor(instance) {
    this.instance = instance

    if (isElement(instance.options.keyboard)) {
      this.element = instance.options.keyboard
    } else {
      this.element = this.instance.$trigger
    }

    this.KEYBOARD = keyboard(this.element)
    this.element.setAttribute('tabindex', 0)

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
      },
      this.instance.$trigger
    )

    bindEvent(
      this.instance.selfEventName(EVENTS.SHOWN),
      () => {
        const $active = instance.getActiveItems()

        if ($active.length === 0) {
          instance.highlightItem(0)
        } else {
          instance.highlightItem($active[0])
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

        if (
          $highlighted &&
          !instance.isItemDisabled($highlighted) &&
          !instance.isItemHided($highlighted)
        ) {
          instance.selectItem($highlighted)
          instance.hide()
        }
      }
      return false
    })

    this.KEYBOARD.down('up', () => {
      const $highlighted = instance.getHighlightedItem()
      const $items = instance.getItems()
      let index = $items.indexOf($highlighted)

      let $prev
      while (index > 0) {
        index--
        $prev = $items[index]
        if (!instance.isItemDisabled($prev) && !instance.isItemHided($prev)) {
          instance.highlightItem($prev)
          break
        }
      }
      return false
    })

    this.KEYBOARD.down('down', () => {
      const $highlighted = instance.getHighlightedItem()
      const $items = instance.getItems()
      let index = $items.indexOf($highlighted)

      let $next
      while (index < $items.length - 1) {
        index++
        $next = $items[index]
        if (!instance.isItemDisabled($next) && !instance.isItemHided($next)) {
          instance.highlightItem($next)
          break
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
