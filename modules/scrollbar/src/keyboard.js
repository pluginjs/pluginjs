import keyboard from '@pluginjs/keyboard'

class Keyboard {
  constructor(instance) {
    this.instance = instance
    this.initialize()
  }

  initialize() {
    this.KEYBOARD = keyboard.init()

    this.bind()
  }

  bind() {
    this.KEYBOARD.down('up', () => {
      this.update(-30)
      return false
    })

    this.KEYBOARD.down('down', () => {
      this.update(30)

      return false
    })

    this.KEYBOARD.down('left', () => {
      this.update(-30)
      return false
    })

    this.KEYBOARD.down('right', () => {
      this.update(30)
      return false
    })

    this.KEYBOARD.down('page_up', () => {
      this.update(-90)
      return false
    })

    this.KEYBOARD.down('page_down', () => {
      this.update(90)
      return false
    })

    this.KEYBOARD.down('home', () => {
      this.update(0, 'to')

      return false
    })

    this.KEYBOARD.down('end', () => {
      this.update('100%', 'to')
      return false
    })

    this.KEYBOARD.down('space', () => {
      this.update(90)
      return false
    })
  }

  update(val, key = 'by') {
    if (!this.instance.is('hovering')) {
      return undefined /* eslint-disable-line */
    }

    if (val === null) {
      return undefined /* eslint-disable-line */
    }

    switch (key) {
      case 'to':
        this.instance.moveTo(val, true)
        break
      case 'by':
        this.instance.moveBy(val, true)
        break
      default:
        break
    }

    return undefined /* eslint-disable-line */
  }

  unbind() {
    this.KEYBOARD.down('up')
    this.KEYBOARD.down('down')
    this.KEYBOARD.down('enter')
    this.KEYBOARD.down('esc')
  }
}
export default Keyboard
