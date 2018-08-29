import Shape from './shape'
import { SvgElement } from '@pluginjs/utils'

export default class Hexagon extends Shape {
  createTrack(width, height, barsize, attributes) {
    const d = barsize / 2
    const x = (width - d) / 4
    const y = height === false ? (width + x - d) / 4 : (height - d) / 4

    return new SvgElement('path', {
      d: `M${d} ${y * 3} L${d} ${y} L${2 * x} ${d} L${4 * x} ${y} L${4 *
        x} ${3 * y} L${2 * x} ${4 * y} Z`,
      style: 'stroke-linecap: round;stroke-linejoin: round;',
      ...attributes
    })
  }
}
