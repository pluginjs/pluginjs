import { transitionProperty } from '@pluginjs/feature'
import { setStyle, getStyle, offset } from '@pluginjs/styled'
import { bindEvent } from '@pluginjs/events'
import { addClass, removeClass } from '@pluginjs/classes'
import { append, query, clone } from '@pluginjs/dom'

class zoomEngine {
  constructor(instance) {
    this.instance = instance
    this.options = {
      duration: 300,
      easing: 'ease-in-out',
      opener: element =>
        element.nodeName.toLowerCase() === 'img'
          ? element
          : query('img', element)
    }

    this.init()
  }

  init() {
    bindEvent(
      `${this.instance.plugin}:show`,
      this.zoomIn.bind(this),
      this.instance.element
    )

    bindEvent(
      `${this.instance.plugin}:close`,
      this.zoomOut.bind(this),
      this.instance.element
    )

    // bindEvent(
    //   `${this.instance.plugin}:loaded`,
    //   this.loaded.bind(this)
    // , this.instance.element)
  }

  loaded(event) {
    const item = event.detail.data[0]
    if (
      this.instance.is('show') &&
      this.instance.items[this.instance.activeIndex] === item &&
      this.instance.openIndex === this.instance.activeIndex
    ) {
      this.zoomIn()
    }
  }

  zoomIn() {
    this.currentItem = this.getItemToZoom()
    if (!this.currentItem.loaded || this.currentItem.type !== 'image') {
      return
    }

    const largeImg = this.instance.slide.getCurrentImage()
    setStyle('visibility', 'hidden', largeImg)

    const img = this.getElToAnimate(largeImg)
    setStyle(this.getOffset(this.options.opener(this.currentItem.element)), img)
    append(img, this.instance.wrap)

    setTimeout(() => {
      setStyle(this.getOffset(largeImg), img)
      setTimeout(() => {
        setStyle('visibility', 'visible', largeImg)
        img.remove()
      }, this.options.duration)
    }, 16)
  }

  zoomOut() {
    this.currentItem = this.getItemToZoom()
    if (!this.currentItem.loaded || this.currentItem.type !== 'image') {
      return
    }

    const largeImg = this.instance.slide.getCurrentImage()

    const img = this.getElToAnimate(largeImg)
    setStyle(this.getOffset(largeImg), img)
    append(img, this.instance.wrap)
    setStyle('visibility', 'hidden', largeImg)

    setTimeout(() => {
      setStyle(
        this.getOffset(this.options.opener(this.currentItem.element)),
        img
      )
      setTimeout(() => {
        setStyle('visibility', 'visible', largeImg)
        img.remove()
      }, this.options.duration)
    }, 16)
  }

  getOffset(el) {
    const offsetValue = offset(el)
    const paddingTop = parseInt(
      getStyle('padding-top', el).replace('px', ''),
      10
    )
    const paddingBottom = parseInt(
      getStyle('padding-bottom', el).replace('px', ''),
      10
    )
    offsetValue.top -= this.scrollTop() - paddingTop
    return {
      width: el.clientWidth,
      height: el.clientHeight,
      ...offsetValue
    }
  }

  showMainContent() {
    this.instance.slide.fadeIn()
  }

  getItemToZoom() {
    return this.instance.items[this.instance.activeIndex]
  }

  scrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop
  }

  getElToAnimate(image) {
    const cssObj = {
      position: 'fixed',
      zIndex: 9999,
      left: 0,
      top: 0,
      '-webkit-backface-visibility': 'hidden'
    }

    cssObj[transitionProperty()] = `all ${this.options.duration / 1000}s ${
      this.options.easing
    }`
    const img = clone(image)
    img.style = ''
    img.classList.forEach(c => removeClass(c, img))
    addClass(this.instance.getClass('{namespace}-animated-image'), img)
    setStyle(cssObj, img)
    return img
  }

  static init(instance) {
    return new this(instance)
  }
}

export default zoomEngine
