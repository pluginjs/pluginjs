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
  insertBefore
} from '@pluginjs/dom'
import ITEM from './itemContainer'
import Hammer from 'hammerjs'

class Slide {
  constructor(instance) {
    this.instance = instance
    this.options = instance.options
    this.classes = instance.classes

    this.init()
  }

  init() {
    this.slide = this.instance.getElement('slide')
    this.translate = 0
    this.instance.enter('enable')

    prepend(this.slide, this.instance.wrap)
    this.bind()

    this.createItem()
  }

  createItem() {
    this.plugins = []

    for (let i = 0; i < 3; i++) {
      const item = new ITEM(this.instance)
      item.appendTo(this.slide)
      item.left(i - 1)
      this.plugins.push(item)
    }

    this.activePlugin = 1
  }

  resetPosition() {
    this.translate = 0
    setStyle({ transform: 'translate3d(0px, 0px, 0px)' }, this.slide)

    if (!hasClass(this.classes.SLIDETRANSITION, this.slide)) {
      addClass(this.classes.SLIDETRANSITION, this.slide)
    }
  }

  updateItem() {
    this.updateCurrPlugin()
    this.updateLeftPlugin()
    this.updateRightPlugin()
  }

  updateCurrPlugin() {
    this.plugins[this.activePlugin].update(this.instance.activeIndex)
    this.plugins[this.activePlugin].left(this.translate)
  }

  updateLeftPlugin() {
    const left = this.loop(0, 2, this.activePlugin - 1)
    const index = this.loop(
      1,
      this.instance.length,
      this.instance.activeIndex - 1
    )
    this.plugins[left].update(index)
    this.plugins[left].left(this.translate - 1)
  }

  updateRightPlugin() {
    const right = this.loop(0, 2, this.activePlugin + 1)
    const index = this.loop(
      1,
      this.instance.length,
      this.instance.activeIndex + 1
    )
    this.plugins[right].update(index)
    this.plugins[right].left(this.translate + 1)
  }

  loop(min, max, value) {
    if (value > max) {
      return min
    } else if (value < min) {
      return max
    }
    return value
  }

  next() {
    this.translate++
    this.activePlugin = this.loop(0, 2, this.activePlugin + 1)
    this.updateCurrPlugin()

    const callback = () => {
      this.updateLeftPlugin()
      this.updateRightPlugin()
    }
    this.closeVideo()

    this.changeSlidePosition(this.translate, callback)
  }

  pre() {
    this.translate--
    this.activePlugin = this.loop(0, 2, this.activePlugin - 1)
    this.updateCurrPlugin()

    const callback = () => {
      this.updateLeftPlugin()
      this.updateRightPlugin()
    }
    this.closeVideo()

    this.changeSlidePosition(this.translate, callback)
  }

  changeSlidePosition(size, callback) {
    this.instance.leave('enable')
    setTimeout(() => {
      this.instance.enter('enable')
      callback()
    }, 400)
    if (!hasClass(this.classes.SLIDETRANSITION, this.slide)) {
      addClass(this.classes.SLIDETRANSITION, this.slide)
    }
    const p = size * -1 * Pj.windowWidth
    setStyle({ transform: `translate3d(${p}px, 0px, 0px)` }, this.slide)
  }

  closeVideo() {
    if (this.instance.video) {
      this.instance.video('destroy')
      this.instance.video = null
    }
  }

  bind() {
    bindEvent(
      {
        type: 'click',
        handler: event => {
          if (!this.instance.drap) {
            const target = event.target
            if (hasClass(this.classes.IMAGE, target)) {
              if (this.options.clickImageClose) {
                this.instance.close()
              }
            } else if (hasClass(this.classes.ITEMINNER, target)) {
              if (this.options.clickBgClose) {
                this.instance.close()
              }
            }
          }
        }
      },
      this.slide
    )

    Pj.emitter.on('resize', this.resizeHandle.bind(this))
    if (this.instance.length <= 1) {
      return
    }

    this.hammer = new Hammer(this.slide)
    this.hammer.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL })
    this.hammer.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL })

    this.hammer.on('swipe', event => {
      const direction = event.direction
      if (direction === 2) {
        this.instance.next()
      } else if (direction === 4) {
        this.instance.pre()
      }
    })

    this.hammer.on('panstart', event => {
      this.instance.drap = true
    })
    this.hammer.on('panmove', event => {
      const drapDistance = event.deltaX
      if (hasClass(this.classes.SLIDETRANSITION, this.slide)) {
        removeClass(this.classes.SLIDETRANSITION, this.slide)
      }
      const p = this.translate * -1 * Pj.windowWidth + drapDistance
      setStyle({ transform: `translate3d(${p}px, 0px, 0px)` }, this.slide)
    })
    this.hammer.on('panend', event => {
      const drapDistance = event.deltaX
      if (Math.abs(drapDistance) < 800) {
        if (!hasClass(this.classes.SLIDETRANSITION, this.slide)) {
          addClass(this.classes.SLIDETRANSITION, this.slide)
        }
        const p = this.translate * -1 * Pj.windowWidth
        setStyle({ transform: `translate3d(${p}px, 0px, 0px)` }, this.slide)
      } else {
        const direction = drapDistance > 0 ? 'pre' : 'next'
        if (direction === 'pre') {
          this.instance.pre()
        } else {
          this.instance.next()
        }
      }

      setTimeout(() => {
        this.instance.drap = false
      }, 100)
    })
  }

  resizeHandle() {
    this.plugins[this.activePlugin].left(this.translate)
    const left = this.loop(0, 2, this.activePlugin - 1)
    this.plugins[left].left(this.translate - 1)
    const right = this.loop(0, 2, this.activePlugin + 1)
    this.plugins[right].left(this.translate + 1)

    if (hasClass(this.classes.SLIDETRANSITION, this.slide)) {
      removeClass(this.classes.SLIDETRANSITION, this.slide)
    }
    const p = this.translate * -1 * Pj.windowWidth
    setStyle({ transform: `translate3d(${p}px, 0px, 0px)` }, this.slide)
  }

  getCurrentImage() {
    return this.plugins[this.activePlugin].getImage()
  }

  hide() {
    this.slide.style.display = 'none'
    this.closeVideo()
    if (this.instance.iframe) {
      this.instance.iframe.resetSrc()
    }
  }

  show() {
    this.resetPosition()
    this.updateItem()
    this.slide.style.display = ''

    this.fadeIn()
  }

  fadeIn() {
    this.reflow()
    addClass(this.classes.READY, this.slide)
  }

  reflow() {
    return this.slide.offsetHeight
  }

  fadeOut() {
    removeClass(this.classes.READY, this.slide)
  }
}

export default Slide
