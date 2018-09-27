import keyboard from '@pluginjs/keyboard'
import { query, getData, setData, find, parseHTML } from '@pluginjs/dom'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { compose } from '@pluginjs/utils'
import { setStyle, getStyle } from '@pluginjs/styled'
import { removeClass, addClass, hasClass } from '@pluginjs/classes'
import { Gradient } from '@pluginjs/gradient'
import Marker from '../components/marker'
import Wheel from '../components/wheel'
import Select from '@pluginjs/select'

class Gradients {
  constructor(instance, element) {
    this.instance = instance
    this.classes = this.instance.classes
    this.element = element
    this.mode = this.instance.options.gradientMode
    this.angle = 90
    // this.first = true
    this.markers = []
    this.actionBarSize = null

    this.gradientValue = `${this.mode}-gradient(${
      this.mode === 'linear' ? 'to right' : 'circle'
    },#fff 0%,#000 100%)`

    this.gradient = new Gradient(this.gradientValue)
    this.init()
  }

  init() {
    // init gradient
    this.initGradient()
    this.build()
    this.initialVals()
    this.$angle.value = this.gradient.value.angle
    this.bind()
  }

  build() {
    this.$actionBar = parseHTML(
      `<div class="${this.classes.GRADIENTBAR}"><div class="${
        this.classes.GRADIENTBARVIEW
      }"></div></div>`
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
      `<i class='pj-icon pj-icon-trash ${this.classes.GRADIENTREMOVE}'></i>`
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
    this.SELECT = Select.of(this.$selector, {
      value: this.mode.replace(/^.?/g, match => match.toUpperCase()),
      source: [
        { label: 'Linear', value: 'Linear' },
        { label: 'Radial', value: 'Radial' }
      ],
      onChange: res => {
        const modeName = res.replace(/^.?/g, match => match.toLowerCase())
        this.mode = modeName

        this.update()
      }
    })
  }

  initialVals() {
    // set initial val
    setStyle('background', this.gradientValue, this.$view)

    // create initial markers
    // this.gradient.value.stops.forEach((v, i) => {
    //   const $marker = this.createMarker({
    //     color: this.gradient.get(i).color.toString(),
    //     percent: v.position * 100,
    //     index: i
    //   })

    //   this.markers.push(getData('value', $marker))
    //   this.actionBarSize = getData('value', $marker).maxLenght

    //   if (i === 1) {
    //     this.selectMarker($marker)
    //   }
    // })
    // initial wheel
    this.WHEEL = new Wheel(this.instance, this.$wheel)
  }

  bind() {
    bindEvent(
      this.instance.selfEventName('switchModule'),
      () => {
        if (this.instance.is('gradientModule')) {
          this.update()
        }
      },
      this.instance.element
    )

    bindEvent(
      this.instance.selfEventName('change'),
      () => {
        if (this.instance.is('gradientModule')) {
          this.update()
        }
      },
      this.instance.element
    )

    bindEvent(
      this.instance.selfEventName('wheelChange'),
      (e, el, angle) => {
        this.angle = Math.round(angle)
        this.$angle.value = `${this.angle}°`
        this.update()
      },
      this.instance.element
    )

    bindEvent(
      this.instance.eventName('mousedown'),
      `.${this.classes.MARKER}`,
      e => {
        this.instance.enter('DownSelectedMarker')
        if (e.which === 2 || e.which === 3) {
          return false
        }
        const $this = e.target
        const marker = getData('value', $this)
        this.selectMarker($this)

        const startX = e.pageX
        const markerX = parseFloat(getStyle('left', $this))
        bindEvent(
          this.instance.eventNameWithId('mousemove'),
          // identity: $this,
          e => {
            const position = e.pageX - startX + markerX
            this.move($this, position)

            const percent = this.getMarkerPercent(position)
            marker.position(percent)
            this.gradient.get(marker.index).setPosition(percent / 100)
            this.sort()
            this.gradient.reorder()
            this.update()
            this.instance.trigger('gradientChange')
          },
          window.document
        )
        // e.preventDefault()
        return false
      },
      this.$actionBar
    )

    bindEvent(
      this.instance.eventName('mousedown'),
      e => {
        if (!this.instance.is('DownSelectedMarker')) {
          this.gradient.append(
            this.instance.tempColor,
            this.getMarkerPercent(e.offsetX) / 100
          )
          this.gradient.reorder()
          this.addMarker(e.offsetX)
        }
      },
      this.$actionBar
    )

    bindEvent(
      this.instance.eventNameWithId('mouseup'),
      () => {
        this.instance.leave('DownSelectedMarker')
        removeEvent(this.instance.eventNameWithId('mousemove'), window.document)
        // removeEvent('mouseup', window.document)
      },
      window.document
    )

    bindEvent(
      this.instance.eventName('input'),
      () => {
        let val = parseInt(this.$angle.value, 10)
        if (!val) {
          val = 90
        }

        this.angle = val
        this.WHEEL.set(this.angle)
        this.update()
      },
      this.$angle
    )

    bindEvent(
      this.instance.eventName('click'),
      `.${this.classes.PANELTRIGGER}>i`,
      ({ target: $this }) => {
        if (getData('type', $this) !== 'gradient') {
          this.markers.map((marker, i) => { /* eslint-disable-line */
            const $item = marker.$el
            if (hasClass(this.classes.MARKERACTIVE, $item)) {
              this.lastActiveMarkerIndex = i
            }
          })
        }
      },
      this.instance.$panel
    )

    // remove marker
    bindEvent(
      this.instance.eventName('click'),
      `.${this.classes.GRADIENTREMOVE}`,
      ({ target: $this }) => {
        if (
          this.markers.length <= 2 ||
          !hasClass(this.classes.GRADIENTREMOVEACTIVE, $this)
        ) {
          return false
        }

        const $marker = this.instance.$marker
        const index = getData('value', $marker).index
        $marker.remove()
        removeClass(this.classes.GRADIENTREMOVEACTIVE, this.$remove)
        this.markers.splice(index, 1)
        this.gradient.removeById(index)
        this.sort()
        this.gradient.reorder()
        this.update()
        this.instance.leave('SelectedMarker')
        return null
      },
      this.element
    )
    this.KEYBOARD = keyboard()

    this.KEYBOARD.on('down', 'esc', () => {
      if (
        !this.instance.is('openPanel') ||
        this.markers.length <= 2 ||
        this.instance.module !== 'gradient' ||
        !hasClass(this.classes.GRADIENTREMOVEACTIVE, this.$remove)
      ) {
        return false
      }

      const $marker = this.instance.$marker
      const index = getData('value', $marker).index

      $marker.remove()
      removeClass(this.classes.GRADIENTREMOVEACTIVE, this.$remove)
      this.markers.splice(index, 1)
      this.gradient.removeById(index + 1)
      this.sort()
      this.gradient.reorder()
      this.update()
      this.instance.leave('SelectedMarker')
      return null
    })

    // switch gradient mode
    // this.SELECT.options.onChange = res => {
    //   const modeName = res.replace(/^.?/g, match =>
    //     match.toLowerCase()
    //   )
    //   this.mode = modeName

    //   this.update()
    // }
  }

  move(el, size) {
    const position = Math.max(0, Math.min(size, this.actionBarSize))
    setStyle('left', `${position}px`, el)
  }

  sort() {
    this.markers.sort((a, b) => a.percent - b.percent)

    this.markers.forEach((v, i) => {
      v.index = i
    })
  }

  get(index) {
    return this.markers[index]
  }

  createMarker(options) {
    const $marker = parseHTML(
      `<div class="${this.classes.MARKER}" tabindex="1"></div>`
    )
    setData('value', new Marker(this.instance, $marker, options), $marker)

    return $marker
  }

  addMarker(position, options = null) {
    let value = {}
    if (!options) {
      const percent = this.getMarkerPercent(position)

      const color = this.tempColor || '#000'
      value = {
        color,
        percent,
        index: this.markers.length
      }
    } else {
      value = options
    }

    const $marker = this.createMarker(value)
    this.actionBarSize = getData('value', $marker).maxLenght

    this.markers.push(getData('value', $marker))

    this.sort()
    this.selectMarker($marker)
    this.update()
  }

  getMarkerPercent(position) {
    const minPosition = this.markers[0].elSize / 2
    const maxPosition = this.markers[0].wrapSize - this.markers[0].elSize / 2

    position = Math.min(maxPosition, Math.max(minPosition, position))
    return ((position - minPosition) / this.actionBarSize) * 100
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
      this.setGradientColor(
        getData('value', marker).color,
        getData('value', marker).index
      )
    }

    this.instance.leave('noSelectedMarker')
    this.instance.enter('SelectedMarker')
    this.update()
  }

  update() {
    if (this.instance.is('noSelectedMarker')) {
      return false
    }

    if (this.mode === 'linear') {
      this.gradient.privateType = 'LINEAR'
      // const deg = `${this.angle}deg`
      this.gradient.angle(this.angle)
    } else {
      this.gradient.privateType = 'RADIAL'
    }
    this.gradientValue = this.gradient.toString()
    setStyle('background', this.gradientValue, this.$view)

    // this.instance.gradient = {
    //   mode: this.mode,
    //   angle: deg,
    //   markers: this.markers
    // }

    this.instance.PREVIEW.update(this.gradientValue, true)
    this.instance.setInput(this.gradientValue)
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
  }

  clearMarks() {
    this.markers.forEach(v => {
      v.destroy()
    })
    this.markers = []
  }

  setGradientColor(color, index) {
    const colorData = this.gradient.get(index).color.val(color)
    this.tempColor = colorData.toRGBA()
    this.instance.trigger('change', colorData)
  }

  setGradient(color) {
    if (!color) {
      color = this.instance.info.gradient
    }

    this.set(color)
  }

  set(val) {
    this.gradient = new Gradient(val)
    if (val.indexOf('linear') > -1) {
      this.mode = 'linear'
      this.angle = this.gradient.value.angle

      this.WHEEL.set(this.angle)
      this.$angle.value = `${this.angle}°`
    } else {
      this.mode = 'radial'
    }

    this.clearMarks()
    this.gradient.value.stops.forEach((v, i) => {
      let percent = parseFloat(v.position * 100, 10)
      if (i === this.gradient.length - 1) {
        percent = 100
      } else if (i === 0) {
        percent = 0
      }
      const options = {
        color: v.color,
        index: i,
        percent
      }
      // this.actionBarSize = getData('value', $marker).maxLenght
      this.addMarker(0, options)
    })
    if (typeof this.lastActiveMarkerIndex === 'number') {
      this.selectMarker(this.markers[this.lastActiveMarkerIndex].$el)
    }
    this.gradientValue = ''
    this.update()
    // this.SELECT.set(
    //   this.mode.replace(/^[a-zA-Z]?/g, match => match.toUpperCase())
    // )
  }
}

export default Gradients
