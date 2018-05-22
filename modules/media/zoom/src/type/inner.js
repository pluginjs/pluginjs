import { transform } from '@pluginjs/feature'

import Base from './base'
import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import { setStyle } from '@pluginjs/styled'
import { bindEvent, removeEvent } from '@pluginjs/events'
import {
  append,
  prepend,
  parseHTML,
  query,
  queryAll,
  getObjData,
  unwrap,
  wrap,
  wrapInner,
  insertBefore,
  insertAfter
} from '@pluginjs/dom'

class inner extends Base {
  constructor(instance) {
    super(instance)
    // this.configuration = this.options[this.options.type]
    this.init()
  }

  init() {
    this.window = parseHTML(this.creatHTML('window'))
    this.windowImage = query(`.${this.classes.WINDOWIMAGE}`, this.window)
    append(this.window, this.container)

    addClass(this.getClass('{namespace}-typeInner'), this.container)
    this.setStyle()

    const offset = this.getElementOffset()
    this.lastOffset = JSON.stringify(offset)

    this.bind()
  }

  setPosition(e) {
    const o = this.getElementOffset()
    this.mouseLeft = parseInt(e.pageX - o.left, 10)
    this.mouseTop = parseInt(e.pageY - o.top, 10)

    this.ontop = this.mouseTop < o.height / 2 / this.heightRatio
    this.onbom = this.mouseTop > o.height - o.height / 2 / this.heightRatio
    this.onleft = this.mouseLeft < 0 + o.width / 2 / this.widthRatio
    this.onright = this.mouseLeft > o.width - o.width / 2 / this.widthRatio

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
    this.setWindowPosition()
  }

  setWindowPosition() {
    this.windowLeftPos = String(
      (this.mouseLeft * this.widthRatio - this.window.clientWidth / 2) * -1
    )
    this.windowTopPos = String(
      (this.mouseTop * this.heightRatio - this.window.clientHeight / 2) * -1
    )
    if (this.ontop) {
      this.windowTopPos = 0
    }
    if (this.onleft) {
      this.windowLeftPos = 0
    }
    if (this.onbom) {
      this.windowTopPos =
        (this.instance.largeHeight * this.options.level -
          this.window.clientHeight) *
        -1
    }
    if (this.onright) {
      this.windowLeftPos =
        (this.instance.largeWidth * this.options.level -
          this.window.clientWidth) *
        -1
    }

    if (transform) {
      const backgroundPosition = `${this.windowLeftPos}px, ${
        this.windowTopPos
      }px`
      // console.log('text', backgroundPosition)
      setStyle(
        { transform: `translate(${backgroundPosition})` },
        this.windowImage
      )
    } else {
      setStyle(
        {
          top: `${this.windowTopPos}px`,
          left: `${this.windowLeftPos}px`
        },
        this.windowImage
      )
    }
  }

  changeStatus(status) {
    if (this.status !== status) {
      if (status === 'show') {
        removeEvent('animationend', this.window)

        this.addClass(this.window, status)
        this.addClass(this.window, 'in')
      } else {
        this.addClass(this.window, 'out')
        bindEvent(
          {
            type: 'animationend',
            handler: this.callback.bind(this)
          },
          this.window
        )
        // this.window.on('animationend', this.callback.bind(this))
      }

      this.status = status
    }
  }

  callback() {
    this.addClass(this.window, 'hide')
    removeEvent('animationend', this.window)
  }

  setStyle() {
    this.setRatio()
    const offset = this.getElementOffset()
    setStyle(
      {
        height: offset.height,
        width: offset.width,
        top: 0,
        left: 0
      },
      this.window
    )

    setStyle(
      {
        height: this.largeHeight,
        width: this.largeWidth,
        backgroundImage: `url(${this.instance.imageSrc})`
      },
      this.windowImage
    )
  }
}

export default inner
