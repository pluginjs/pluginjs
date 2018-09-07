import Shape from './shape'
import { SvgElement } from '@pluginjs/utils'

export default class Pentagon extends Shape {
  createTrack(width, height, barsize, attributes) {
    const d = barsize / 2
    const x = (width - d) / 2
    const y = (height - d) / 2

    return new SvgElement('path', {
      d: `M${x} ${d} 
        L${x + x * Math.cos(Math.PI / 10)} ${y - y * Math.sin(Math.PI / 10)}
        L${x + x * Math.cos((Math.PI * 3) / 10)} ${y +
        y * Math.sin((Math.PI * 3) / 10)}
        L${x - x * Math.cos((Math.PI * 3) / 10)} ${y +
        y * Math.sin((Math.PI * 3) / 10)}
        L${x - x * Math.cos(Math.PI / 10)} ${y - y * Math.sin(Math.PI / 10)}
        L${x} ${d} Z`,
      style: 'stroke-linecap: round;stroke-linejoin: round;',
      ...attributes
    })
  }
}
