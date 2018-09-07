import Shape from './shape'
import { SvgElement } from '@pluginjs/utils'

export default class Rectangle extends Shape {
  createTrack(width, height, barsize, attributes) {
    const d = barsize / 2
    const w = width - d
    const h = height - d

    return new SvgElement('path', {
      d: `M${w / 2} ${d} L${w} ${d} L${w} ${h} L${d} ${h} L${d} ${d} L${w /
        2} ${d} Z`,
      style: 'stroke-linecap: round;stroke-linejoin: round;',
      ...attributes
    })
  }
}
