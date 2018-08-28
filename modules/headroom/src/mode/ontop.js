import Pj from '@pluginjs/factory'
import { addClass, removeClass, hasClass } from '@pluginjs/classes'

class ontop {
  constructor(api) {
    this.instance = api
    this.options = api.options
    this.classes = {
      top: api.classes.TOP,
      notTop: api.classes.NOTTOP
    }
    Pj.emitter.on('scroll', this.update, this)
    this.update()
  }

  destroy() {
    const classes = this.classes

    for (const key in classes) {
      if ({}.hasOwnProperty.call(classes, key)) {
        removeClass(classes[key], this.instance.element)
      }
    }

    Pj.emitter.off('scroll', this.update)
  }

  update() {
    if (this.instance.is('disabled')) {
      return
    }
    const currentScrollY =
      window.pageYOffset || document.documentElement.scrollTop
    const offset = 0

    if (currentScrollY <= offset) {
      this.top()
    } else {
      this.notTop()
    }
  }

  top() {
    const classes = this.classes

    if (!hasClass(classes.top, this.instance.element)) {
      addClass(classes.top, this.instance.element)
      removeClass(classes.notTop, this.instance.element)
      this.instance.trigger('top')
    }
  }

  notTop() {
    const classes = this.classes

    if (!hasClass(classes.notTop, this.instance.element)) {
      addClass(classes.notTop, this.instance.element)
      removeClass(classes.top, this.instance.element)
      this.instance.trigger('untop')
    }
  }

  // getScrollY() {
  //   if (typeof this.options.scroller.pageYOffset !== "undefined") {
  //     return this.options.scroller.pageYOffset;
  //   } else if (typeof this.options.scroller.scrollTop !== "undefined") {
  //     return this.options.scroller.scrollTop;
  //   }
  //   return (document.documentElement ||
  //     document.body.parentNode ||
  //     document.body
  //   ).scrollTop;
  // }
}

export default ontop
