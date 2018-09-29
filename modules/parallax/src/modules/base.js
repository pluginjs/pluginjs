import { setStyle } from '@pluginjs/styled'

class Base {
  constructor(instance) {
    this.instance = instance
    this.container = instance.container
    this.options = instance.options
    this.containOptions = instance.container.options
    this.speed = instance.speed
  }

  setModeAttributes() {
    this.instance.updateWindowProps()

    let marginTop = 0
    let scrollDist = 0
    let resultHeight = 0
    const containerWidth = this.instance.container.el.getBoundingClientRect()
      .width

    if (this.container.offset < this.instance.windowProps.windowHeight) {
      scrollDist =
        (this.container.height + this.container.offset) / Math.abs(this.speed)

      if (this.speed > 0) {
        marginTop = -Math.abs(this.container.offset)
        resultHeight = this.container.height + this.container.offset
      } else {
        resultHeight = scrollDist + this.container.height
      }
    } else {
      scrollDist =
        (this.container.height + this.instance.windowProps.windowHeight) /
        Math.abs(this.speed)
      resultHeight = scrollDist + this.container.height

      if (this.speed > 0) {
        marginTop = -scrollDist
        resultHeight =
          this.container.height +
          this.instance.windowProps.windowHeight / Math.abs(this.speed)
      } else {
        resultHeight = scrollDist + this.container.height
      }
    }

    if (Math.abs(marginTop >= Math.abs(resultHeight))) {
      resultHeight = Math.abs(marginTop) + 1
    }

    setStyle(
      {
        height: resultHeight,
        width: containerWidth,
        marginTop
      },
      this.element
    )
  }
}

export default Base
