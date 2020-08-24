import { setStyle } from '@pluginjs/styled'

class Item {
  constructor(instance, element, options) {
    this.instance = instance
    this.element = element
    this.options = options
    this.init()
  }

  init() {
    this.index = this.options.index
    this.length = this.options.length
    this.width = this.instance.itemWidth
    this.setSize({
      width: this.width
    })
    if (this.instance.gutter !== 0) {
      this.setSize({
        'margin-right': this.instance.gutter
      })
    }
  }

  setSize(data) {
    setStyle(data, this.element)
  }

  updateSize() {
    this.width = this.instance.itemWidth
    this.setSize({
      width: this.width
    })
    if (this.instance.gutter !== 0) {
      this.setSize({
        'margin-right': this.instance.gutter
      })
    }
  }
}

export default Item
