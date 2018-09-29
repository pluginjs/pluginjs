import { append } from '@pluginjs/dom'

import Base from './base'

class Image extends Base {
  constructor(instance) {
    super(instance)

    this.initialize()
  }

  initialize() {
    this.element = this.instance.createElement('image')
    this.element.setAttribute('src', this.options.imageSrc)

    if (this.options.imageSrcset) {
      this.element.setAttribute('srcset', this.options.imageSrcset)
    }

    this.element.addEventListener('load', () => {
      this.instance.loader.hide()
      append(this.element, this.instance.element)
    })

    this.setModeAttributes()
  }
}

export default Image
