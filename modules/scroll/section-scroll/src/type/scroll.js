import Pj from '@pluginjs/pluginjs'
import Base from './base'
import { events as EVENTS } from '../constant'

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
    Pj.scrollSpy(dots, {
      itemSelector: 'li',
      // activeClass: 'active',
      // threshold: -100,
      changeHash: false,
      // reference: 'bottom',
      onChange: id => {
        // console.info('asScrollSpy change:', id);
        if (!this.instance.is('moveing') && this.instance.is('initialized')) {
          this.instance.trigger(EVENTS.CHANGE, id)
          this.instance.Dots.setActive(id)
          this.instance.currIndex = this.instance.getIndexById(id)
          this.changeHash()
        }
      }
    })
  }
  // destroy() {
  //   this.instance.$dots.asScrollSpy('destroy')
  //   super.destroy()
  // }

  changePage() {
    const index = this.instance.currIndex - 1
    const top = $(this.$sections[index]).offset().top
    const duration = this.options.duration
    const easing = this.options.easing
    Pj.scroll.to({
      y: top,
      duration,
      easing
      // complete: () => {
      // }
    })

    super.changePage()
  }
}

export default Scroll
