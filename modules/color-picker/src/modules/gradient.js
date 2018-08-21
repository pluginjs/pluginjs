// import { isString } from '@pluginjs/is'
import { query, getData, setData, find, parseHTML, parent } from '@pluginjs/dom'
// import { bindEvent } from '@pluginjs/events'
import { compose } from '@pluginjs/utils'
import { setStyle } from '@pluginjs/styled' // getStyle
import { removeClass, addClass } from '@pluginjs/classes' // hasClass
// import { Gradient } from '@pluginjs/gradient'
import Marker from '../components/marker'
import Wheel from '../components/wheel'
import Dropdown from '@pluginjs/dropdown'

class Gradients {
  constructor(instance, element) {
    this.instance = instance
    this.element = element
    this.classes = this.instance.classes
    this.mode = this.instance.options.gradientMode
    this.markers = []
    this.gradient = `${this.mode}-gradient(${
      this.mode === 'linear' ? 'to right' : 'circle'
    },#fff 0%,#000 100%)`

    this.init()
  }

  init() {
    // init gradient
    if (this.instance.hasModule('gradient')) {
      this.initGradient()
      this.build()
      this.initialVals()
    }
  }

  build() {
    this.$actionBar = parseHTML(
      `<div class="${this.classes.GRADIENTBAR}"><div class=${
        this.classes.GRADIENTBARVIEW
      }></div></div>`
    )
    this.$wheel = parseHTML(
      `<div class="${this.classes.WHEEL}"><div class="${
        this.classes.WHEELHANDLE
      }"></div></div>`
    )
    this.$angle = parseHTML(
      `<input class="pj-input ${this.classes.WHEELANGLE}" type="text"/>`
    )
    this.$remove = parseHTML(
      `<i class='icon-delete ${this.classes.GRADIENTREMOVE}'></i>`
    )
    const $selector = parseHTML(
      `<div class='${this.classes.GRADIENTMODE}'><span></span><div></div></div>`
    )

    query(`.${this.classes.GRADIENTHANDLE}`, this.element).append(
      this.$actionBar,
      $selector,
      this.$angle,
      this.$wheel,
      this.$remove
    )

    this.$view = query(`.${this.classes.GRADIENTBARVIEW}`, this.element)
    this.$selector = query(`.${this.classes.GRADIENTMODE}>span`, this.element)
    this.dropdown = Dropdown.of(this.$selector, {
      imitateSelect: true,
      value: this.mode.replace(/^.?/g, match => match.toUpperCase()),
      width: parent(this.$selector),
      data: [
        { label: 'Linear', value: 'Linear' },
        { label: 'Radial', value: 'Radial' }
      ]
    })
  }

  initialVals() {
    // set initial val
    setStyle('background', this.gradient, this.$view)

    // create initial markers
    const $leftMarker = this.createMarker({
      color: 'white',
      percent: 0,
      index: 0
    })

    const $rightMarker = this.createMarker({
      color: 'black',
      percent: 100,
      index: 1
    })

    this.markers.push(
      getData('value', $leftMarker),
      getData('value', $rightMarker)
    )
    this.selectMarker($rightMarker)
    this.actionBarSize = getData('value', $leftMarker).maxLenght
    // initial wheel
    this.WHEEL = new Wheel(this.instance, this.$wheel)
  }

  createMarker(options) {
    const $marker = parseHTML(
      `<div class="${this.classes.MARKER}" tabindex="1"></div>`
    )
    setData('value', new Marker(this.instance, $marker, options), $marker)

    return $marker
  }

  selectMarker(marker) {
    compose(
      removeClass(this.classes.MARKERACTIVE),
      find(`.${this.classes.MARKER}`)
    )(this.$actionBar)

    removeClass(
      this.classes.MARKERACTIVE,
      query(`.${this.classes.MARKERACTIVE}`, this.$actionBar)
    )
    addClass(this.classes.MARKERACTIVE, marker)

    this.instance.$marker = marker

    compose(
      this.markers.length > 2
        ? addClass(this.classes.GRADIENTREMOVEACTIVE)
        : removeClass(this.classes.GRADIENTREMOVEACTIVE),
      find(`.${this.classes.GRADIENTREMOVE}`)
    )(this.element)

    if (this.instance.is('gradientModule')) {
      this.instance.setSolid(getData('value', marker).color)
    }

    this.instance.leave('noSelectedMarker')
    this.update()
  }

  update() {
    if (this.instance.is('noSelectedMarker')) {
      return false
    }
    let deg = ''
    let gradient = ''

    this.markers.forEach(v => {
      gradient += `, ${v.color} ${v.percent}%`
    })

    if (this.mode === 'linear') {
      deg = `${this.angle}deg`
      this.gradient = `linear-gradient(${deg}${gradient})`
    } else {
      this.gradient = `radial-gradient(circle${gradient})`
    }

    setStyle('background', `linear-gradient(to right${gradient})`, this.$view)

    this.instance.gradient = {
      mode: this.mode,
      angle: deg,
      markers: this.markers
    }

    this.instance.updateGradient(this.gradient)
    return null
  }

  initGradient() {
    const $gradient = this.instance.createEl('content', {
      handle: this.classes.GRADIENTHANDLE,
      primary: this.classes.GRADIENTPRIMARY,
      action: this.classes.GRADIENTACTION,
      history: this.classes.GRADIENTHISTORY,
      done: this.classes.GRADIENTDONE
    })
    //   this.element = query(`.${this.classes.PANELGRADIENT}`, this.$panel)
    this.element.append(...$gradient)

    // init gradient handle
    //   this.GRADIENT = new Gradient(
    //     this,
    //     query(`.${this.classes.GRADIENTHANDLE}`, this.$gradient)
    //   )
  }
}

export default Gradients
