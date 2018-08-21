import { addClass } from '@pluginjs/classes'
import { find, append, children } from '@pluginjs/dom'
import { setStyle, getStyle } from '@pluginjs/styled'

class Item {
  constructor(instanced, el, opts) {
    this.api = instanced
    this.$el = el

    this.opts = Object.assign({}, opts, this.$el.dataset)

    this.init()
  }

  /* eslint-disable */
  init() {
    addClass(this.api.classes.CHUNK, this.$el)

    const $children = children(this.$el)

    append(`<div class='${this.api.classes.CHUNKINNER}'></div>`, this.$el)
    const $chunkInner = find(`.${this.api.classes.CHUNKINNER}`, this.$el)

    $children.forEach(child => {
      append(child, $chunkInner)
    })

    this.index = this.opts.index

    // aspectRatio => [width, height]
    const aspectRatio = this.compileAspectRatio(this.opts.aspectRatio)

    // element Attribute First
    this.width = aspectRatio[0] || this.$el.offsetWidth || 1
    this.height = aspectRatio[1] || this.$el.offsetHeight || 1

    this.aspectRatio = this.width / this.height

    this.col = parseInt(this.opts.col, 10) || 1
    this.row = parseInt(this.opts.row, 10) || 1

    if (this.col > 2 || this.row > 2) {
      return false
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

    this.sort = this.opts.sort ? JSON.parse(this.opts.sort) : null
    this.tags = this.opts.tags
      ? this.api.options.parseTagsStr(this.opts.tags)
      : null

    this.$el.dataset.index = this.index
  }

  compileAspectRatio(aspectRatio) {
    if (!aspectRatio) {
      return false
    }

    return aspectRatio.split(':')
  }

  getPosition() {
    return {
      x: this.$el.offsetLeft,
      y: this.$el.offsetTop
    }
  }

  setSize(size) {
    const { width, height } = size

    const duration = this.getDuration()

    setStyle(
      {
        width: `${width}px`,
        height: `${height}px`,
        transition: `width ${duration}ms, height ${duration}ms`
      },
      this.$el
    )

    this.info = Object.assign({}, this.info, size)
  }

  getDuration() {
    return parseFloat(this.api.options.duration, 10)
  }

  moveTo(position) {
    const el = this.$el[0]
    const duration = this.getDuration()
    setStyle(
      {
        transform: `translate3d(${position.x -
          parseFloat(getStyle('left', this.$el), 10)}px, ${position.y -
          parseFloat(getStyle('top', this.$el), 10)}px, 0)`,
        transition: `transform ${duration}ms`
      },
      this.$el
    )

    this.info.x = position.x
    this.info.y = position.y
  }

  show(index) {
    this.api.ANIMATE.show(this)
  }

  hide(index) {
    this.api.ANIMATE.hide(this)
  }
}

export default Item
