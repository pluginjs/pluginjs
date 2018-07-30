import templateEngine from '@pluginjs/template'
import { append, parseHTML, prepend, queryAll } from '@pluginjs/dom'
import { labelMap as LABELMAP } from '../constant'
import { updateDomValue } from '../util'
import SvgElement from '../svgElement'
import { deepMerge } from '@pluginjs/utils'

class Progress {
  constructor(instance) {
    this.options = deepMerge(Progress.defaults, instance.options.modes.progress)
    this.instance = instance
  }

  html(type, getLabel) {
    const wrap = []
    const label = []
    const number = []

    let $wrap
    let $number
    let $label

    wrap[type] = templateEngine.render(this.instance.options.templates.wrap(), {
      classes: this.instance.classes,
      labelType: getLabel.labelMap
    })

    label[type] = templateEngine.render(
      this.instance.options.templates.label(),
      {
        classes: this.instance.classes,
        text: getLabel.labelName
      }
    )

    number[type] = templateEngine.render(
      this.instance.options.templates.time(),
      {
        classes: this.instance.classes,
        labelType: getLabel.labelMap
      }
    )

    for (type in wrap) {
      if (Object.prototype.hasOwnProperty.call(wrap, type)) {
        $wrap = parseHTML(wrap[type])
        $number = parseHTML(number[type])
        $label = parseHTML(label[type])

        append($number, $wrap)

        if (this.instance.options.labelPosition === 'above') {
          $label.classList.add(this.instance.getClass('above'))
          $number.classList.add(this.instance.getClass('above'))
          prepend($label, $wrap)
        } else {
          append($label, $wrap)
        }

        this.Svg = new SvgElement('svg', {
          version: '1.1',
          preserveAspectRatio: 'xMinYMin meet',
          viewBox: `0 0 ${this.options.size} ${this.options.size}`,

          class: `${type}Svg`
        })

        this.$svg = parseHTML(
          `'<span class=${this.instance.classes.RING}></span>'`
        )

        const progressBase = new ProgressBar(
          this.options.size,
          this.options.barcolor,
          this.options.barsize,
          'progressbase'
        )

        const progressTrack = new ProgressBar(
          this.options.size,
          this.options.trackcolor,
          this.options.barsize,
          `${type}Circle`
        )

        this.Svg.appendChild(progressBase)

        append(append(progressTrack, this.Svg), this.$svg)

        append(this.$svg, $wrap)

        append($wrap, this.instance.element)
      }
    }
  }

  animate(countDownTime, type) {
    const name = LABELMAP[type]

    updateDomValue(
      `.${this.instance.classes.NAMESPACE}-${name}`,
      this.instance.element,
      countDownTime.current
    )
    // about progress time
    this.setProgress(
      `.${type}Circle`,
      countDownTime.current,
      countDownTime.step
    )
  }

  // change progress
  setProgress(className, countDownTime, percent) {
    const dom = queryAll(className, this.instance.element)

    if (dom) {
      dom.forEach(element => {
        ProgressBarChange(countDownTime, element, percent)
      })
    }
  }
}

const ProgressBar = (size, color, strokeWidth, className) => {
  const attributes = {
    stroke: color,
    fill: 'none',
    'stroke-width': strokeWidth,
    'stroke-linecap': 'butt',
    class: className
  }
  const cx = size / 2
  const cy = size / 2
  return new SvgElement('circle', {
    r: `${cx - 10}%`,
    cx: `${cx}%`,
    cy: `${cy}%`,
    ...attributes
  })
}

const ProgressBarChange = (countDownTime, element, range) => {
  const percent = Math.abs(`${countDownTime / range}`)
  if (countDownTime <= range) {
    element.setAttribute('stroke-dashoffset', `${255 - percent * 255}%`)
  } else {
    element.setAttribute('stroke-dashoffset', '0%')
  }
}

Progress.defaults = {
  size: 100, // progress circle size
  barcolor: '#e4e4e4', // progress circle base color
  barsize: 2, // progress circle bar size
  trackcolor: '#215fdb' // progress circle bar color
}

Progress.classes = {
  PROGRESS: '{namespace}-progress',
  RING: '{namespace}-progress-ring'
}

export default Progress
