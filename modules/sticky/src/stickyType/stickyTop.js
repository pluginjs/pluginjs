import Base from './base'
import { offset } from '@pluginjs/styled'

class stickyTop extends Base {
  constructor(instance) {
    super(instance)
    this.init()
  }

  init() {
    this.triggerStyle = {
      top: {
        def: this.element.style.top || 'auto',
        now: this.spacing
      },
      bottom: {
        def: this.element.style.bottom || 'auto',
        now: 0
      }
    }

    this.stateSet = [
      {
        status: 'sticky',
        className: this.classes.STICKY,
        styles: ['top']
      },
      {
        status: 'stuck',
        className: this.classes.STUCK,
        styles: ['bottom']
      },
      {
        status: 'default',
        spacing: false
      }
    ]

    this.bind()
  }

  scrollHandle() {
    this.scroll = this.scrollTop()
    const parentBotton = offset(this.$parent).top + this.$parent.clientHeight
    this.isSticky = offset(this.$wrap).top - this.options.spacing
    this.isStuck = parentBotton - this.$wrap.clientHeight - this.options.spacing
    if (this.scroll > this.isSticky && this.scroll < this.isStuck) {
      this.stickyEle()
    } else if (this.scroll > this.isStuck && this.scroll < parentBotton) {
      this.stuckEle()
    } else {
      this.defaultEle()
    }
  }
}

export default stickyTop
