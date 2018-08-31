import Component from '@pluginjs/component'
import { isObject, isNumeric, isNumber, isNull, isNan } from '@pluginjs/is'
import template from '@pluginjs/template'
import { addClass, removeClass } from '@pluginjs/classes'
import { bindEvent, removeEvent, bindEventOnce } from '@pluginjs/events'
import { unwrap, append, parseHTML, wrap, query } from '@pluginjs/dom'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  optionable
} from '@pluginjs/decorator'
import RULES from './rules'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  dependencies as DEPENDENCIES,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'

@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class Spinner extends Component {
  constructor(element, options = {}) {
    super(element)

    this.setupOptions(options)
    this.setupClasses()

    if (this.options.rule) {
      const that = this
      const array = ['min', 'max', 'step', 'precision']
      array.map(value => {/* eslint-disable-line */
        that[value] = RULES[that.options.rule][value]
      })
    } else {
      this.min = this.options.min
      this.max = this.options.max
      this.step = this.options.step
      this.precision = this.options.precision
    }

    this.mousewheel = this.options.mousewheel

    this.spinTimeout = null

    this.classes.THEME = this.getThemeClass()

    this.setupStates()
    this.initialize()
  }

  initialize() {
    this.$control = parseHTML(
      template.compile(this.options.templates.control())({
        classes: this.classes
      })
    )
    this.$down = query(`.${this.classes.DOWN}`, this.$control)
    this.$up = query(`.${this.classes.UP}`, this.$control)
    this.$wrap = wrap(
      `<div tabindex="0" class="${this.classes.WRAP}"></div>`,
      this.element
    )

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.$wrap)
    }

    if (this.options.layout === 'right') {
      addClass(this.classes.CONTROLRIGHT, this.$wrap)
      removeClass('pj-icon-plus', this.$up)
      addClass('pj-icon-plus-mini', this.$up)
      removeClass('pj-icon-minus', this.$down)
      addClass('pj-icon-minus-mini', this.$down)
    }

    append(this.$control, this.$wrap)

    this.data = {}

    if (!isNull(this.options.unit)) {
      this.UNITS = this.unitsInit()

      const { value, unit } = this.UNITS.get()

      this.data.unit = unit
      if (value) {
        this.data.value = value
      }

      this.setUnitsAttr(false)

      // const {value, unit} = unitVal;

      // this.data.unit = unit;
      // this.min = this.options.unit[unit].min;
      // this.max = this.options.unit[unit].max;
      // this.step = this.options.unit[unit].step;
    } else {
      this.initData()
      this.set(this.data, false)
    }

    // if (isNull(this.options.unit)) {
    // } else {
    // }

    // attach event
    this.bind()
    if (this.element.disabled || this.options.disabled) {
      this.disable()
    }

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  initData() {
    const val = this.element.value
    if (val) {
      let value = parseFloat(val)

      // if (isNumber(this.element.value)) {
      //   this.data.value = this.element.value;
      // } else {
      //   this.data.value = isNumber(this.min) ? this.min : 0;
      // }

      if (isNan(value)) {
        value = 0
      }

      this.data.value = Math.min(Math.max(this.min, value), this.max)
      this.set(this.data)
    } else {
      this.data.value = parseFloat(this.min)
    }
  }

  // 500ms to detect if it is a click event
  // 60ms interval execute if it if long pressdown
  spin(fn, timeout) {
    const that = this
    const spinFn = timeout => {
      clearTimeout(that.spinTimeout)
      that.spinTimeout = setTimeout(() => {
        fn.call(that)
        spinFn(60)
      }, timeout)
    }
    spinFn(timeout || 500)
  }

  setUnitsAttr(trigger = true) {
    const unit = this.UNITS.getUnit()

    if (this.data.unit === unit) {
      this.min = this.options.unit[unit].min
      this.max = this.options.unit[unit].max
      this.step = this.options.unit[unit].step
    }

    this.set(this.data, trigger)
  }

  unitsInit() {
    this.enter('units')

    const data = []
    let width

    for (const key in this.options.unit) {
      if (Object.prototype.hasOwnProperty.call(this.options.unit, key)) {
        data.push(key)
      }
    }

    if (this.options.layout === 'both') {
      width =
        parseInt(this.element.clientWidth, 10) -
        parseInt(this.$up.clientWidth, 10) * 2
    } else {
      width =
        parseInt(this.element.clientWidth, 10) -
        parseInt(this.$control.clientWidth, 10)
    }

    return new UNITS(this.element, { /* eslint-disable-line */
      data,
      width
    })
  }

  bind() {
    const that = this
    this.enter('bind')

    bindEvent(
      this.eventName('focus'),
      () => {
        addClass(this.classes.FOCUS, this.$wrap)
      },
      this.$wrap
    )
    bindEvent(
      this.eventName('blur'),
      () => {
        removeClass(this.classes.FOCUS, this.$wrap)
      },
      this.$wrap
    )

    bindEvent(
      this.eventName('mousedown'),
      () => {
        bindEventOnce(
          this.eventNameWithId('mouseup'),
          () => {
            clearTimeout(that.spinTimeout)
          },
          document
        )
        that.spin(that.spinDown)
      },
      this.$down
    )
    bindEvent(
      this.eventName('mouseup'),
      () => {
        clearTimeout(that.spinTimeout)
        removeEvent(this.eventNameWithId('mouseup'), document)
      },
      this.$down
    )
    bindEvent(
      this.eventName('click'),
      () => {
        that.spinDown()
      },
      this.$down
    )

    bindEvent(
      this.eventName('mousedown'),
      () => {
        bindEventOnce(
          this.eventNameWithId('mouseup'),
          () => {
            clearTimeout(that.spinTimeout)
          },
          document
        )
        that.spin(that.spinUp)
      },
      this.$up
    )
    bindEvent(
      this.eventName('mouseup'),
      () => {
        clearTimeout(that.spinTimeout)
        removeEvent(this.eventNameWithId('mouseup'), document)
      },
      this.$up
    )
    bindEvent(
      this.eventName('click'),
      () => {
        that.spinUp()
      },
      this.$up
    )

    bindEvent(
      this.eventName('focus'),
      () => {
        that.enter('focused')
        addClass(that.classes.FOCUS, this.$wrap)

        // keyboard support
        bindEvent(
          this.eventName('keydown'),
          e => {
            /* eslint consistent-return: "off"*/
            const key = e.keyCode || e.which
            if (key === 38) {
              that.applyValue()
              that.spinUp()
              return false
            }
            if (key === 40) {
              that.applyValue()
              that.spinDown()
              return false
            }
            if (key <= 57 && key >= 48) {
              setTimeout(() => {
                // that.set(parseFloat(it.value));
              }, 0)
            }
          },
          this.element
        )
        // mousewheel support
        bindEvent(
          this.eventName('wheel'),
          () => {
            const delta = event.deltaY

            if (delta < 0) {
              that.spinUp()
            } else if (delta > 0) {
              that.spinDown()
            }
          },
          this.element
        )
      },
      this.element
    )

    bindEvent(
      this.eventName('blur'),
      () => {
        that.leave('focused')
        removeClass(that.classes.FOCUS, this.$wrap)
        removeEvent(that.eventName('keydown'), this.element)
        if (that.mousewheel === true) {
          removeEvent(this.eventName('wheel'), this.element)
        }
        that.applyValue()
      },
      this.element
    )

    if (this.is('units')) {
      this.UNITS.options.onChangeVal = () => {
        const unit = this.UNITS.getUnit()
        this.data = this.UNITS.get(unit)
        this.setUnitsAttr()
      }
      this.UNITS.options.onChange = val => {
        this.data = this.UNITS.get(val)
        this.setUnitsAttr()
      }
    }
  }

  unbind() {
    this.leave('bind')

    removeEvent(this.eventName(), this.element)
    removeEvent(this.eventName(), this.$down)
    removeEvent(this.eventName(), this.$up)
    removeEvent(this.eventName(), this.$wrap)
  }

  isOutOfBounds(value) {
    if (value < this.min) {
      return -1
    }
    if (value > this.max) {
      return 1
    }
    return 0
  }

  applyValue() {
    if (this.data.value !== this.element.value) {
      this.set(this.options.parse(this.element.value))
    }
  }

  set(data, trigger = true) {
    if (!isNumber(data) && !isObject(data)) {
      return
    }

    const value = isNumber(data) ? data : data.value

    this.data.value = value
    if (typeof data.unit !== 'undefined') {
      this.data.unit = data.unit
    }

    if (this.is('units')) {
      this.UNITS.set(data)
    } else {
      this.element.value = value
    }

    if (trigger) {
      this.trigger(EVENTS.CHANGE, this.data)
    }
  }

  get() {
    return this.data
  }

  /* Public methods */
  update(obj) {
    const that = this[('min', 'max', 'precision', 'step')].map(value => { /* eslint-disable-line */
      if (obj[value]) {
        that[value] = obj[value]
      }
    })

    if (obj.value) {
      this.set(obj.value)
    }
    return this
  }

  val(value) {
    if (typeof value === 'undefined') {
      return this.options.process.call(this, this.get())
    }
    this.set(this.options.parse.call(this, value))
  }

  spinDown() {
    if (!isNumeric(this.data.value)) {
      this.data.value = 0
    }
    let value = this.data.value
    value = parseFloat(value) - parseFloat(this.step)

    const valid = this.isOutOfBounds(value)

    if (valid === -1) {
      value = this.options.looping === true ? this.max : this.min
    }
    value = Number(value).toFixed(this.precision)
    this.data.value = value

    this.set(this.data)

    return this
  }

  spinUp() {
    if (!isNumeric(this.data.value)) {
      this.data.value = 0
    }

    let value = this.data.value
    value = parseFloat(value) + parseFloat(this.step)

    const valid = this.isOutOfBounds(value)

    if (valid === 1) {
      value = this.options.looping === true ? this.min : this.max
    }
    value = Number(value).toFixed(this.precision)
    this.data.value = value

    this.set(this.data)

    return this
  }

  enable() {
    if (this.is('disabled')) {
      removeClass(this.classes.DISABLED, this.$wrap)
      this.element.disabled = false

      if (!this.is('eventBinded')) {
        this.bind()
      }
      this.leave('disabled')
    }

    this.trigger(EVENTS.ENABLE)

    return this
  }

  disable() {
    if (!this.is('disabled')) {
      this.enter('disabled')

      this.element.disabled = true
      addClass(this.classes.DISABLED, this.$wrap)

      this.unbind()
    }
    this.trigger(EVENTS.DISABLE)

    return this
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()
      this.$control.remove()
      unwrap(this.element)

      if (this.UNITS) {
        this.UNITS.destroy()
      }
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()

    return this
  }
}

export default Spinner
