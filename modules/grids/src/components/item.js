import anime from 'animejs'
import { addClass, removeClass } from '@pluginjs/classes'
import { query } from '@pluginjs/dom'
import { setStyle } from '@pluginjs/styled'
import { isObject } from '@pluginjs/is'

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

    const aspectRatio = this.renderAspectRatio(this.options.ratio)
    this.widthRatio = aspectRatio[0] || 1
    this.heightRatio = aspectRatio[1] || 1
    this.aspectRatio = this.widthRatio / this.heightRatio
    this.imageRatio = (this.heightRatio / this.widthRatio) * 100
    this.effect = this.getEffect()
    this.index = this.options.index
    this.length = this.options.length
    this.position = { x: 0, y: 0 }
    this.element.dataset.index = this.index

    this.initLoader()
  }

  initLoader() {
    this.img = this.instance.options.imgSelector
      ? query(this.instance.options.imgSelector, this.element)
      : query('img', this.element)

    addClass(this.instance.classes.IMAGE, this.img)

    setStyle(
      {
        paddingBottom: `${this.imageRatio}%`
      },
      this.img
    )

    if (!this.instance.options.imageLoader || !this.img) {
      return
    }

    this.loader = this.instance.options.loader
      ? Loader.of(this.element, this.instance.options.loader)
      : {}

    this.toggleLoader(true)

    addClass(this.instance.classes.IMAGELOADING, this.element)

    ImageLoader.of(this.img)
      .on('loaded', () => {
        this.toggleLoader(false)
        removeClass(this.instance.classes.IMAGELOADING, this.element)
        addClass(this.instance.classes.IMAGELOADED, this.element)
        this.instance.trigger(this.instance.events.IMAGELOADED)
      })
      .on('error', () => {
        this.toggleLoader(false)
        removeClass(this.instance.classes.IMAGELOADING, this.element)
        addClass(this.instance.classes.IMAGEERROR, this.element)
        this.instance.trigger(this.instance.events.IMAGEERROR)
      })
  }

  toggleLoader(show) {
    if (!this.instance.options.loader) {
      return
    }

    if (show) {
      this.loader.show()
    } else {
      this.loader.hide()
    }
  }

  renderAspectRatio(aspectRatio) {
    if (!aspectRatio) {
      return false
    }

    return aspectRatio.split(':')
  }

  setSize(width) {
    this.width = width
    this.height = this.width / this.aspectRatio

    setStyle(
      {
        width: this.width,
        height: this.height
      },
      this.element
    )
  }

  render(effect) {
    setStyle(
      {
        position: 'absolute'
      },
      this.element
    )

    this.setPosition(this.position, effect)
  }

  setPosition(position, effect) {
    anime(
      this.getAnimeConfig(position, effect ? this.effect : this.effect && true)
    )
  }

  getAnimeConfig(position, effect) {
    const config = {
      targets: this.element,
      easing: 'cubicBezier(0.25, 0.1, 0.25, 1)',
      duration: effect ? this.getDuration() : 0
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

  getEffect() {
    if (!this.instance.options.animate) {
      return false
    }

    return EFFECTS[this.instance.options.animate] || EFFECTS.fadeInUp
  }

  getDuration() {
    return parseFloat(this.instance.options.duration, 10)
  }
}

export default Item
