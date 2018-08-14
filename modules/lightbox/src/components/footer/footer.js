import { addClass, removeClass } from '@pluginjs/classes'
import { bindEvent } from '@pluginjs/events'
import { append, query } from '@pluginjs/dom'
import Thumbnails from './thumbnails'

class footer {
  constructor(instance) {
    this.instance = instance
    this.options = instance.options
    this.classes = instance.classes
    this.init()
  }

  init() {
    this.footer = this.instance.getElement('footer')
    append(this.footer, this.instance.wrap)
    bindEvent('click', e => {
      e.stopPropagation()
    })

    this.thumbs = new Thumbnails(this.instance)
    this.thumbs.appendTo(this.footer)
  }

  goTo(index) {
    // this.updateTitle()
    this.thumbs.goTo(index)
  }

  in() {
    // this.updateTitle()
    this.reflow()
    addClass(this.classes.SLIDEBOTTOM, this.footer)

    this.thumbs.straightGoTo(this.instance.activeIndex)
  }

  reflow() {
    return this.footer.offsetHeight
  }

  out() {
    removeClass(this.classes.SLIDEBOTTOM, this.footer)
  }
}

export default footer
