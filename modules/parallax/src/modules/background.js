import { setStyle } from '@pluginjs/styled'

import Base from './base'

class Background extends Base {
  constructor(instance) {
    super(instance)

    this.initialize()
  }

  initialize() {
    this.element = this.instance.element

    const img = document.createElement('img')
    img.src = this.options.imageSrc

    setStyle('background-image', `url(${this.options.imageSrc})`, this.element)

    img.addEventListener('load', () => {
      this.instance.loader.hide()
    })
  }
}

export default Background
