import Shape from './shape'
import { SvgElement } from '@pluginjs/utils'

export default class Pentagon extends Shape {
  createTrack(width, height, barsize, attributes) {
    const d = barsize / 2
    const x = (width - d) / 4
    const y = height === false ? (width - d) / 6 : (height - d) / 6

    return new SvgElement('path', {
      d: `M${d} ${(4 * y * 3) / 5} L${x * 2} ${d} L${4 * x} ${(4 * y * 3) /
        5} L${(x * 4 * 4) / 5} ${6 * y} L${(x * 4) / 5} ${6 * y} Z`,
      style: 'stroke-linecap: round;stroke-linejoin: round;',
      ...attributes
    })
  }
}
