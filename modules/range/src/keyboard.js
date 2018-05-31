import keyboard from '@pluginjs/keyboard'
import { bindEvent } from '@pluginjs/events'

class Keyboard {
  constructor(instance) {
    this.instance = instance
    this.initialize()
  }

  initialize() {
    this.KEYBOARD = keyboard.init(this.instance.$control)

    // make ul div etc. get focus
    this.instance.pointer.forEach(val => {
      val.element.setAttribute('tabindex', 0)
      bindEvent(
        {
          type: this.instance.eventName('focus'),
          handler: () => {
            this.bind(val)
          }
        },
        val.element
      )
      bindEvent(
        {
          type: this.instance.eventName('blur'),
          handler: () => {
            this.unbind()
          }
        },
        val.element
      )
    })
  }

  change(key, el) {
    let step
    let val

    if (this.instance.options.step && !this.instance.options.units) {
      step = this.instance.options.step
    } else if (this.instance.options.units) {
      step = this.instance.step
    } else {
      step = 1
    }

    if (key === 'right') {
      val = el.value
      el.set(val + step)
    }

    if (key === 'left') {
      val = el.value
      el.set(val - step)
    }
  }

  bind(el) {
    if (this.instance.is('keyboardBind')) {
      return
    }

    this.instance.enter('keyboardBind')

    this.KEYBOARD.down('left', () => {
      this.change('left', el)
    })

    this.KEYBOARD.down('right', () => {
      this.change('right', el)
    })
  }

  unbind() {
    this.instance.leave('keyboardBind')
    this.KEYBOARD.down('left')
    this.KEYBOARD.down('right')
  }
}
export default Keyboard
