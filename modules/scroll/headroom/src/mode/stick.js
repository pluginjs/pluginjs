import Pj from '@pluginjs/pluginjs'

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
      // console.info('Invalid offset:', this.options.offset);
      return
    }

    Pj.emitter.on('resize', this.setScrollOffset, this)
    Pj.emitter.on('scroll', this.update, this)
  }

  destroy() {
    const classes = this.classes

    for (const key in classes) {
      if (classes.hasOwnProperty(key)) {
        this.api.element.classList.remove(classes[key])
      }
    }

    this.api.$element.data('sticky').destroy()
  }
}

export default stick
