import { events as EVENTS } from '../constant'
import ScrollSpy from '@pluginjs/scroll-spy'

class Scroll {
  constructor(instance) {
    this.instance = instance
    this.options = this.instance.options
    this.$sections = this.instance.$sections
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
      itemSelector: 'li',
      changeHash: false,
      onChange: id => {
        if (!this.instance.is('moveing') && this.instance.is('initialized')) {
          this.instance.trigger(EVENTS.CHANGE, id)
          this.instance.Dots.setActive(id)
          this.instance.currIndex = this.instance.getIndexById(id)
          this.instance.history.changeHash()
        }
      }
    })
  }
}

export default Scroll
