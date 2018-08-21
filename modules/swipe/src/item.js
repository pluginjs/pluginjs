import { setStyle } from '@pluginjs/styled'

class Item {
  constructor(el) {
    this.el = el
    this.info = {}
  }

  setInfo(details) {
    const { width, height } = details
    this.info = Object.assign({}, this.info, details)

    if (width || height) {
      this.setSize({
        width: `${width}px`,
        height: `${height}px`
      })
    }
  }

  setSize(data) {
    setStyle(data, this.el)
  }
}

export default Item
