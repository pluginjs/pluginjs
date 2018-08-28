import Pj from '@pluginjs/factory'
import { removeClass } from '@pluginjs/classes'

class stick {
  constructor(api) {
    this.api = api
    this.classes = {
      stick: api.classes.STICK,
      unstick: api.classes.UNSTICK
    }
    this.options = api.options.sticky

    this.init()
  }

  init() {
    if (typeof this.options.offset === 'number') {
      this.scrollOffset = this.options.offset
    } else if (typeof this.options.offset === 'string') {
      this.setScrollOffset()
    } else {
      return
    }

    Pj.emitter.on('resize', this.setScrollOffset, this)
    Pj.emitter.on('scroll', this.update, this)
  }

  destroy() {
    const classes = this.classes

    for (const key in classes) {
      if ({}.hasOwnProperty.call(classes, key)) {
        removeClass(classes[key], this.api.element)
      }
    }

    this.api.$element.data('sticky').destroy()
  }
}

export default stick
