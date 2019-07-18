import { transitionEndEvent } from '@pluginjs/feature'
import { addClass } from '@pluginjs/classes'
import { find, query, append, children } from '@pluginjs/dom'
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

    const $children = children(this.element)

    append(
      `<div class='${this.instance.classes.CHUNKINNER}'></div>`,
      this.element
    )
    this.chunkInner = find(`.${this.instance.classes.CHUNKINNER}`, this.element)

    $children.forEach(child => {
      append(child, this.chunkInner)
    })

    this.index = this.options.index

    // aspectRatio => [width, height]
    const aspectRatio = this.compileAspectRatio(this.options.aspectRatio)

    // element Attribute First
    // this.width = aspectRatio[0] || this.element.offsetWidth || 1
    // this.height = aspectRatio[1] || this.element.offsetHeight || 1

    this.width =
      aspectRatio[0] || parseFloat(getStyle('width', this.element), 10) || 1
    this.height =
      aspectRatio[1] || parseFloat(getStyle('height', this.element), 10) || 1

    this.aspectRatio = this.width / this.height

    this.col = parseInt(this.options.col, 10) || 1
    this.row = parseInt(this.options.row, 10) || 1

    this.img = this.instance.options.imgSelector
      ? query(this.instance.options.imgSelector, this.element)
      : query('img', this.element)

    if (this.img) {
      let loader = ''

      if (this.instance.options.loader) {
        loader = Loader.of(this.chunkInner, this.instance.options.loader)
        loader.show()
      }

      ImageLoader.of(this.img).on('loaded', () => {
        if (this.instance.options.loader) {
          loader.hide()
        }
        addClass(this.instance.classes.IMAGELOADED, this.chunkInner)
      })

      ImageLoader.of(this.img).on('error', () => {
        if (this.instance.options.loader) {
          loader.hide()
        }
        addClass(this.instance.classes.IMAGEERROR, this.chunkInner)
      })
    }

    if (this.col > 2 || this.row > 2) {
      return
    }

    this.info = {
      x: this.getPosition().x,
      y: this.getPosition().y,
      width: this.width,
      height: this.height
    }

    this.movePosition = {
      x: this.info.x,
      y: this.info.y
    }

    this.sort = this.options.sort ? this.parseSort() : null

    this.tags = this.options.tags
      ? this.instance.options.parseTagsStr(this.options.tags)
      : null

    if (this.tags) {
      this.tags.forEach((item, index) => {
        this.tags[index] = item.trim()
      })
    }

    if (this.instance.options.model === 'justified') {
      this.element.dataset.aspectRatio = `${this.width}:${this.height}`
    }

    if (this.instance.options.model === 'nested') {
      this.element.dataset.col = this.col
      this.element.dataset.row = this.row
    }

    this.element.dataset.index = this.index
  }

  compileAspectRatio(aspectRatio) {
    if (!aspectRatio) {
      return false
    }

    return aspectRatio.split(':')
  }

  getPosition() {
    return {
      x: this.element.offsetLeft,
      y: this.element.offsetTop
    }
  }

  parseSort() {
    return isObject(this.options.sort)
      ? this.options.sort
      : JSON.parse(this.options.sort)
  }

  setSize(size) {
    const { width, height } = size

    // const duration = this.getDuration()

    setStyle(
      {
        width,
        height
        // transition: `width ${duration}ms, height ${duration}ms`
      },
      this.element
    )

    // size.width = parseFloat(getStyle('width', this.element), 10)
    // size.height = parseFloat(getStyle('height', this.element), 10)

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
