import { append } from '@pluginjs/dom'
import { isString, isPlainObject } from '@pluginjs/is'

import Base from './base'

class Image extends Base {
  constructor(instance) {
    super(instance)

    this.initialize()
  }

  initialize() {
    this.element = this.instance.createElement('image')

    if (isString(this.options.image)) {
      this.element.setAttribute('src', this.options.image)
    }

    if (isPlainObject(this.options.image)) {
      Object.keys(this.options.image).forEach(key => {
        this.element.setAttribute(`${key}`, this.options.image[key])
      })
    }

    append(this.element, this.instance.element)

    if (this.instance.options.loader) {
      this.element.addEventListener('load', () => {
        this.instance.loader.hide()
      })
    }
  }
}

export default Image
