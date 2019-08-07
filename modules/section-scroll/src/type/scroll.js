import { events as EVENTS } from '../constant'
import ScrollSpy from '@pluginjs/scroll-spy'

class Scroll {
  constructor(instance) {
    this.instance = instance
    this.options = this.instance.options
    this.init()
  }

  init() {
    if (this.options.dots !== false) {
      this.bind()
    }
  }

  bind() {
    const dots = this.instance.Dots.dots
    ScrollSpy.of(dots, {
      selector: 'li',
      hrefFrom: this.instance.options.dots.valueFrom || 'href',
      disableRootMargin: true,
      onChange: id => {
        if (!this.instance.is('moveing') && this.instance.is('initialized')) {
          this.instance.trigger(EVENTS.CHANGE, id)
          this.instance.Dots.setActive(id)
          this.instance.currIndex = this.instance.getIndexById(id)
          if (this.options.changeHash) {
            this.instance.history.changeHash()
          }
        }
      }
    })
  }
}

export default Scroll
