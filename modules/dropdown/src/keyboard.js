import keyboard from '@pluginjs/keyboard'
import { bindEvent } from '@pluginjs/events'
import { addClass, removeClass } from '@pluginjs/classes'
import { compose } from '@pluginjs/utils'

class Keyboard {
  constructor(instance) {
    this.instance = instance
    this.initialize()
  }

  initialize() {
    this.KEYBOARD = keyboard(this.instance.element)
    if (!this.instance.options.inputLabel) {
      this.instance.element.setAttribute('tabindex', 0)
    }
    compose(
      bindEvent(this.instance.eventName('focus.keyboard'), () => {
        addClass(this.instance.classes.FOCUS, this.instance.$parent)
        this.bind()
      }),
      bindEvent(this.instance.eventName('blur.keyboard'), () => {
        this.unbind()
        removeClass(this.instance.classes.FOCUS, this.instance.$parent)
      })
    )(this.instance.element)

    this.instance.enter('keyboard')
  }

  bind() {
    this.KEYBOARD.on('down', 'enter', () => {
      if (this.instance.is('show')) {
        this.instance.set(
          this.instance.$items[this.instance.$markIndex].dataset[
            this.instance.options.itemValueAttr
          ]
        )
      }

      this.instance.toggle()
    })

    this.KEYBOARD.on('down', 'esc', () => {
      if (!this.instance.is('show')) {
        return false
      }

      this.instance.hide()

      return null
    })

    this.KEYBOARD.on('down', 'up', () => {
      this.instance.markItem('up')

      return false
    })

    this.KEYBOARD.on('down', 'down', () => {
      this.instance.markItem('down')

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
