import Shape from './shape'
import { SvgElement } from '@pluginjs/utils'

export default class Semicircle extends Shape {
  createTrack(width, height, barsize, attributes) {
    const w = width
    const h = width / 2
    const d = barsize / 2
    const c = w / 2 - d

    return new SvgElement('path', {
      d: `M ${w},${h} m ${-2 * c},0 a ${c},${c} 0 1 1 ${w - 2 * d},0`,
      ...attributes
    })
  }
}
