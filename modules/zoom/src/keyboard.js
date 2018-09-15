import keyboard from '@pluginjs/keyboard'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { addClass, removeClass } from '@pluginjs/classes'

class Keyboard {
  constructor(instance) {
    this.instance = instance
    this.KEYBOARD = keyboard()

    if (instance.options.toggleOnEnter) {
      this.instance.element.setAttribute('tabindex', 0)
      bindEvent(
        this.instance.eventName('focus'),
        () => {
          this.KEYBOARD.down('enter', () => {
            this.instance.toggle()
          })
          addClass(this.instance.classes.FOCUS, this.instance.element)
        },
        this.instance.element
      )

      bindEvent(
        this.instance.eventName('blur'),
        () => {
          this.KEYBOARD.down('enter')
          removeClass(this.instance.classes.FOCUS, this.instance.element)
        },
        this.instance.element
      )
    }
  }

  bindESC() {
    this.KEYBOARD.down('esc', () => {
      this.instance.close()
    })
  }

  unbindESC() {
    this.KEYBOARD.down('esc')
  }

  destroy() {
    this.instance.element.removeAttribute('tabindex')
    removeEvent(this.instance.eventName('focus blur'), this.instance.element)
  }
}
export default Keyboard
