import anime from 'animejs'
import { addClass, removeClass } from '@pluginjs/classes'
import { wrap, query } from '@pluginjs/dom'
import { isObject } from '@pluginjs/is'

import { outerWidth, outerHeight, setStyle } from '@pluginjs/styled'

import ImageLoader from '@pluginjs/image-loader'
import Loader from '@pluginjs/loader'

import EFFECTS from './effects'

class Item {
  constructor(instance, element, options) {
    this.instance = instance
    this.element = element
    this.options = Object.assign(
      {},
      this.instance.options,
      options,
      this.element.dataset
    )
    this.init()
  }

  init() {
    addClass(this.instance.classes.CHUNK, this.element)

    this.index = this.options.index
    this.length = this.options.length
    this.col = 0
    this.colSpan = 1
    this.effect = this.getEffect()

    this.position = { x: 0, y: 0 }
    this.width = this.getWidth(true)
    this.height = this.getHeight()

    this.initLoader()

    setStyle(
      {
        position: 'absolute'
      },
      this.element
    )
  }

  getWidth(isFloat = false) {
    return outerWidth(true, this.element, isFloat) + this.options.gutter
  }

  getHeight(isFloat = false) {
    return outerHeight(true, this.element, isFloat)
  }

  initLoader() {
    if (!this.options.imageLoader) {
      return
    }

    const $image = query('img', this.element)
    if (!$image) {
      return
    }

    const $wrap = document.createElement('div')

    addClass(this.instance.classes.IMAGEWRAP, $wrap)
    wrap($wrap, $image)

    this.loader = this.options.loader
      ? Loader.of($wrap, this.options.loader)
      : {}
    this.toggleLoader(true)

    addClass(this.instance.classes.IMAGELOADING, $wrap)

    ImageLoader.of($image, {
      background: this.options.imageBackground
    })
      .on('loaded', () => {
        this.toggleLoader(false)
        removeClass(this.instance.classes.IMAGELOADING, $wrap)
        addClass(this.instance.classes.IMAGELOADED, $wrap)

        this.instance.trigger(this.instance.events.IMAGELOADED)
      })
      .on('error', () => {
        this.toggleLoader(false)
        removeClass(this.instance.classes.IMAGELOADING, $wrap)
        addClass(this.instance.classes.IMAGEERROR, $wrap)

        this.instance.trigger(this.instance.events.IMAGEERROR)
      })
  }

  toggleLoader(show) {
    if (!this.options.loader) {
      return
    }

    if (show) {
      this.loader.show()
    } else {
      this.loader.hide()
    }
  }

  render(intact = false) {
    const spanCols = []
    let isOver = false

    this.width = this.getWidth(true)
    this.height = this.getHeight()
    this.colSpan = this.getColSpan()

    let spanColsNum = this.instance.colsNum + 1 - this.colSpan
    spanColsNum = spanColsNum < 1 ? this.instance.colsNum : spanColsNum

    for (let i = 0; i < spanColsNum; i++) {
      spanCols[i] =
        this.colSpan < 2
          ? this.instance.cols[i]
          : Math.max.apply(null, this.instance.cols.slice(i, i + this.colSpan))
    }

    const minHeight = Math.min.apply(null, spanCols)
    const maxHeight = Math.max.apply(null, spanCols)

    this.col = spanCols.indexOf(minHeight)
    isOver = this.col + this.colSpan > this.instance.colsNum
    this.col = isOver ? 0 : this.col

    this.position.x =
      (parseInt(this.instance.colWidth * 1000, 10) / 1000) * this.col
    this.position.y = isOver ? maxHeight : minHeight

    this.setPosition(this.position, intact)

    const maxCol = isOver ? this.instance.colsNum : this.col + this.colSpan
    for (let j = this.col; j < maxCol; j++) {
      this.instance.cols[j] += this.height
      this.instance.cols[j] = Math.max(
        this.position.y + this.height,
        this.instance.cols[j]
      )
    }
  }

  getEffect() {
    if (!this.options.animate) {
      return false
    }

    return EFFECTS[this.options.animate] || EFFECTS.fadeInUp
  }

  setPosition(position, intact = true) {
    anime(
      this.getAnimeConfig(position, intact ? this.effect : this.effect && true)
    )
  }

  getAnimeConfig(position, effect) {
    const config = {
      targets: this.element,
      easing: 'easeOutQuad',
      duration: effect ? this.options.duration : 0
    }

    if (isObject(effect)) {
      for (const key in effect) {
        if (effect[key]) {
          const value = effect[key]

          config[key] = typeof value === 'function' ? value.call(this) : value
        }
      }
    } else {
      config.translateX = position.x
      config.translateY = position.y
    }

    return config
  }

  getColSpan() {
    return Math.ceil(this.width / this.instance.colWidth)
  }
}

export default Item
