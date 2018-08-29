import Shape from './shape'
import { SvgElement } from '@pluginjs/utils'

export default class Circle extends Shape {
  createTrack(width, height, barsize, attributes) {
    const cx = width / 2
    const cy = height / 2
    const d = barsize / 2

    return new SvgElement('circle', {
      r: cx - d,
      cx,
      cy,
      ...attributes
    })
  }

  drawBar(percentage) {
    const height = this.height
    const width = this.width

    const cx = width / 2
    const cy = height / 2
    const startAngle = 0

    const barsize = this.options.barsize

    const r = Math.min(cx, cy) - barsize / 2
    this.r = r

    if (percentage === 100) {
      percentage -= 0.0001
    }
    const endAngle = startAngle + (percentage * Math.PI * 2) / 100

    const x1 = cx + r * Math.sin(startAngle)
    const x2 = cx + r * Math.sin(endAngle)
    const y1 = cy - r * Math.cos(startAngle)
    const y2 = cy - r * Math.cos(endAngle)

    // This is a flag for angles larger than than a half circle
    // It is required by the SVG arc drawing component
    let big = 0
    if (endAngle - startAngle > Math.PI) {
      big = 1
    }

    // ThisString holds the path details
    const d = `M${x1},${y1} A${r},${r} 0 ${big} 1 ${x2},${y2}`

    this.$bar.setAttribute('d', d)
  }

  updateBar(current, full) {
    const length = this.$bar.getTotalLength()

    const offset = length * (1 - current / full)

    this.$bar.style.strokeDasharray = `${length} ${length - 1}`
    this.$bar.style.strokeDashoffset = isNaN(offset) ? length : offset
  }
}
