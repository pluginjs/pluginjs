import keyboard from '@pluginjs/keyboard'

class Keyboard {
  constructor(instance) {
    this.instance = instance
    this.initialize()
  }

  initialize() {
    this.KEYBOARD = keyboard()

    this.bind()
  }

  bind() {
    this.KEYBOARD.down('left', () => {
      this.instance.back()
      return false
    })

    this.KEYBOARD.down('right', () => {
      this.instance.next()
      return false
    })
  }

  unbind() {
    this.KEYBOARD.down('left')
    this.KEYBOARD.down('right')
  }
}
export default Keyboard
