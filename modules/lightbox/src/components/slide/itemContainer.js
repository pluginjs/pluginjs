import { addClass, removeClass } from '@pluginjs/classes'
import { setStyle } from '@pluginjs/styled'
import { append, query } from '@pluginjs/dom'
import Image from './modules/image'
import Video from './modules/video'
import Map from './modules/map'
import Iframe from './modules/iframe'
import Inline from './modules/inline'

class ItemContainer {
  constructor(instance) {
    this.instance = instance
    this.options = instance.options
    this.classes = instance.classes
    this.items = instance.items

    this.init()
  }

  init() {
    this.item = this.instance.getElement('item')
    this.inner = query(`.${this.classes.ITEMINNER}`, this.item)
    // this.instance.lastType = ''
    this.lastType = 'null'
    // console.log('text inner', this.inner.length)
    // this.uptate()
    this.updateType = {
      image: () => {
        this.updateImage()
      },
      video: () => {
        this.updateVideo()
      },
      map: () => {
        this.updateMap()
      },
      iframe: () => {
        this.updateIframe()
      },
      inline: () => {
        this.updateInline()
      }
    }

    this.removeType = {
      image: () => {
        this.image.remove()
      },
      video: () => {
        this.video.remove()
      },
      map: () => {
        this.map.remove()
      },
      iframe: () => {
        this.iframe.remove()
      },
      inline: () => {
        this.inline.remove()
      },
      null: () => {
        return
      }
    }

    this.addSrc = {
      map: () => {
        this.map.addScr(this.index)

        this.instance.iframe = this.map
      },
      iframe: () => {
        this.iframe.addScr(this.index)
        this.instance.iframe = this.iframe
      }
    }
  }

  appendTo(el) {
    append(this.item, el)
  }

  left(size) {
    const left = size * Pj.windowWidth
    setStyle({ left }, this.item)
  }

  getImage() {
    if (['image'].includes(this.type)) {
      return this[this.type].image
    }
  }

  update(index) {
    const type = this.items[index].type
    if (this.index !== index) {
      this.index = index
      this.type = type

      this.updateType[this.type]()
      this.lastType = this.type
      if (
        this.index === this.instance.activeIndex &&
        (type === 'map' || type === 'iframe')
      ) {
        this.addSrc[type]()
      }
    } else if (
      this.index === this.instance.activeIndex &&
      (type === 'map' || type === 'iframe')
    ) {
      this.addSrc[type]()
    } else if (
      this.index !== this.instance.activeIndex &&
      (type === 'map' || type === 'iframe')
    ) {
      if (this.map) {
        this.map.resetSrc()
      }
      if (this.iframe) {
        this.iframe.resetSrc()
      }
    }
  }

  updateImage() {
    if (this.image === undefined) {
      this.image = new Image(this.instance)
      if (this.type !== this.lastType || this.lastType === 'null') {
        this.removeType[this.lastType]()
        this.image.appendTo(this.inner)
      }
      this.image.update(this.index)
    } else {
      if (this.type !== this.lastType || this.lastType === 'null') {
        this.removeType[this.lastType]()
        this.image.appendTo(this.inner)
      }
      this.image.update(this.index)
    }
  }

  updateVideo() {
    if (this.video === undefined) {
      this.video = new Video(this.instance)
      if (this.type !== this.lastType || this.lastType === 'null') {
        this.removeType[this.lastType]()
        this.video.appendTo(this.inner)
      }
      this.video.update(this.index)
    } else {
      if (this.type !== this.lastType || this.lastType === 'null') {
        this.removeType[this.lastType]()
        this.video.appendTo(this.inner)
      }
      this.video.update(this.index)
    }
  }

  updateMap() {
    if (this.map === undefined) {
      this.map = new Map(this.instance)
      if (this.type !== this.lastType || this.lastType === 'null') {
        this.removeType[this.lastType]()
        this.map.appendTo(this.inner)
      }
    } else if (this.type !== this.lastType || this.lastType === 'null') {
      this.removeType[this.lastType]()
      this.map.appendTo(this.inner)
    }
  }

  updateIframe() {
    if (this.iframe === undefined) {
      this.iframe = new Iframe(this.instance)
      if (this.type !== this.lastType || this.lastType === 'null') {
        this.removeType[this.lastType]()
        this.iframe.appendTo(this.inner)
      }
    } else if (this.type !== this.lastType || this.lastType === 'null') {
      this.removeType[this.lastType]()
      this.iframe.appendTo(this.inner)
    }
  }

  updateInline() {
    if (this.inline === undefined) {
      this.inline = new Inline(this.instance)
      if (this.type !== this.lastType || this.lastType === 'null') {
        this.removeType[this.lastType]()
        this.inline.appendTo(this.inner)
      }
      this.inline.update(this.index)
    } else {
      if (this.type !== this.lastType || this.lastType === 'null') {
        this.removeType[this.lastType]()
        this.inline.appendTo(this.inner)
      }
      this.inline.update(this.index)
    }
  }
}

export default ItemContainer
