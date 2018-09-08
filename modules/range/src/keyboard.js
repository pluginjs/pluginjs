import keyboard from '@pluginjs/keyboard'
import { bindEvent } from '@pluginjs/events'

class Keyboard {
  constructor(instance) {
    this.instance = instance
    this.initialize()
  }

  initialize() {
    this.KEYBOARD = keyboard(this.instance.$control)

    this.instance.pointers.forEach(pointer => {
      pointer.element.setAttribute('tabindex', 0)
      bindEvent(
        this.instance.eventName('focus'),
        () => {
          pointer.active()
          this.bind(pointer)
        },
        pointer.element
      )
      bindEvent(
        this.instance.eventName('blur'),
        () => {
          pointer.deactive()
          this.unbind()
        },
        pointer.element
      )
    })
  }

  bind(pointer) {
    this.KEYBOARD.down('left', () => {
      this.change('left', pointer)
    })

    this.KEYBOARD.down('right', () => {
      this.change('right', pointer)
    })
  }

  unbind() {
    this.KEYBOARD.down('left')
    this.KEYBOARD.down('right')
  }

  change(key, pointer) {
    let step = 1

    if (this.instance.options.step) {
      step = this.instance.options.step
    }

    if (key === 'right') {
      pointer.set(pointer.value + step)
    }

    if (key === 'left') {
      pointer.set(pointer.value - step)
    }
  }
}
export default Keyboard
