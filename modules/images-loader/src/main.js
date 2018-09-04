import { isArray } from '@pluginjs/is'
import ImageLoader from '@pluginjs/image-loader'
import SimpleEmitter from '@pluginjs/simple-emitter'

/** Credit to https://imagesloaded.desandro.com/ MIT */
export default class ImagesLoader extends SimpleEmitter {
  constructor(elements, autoload = true) {
    super()

    if (!isArray(elements)) {
      this.elements = Array.of(elements)
    } else if (
      elements instanceof NodeList ||
      elements instanceof HTMLCollection
    ) {
      this.elements = Array.from(elements)
    } else {
      this.elements = elements
    }

    this.getImages()

    if (autoload) {
      setTimeout(() => {
        this.load()
      })
    }
  }

  getImages() {
    this.images = []

    this.elements.forEach(el => this.addImage(el))
  }

  static of(...args) {
    return new this(...args)
  }

  addImage(img) {
    this.images.push(ImageLoader.of(img, false))
  }

  load() {
    this.progressedCount = 0
    this.hasAnyBroken = false

    if (!this.images.length) {
      this.complete()
      return
    }

    this.images.forEach(loader => {
      loader
        .on('always', ($img, loaded) => {
          this.progress($img, loaded)
        })
        .on('loaded', $img => {
          this.emit('loaded', this, $img)
        })
        .on('error', $img => {
          this.emit('error', this, $img)
        })
        .load()
    })
  }

  progress($img, loaded) {
    this.progressedCount++
    this.hasAnyBroken = this.hasAnyBroken || !loaded
    this.emit('progress', this, $img, loaded)

    if (this.progressedCount === this.images.length) {
      this.complete()
    }
  }

  complete() {
    const eventName = this.hasAnyBroken ? 'fail' : 'done'
    this.isComplete = true

    this.emit(eventName, this)
    this.emit('always', this)
  }
}
