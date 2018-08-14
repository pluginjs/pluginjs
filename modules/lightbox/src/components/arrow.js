import templateEngine from '@pluginjs/template'
import { addClass, removeClass } from '@pluginjs/classes'
import { bindEvent } from '@pluginjs/events'
import { append, query, parseHTML } from '@pluginjs/dom'

class Arrow {
  constructor(instance) {
    this.instance = instance
    this.options = instance.options
    this.classes = instance.classes
    this.items = instance.items

    this.init()
  }

  init() {
    this.$arrowRight = parseHTML(
      templateEngine.render(this.options.templates.arrow.call(this), {
        classes: this.classes,
        title: 'Prev',
        dir: 'right'
      })
    )
    this.$arrowLeft = parseHTML(
      templateEngine.render(this.options.templates.arrow.call(this), {
        classes: this.classes,
        title: 'Next',
        dir: 'left'
      })
    )
    append(this.$arrowRight, this.instance.wrap)
    append(this.$arrowLeft, this.instance.wrap)
    this.bind()
  }

  bind() {
    bindEvent(
      'click',
      () => {
        this.instance.pre()
      },
      this.$arrowLeft
    )

    bindEvent(
      'click',
      () => {
        this.instance.next()
      },
      this.$arrowRight
    )
  }

  in() {
    this.reflow()
    addClass(this.classes.SLIDERIGHT, this.$arrowRight)
    addClass(this.classes.SLIDELEFT, this.$arrowLeft)
  }

  reflow() {
    const reflow = this.$arrowRight.offsetHeight
    return this.$arrowLeft.offsetHeight
  }

  out() {
    removeClass(this.classes.SLIDERIGHT, this.$arrowRight)
    removeClass(this.classes.SLIDELEFT, this.$arrowLeft)
  }
}

export default Arrow
