import { setStyle } from '@pluginjs/styled'

import Base from './base'

class Background extends Base {
  constructor(instance) {
    super(instance)

    this.initialize()
  }

  initialize() {
    this.element = this.instance.element

    setStyle('background-image', `url(${this.options.imageSrc})`, this.element)

    const backgroundFromDom = window
      .getComputedStyle(this.element)
      .getPropertyValue('background-image')

    if (backgroundFromDom !== 'none') {
      this.instance.loader.hide()
    }
    // this.element.addEventListener('load', () => {
    //   this.instance.loader.hide()
    // })
  }
}

export default Background
