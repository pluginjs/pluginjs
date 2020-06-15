import Component from '@pluginjs/component'
import { compose, triggerNative, debounce } from '@pluginjs/utils'
import template from '@pluginjs/template'
import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { getStyle, setStyle, hideElement } from '@pluginjs/styled'
import { isString } from '@pluginjs/is'
import {
  append,
  parseHTML,
  query,
  attr,
  wrap,
  find,
  unwrap,
  getData,
  setData,
  empty
} from '@pluginjs/dom'
import Clearable from './clearable'
import ColorPicker from '@pluginjs/color-picker'
import Dropdown from '@pluginjs/dropdown'
import Select from '@pluginjs/select'
import keyboard from '@pluginjs/keyboard'
import { Gradient } from '@pluginjs/gradient'
import Preview from './components/preview'
import Wheel from './components/wheel'
import Marker from './components/marker'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  translateable,
  optionable
} from '@pluginjs/decorator'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  dependencies as DEPENDENCIES,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE,
  translations as TRANSLATIONS
} from './constant'
@translateable(TRANSLATIONS)
@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class GradientPicker extends Component {
  constructor(element, options = {}) {
    super(element)

    this.setupOptions(options)
    this.setupI18n()
    this.setupClasses()
    compose(
      attr({ placeholder: this.options.placeholder }),
      addClass(this.classes.INPUT, 'pj-input')
    )(this.element)

    this.markers = []
    this.mode = 'linear'
    this.oldMode = 'linear'

    this.oldColor = null
    this.gradientValue = `${this.mode}-gradient(${
      this.mode === 'linear' ? 'to right' : 'circle'
    },#fff 0%,#000 100%)`

    this.setupStates()
    this.initialize()
  }

  initialize() {
    this.elementColor = this.element.value
    this.createHtml()

    if (this.options.inline) {
      hideElement(this.element)
      addClass(this.classes.INLINE, this.$panel)
    }

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.element)
    }

    this.initData()
    this.bind()

    if (this.options.clearable && !this.options.inline) {
      this.CLEARABLE = new Clearable(this)
    }

    if (this.element.disabled || this.options.disabled) {
      this.disable()
    }

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  initData() {
    if (this.elementColor) {
      this.val(this.elementColor, false)
    } else {
      this.clear()
    }
  }

  bind() {
    window.addEventListener('resize', () => {
      const minPosition = this.markers[0].elSize / 2
      const maxPosition = this.markers[0].wrapSize - this.markers[0].elSize / 2
      if (
        maxPosition - minPosition !==
        parseInt(getStyle('width', this.Marker.$wrap), 10) -
          parseInt(getStyle('width', this.Marker.$el), 10)
      ) {
        this.clearMarks()
        this.GRADIENT.reorder()
        this.GRADIENT.value.stops.forEach((v, i) => {
          let percent = parseFloat(v.position * 100, 10)
          if (i === this.GRADIENT.length - 1) {
            percent = 100
          } else if (i === 0) {
            percent = 0
          }

          const options = {
            color: v.color.toRGBA(),
            index: i,
            percent
          }
          // this.actionBarSize = getData('value', $marker).maxLenght
          this.addMarker(0, options)
        })
      }
    })

    if (!this.options.inline) {
      // input remove color
      if (this.options.clearable) {
        compose(
          bindEvent(this.eventName('click'), `.${this.classes.CLEAR}`, () => {
            hideElement(this.CLEARABLE.element)
          }),
          bindEvent(
            this.eventName('mouseout'),
            `.${this.classes.TRIGGER}`,
            () => {
              hideElement(this.CLEARABLE.element)
            }
          ),
          bindEvent(
            this.eventName('mouseover'),
            `.${this.classes.TRIGGER}`,
            () => {
              if (this.element.value.length > 0) {
                if (!this.is('disabled')) {
                  this.CLEARABLE.element.style.display = 'inline'
                }
              }
            }
          )
        )(this.$wrap)
      }

      bindEvent(
        this.eventName('input'),
        debounce(e => {
          if (new Gradient().matchString(e.target.value)) {
            this.set(e.target.value)
          }
        }, 1000),
        this.element
      )
    }

    // save
    bindEvent(
      this.eventName('click'),
      () => {
        if (!this.options.inline) {
          this.enter('save')
          this.DROPDOWN.hide()
        }

        if (this.COLORPICKER.HISTORY) {
          this.COLORPICKER.HISTORY.set(getData('value', this.$marker).color)
        }

        this.update()
        this.trigger(EVENTS.CLICK, this.gradientValue)
      },
      this.$save
    )

    bindEvent(
      this.selfEventName('wheelChange'),
      (e, el, angle) => {
        this.angle = Math.round(angle)
        this.$angle.value = `${this.angle}°`

        this.update(false)
      },
      this.element
    )

    bindEvent(
      this.eventName('mousedown'),
      `.${this.classes.MARKER}`,
      e => {
        this.enter('DownSelectedMarker')
        if (e.which === 2 || e.which === 3) {
          return false
        }

        const $this = e.target
        const marker = getData('value', $this)
        this.selectMarker($this)

        this.COLORPICKER.set(marker.color)
        if (this.COLORPICKER.HISTORY) {
          this.COLORPICKER.HISTORY.set(this.tempColor)
        }

        const startX = e.pageX
        const markerX = parseFloat(getStyle('left', $this))
        bindEvent(
          this.eventNameWithId('mousemove'),
          // identity: $this,
          e => {
            const position = e.pageX - startX + markerX
            this.move($this, position)

            const percent = this.getMarkerPercent(position)
            marker.position(percent)
            this.GRADIENT.get(marker.index).setPosition(percent / 100)
            this.sort()
            this.GRADIENT.reorder()

            this.update(false)
            this.trigger('gradientChange')
          },
          window.document
        )
        // e.preventDefault()
        return false
      },
      this.$actionBar
    )

    bindEvent(
      this.eventName('mousedown'),
      e => {
        if (!this.is('DownSelectedMarker')) {
          if (this.COLORPICKER.HISTORY) {
            this.COLORPICKER.HISTORY.set(this.tempColor)
          }
          this.GRADIENT.append(
            this.tempColor,
            this.getMarkerPercent(e.offsetX) / 100
          )
          this.GRADIENT.reorder()
          this.addMarker(e.offsetX)
        }
      },
      this.$actionBar
    )

    bindEvent(
      this.eventNameWithId('mouseup'),
      () => {
        this.leave('DownSelectedMarker')
        removeEvent(this.eventNameWithId('mousemove'), window.document)
        // removeEvent('mouseup', window.document)
      },
      window.document
    )

    bindEvent(
      this.eventName('input'),
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

    // delete marker
    bindEvent(
      this.eventName('click'),
      `.${this.classes.DELETE}`,
      ({ target: $this }) => {
        if (
          this.markers.length <= 2 ||
          !hasClass(this.classes.DELETEACTIVE, $this)
        ) {
          return false
        }

        const $marker = this.$marker
        const index = getData('value', $marker).index
        $marker.remove()
        removeClass(this.classes.DELETEACTIVE, this.$delete)
        this.markers.splice(index, 1)
        this.GRADIENT.removeById(index)
        this.sort()
        this.GRADIENT.reorder()

        this.update(false)
        this.leave('SelectedMarker')
        return null
      },
      this.$handle
    )
    this.KEYBOARD = keyboard()

    this.KEYBOARD.on('down', 'esc', ({ target: $this }) => {
      if (
        !this.is('openPanel') ||
        this.markers.length <= 2 ||
        this.module !== 'gradient' ||
        !hasClass(this.classes.DELETEACTIVE, $this)
      ) {
        return false
      }

      const $marker = this.instance.$marker
      const index = getData('value', $marker).index

      $marker.remove()
      removeClass(this.classes.DELETEACTIVE, this.$delete)
      this.markers.splice(index, 1)
      this.GRADIENT.removeById(index + 1)
      this.sort()
      this.GRADIENT.reorder()

      this.update(false)
      this.leave('SelectedMarker')
      return null
    })
  }

  createHtml() {
    const $wrap = this.createEl('wrap', { classes: this.classes })
    this.$wrap = wrap($wrap, this.element)
    wrap(`<div class='${this.classes.TRIGGER}'></div>`, this.element)

    if (!this.options.inline) {
      //   // init preview
      this.initPreview()
    }

    // // create panel
    this.initPanel()
    this.initColorPicker()

    if (!this.options.inline) {
      this.DROPDOWN = Dropdown.of(
        this.options.touchOff ? this.options.touchOff : this.PREVIEW.element,
        {
          ...this.options.dropdown,
          responsiveFull: this.options.responsiveDropdownFull,
          target: this.$panel,
          reference: this.options.reference
            ? this.options.reference
            : this.element,
          hideOnSelect: false,
          hideOutClick: this.options.clickWindowHide,
          onShown: () => {
            this.oldColor = this.color
            this.oldMode = this.mode
            if (this.COLORPICKER.HISTORY) {
              this.COLORPICKER.HISTORY.updateHistory()
            }

            this.clearMarks()
            this.GRADIENT.reorder()

            this.GRADIENT.value.stops.forEach((v, i) => {
              let percent = parseFloat(v.position * 100, 10)
              if (i === this.GRADIENT.length - 1) {
                percent = 100
              } else if (i === 0) {
                percent = 0
              }

              let color = v.color.toRGBA()

              if (v.color.privateMatchFormat.indexOf('HSL') !== -1) {
                color = v.color.toHSLA()
              } else if (v.color.privateMatchFormat.indexOf('RGB') !== -1) {
                color = v.color.toRGBA()
              } else if (v.color.privateMatchFormat.indexOf('HEX') !== -1) {
                color = v.color.toHEXA()
              } else {
                color = v.color.toNAME()
              }

              const options = {
                color,
                index: i,
                percent
              }
              // this.actionBarSize = getData('value', $marker).maxLenght
              this.addMarker(0, options)
            })

            this.COLORPICKER.Saturation.init()
            this.COLORPICKER.Saturation.position(
              this.COLORPICKER.COLOR.val(getData('value', this.$marker).color)
            )
            this.leave('save')
          },
          onHided: () => {
            if (!this.is('save')) {
              this.reset()
            }
          }
        }
      )
    }
  }
  initPreview() {
    const $preview = this.createEl('preview', {
      classes: this.classes
    })
    append($preview, query(`.${this.classes.TRIGGER}`, this.$wrap))
    this.PREVIEW = new Preview(
      this,
      query(`.${this.classes.PREVIEW}`, this.$wrap)
    )
  }

  initPanel() {
    this.$panel = this.createEl('panel', {
      classes: this.classes
    })
    append(this.$panel, this.$wrap)

    this.$handle = query(`.${this.classes.HANDLE}`, this.$panel)
    // this.registerComponent()
    this.initHandle()
    if (!this.options.inline || this.options.showControl) {
      this.initControl()
    } else {
      query(`.${this.classes.CONTROL}`, this.$panel).remove()
    }
  }

  initHandle() {
    this.$actionBar = this.createEl('actionBar', { classes: this.classes })
    this.$wheel = this.createEl('wheel', { classes: this.classes })
    this.$angle = this.createEl('angle', { classes: this.classes })
    this.$delete = this.createEl('delete', { classes: this.classes })
    const $selector = this.createEl('selector', { classes: this.classes })

    this.$handle.append(
      this.$actionBar,
      $selector,
      this.$angle,
      this.$wheel,
      this.$delete
    )

    this.$view = query(`.${this.classes.BARVIEW}`, this.$handle)
    this.$selector = query(`.${this.classes.MODE}>input`, this.$handle)

    this.$selector.value = this.mode.replace(/^.?/g, match =>
      match.toUpperCase()
    )
    this.SELECT = Select.of(this.$selector, {
      // value: this.mode.replace(/^.?/g, match => match.toUpperCase()),
      classes: {
        TRIGGER: '{namespace}-trigger pj-input pj-input-sm'
      },
      source: [
        { label: 'Linear', value: 'Linear' },
        { label: 'Radial', value: 'Radial' }
      ],
      onChange: res => {
        const modeName = res.replace(/^.?/g, match => match.toLowerCase())
        this.mode = modeName

        this.update(false)
      }
    })

    // set initial val
    setStyle('background', this.gradientValue, this.$view)

    // initial wheel
    this.WHEEL = new Wheel(this, this.$wheel)
  }

  initColorPicker() {
    this.COLORPICKER = ColorPicker.of(
      query(`.${this.classes.COLORPICKER}`, this.$panel),
      {
        ...this.options.colorPicker,
        inline: true,
        onChangeColor: color => {
          if (this.$marker) {
            this.setGradientColor(color, getData('value', this.$marker).index)
            // this.trigger(EVENTS.COLORCHANGE, color)
          }
        }
      }
    )
  }

  initControl() {
    this.$save = this.createEl('save', {
      classes: this.classes,
      text: this.translate('ok')
    })

    append(this.$save, query(`.${this.classes.CONTROL}`, this.$panel))
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

  getMarker(index) {
    return this.markers[index]
  }

  createMarker(options) {
    const $marker = parseHTML(
      `<div class="${this.classes.MARKER}" tabindex="1"></div>`
    )

    this.Marker = new Marker(this, $marker, options)
    setData('value', this.Marker, $marker)
    return $marker
  }

  clearMarks() {
    this.markers.forEach(v => {
      v.destroy()
    })
    this.markers = []
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
    this.update(false)
  }

  getMarkerPercent(position) {
    const minPosition = this.markers[0].elSize / 2
    const maxPosition = this.markers[0].wrapSize - this.markers[0].elSize / 2
    position = Math.min(maxPosition, Math.max(minPosition, position))
    return ((position - minPosition) / this.actionBarSize) * 100
  }

  selectMarker(marker) {
    removeClass(
      this.classes.MARKERACTIVE,
      query(`.${this.classes.MARKERACTIVE}`, this.$actionBar)
    )
    addClass(this.classes.MARKERACTIVE, marker)
    this.$marker = marker
    compose(
      this.markers.length > 2
        ? addClass(this.classes.DELETEACTIVE)
        : removeClass(this.classes.DELETEACTIVE),
      find(`.${this.classes.DELETE}`)
    )(this.$handle)

    this.leave('noSelectedMarker')
    this.enter('SelectedMarker')

    if (this.is('gradientModule')) {
      this.setGradientColor(
        getData('value', marker).color,
        getData('value', marker).index
      )
    }
  }

  setInput(val) {
    this.color = val
    this.element.value = val
    return null
  }

  setGradientColor(color, index) {
    if (!isString(color)) {
      if (color.privateMatchFormat === 'HSLA') {
        color = color.toHSLA()
      } else if (color.privateMatchFormat === 'RGBA') {
        color = color.toRGBA()
      } else if (color.privateMatchFormat === 'HEXA') {
        color = color.toHEXA()
      } else {
        color = color.toNAME()
      }
    }

    const colorData = this.GRADIENT.get(index).color.val(color)
    this.tempColor = color
    this.update(false)
    this.trigger(EVENTS.COLORCHANGE, colorData, this.color)
  }

  openPanel() {
    this.DROPDOWN.show()
  }

  closePanel() {
    this.enter('save')
    this.DROPDOWN.hide()
  }

  update(trigger = true) {
    if (this.is('noSelectedMarker')) {
      return false
    }

    if (this.mode === 'linear') {
      this.GRADIENT.privateType = 'LINEAR'
      // const deg = `${this.angle}deg`
      this.GRADIENT.angle(this.angle)
    } else {
      this.GRADIENT.privateType = 'RADIAL'
    }

    this.gradientValue = this.GRADIENT.toString()
    const viewValue = this.gradientValue
      .replace(/radial/, 'linear')
      .replace(/(.*?\().*?(,.*)/, '$190deg$2')

    setStyle('background', viewValue, this.$view)

    if (!this.options.inline) {
      this.PREVIEW.update(this.gradientValue, true)
    }

    this.setInput(this.gradientValue)
    this.trigger(EVENTS.UPDATE, this.gradientValue)

    if (this.is('save') && trigger) {
      this.trigger(EVENTS.CHANGE, this.gradientValue)
      triggerNative(this.element, 'change')
    }
    return null
  }

  reset() {
    this.mode = this.oldMode
    this.SELECT.set(this.mode.replace(/^.?/g, match => match.toUpperCase()))
    this.color = this.oldColor
    this.set(this.color, false)
  }

  createEl(tempName, options) {
    return parseHTML(
      template.compile(this.options.templates[tempName]())(options)
    )
  }

  unbind() {
    removeEvent(this.eventName(), this.element)
  }

  get() {
    return this.color
  }

  val(color, trigger = true) {
    if (!color) {
      return this.options.process.call(this, this.get())
    }

    this.set(color, trigger)
    return null
  }

  set(val, trigger = true) {
    this.GRADIENT = new Gradient(val)

    if (val.indexOf('linear') > -1) {
      this.mode = 'linear'
      this.angle = this.GRADIENT.value.angle
      this.WHEEL.set(this.angle)
      this.$angle.value = `${this.angle}°`
    } else {
      this.mode = 'radial'
    }

    this.clearMarks()
    this.GRADIENT.reorder()
    this.GRADIENT.value.stops.forEach((v, i) => {
      let percent = parseFloat(v.position * 100, 10)
      if (i === this.GRADIENT.length - 1) {
        percent = 100
      } else if (i === 0) {
        percent = 0
      }

      let color = null

      if (v.color.privateMatchFormat.indexOf('HSL') !== -1) {
        color = v.color.toHSLA()
      } else if (v.color.privateMatchFormat.indexOf('RGB') !== -1) {
        color = v.color.toRGBA()
      } else if (v.color.privateMatchFormat.indexOf('HEX') !== -1) {
        color = v.color.toHEXA()
      } else {
        color = v.color.toNAME()
      }

      const options = {
        color,
        index: i,
        percent
      }

      // this.actionBarSize = getData('value', $marker).maxLenght
      this.addMarker(0, options)
    })

    if (typeof this.lastActiveMarkerIndex === 'number') {
      this.selectMarker(this.markers[this.lastActiveMarkerIndex].$el)
    }

    this.COLORPICKER.set(getData('value', this.$marker).color, false)
    this.gradientValue = ''

    this.enter('save')
    this.update(trigger)
    this.leave('save')
  }

  clear(trigger = false) {
    this.color =
      this.options.defaultColor || 'linear-gradient(90deg, #fff 0%,#000 100%)'
    this.set(this.color, false)

    if (!this.options.inline) {
      this.PREVIEW.update('transparent')
    }

    if (trigger) {
      this.trigger(EVENTS.CHANGE, '')
      triggerNative(this.element, 'change')
    }

    this.element.value = ''
  }

  enable() {
    if (this.is('disabled')) {
      this.element.disabled = false
      this.leave('disabled')
    }
    removeClass(this.classes.DISABLED, this.$wrap)
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      this.element.disabled = true
      this.enter('disabled')
    }
    addClass(this.classes.DISABLED, this.$wrap)
    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()

      this.clear()
      empty(this.element)
      this.element.setAttribute('placeholder', '')
      unwrap(unwrap(this.element))
      if (!this.options.inline) {
        this.PREVIEW.remove()
        if (this.options.clearable) {
          this.CLEARABLE.destroy()
        }
      }
      this.$panel.remove()
      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.element)
      }
      this.leave('initialized')
    }
    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default GradientPicker
