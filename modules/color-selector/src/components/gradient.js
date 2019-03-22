import keyboard from '@pluginjs/keyboard'
import Marker from './marker'
import Wheel from './wheel'
import { compose } from '@pluginjs/utils'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { query, getData, setData, find, parseHTML, parent } from '@pluginjs/dom'
import { getStyle, setStyle } from '@pluginjs/styled'
import { hasClass, removeClass, addClass } from '@pluginjs/classes'
import Select from '@pluginjs/select'

class Gradient {
  constructor(instance, element) {
    this.instance = instance
    this.classes = this.instance.classes
    // this.color = this.instance.asColor
    this.element = element
    this.mode = this.instance.options.gradientMode
    this.angle = 90
    this.first = true
    this.markers = []
    this.actionBarSize = null

    this.key = {
      'to top': 0,
      'to right': 90,
      'to bottom': 180,
      'to left': 270,
      'to right top': 45,
      'to top right': 45,
      'to bottom right': 135,
      'to right bottom': 135,
      'to left bottom': 225,
      'to bottom left': 225,
      'to top left': 315,
      'to left top': 315
    }

    this.gradient = `${this.mode}-gradient(${
      this.mode === 'linear' ? 'to right' : 'circle'
    },#fff 0%,#000 100%)`
    this.init()
  }

  init() {
    this.build()
    this.initialVals()

    // set angle default val
    this.$angle.value = 90
    this.bind()
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
      `<i class='pj-icon pj-icon-trash ${this.classes.GRADIENTREMOVE}'></i>`
    )
    const $selector = parseHTML(
      `<div class='${
        this.classes.GRADIENTMODE
      }'><div><input type='text' value='${this.mode.replace(/^.?/g, match =>
        match.toUpperCase()
      )}' />><div/></div>`
    )

    this.element.append(
      this.$actionBar,
      $selector,
      this.$angle,
      this.$wheel,
      this.$remove
    )

    this.$view = query(`.${this.classes.GRADIENTBARVIEW}`, this.element)
    this.$selector = query(
      `.${this.classes.GRADIENTMODE}>div>span`,
      this.element
    )
    this.SELECT = Select.of(this.$selector, {
      // value: this.mode.replace(/^.?/g, match => match.toUpperCase()),
      width: parent(this.$selector),
      source: [
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
      this.instance.selfEventName('changeColor'),
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
      e => {
        this.addMarker(e.offsetX)
      },
      this.$actionBar
    )

    bindEvent(
      this.instance.eventName('mousedown'),
      `.${this.classes.MARKER}`,
      e => {
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
            this.sort()
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
      this.instance.eventNameWithId('mouseup'),
      () => {
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
    // clear selected
    // this.instance.$panel.on(this.instance.eventName('click'), (e) => {
    //   const $this = $(e.target);
    //   if (
    //     $this.parent().hasClass(this.classes.PANELCONTAINER) ||
    //     $this.parent().hasClass(this.classes.PANELTRIGGER)
    //   ) {
    //     removeClass(this.classes.MARKERACTIVE, this.instance.$marker);
    //     removeClass(this.classes.GRADIENTREMOVEACTIVE, this.$remove);
    //     this.instance.enter('noSelectedMarker');
    //   }
    // });
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
        this.sort()
        this.update()
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
      this.sort()
      this.update()
      return null
    })

    // switch gradient mode
    this.SELECT.options.onChange = res => {
      const modeName = res.innerHTML.replace(/^.?/g, match =>
        match.toLowerCase()
      )
      this.mode = modeName

      this.update()
    }
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

  createMarker(options) {
    const $marker = parseHTML(
      `<div class="${this.classes.MARKER}" tabindex="1"></div>`
    )
    setData('value', new Marker(this.instance, $marker, options), $marker)

    return $marker
  }

  get(index) {
    return this.markers[index]
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

  getMarkerPercent(position) {
    const minPosition = this.markers[0].elSize / 2
    const maxPosition = this.markers[0].wrapSize - this.markers[0].elSize / 2

    position = Math.min(maxPosition, Math.max(minPosition, position))
    return ((position - minPosition) / this.actionBarSize) * 100
  }

  addMarker(position, options = null) {
    let value = {}

    if (!options) {
      const percent = this.getMarkerPercent(position)
      const color = this.instance.tempColor || '#000'
      value = {
        color,
        percent,
        index: this.markers.length
      }
    } else {
      value = options
    }

    const $marker = this.createMarker(value)

    this.markers.push(getData('value', $marker))

    this.sort()

    this.selectMarker($marker)
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

  set(val) {
    const info = val.match(/\(.*\)/g)[0]
    const angleKey = val
      .match(/\(.+?\,/gi)[0]    /* eslint-disable-line */
      .split(',')[0]
      .split('(')[1]

    const colors = info
      .replace(/^\((([0-9]+deg)|((([a-zA-Z]+)\s)+[a-zA-Z]+))\,/gi, '')  /* eslint-disable-line */
      .match(/(?:rgba|rgb|hsla|hsl)\s*\([\s\d.,%]+\)|#[a-z0-9]{3,6}|[a-z]+/gi)
    const percents = info.match(/(\d{1,3}|\d{1,3}\.\d+)%/gi)
    if (val.indexOf('linear') > -1) {
      let angle
      if (this.key[angleKey]) {
        angle = this.key[angleKey]
      } else if (parseFloat(angleKey, 10)) {
        angle = parseFloat(angleKey, 10)
      } else {
        angle = 90
      }
      this.mode = 'linear'
      this.angle = angle

      this.WHEEL.set(this.angle)
      this.$angle.value = `${this.angle}°`
    } else {
      this.mode = 'radial'
    }

    this.clearMarks()
    colors.forEach((v, i) => {
      const percent = parseFloat(percents[i], 10)
      const options = {
        color: v,
        index: i,
        percent
      }

      this.addMarker(0, options)
    })
    if (typeof this.lastActiveMarkerIndex === 'number') {
      this.selectMarker(this.markers[this.lastActiveMarkerIndex].$el)
    }
    this.gradient = ''
    this.update()
    // this.SELECT.set(
    //   this.mode.replace(/^[a-zA-Z]?/g, match => match.toUpperCase())
    // )
  }

  clearMarks() {
    this.markers.forEach(v => {
      v.destroy()
    })
    this.markers = []
  }
}

export default Gradient
