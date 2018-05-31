import Pj from '@pluginjs/pluginjs'
import Base from './base'
import { addClass, removeClass } from '@pluginjs/classes'
import { setStyle, getStyle, offset, height } from '@pluginjs/styled'
import { wrap, append } from '@pluginjs/dom'

class stickyBottom extends Base {
  constructor(instance) {
    super(instance)
    this.init()
  }

  init() {
    this.triggerStyle = {
      top: {
        def: this.element.style.top || 'auto',
        now: 0
      },
      bottom: {
        def: this.element.style.bottom || 'auto',
        now: this.spacing
      }
    }

    this.stateSet = [
      {
        status: 'sticky',
        className: this.classes.STICKY,
        styles: ['bottom']
      },
      {
        status: 'stuck',
        className: this.classes.STUCK,
        styles: ['top']
      },
      {
        status: 'default',
        spacing: false
      }
    ]

    this.bind()
  }

  scrollHandle() {
    this.scroll = this.scrollTop() + document.body.clientHeight
    // let Botton = this.$wrap.offset().top + this.$wrap.height()
    this.isSticky =
      offset(this.wrap).top + this.wrap.clientHeight + this.options.spacing
    this.isStuck =
      offset(this.parent).top + this.wrap.clientHeight + this.options.spacing

    if (this.scroll <= this.isSticky && this.scroll > this.isStuck) {
      this.stickyEle()
    } else if (
      this.scroll <= this.isStuck &&
      this.scroll > offset(this.parent).top
    ) {
      this.stuckEle()
    } else {
      this.defaultEle()
    }
  }
}

export default stickyBottom
