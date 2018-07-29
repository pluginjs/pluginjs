import Base from './base'
import { events as EVENTS } from '../constant'
import ScrollSpy from '@pluginjs/scroll-spy'
import PjScroll from '@pluginjs/scroll'

class Scroll extends Base {
  constructor(instance) {
    super(instance)
    this.init()
  }

  init() {
    this.bind()
  }

  bind() {
    const dots = this.instance.Dots.dots
    ScrollSpy.of(dots, {
      itemSelector: 'li',
      changeHash: false,
      onChange: id => {
        if (!this.instance.is('moveing') && this.instance.is('initialized')) {
          this.instance.trigger(EVENTS.CHANGE, id)
          this.instance.Dots.setActive(id)
          this.instance.currIndex = this.instance.getIndexById(id)
          this.changeHash()
        }
      }
    })
  }

  changePage() {
    const index = this.instance.currIndex - 1
    const top = this.getOffset(this.$sections[index])
    const duration = this.options.duration
    const easing = this.options.easing
    PjScroll.to({
      y: top,
      duration,
      easing
    })

    super.changePage()
  }

  getOffset(node, offsetTop) {
    if (!offsetTop) {
      offsetTop = 0
    }

    if (node === document.body || node === null) {
      return offsetTop
    }

    offsetTop += node.offsetTop

    return this.getOffset(node.parentNode, offsetTop)
  }
}

export default Scroll
