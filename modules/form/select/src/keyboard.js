import keyboard from '@pluginjs/keyboard'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { addClass, removeClass } from '@pluginjs/classes'

class Keyboard {
  constructor(instance) {
    this.instance = instance
    this.initialize()
  }

  initialize() {
    this.KEYBOARD = keyboard.init(this.instance.label)

    if (!this.instance.options.filterable) {
      this.instance.label.setAttribute('tabindex', 0)
    }

    bindEvent(
      {
        type: this.instance.eventName('focus'),
        handler: () => {
          if (this.instance.is('focus') || this.instance.is('disabled')) {
            return
          }
          addClass(this.instance.classes.FOCUS, this.instance.wrap)
          this.bind()
          this.instance.enter('focus')
        }
      },
      this.instance.label
    )
    bindEvent(
      {
        type: this.instance.eventName('blur'),
        handler: () => {
          if (!this.instance.is('focus') || this.instance.is('disabled')) {
            return
          }
          this.unbind()
          removeClass(this.instance.classes.FOCUS, this.instance.wrap)
          this.instance.leave('focus')
        }
      },
      this.instance.label
    )
  }

  bind() {
    this.KEYBOARD.on('down', 'enter', () => {
      if (this.instance.dropdown.is('show')) {
        if (this.instance.items.length === 0) {
          return
        }
        this.instance.click(this.instance.items.eq(this.instance.markIndex))
      } else {
        this.instance.dropdown.show()
      }
      return
    })
      .on('down', 'esc', () => {
        if (this.instance.dropdown.is('show')) {
          this.instance.dropdown.hide()
          this.instance.label.blur()
        }
        return
      })
      .on('down', 'backspace', () => {
        if (
          !this.instance.options.multiple ||
          this.instance.selected.length === 0
        ) {
          return
        }
        if (this.instance.SEARCH.value !== null) {
          if (this.instance.SEARCH.value.length > 0) {
            return
          }
        }

        this.instance.set(
          this.instance.selected[this.instance.selected.length - 1],
          false
        )
      })
      .on('down', 'up', () => {
        if (!this.instance.dropdown.is('show')) {
          return
        }
        this.instance.markItem('up')
        return
      })
      .on('down', 'down', () => {
        if (!this.instance.dropdown.is('show')) {
          return
        }
        this.instance.markItem('down')
        return
      })
  }

  unbind() {
    this.KEYBOARD.off('down', 'up')
      .off('down', 'backspace')
      .off('down', 'down')
      .off('down', 'enter')
      .off('down', 'esc')
  }

  destroy() {
    removeEvent(this.instance.eventName(), this.instance.label)
    this.unbind()
  }
}
export default Keyboard
