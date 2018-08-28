import template from '@pluginjs/template'
import { addClass, removeClass } from '@pluginjs/classes'
import { setStyle } from '@pluginjs/styled'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { wrap } from '@pluginjs/dom'

class Base {
  constructor(instance) {
    this.instance = instance
    this.options = instance.options
    this.classes = instance.classes
    this.element = instance.element
    this.getClass = instance.getClass
    this.initBase()
  }

  initBase() {
    this.container = wrap(this.creatHTML('container'), this.element)
    addClass(this.getClass('{namespace}-image'), this.element)
    this.largeWidth = this.instance.largeWidth * this.options.level
    this.largeHeight = this.instance.largeHeight * this.options.level

    this.classNames = {
      hide: [
        this.getClass('{namespace}-hide'),
        this.getClass('{namespace}-show')
      ],
      show: [
        this.getClass('{namespace}-show'),
        this.getClass('{namespace}-hide')
      ],
      in: [
        this.getClass('{namespace}-fadeIn'),
        this.getClass('{namespace}-fadeOut')
      ],
      out: [
        this.getClass('{namespace}-fadeOut'),
        this.getClass('{namespace}-fadeIn')
      ],
      zoomIn: [
        this.getClass('{namespace}-zoomIn'),
        this.getClass('{namespace}-zoomOut')
      ],
      zoomOut: [
        this.getClass('{namespace}-zoomOut'),
        this.getClass('{namespace}-zoomIn')
      ]
    }
  }

  getElementOffset() {
    const o = this.offset(this.element)
    o.width = this.element.clientWidth
    o.height = this.element.clientHeight
    return o
  }

  offset(el) {
    const box = el.getBoundingClientRect()

    return {
      top: box.top + window.pageYOffset - document.documentElement.clientTop,
      left: box.left + window.pageXOffset - document.documentElement.clientLeft
    }
  }

  bind() {
    const mousemoveCallback = e => {
      if (this.lastX !== e.clientX || this.lastY !== e.clientY) {
        if (!this.instance.is('disabled')) {
          this.setPosition(e)
        }
      }
      this.lastX = e.clientX
      this.lastY = e.clientY
    }

    const mouseleaveCallback = () => {
      this.changeStatus('hide')
    }

    const mouseenterCallback = () => {
      const o = this.getElementOffset()
      const offset = JSON.stringify(o)
      if (this.lastOffset !== offset) {
        this.setStyle()
        this.lastOffset = offset
      }
    }
    bindEvent(
      this.instance.eventName('mousemove'),
      mousemoveCallback,
      this.container
    )
    bindEvent(
      this.instance.eventName('mouseleave'),
      mouseleaveCallback,
      this.container
    )
    bindEvent(
      this.instance.eventName('mouseenter'),
      mouseenterCallback,
      this.container
    )
    bindEvent(
      this.instance.eventName('touchmove'),
      mousemoveCallback,
      this.container
    )
    bindEvent(
      this.instance.eventName('touchend'),
      mouseleaveCallback,
      this.container
    )
    bindEvent(
      this.instance.eventName('touchstart'),
      mouseenterCallback,
      this.container
    )
  }

  unbind() {
    removeEvent(this.instance.eventName(), this.container)
  }

  addClass(element, name) {
    const key = Object.keys(this.classNames)
    if (key.includes(name)) {
      const addClassName = this.classNames[name][0]
      const removeClassName = this.classNames[name][1]
      removeClass(removeClassName, element)
      addClass(addClassName, element)
    }
  }

  setRatio() {
    const offset = this.getElementOffset()
    this.widthRatio = this.largeWidth / offset.width
    this.heightRatio = this.largeHeight / offset.height
  }

  setContainerStyle() {
    const offset = this.getElementOffset()
    const borderWidth = this.element.getStyle('border-left-width')
    const b = parseInt(borderWidth.slice(0, borderWidth.length - 2), 10)
    setStyle(
      {
        height: offset.height,
        width: offset.width,
        top: `${offset.top + b}px`,
        left: `${offset.left + b}px`
      },
      this.container
    )
  }

  creatHTML(name) {
    const html = template.render(this.options.templates[name].call(this), {
      classes: this.classes
    })

    return html
  }
}

export default Base
