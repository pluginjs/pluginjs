import { append, query } from '@pluginjs/dom'
import { addClass } from '@pluginjs/classes'
import { bindEvent } from '@pluginjs/events'
import { SvgElement } from '@pluginjs/utils'

class Progress {
  constructor(instance) {
    this.instance = instance
    this.options = instance.options
    this.element = instance.element
    this.classes = instance.classes
    this.types = instance.types
    this.labels = instance.labels
    this.times = instance.times
    this.maximums = instance.maximums

    this.generate()
    this.bind()
  }

  generate() {
    addClass(this.classes.PROGRESS, this.element)
    this.samples = {}

    this.types.forEach((type, index) => {
      this.samples[type] = {}

      const number = this.instance.getHtml('number', {
        number: this.instance.processTime(
          this.times[type],
          this.instance.places[index]
        )
      })

      const label = this.instance.getHtml('label', {
        label: this.labels[index]
      })

      const ring = this.instance.getHtml('ring')

      this.samples[type].element = this.instance.getElement('progress', {
        type: this.types[index],
        number,
        label,
        ring
      })

      this.samples[type].number = query(
        `.${this.classes.NUMBER}`,
        this.samples[type].element
      )
      this.samples[type].label = query(
        `.${this.classes.LABEL}`,
        this.samples[type].element
      )
      this.samples[type].ring = query(
        `.${this.classes.RING}`,
        this.samples[type].element
      )

      this.buildProgress(type, index, this.samples[type].ring)

      append(this.samples[type].ring, this.samples[type].element)
      append(this.samples[type].element, this.element)
    })
  }

  bind() {
    bindEvent(
      this.instance.selfEventName('update'),
      (e, target, type, value) => {
        this.update(value, type)
      },
      this.element
    )
  }

  update(value, type) {
    this.samples[type].number.innerHTML = value
    this.updateBar(
      Math.floor(
        (this.times[type] / this.maximums[this.types.indexOf(type)]) * 1000
      ) / 10,
      100,
      type
    )
  }

  buildProgress(type, index) {
    this.samples[type].svg = new SvgElement('svg', {
      version: '1.1',
      preserveAspectRatio: 'xMinYMin meet',
      viewBox: `0 0 ${this.options.svgSize} ${this.options.svgSize}`
    })

    this.samples[type].track = this.createTrack(
      this.options.svgSize,
      this.options.svgSize,
      this.options.svgBarsize,
      {
        stroke: this.options.svgTrackcolor,
        fill: 'none',
        'stroke-width': this.options.svgBarsize
      }
    )

    this.samples[type].bar = new SvgElement('path', {
      fill: 'none',
      'stroke-width': this.options.svgBarsize,
      stroke: this.options.svgFillcolor,
      'stroke-linejoin': 'round',
      'stroke-linecap': 'round'
    })

    append(this.samples[type].track, this.samples[type].svg)
    append(this.samples[type].bar, this.samples[type].svg)
    append(this.samples[type].svg, this.samples[type].ring)

    this.drawBar(100, type)
    this.updateBar(
      Math.floor((this.times[type] / this.maximums[index]) * 1000) / 10,
      100,
      type
    )
  }

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

  drawBar(percentage, type) {
    const height = this.options.svgSize
    const width = this.options.svgSize

    const cx = width / 2
    const cy = height / 2
    const startAngle = 0

    const barsize = this.options.svgBarsize

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

    this.samples[type].bar.setAttribute('d', d)
  }

  updateBar(current, full, type) {
    const bar = this.samples[type].bar
    const length = bar.getTotalLength()
    const offset = length * (1 - current / full)

    bar.style.strokeDasharray = `${length} ${length - 1}`
    bar.style.strokeDashoffset = isNaN(offset) ? length : offset
  }
}

export default Progress
