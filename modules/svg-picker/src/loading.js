import { parseHTML, appendTo, detach } from '@pluginjs/dom'

export default class Loading {
  constructor(instance) {
    this.instance = instance
  }

  show() {
    if (!this.element) {
      this.element = parseHTML(
        `<div class="${
          this.instance.classes.LOADING
        }">${this.instance.translate('loadingText')}</div>`
      )
    }

    appendTo(this.element, this.instance.$items)
  }

  hide() {
    if (this.element) {
      detach(this.element)
    }
  }
}
