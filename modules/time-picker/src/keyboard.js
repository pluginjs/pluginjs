import keyboard from '@pluginjs/keyboard'

class Keyboard {
  constructor(instance) {
    this.instance = instance
    this.initialize()
  }

  initialize() {
    this.KEYBOARD = keyboard(this.instance.$inputEl)
  }

  bind() {
    this.KEYBOARD.on('down', 'enter', () => {
      if (this.instance.dropdown.is('show')) {
        this.instance.dropdown.hide()
        this.instance.$inputEl.blur()
      }
      return
    })
      .on('down', 'esc', () => {
        if (this.instance.dropdown.is('show')) {
          this.instance.dropdown.hide()
          this.instance.$inputEl.blur()
        }
        return
      })
      .on('down', 'up', () => {
        if (this.instance.dropdown.is('show')) {
          this.instance.markItem('up')
        }
      })
      .on('down', 'down', () => {
        if (this.instance.dropdown.is('show')) {
          this.instance.markItem('down')
        }
      })
  }

  unbind() {
    this.KEYBOARD.off('down', 'up')
      .off('down', 'down')
      .off('down', 'enter')
      .off('down', 'esc')
  }

  destroy() {
    this.unbind()
  }
}
export default Keyboard
