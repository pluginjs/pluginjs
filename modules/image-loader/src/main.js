import { isString } from '@pluginjs/is'
import SimpleEmitter from '@pluginjs/simple-emitter'

export default class ImageLoader extends SimpleEmitter {
  constructor(element, autoload = true) {
    super()

    this.element = element
    this.img = new Image()

    if (!isString(this.element) && this.element.nodeName === 'PICTURE') {
      this.picture = this.element.querySelector('img')
    }

    if (autoload) {
      this.load()
    }
  }

  static of(...args) {
    return new this(...args)
  }

  isLoaded() {
    if (!isString(this.element)) {
      if (this.element.nodeName === 'IMG') {
        return this.element.complete && this.element.naturalWidth
      } else if (this.element.nodeName === 'PICTURE') {
        return this.picture.complete && this.picture.naturalWidth
      }
    }
    return this.img.complete && this.img.naturalWidth
  }

  getBackgroundSrc() {
    const style = getComputedStyle(this.element)

    if (style) {
      const reURL = /url\((['"])?(.*?)\1\)/gi
      const matches = reURL.exec(style.backgroundImage)
      if (matches) {
        return matches[2]
      }
    }

    return ''
  }

  load() {
    if (this.isLoaded()) {
      this.trigger('loaded')
      this.trigger('always', true)
      return
    }

    this.bind()
  }

  handleEvent(event) {
    const method = `on${event.type}`
    if (this[method]) {
      this[method](event)
    }
  }

  bind() {
    this.img.addEventListener('load', this)
    this.img.addEventListener('error', this)

    if (!isString(this.element)) {
      if (this.element.nodeName === 'IMG') {
        this.element.addEventListener('load', this)
        this.element.addEventListener('error', this)

        this.img.src = this.element.src
        this.img.srcset = this.element.srcset
        this.img.sizes = this.img.sizes
      } else if (this.element.nodeName === 'PICTURE') {
        this.picture.addEventListener('load', this)
        this.picture.addEventListener('error', this)

        this.img.src = this.picture.src
        this.img.srcset = this.picture.srcset
        this.img.sizes = this.picture.sizes
      } else {
        const src = this.getBackgroundSrc()

        if (src) {
          this.img.src = src
        }
      }
    } else {
      this.img.src = this.element
    }
  }

  onerror() {
    this.trigger('error')
    this.trigger('always', false)
    this.unbind()
  }

  onload() {
    this.trigger('loaded')
    this.trigger('always', true)
    this.unbind()
  }

  trigger(event, ...args) {
    this.emit(event, this.element, ...args)
  }

  unbind() {
    if (!isString(this.element)) {
      if (this.element.nodeName === 'IMG') {
        this.element.removeEventListener('load', this)
        this.element.removeEventListener('error', this)
      } else if (this.element.nodeName === 'PICTURE') {
        this.picture.removeEventListener('load', this)
        this.picture.removeEventListener('error', this)
      }
    }

    this.img.removeEventListener('load', this)
    this.img.removeEventListener('error', this)
  }
}
