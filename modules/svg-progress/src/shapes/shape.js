import { SvgElement } from '@pluginjs/utils'

export default class Shape {
  constructor(options) {
    this.options = options
    this.width = this.options.size
    this.height = this.options.size

    this.buildSvg()
    this.buildTrack()
    this.buildBar()
  }

  buildSvg() {
    this.$svg = new SvgElement('svg', {
      version: '1.1',
      preserveAspectRatio: 'xMinYMin meet',
      viewBox: `0 0 ${this.width} ${this.height}`
    })
  }

  buildTrack() {
    this.$track = this.createTrack(
      this.width,
      this.height,
      this.options.barsize,
      {
        stroke: this.options.trackcolor,
        fill: this.options.fillcolor,
        'stroke-width': this.options.barsize
      }
    )

    this.$svg.appendChild(this.$track)
  }

  buildBar() {
    this.$bar = new SvgElement('path', {
      fill: 'none',
      'stroke-width': this.options.barsize,
      stroke: this.options.barcolor,
      'stroke-linejoin': 'round',
      'stroke-linecap': 'round'
    })
    this.$svg.appendChild(this.$bar)
  }

  drawBar(percenage) {/* eslint-disable-line */
    const d = this.$track.getAttribute('d')
    return this.$bar.setAttribute('d', d)
  }

  updateBar(current, full) {
    const length = (this.$bar.getTotalLength() * full) / 100

    const offset = length * (1 - current / full)

    this.$bar.style.strokeDasharray = `${length} ${length - 1}`
    this.$bar.style.strokeDashoffset = isNaN(offset) ? length : offset
  }
}
