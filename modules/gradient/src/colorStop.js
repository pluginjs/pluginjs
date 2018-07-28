import GradientString from './gradientString'
import { Color } from '@pluginjs/color'

export default class ColorStop {
  constructor(color, position, gradient) {
    this.color = Color.of(color, gradient.options.color)
    this.position = GradientString.parsePosition(position)
    this.id = ++gradient.privateStopIdCount
    this.gradient = gradient
  }

  setPosition(string) {
    const position = GradientString.parsePosition(string)
    if (this.position !== position) {
      this.position = position
      this.gradient.reorder()
    }
  }

  setColor(string) {
    this.color.fromString(string)
  }

  remove() {
    this.gradient.removeById(this.id)
  }
}
