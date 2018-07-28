import { addClass, removeClass } from '@pluginjs/classes'
import { setStyle } from '@pluginjs/styled'
import { bindEvent } from '@pluginjs/events'
import { append, query } from '@pluginjs/dom'

class overlay {
  constructor(instance) {
    this.instance = instance
    this.options = instance.options
    this.classes = instance.classes
    this.init()
  }

  init() {
    this.overlay = this.instance.getElement('overlay')

    this.bind()
    this.setStyle()
    this.appendToBody()
  }

  setStyle() {
    setStyle(
      {
        height: window.document.innerHeight,
        position: 'absolute'
      },
      this.overlay
    )

    if (this.options.theme === null || this.options.theme === 'white') {
      addClass(this.classes.WHITE, this.overlay)
    } else {
      addClass(this.classes.BLACK, this.overlay)
    }
  }

  bind() {
    bindEvent(
      {
        type: 'click',
        handler: () => {
          if (this.options.clickBgClose) {
            this.close()
          }
        }
      },
      this.overlay
    )
  }

  appendToBody() {
    append(this.overlay, document.body)
  }

  hide() {
    this.overlay.style.display = 'none'
  }

  show() {
    this.overlay.style.display = ''

    this.fadeIn()
  }

  fadeIn() {
    this.reflow()
    addClass(this.classes.READY, this.overlay)
  }

  reflow() {
    return this.overlay.offsetHeight
  }

  fadeOut() {
    removeClass(this.classes.READY, this.overlay)
  }
}

export default overlay
