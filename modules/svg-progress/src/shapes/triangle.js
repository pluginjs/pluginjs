import Shape from './shape'
import { SvgElement } from '@pluginjs/utils'

export default class Triangle extends Shape {
  createTrack(width, height, barsize, attributes) {
    const d = barsize / 2
    const w = width - d
    const h = height - d

    return new SvgElement('path', {
      d: `M${d} ${h} L${width / 2} ${d} L${w} ${h} Z`,
      style: 'stroke-linecap: round;stroke-linejoin: round;',
      ...attributes
    })
  }
}
