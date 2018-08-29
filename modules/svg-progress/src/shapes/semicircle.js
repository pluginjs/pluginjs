import Shape from './shape'
import { SvgElement } from '@pluginjs/utils'

export default class Semicircle extends Shape {
  createTrack(width, height, barsize, attributes) {
    const w = width / 2
    const h = height / 2
    const d = barsize / 2
    const c = h - d

    return new SvgElement('path', {
      d: `M ${w},${h} m ${-1 * c},0 a ${c},${c} 0 1 1 ${height - 2 * d},0`,
      ...attributes
    })
  }
}
