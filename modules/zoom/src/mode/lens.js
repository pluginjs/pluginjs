import { transform } from '@pluginjs/feature'
import Base from './base'

import { addClass } from '@pluginjs/classes'
import { setStyle } from '@pluginjs/styled'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { append, parseHTML } from '@pluginjs/dom'

class Lens extends Base {
  constructor(instance) {
    super(instance)
    this.configuration = this.options[this.options.mode]
    this.init()
  }

  init() {
    this.lens = parseHTML(this.creatHTML('lens'))
    this.lensImage = parseHTML(this.creatHTML('lensImage'))
    append(this.lensImage, this.lens)
    append(this.lens, this.container)
    addClass(this.getClass('{namespace}-modeLens'), this.container)
    this.setStyle()

    const offset = this.getElementOffset()
    this.lastOffset = JSON.stringify(offset)

    this.bind()
  }

  setPosition(e) {
    const o = this.getElementOffset()
    this.mouseLeft = parseInt(e.pageX - o.left, 10)
    this.mouseTop = parseInt(e.pageY - o.top, 10)

    this.positionLeft = String(
      (this.mouseLeft * this.widthRatio -
        this.lens.clientWidth / 2 +
        this.configuration.borderSize) *
        -1
    )
    this.positionTop = String(
      (this.mouseTop * this.heightRatio -
        this.lens.clientHeight / 2 +
        this.configuration.borderSize) *
        -1
    )
    this.lensLeftPos = String(
      Math.floor(this.mouseLeft - this.lens.clientWidth / 2)
    )
    this.lensTopPos = String(
      Math.floor(this.mouseTop - this.lens.clientHeight / 2)
    )

    if (
      this.mouseLeft < 0 ||
      this.mouseTop < 0 ||
      this.mouseLeft > o.width ||
      this.mouseTop > o.height
    ) {
      this.changeStatus('hide')
      return
    }
    this.changeStatus('show')
    this.setLensPosition()
  }

  setLensPosition() {
    if (transform) {
      setStyle(
        { transform: `translate(${this.lensLeftPos}px, ${this.lensTopPos}px)` },
        this.lens
      )
      setStyle(
        {
          transform: `translate(${this.positionLeft}px, ${this.positionTop}px)`
        },
        this.lensImage
      )
    } else {
      setStyle(
        {
          left: `${this.lensLeftPos}px`,
          top: `${this.lensTopPos}px`
        },
        this.lens
      )
      setStyle(
        {
          left: `${this.positionLeft}px`,
          top: `${this.positionTop}px`
        },
        this.lensImage
      )
    }
  }

  setStyle() {
    this.setRatio()

    setStyle(
      {
        border: `${this.configuration.borderSize}px solid ${
          this.configuration.borderColor
        }`,
        width: `${this.configuration.size}px`,
        height: `${this.configuration.size}px`
      },
      this.lens
    )

    setStyle(
      {
        height: this.largeHeight,
        width: this.largeWidth,
        backgroundImage: `url(${this.instance.imageSrc})`
      },
      this.lensImage
    )

    setStyle({ overflow: 'hidden' }, this.container)

    if (!this.configuration.flexWidth) {
      setStyle({ width: this.element.clientWidth }, this.container)
    }

    if (this.configuration.lensShape === 'round') {
      setStyle(
        {
          'border-radius': `${this.configuration.size +
            this.configuration.size}px`
        },
        this.lens
      )
    }
  }

  changeStatus(status) {
    if (this.status !== status) {
      if (status === 'show') {
        removeEvent('animationend', this.lens)

        this.addClass(this.lens, status)
        this.addClass(this.lens, 'in')
      } else {
        this.addClass(this.lens, 'out')
        bindEvent(
          {
            type: 'animationend',
            handler: this.callback.bind(this)
          },
          this.lens
        )
      }

      this.status = status
    }
  }

  callback() {
    this.addClass(this.lens, 'hide')
    removeEvent('animationend', this.lens)
  }
}

export default Lens
