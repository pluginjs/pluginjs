import { setStyle } from '@pluginjs/styled'
import { isString } from '@pluginjs/is'
import { query } from '@pluginjs/dom'

import Base from './base'

class Background extends Base {
  constructor(instance) {
    super(instance)

    this.initialize()
  }

  initialize() {
    this.element = this.instance.element

    if (this.options.image && isString(this.options.image)) {
      this.initBackground()
    } else if (query('img', this.instance.element)) {
      this.img = new Image()
      this.element = query('img', this.instance.element)
      this.img.src = this.element.src
      this.img.srcset = this.element.srcset
      this.img.sizes = this.element.sizes
      this.img.addEventListener('load', () => {
        this.instance.loader.hide()
      })
    }
  }

  initBackground() {
    const img = document.createElement('img')
    img.src = this.options.image

    setStyle('background-image', `url(${this.options.image})`, this.element)

    if (this.instance.options.loader) {
      img.addEventListener('load', () => {
        this.instance.loader.hide()
      })
    }
  }
}

export default Background
