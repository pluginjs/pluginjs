import Shape from './shape'
import { SvgElement } from '@pluginjs/utils'

export default class Rectangle extends Shape {
  createTrack(width, height, barsize, attributes) {
    const d = barsize / 2
    const w = width - d
    const h = height - d

    return new SvgElement('path', {
      d: `M${d} ${d} L${w} ${d} L${h} ${w} L${d} ${w} Z`,
      style: 'stroke-linecap: round;stroke-linejoin: round;',
      ...attributes
    })
  }
}
