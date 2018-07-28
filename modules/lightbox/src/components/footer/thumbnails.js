import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import { setStyle } from '@pluginjs/styled'
import { bindEvent } from '@pluginjs/events'
import { append, query } from '@pluginjs/dom'
import Pj from '@pluginjs/factory'

class Thumbnails {
  constructor(instance) {
    this.instance = instance
    this.options = instance.options
    this.classes = instance.classes
    this.items = instance.items
    this.init()
  }

  init() {
    this.thumbs = this.instance.getElement('thumbnails')
    this.inner = this.thumbs.children[0]
    this.elements = {}

    const length = this.instance.length
    for (let i = 1; i <= length; i++) {
      const item = this.instance.items[i]
      const itemHtml = this.instance.getElement('thumb')
      const image = itemHtml.children[0]
      image.dataset.index = i
      setStyle({ 'background-image': `url(${item.thumbHref})` }, image)
      append(itemHtml, this.inner)
      this.elements[i] = itemHtml
    }
    this.index = this.instance.activeIndex

    this.bind()
    this.goTo(this.instance.activeIndex)
  }

  bind() {
    bindEvent(
      {
        type: 'click',
        handler: event => {
          const target = event.target
          if (target.classList.contains(this.classes.THUMBBG)) {
            const data = parseInt(event.target.dataset.index)
            this.instance.goTo(data)
          }
        }
      },
      this.thumbs
    )

    Pj.emitter.on('resize', this.resizeHandle.bind(this))
  }

  resizeHandle() {
    this.straightGoTo(this.instance.activeIndex)
  }

  goTo(index) {
    if (!hasClass(this.classes.THUMBSTRANSITION, this.inner)) {
      addClass(this.classes.THUMBSTRANSITION, this.inner)
    }
    this.setTransform(index)

    this.addActiveClass(index)
  }

  straightGoTo(index) {
    if (hasClass(this.classes.THUMBSTRANSITION, this.inner)) {
      removeClass(this.classes.THUMBSTRANSITION, this.inner)
    }
    this.setTransform(index)

    this.addActiveClass(index)
  }

  setTransform(index) {
    const halfPosition = this.getHalfPosition()
    const baseSpace = 100 * (index - 1)
    const p = halfPosition - baseSpace
    setStyle({ transform: `translate3d(${p}px, 0px, 0px)` }, this.inner)
  }

  addActiveClass(index) {
    removeClass(this.classes.THUMBACTIVE, this.elements[this.index])
    this.index = index
    addClass(this.classes.THUMBACTIVE, this.elements[index])
  }

  getHalfPosition() {
    const p = window.document.documentElement.clientWidth / 2 - 50
    return Math.floor(p)
  }

  appendTo(element) {
    append(this.thumbs, element)
  }
}

export default Thumbnails
