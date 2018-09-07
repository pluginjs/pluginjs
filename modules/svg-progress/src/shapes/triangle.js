import Shape from './shape'
import { SvgElement } from '@pluginjs/utils'

export default class Triangle extends Shape {
  createTrack(width, height, barsize, attributes) {
    const d = barsize / 2
    const w = width - d
    const h = height - d

    return new SvgElement('path', {
      d: `M${w / 2} ${(w - (w / 2) * Math.sqrt(3)) / 2} L${w} ${h -
        (w - (w / 2) * Math.sqrt(3)) / 2} L${d} ${h -
        (w - (w / 2) * Math.sqrt(3)) / 2} L${w / 2} ${(w -
        (w / 2) * Math.sqrt(3)) /
        2} Z`,
      style: 'stroke-linecap: round;stroke-linejoin: round;',
      ...attributes
    })
  }
}
