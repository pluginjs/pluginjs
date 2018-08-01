import templateEngine from '@pluginjs/template'
import { addClass } from '@pluginjs/classes'
import { append, parseHTML } from '@pluginjs/dom'

class Loader {
  constructor(IS) {
    this.IS = IS
    this.options = this.IS.options
    this.element = document.createElement('div')
    addClass(this.IS.classes.LOADER, this.element)

    this.init()
  }

  init() {
    const instance = this.IS
    const options = this.IS.options

    this.$loading = parseHTML(
      templateEngine.render(options.templates.loading.call(this), {
        classes: instance.classes,
        label: instance.translate('loading')
      })
    )

    this.$noMoreData = parseHTML(
      templateEngine.render(options.templates.noMoreData.call(this), {
        classes: instance.classes,
        label: instance.translate('noMoreData')
      })
    )

    this.$exception = parseHTML(
      templateEngine.render(options.templates.exception.call(this), {
        classes: instance.classes,
        label: instance.translate('exception')
      })
    )
  }

  resetHtml(ele) {
    this.hide()
    this.element = document.createElement('div')
    addClass(this.IS.classes.LOADER, this.element)

    append(ele, this.element)
  }

  appendLoad() {
    const instance = this.IS
    this.resetHtml(this.$loading)
    append(this.element, instance.$container)
  }

  appendEnd() {
    const instance = this.IS

    this.resetHtml(this.$noMoreData)

    append(this.element, instance.$container)
  }

  appendErr() {
    const instance = this.IS

    this.resetHtml(this.$exception)

    append(this.element, instance.$container)
  }

  hide() {
    this.element.remove()
  }
}

export default Loader
