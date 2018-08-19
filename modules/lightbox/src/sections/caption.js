import { append } from '@pluginjs/dom'

class Caption {
  constructor(instance) {
    this.instance = instance
    this.initialize()
  }

  initialize() {
    if (!this.instance.options.caption) {
      return
    }

    this.element = this.instance.getElement('caption')
    this.setInfo(this.instance.data[this.instance.active])
    append(this.element, this.instance.footer)
  }

  setInfo(data) {
    if (!this.instance.options.caption) {
      return
    }

    const test = this.instance.getElement('title', data)
    this.element.innerHTML = ''
    append(test, this.element)
  }
}

export default Caption
