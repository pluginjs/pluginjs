import keyboard from '@pluginjs/keyboard'
import { bindEvent } from '@pluginjs/events'

class Keyboard {
  constructor(instance) {
    this.instance = instance
    this.initialize()
  }

  initialize() {
    if (!this.instance.options.keyboard) {
      return
    }

    this.KEYBOARD = keyboard(this.instance.element)

    // make ul div etc. get focus
    this.instance.element.setAttribute('tabindex', '0')
    bindEvent(
      this.instance.eventName('focus'),
      () => {
        this.bind()
      },
      this.instance.element
    )

    bindEvent(
      this.instance.eventName('blur'),
      () => {
        this.unbind()
      },
      this.instance.element
    )
  }

  bind() {
    if (
      this.instance.options.labelPosition === 'left' ||
      this.instance.options.labelPosition === 'right'
    ) {
      this.KEYBOARD.down('up', () => {
        this.instance.prev()
      })
      this.KEYBOARD.down('down', () => {
        this.instance.next()
      })
    } else {
      this.KEYBOARD.down('left', () => {
        this.instance.prev()
      })
      this.KEYBOARD.down('right', () => {
        this.instance.next()
      })
    }
  }

  unbind() {
    this.KEYBOARD.down('up')
    this.KEYBOARD.down('down')
    this.KEYBOARD.down('left')
    this.KEYBOARD.down('right')
  }
}
export default Keyboard
