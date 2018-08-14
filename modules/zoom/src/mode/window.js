import { transform } from '@pluginjs/feature'
import { reflow } from '@pluginjs/utils'

import Base from './base'
import { addClass, removeClass } from '@pluginjs/classes'
import { setStyle } from '@pluginjs/styled'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { append, prepend, parseHTML, query } from '@pluginjs/dom'

class Window extends Base {
  constructor(instance) {
    super(instance)
    this.configuration = this.options[this.options.mode]
    this.init()
  }

  init() {
    this.window = parseHTML(this.creatHTML('window'))
    this.windowImage = query(`.${this.classes.WINDOWIMAGE}`, this.window)
    this.lens = parseHTML(this.creatHTML('lens'))
    if (this.configuration.overlay) {
      this.overlayContainer = parseHTML(this.creatHTML('overlay'))
      this.overlay = query(`.${this.classes.OVERLAY}`, this.overlayContainer)
      this.lensImage = parseHTML(this.creatHTML('lensImage'))
    }

    this.setStyle()
    addClass(this.getClass('{namespace}-modeWindow'), this.container)
    append(this.window, this.container)

    if (!this.configuration.overlay) {
      append(this.lens, this.container)
    } else {
      prepend(this.lens, this.overlayContainer)
      append(this.lensImage, this.lens)

      append(this.overlayContainer, this.container)
    }
    this.initPositon()
    const offset = this.getElementOffset()
    this.lastOffset = JSON.stringify(offset)

    this.bind()
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
      if (this.configuration.clickOpen) {
        this.openWindow = false
        removeClass(this.getClass('{namespace}-zoomIn'), this.lens)
        removeClass(this.getClass('{namespace}-zoomOut'), this.lens)
      }
    }

    const mouseenterCallback = () => {
      const o = this.getElementOffset()
      const offset = JSON.stringify(o)
      if (this.lastOffset !== offset) {
        this.setStyle()
        this.lastOffset = offset
      }
    }

    bindEvent('mousemove', mousemoveCallback, this.container)
    bindEvent('mouseleave', mouseleaveCallback, this.container)
    bindEvent('mouseenter', mouseenterCallback, this.container)
    bindEvent('touchmove', mousemoveCallback, this.container)
    bindEvent('touchend', mouseleaveCallback, this.container)
    bindEvent('touchstart', mouseenterCallback, this.container)
    // super.bind()
    if (this.configuration.clickOpen) {
      this.openWindow = false
      bindEvent(
        'click',
        () => {
          if (this.openWindow) {
            // reflow(this.lens[0]);
            this.addClass(this.lens, 'zoomIn')
            this.windowtrigger('hide')
          } else {
            // reflow(this.lens[0]);
            this.addClass(this.lens, 'zoomOut')
            this.windowtrigger('show')
          }
          this.openWindow = !this.openWindow
        },
        this.lens
      )
    }
  }

  changeStatus(status) {
    if (this.status !== status) {
      if (status === 'show') {
        if (!this.configuration.clickOpen) {
          this.windowtrigger('show')
        }
        this.lensShow()
        if (this.configuration.overlay) {
          this.overlayShow()
        }
      } else {
        this.lensHide()
        if (this.configuration.overlay) {
          this.overlayHide()
        }
        this.windowtrigger('hide')
        if (this.configuration.clickOpen) {
          this.openWindow = false
          removeClass(this.getClass('{namespace}-zoomIn'), this.lens)
          removeClass(this.getClass('{namespace}-zoomOut'), this.lens)
        }
      }

      this.status = status
    }
  }

  windowtrigger(mode) {
    if (mode === 'show') {
      // this.window.unbind()
      // removeEvent('animationend', this.window)
      this.windowShow()
    } else {
      this.windowHide()
    }
  }

  windowShow() {
    this.addClass(this.window, 'show')
    this.addClass(this.window, 'in')
  }

  windowHide() {
    this.addClass(this.window, 'out')

    // bindEvent( 'animationend', this.callback.bind(this))
    // this.window.on('animationend', this.callback.bind(this))
  }

  overlayShow() {
    this.addClass(this.overlay, 'show')
    reflow(this.overlay)
    setStyle('opacity', this.configuration.overlayOpacity, this.overlay)
  }

  overlayHide() {
    setStyle('opacity', '0', this.overlay)
  }

  lensShow() {
    this.addClass(this.lens, 'show')
  }

  lensHide() {
    this.addClass(this.lens, 'hide')
  }

  callback() {
    this.addClass(this.window, 'hide')
    if (this.configuration.overlay) {
      this.addClass(this.overlay, 'hide')
    }
    removeEvent('animationend', this.window)
  }

  setPosition(e) {
    const o = this.getElementOffset()
    this.mouseLeft = parseInt(e.pageX - o.left, 10)
    this.mouseTop = parseInt(e.pageY - o.top, 10)

    this.ontop = this.mouseTop < this.lensOffset.height / 2
    this.onbom =
      this.mouseTop >
      o.height -
        this.lensOffset.height / 2 -
        this.configuration.lensBorderSize * 2
    this.onleft = this.mouseLeft < 0 + this.lensOffset.width / 2
    this.onright =
      this.mouseLeft >
      o.width -
        this.lensOffset.width / 2 -
        this.configuration.lensBorderSize * 2

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
    if (this.configuration.clickOpen) {
      addClass(this.getClass('{namespace}-zoomIn'), this.lens)
    }
    this.setLensPosition(o)
    if (this.configuration.overlay) {
      this.setlensImagePosition(o)
    }
    this.setWindowPosition(o)
    this.setImagePosition()
  }

  setlensImagePosition(o) {
    this.lensImaLeft = String((this.mouseLeft - this.lens.clientWidth / 2) * -1)
    this.lensImgTop = String((this.mouseTop - this.lens.clientHeight / 2) * -1)
    if (this.ontop) {
      this.lensImgTop = 0 - this.configuration.lensBorderSize
    }
    if (this.onleft) {
      this.lensImaLeft = 0 - this.configuration.lensBorderSize
    }
    if (this.onbom) {
      this.lensImgTop =
        (o.height -
          this.lens.clientHeight -
          this.configuration.lensBorderSize) *
        -1
    }
    if (this.onright) {
      this.lensImaLeft =
        (o.width - this.lens.clientWidth - this.configuration.lensBorderSize) *
        -1
    }

    if (transform) {
      const backgroundPosition = `${this.lensImaLeft}px, ${this.lensImgTop}px`
      setStyle('transform', `translate(${backgroundPosition})`, this.lensImage)
    } else {
      setStyle(
        {
          top: `${this.lensImgTop}px`,
          left: `${this.lensImaLeft}px`
        },
        this.lensImage
      )
    }
  }

  setWindowPosition(elementOffset) {
    const p = String(this.configuration.position)

    if (this.positions[p]) {
      this.positions[p](elementOffset)
    } else {
      this.positions['1'](elementOffset)
    }
    this.windowOffsetTop += this.configuration.offetY
    this.windowOffsetLeft += this.configuration.offetX

    if (transform) {
      const backgroundPosition = `${this.windowOffsetLeft}px, ${
        this.windowOffsetTop
      }px`
      setStyle('transform', `translate(${backgroundPosition})`, this.window)
    } else {
      setStyle(
        {
          top: `${this.windowOffsetTop}px`,
          left: `${this.windowOffsetLeft}px`
        },
        this.window
      )
    }
  }

  setImagePosition() {
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
      this.windowTopPos = (this.largeHeight - this.window.clientHeight) * -1
    }
    if (this.onright) {
      this.windowLeftPos = (this.largeWidth - this.window.clientWidth) * -1
    }

    if (transform) {
      const backgroundPosition = `${this.windowLeftPos}px, ${
        this.windowTopPos
      }px`
      setStyle(
        'transform',
        `translate(${backgroundPosition})`,
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

  setLensPosition(o) {
    this.lensLeftPos = String(
      Math.floor(this.mouseLeft - this.lensOffset.width / 2)
    )
    this.lensTopPos = String(
      Math.floor(this.mouseTop - this.lensOffset.height / 2)
    )
    if (this.ontop) {
      this.lensTopPos = 0
    }
    if (this.onleft) {
      this.lensLeftPos = 0
    }
    if (this.onbom) {
      this.lensTopPos = Math.max(o.height - this.lensOffset.height, 0)
    }
    if (this.onright) {
      this.lensLeftPos = o.width - this.lensOffset.width
    }
    if (transform) {
      const backgroundPosition = `${this.lensLeftPos}px, ${this.lensTopPos}px`
      setStyle('transform', `translate(${backgroundPosition})`, this.lens)
    } else {
      setStyle(
        {
          top: `${this.lensTopPos}px`,
          left: `${this.lensLeftPos}px`
        },
        this.lens
      )
    }
  }

  setStyle() {
    this.setRatio()
    setStyle(
      {
        width: `${this.configuration.width}px`,
        height: `${this.configuration.height}px`,
        border: `${this.configuration.borderSize}px solid ${
          this.configuration.borderColor
        }`
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

    this.lensOffset = {
      width: this.configuration.width / this.heightRatio,
      height: this.configuration.height / this.widthRatio,
      border: `${this.configuration.lensBorderSize}px solid ${
        this.configuration.lensBorderColor
      }`,
      'background-color': this.configuration.lensColor,
      opacity: this.configuration.lensOpacity
    }

    setStyle(this.lensOffset, this.lens)

    if (this.configuration.overlay) {
      this.setTintStyle()
    }
  }

  setTintStyle() {
    const { width, height } = this.getElementOffset()
    setStyle(
      {
        'background-color': this.configuration.overlayColor,
        width,
        height
      },
      this.overlay
    )

    const imgUrl = this.instance.element.src
    setStyle(
      {
        width,
        height,
        backgroundImage: `url(${imgUrl})`
      },
      this.lensImage
    )
  }

  changePosition(p) {
    this.configuration.position = p
  }

  initPositon() {
    this.positions = {
      1: o => {
        this.windowOffsetTop = 0
        this.windowOffsetLeft = Number(o.width)
      },
      2: o => {
        this.windowOffsetTop =
          (this.window.clientHeight / 2 - o.height / 2) * -1
        this.windowOffsetLeft = o.width
      },
      3: o => {
        this.windowOffsetTop =
          o.height -
          this.window.clientHeight -
          this.configuration.borderSize * 2
        this.windowOffsetLeft = o.width
      },
      4: o => {
        this.windowOffsetTop = o.height
        this.windowOffsetLeft = o.width
      },
      5: o => {
        this.windowOffsetTop = o.height
        this.windowOffsetLeft =
          o.width - this.window.clientWidth - this.configuration.borderSize * 2
      },
      6: o => {
        this.windowOffsetTop = o.height
        this.windowOffsetLeft =
          (this.window.clientWidth / 2 -
            o.width / 2 +
            this.configuration.borderSize * 2) *
          -1
      },
      7: o => {
        this.windowOffsetTop = o.height
        this.windowOffsetLeft = 0
      },
      8: o => {
        this.windowOffsetTop = o.height
        this.windowOffsetLeft =
          (this.window.clientWidth + this.configuration.borderSize * 2) * -1
      },
      9: o => {
        this.windowOffsetTop =
          o.height -
          this.window.clientHeight -
          this.configuration.borderSize * 2
        this.windowOffsetLeft =
          (this.window.clientWidth + this.configuration.borderSize * 2) * -1
      },
      10: o => {
        this.windowOffsetTop =
          (this.window.clientHeight / 2 - o.height / 2) * -1
        this.windowOffsetLeft =
          (this.window.clientWidth + this.configuration.borderSize * 2) * -1
      },
      11: () => {
        this.windowOffsetTop = 0
        this.windowOffsetLeft =
          (this.window.clientWidth + this.configuration.borderSize * 2) * -1
      },
      12: () => {
        this.windowOffsetTop =
          (this.window.clientHeight + this.configuration.borderSize * 2) * -1
        this.windowOffsetLeft =
          (this.window.clientWidth + this.configuration.borderSize * 2) * -1
      },
      13: () => {
        this.windowOffsetTop =
          (this.window.clientHeight + this.configuration.borderSize * 2) * -1
        this.windowOffsetLeft = 0
      },
      14: o => {
        this.windowOffsetTop =
          (this.window.clientHeight + this.configuration.borderSize * 2) * -1
        this.windowOffsetLeft =
          (this.window.clientWidth / 2 -
            o.width / 2 +
            this.configuration.borderSize * 2) *
          -1
      },
      15: o => {
        this.windowOffsetTop =
          (this.window.clientHeight + this.configuration.borderSize * 2) * -1
        this.windowOffsetLeft =
          o.width - this.window.clientWidth - this.configuration.borderSize * 2
      },
      16: o => {
        this.windowOffsetTop =
          (this.window.clientHeight + this.configuration.borderSize * 2) * -1
        this.windowOffsetLeft = o.width
      }
    }
  }
}

export default Window
