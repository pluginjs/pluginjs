import Shape from './shape'
import { SvgElement } from '@pluginjs/utils'

export default class Hexagon extends Shape {
  createTrack(width, height, barsize, attributes) {
    const d = barsize / 2
    const x = (width - d) / 2
    const y = height === false ? (width - d) / 2 : (height - d) / 2

    return new SvgElement('path', {
      d: `M${x} ${d} L${x + x * (Math.sqrt(3) / 2)} ${y - y / 2} L${x +
        x * (Math.sqrt(3) / 2)} ${2 * y - (y - y / 2)} ${x} ${2 * y}
        L${x - x * (Math.sqrt(3) / 2)} ${2 * y - (y - y / 2)}
        L${x - x * (Math.sqrt(3) / 2)} ${y - y / 2}
        L${x} ${d} Z
      `,
      style: 'stroke-linecap: round;stroke-linejoin: round;',
      ...attributes
    })
  }
}
