import { transitionEndEvent } from '@pluginjs/feature'
import { wrap, query } from '@pluginjs/dom'
import { addClass, removeClass } from '@pluginjs/classes'
import { setStyle, getStyle } from '@pluginjs/styled'
import { bindEventOnce } from '@pluginjs/events'
import { isObject } from '@pluginjs/is'

import ImageLoader from '@pluginjs/image-loader'
import Loader from '@pluginjs/loader'

class Item {
  constructor(instance, element, options) {
    this.instance = instance
    this.element = element
    this.options = Object.assign({}, options, this.element.dataset)
    this.init()
  }

  init() {
    addClass(this.instance.classes.CHUNK, this.element)

    this.index = this.options.index
    this.width = parseFloat(getStyle('width', this.element), 10)

    this.img = query('img', this.element)

    if (this.img) {
      const width = this.img.getAttribute('width')
      const height = this.img.getAttribute('height')

      const ratio = Math.round((height / width) * 100)

      const wrapper = wrap(
        `<div class="${this.instance.classes.IMGWRAPPER}"></div>`,
        this.img
      )

      setStyle({ paddingTop: `${ratio}%` }, wrapper)

      this.initLoader(wrapper, this.img)
    }

    this.info = {
      x: this.getPosition().x,
      y: this.getPosition().y,
      width: this.width
    }

    this.movePosition = {
      x: this.info.x,
      y: this.info.y
    }

    this.sort = this.options.sort ? this.parseSort() : null

    this.tags = this.options.tags
      ? this.instance.options.parseTagsStr(this.options.tags)
      : []

    if (this.tags) {
      this.tags.forEach((item, index) => {
        this.tags[index] = item.trim()
      })
    }

    this.element.dataset.index = this.index
  }

  parseSort() {
    return isObject(this.options.sort)
      ? this.options.sort
      : JSON.parse(this.options.sort)
  }

  initLoader(wrapper, img) {
    let loader = ''

    if (this.instance.options.loader) {
      loader = Loader.of(wrapper, this.instance.options.loader)
      loader.show()
    }

    if (this.instance.options.imageLoader) {
      addClass(this.instance.classes.IMAGELOADING, wrapper)

      ImageLoader.of(img).on('loaded', () => {
        if (this.instance.options.loader) {
          loader.hide()
        }
        removeClass(this.instance.classes.IMAGELOADING, wrapper)
        addClass(this.instance.classes.IMAGELOADED, wrapper)
      })

      ImageLoader.of(img).on('error', () => {
        if (this.instance.options.loader) {
          loader.hide()
        }
        removeClass(this.instance.classes.IMAGELOADING, wrapper)
        addClass(this.instance.classes.IMAGEERROR, wrapper)
      })
    } else if (this.instance.options.loader) {
      addClass(this.instance.classes.IMAGELOADED, wrapper)
      loader.hide()
    } else {
      addClass(this.instance.classes.IMAGELOADED, wrapper)
    }
  }

  getPosition() {
    return {
      x: this.element.offsetLeft,
      y: this.element.offsetTop
    }
  }

  setSize(size) {
    const { width } = size

    setStyle(
      {
        width
      },
      this.element
    )

    size.width = parseFloat(getStyle('width', this.element), 10)
    size.height = parseFloat(getStyle('height', this.element), 10)

    this.info = Object.assign({}, this.info, size)
  }

  getDuration() {
    return parseFloat(this.instance.options.duration, 10)
  }

  moveTo(position) {
    const duration = this.getDuration()

    setStyle(
      {
        transform: `translate3d(${position.x -
          parseFloat(getStyle('left', this.element), 10)}px, ${position.y -
          parseFloat(getStyle('top', this.element), 10)}px, 0)`,
        transition: `transform ${duration}ms`
      },
      this.element
    )

    bindEventOnce(
      transitionEndEvent(),
      () => {
        setStyle(
          {
            left: `${position.x}px`,
            top: `${position.y}px`
          },
          this.element
        )

        this.element.style.removeProperty('transition')
        this.element.style.removeProperty('transform')
      },
      this.element
    )

    this.info.x = position.x
    this.info.y = position.y
  }

  show() {
    this.instance.ANIMATE.show(this)
  }

  hide() {
    this.instance.ANIMATE.hide(this)
  }
}

export default Item
