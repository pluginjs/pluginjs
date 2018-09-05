import Shape from './shape'
import { SvgElement } from '@pluginjs/utils'

export default class Hexagon extends Shape {
  createTrack(width, height, barsize, attributes) {
    const d = barsize / 2
    const x = (width - d) / 4
    const y = height === false ? (width + x - d) / 4 : (height - d) / 4

    return new SvgElement('path', {
      d: `M${2 * x + 2 * d} ${d} L${4 * x - 4 * d} ${y - d} C${4 * x -
        3 * d} ${y} ${4 * x - d} ${y} ${4 * x - d} ${y + 2 * d} L${4 * x -
        d} ${3 * y - d} C${4 * x - d} ${3 * y + d} ${4 * x - 2 * d} ${3 * y +
        2 * d} ${4 * x - 3 * d} ${3 * y + 3 * d} L${2 * x + 2 * d} ${4 * y -
        2 * d}
        C${2 * x} ${4 * y - d} ${2 * x - d} ${4 * y - d} ${2 * x - 2 * d} ${4 *
        y -
        2 * d} L${4 * d} ${3 * y + 2 * d}
        C${3 * d} ${3 * y + d} ${2 * d} ${3 * y} ${2 * d} ${3 * y - 2 * d}
        L${2 * d} ${y + 2 * d}
        C${2 * d} ${y} ${3 * d} ${y - d} ${4 * d} ${y - 2 * d}
        L${2 * x - 2 * d} ${2 * d}
        C${2 * x - d} ${d} ${2 * x} ${d} ${2 * x + d} ${d} Z
      `,
      style: 'stroke-linecap: round;stroke-linejoin: round;',
      ...attributes
    })
  }
}
