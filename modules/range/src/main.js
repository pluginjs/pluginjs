import Component from '@pluginjs/component'
import { isString, isArray, isObject, isNumber, isFunction } from '@pluginjs/is'
import Units from '@pluginjs/units'
import { addClass, removeClass } from '@pluginjs/classes'
import { getStyle, offset as getOffset } from '@pluginjs/styled'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { deepMerge, each } from '@pluginjs/utils'
import { append, parseHTML, insertAfter } from '@pluginjs/dom'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  optionable
} from '@pluginjs/decorator'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  dependencies as DEPENDENCIES,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'
import Keyboard from './keyboard'
import Pointer from './pointer'
import Scale from './scale'
import Selected from './selected'
import Tip from './tip'

const components = {}

@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class Range extends Component {
  constructor(element, options = {}) {
    super(element)

    this.events = EVENTS
    const metas = {}
    this.data = {}

    this.cacheValue = []
    this.$wrap = document.createElement('div')
    const input = this.element.value
    each(['min', 'max', 'step'], key => {
      const val = parseFloat(this.element.getAttribute(key), 10)
      if (!isNaN(val)) {
        metas[key] = val
      }
    })

    this.element.style.display = 'none'
    this.$control = document.createElement('div')
    append(this.$control, this.$wrap)
    insertAfter(this.$wrap, this.element)
    this.options = deepMerge(
      {},
      DEFAULTS,
      options,
      this.getDataOptions(),
      metas
    )
    this.setupClasses()

    if (isString(input) && input !== '') {
      this.data = this.options.parse.call(this, input)
    }

    this.components = deepMerge({}, components)

    if (this.options.isRange) {
      this.options.replaceFirst = false
    }

    if (!this.data.input) {
      this.data.input = this.options.min
    }

    if (!this.options.isRange) {
      if (isArray(this.data.input)) {
        this.data.input = this.data.input[0]
      }
    } else if (!isArray(this.data.input)) {
      this.data.input = [this.data.input, this.data.input]
    } else if (this.data.input.length === 1) {
      this.data.input[1] = this.data.input[0]
    }

    this.setupClasses()

    this.min = this.options.min
    this.max = this.options.max
    this.step = this.options.step
    this.interval = this.max - this.min

    if (this.options.direction === 'v') {
      this.direction = {
        axis: 'pageY',
        position: 'top'
      }
    } else {
      this.direction = {
        axis: 'pageX',
        position: 'left'
      }
    }

    addClass(this.classes.CONTROL, this.$control)
    addClass(this.classes.WRAP, this.$wrap)

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.$wrap)
    }

    if (this.max < this.min || this.step >= this.interval) {
      throw new Error('error options about max min step')
    }

    this.setupStates()
    this.initialize()
  }

  initialize() {
    append(`<div class="${this.classes.BAR}" />`, this.$control)

    // build pointers
    this.buildPointers()

    // initial components
    this.components.Selected.init(this)

    if (this.options.tip !== false) {
      this.components.Tip.init(this)
    }
    if (this.options.scale !== false) {
      this.components.Scale.init(this)
    }
    if (this.element.disabled || this.options.disabled) {
      this.disable()
    }
    if (this.options.unit) {
      const unit = this.options.defaultUnit || this.options.unit[0]
      this.data.unit = unit

      this.unitsApi = this.unitsInit()
      this.setUnitsAttr(this.unitsApi.get(unit))
    }
    // initial pointer value
    this.set(this.data)

    if (this.options.keyboard) {
      this.KEYBOARD = new Keyboard(this)
    }

    this.initData()
    // Bind events
    this.bind()

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  initData() {
    const val = this.element.value
    if (val) {
      this.val(val)
    }
  }

  bind() {
    const that = this
    const mousedownCallback = event => {
      if (that.is('disabled')) {
        return
      }
      const rightclick = event.which ? event.which === 3 : event.button === 2
      if (rightclick) {
        return
      }

      const offset = getOffset(this.$control)
      const start = event[that.direction.axis] - offset[that.direction.position]
      const p = that.getAdjacentPointer(start)

      p.mousedown(event)
      return
    }
    bindEvent(
      this.eventName('mousedown'),
      mousedownCallback.bind(this),
      this.$control
    )
    bindEvent(
      this.eventName('touchstart'),
      mousedownCallback.bind(this),
      this.$control
    )

    if (this.element.tagName.toLowerCase() === 'input') {
      bindEvent(
        this.selfEventName(EVENTS.CHANGE),
        () => {
          let input = this.getPointerVal()
          if (this.options.unit) {
            const data = this.unitsApi.get()
            input = `${data.input}${data.unit}`
          }
          this.element.input = input
        },
        this.element
      )
    }

    this.pointer.map(p => {
      return bindEvent(
        this.selfEventName(EVENTS.MOVE),
        () => {
          if (!this.is('initialized') || this.is('updating')) {
            return false
          }
          if (this.data.input !== this.getPointerVal()) {
            this.data.input = this.getPointerVal()

            this.set(this.data)

            if (this.cacheValue.toString() !== this.data.input.toString()) {
              this.trigger(EVENTS.CHANGE, this.data)
              this.cacheValue = this.data.input
            }
          }
          return false
        },
        p.element
      )
    })

    if (this.is('units')) {
      this.unitsApi.options.onChange = unit => {
        const data = this.unitsApi.get(unit)
        if (isString(data.input)) {
          data.input = data.input.split(',')
        }
        this.setUnitsAttr(data)
        this.set(this.data)
        this.trigger(EVENTS.CHANGEUNIT, unit)
      }

      this.unitsApi.options.onChangeVal = val => {
        val = this.options.parse.call(this, val).input

        if (isArray(val)) {
          if (val[0] > val[1]) {
            val.sort()
          }

          val[0] = Math.max(Math.min(val[0], this.max), this.min)
          val[1] = Math.max(Math.min(val[1], this.max), this.min)
        } else {
          val = Math.max(Math.min(val, this.max), this.min)
        }

        const data = {
          input: val,
          unit: this.data.unit
        }
        this.unitsApi.set(data)
        this.trigger(EVENTS.CHANGE, data)
        this.set(data)
      }
    }
  }

  unbind() {
    removeEvent(this.eventName(), this.element)
    removeEvent(this.eventName(), this.$control)
  }

  setUnitsAttr(data) {
    const { input, unit } = data
    this.min = this.options.unit[unit].min
    this.max = this.options.unit[unit].max
    this.step = this.options.unit[unit].step
    this.interval = this.max - this.min

    if (!input) {
      if (this.options.isRange) {
        this.data.input = [this.min, this.min]
      } else {
        this.data.input = this.min
      }
    } else if (isObject(input)) {
      this.data.input = input
    } else {
      this.data = Object.assign(
        {},
        this.data,
        this.options.parse.call(this, input)
      )
    }
    this.data.unit = unit
  }

  unitsInit() {
    this.enter('units')

    const data = []
    each(this.options.unit, i => {
      data.push(i)
    })

    const $input = parseHTML(
      `<input class='${this.classes.UNIT}' type='text' />`
    )
    append($input, this.$wrap)
    return Units.of($input, {
      theme: 'default',
      width: parseInt(getStyle('width', $input), 10),
      units: data,
      defaultUnit: this.data.unit
    })
  }

  buildPointers() {
    this.pointer = []
    let pointerCount = 1
    if (this.options.isRange) {
      pointerCount = 2
    }
    for (let i = 1; i <= pointerCount; i++) {
      const $pointer = parseHTML(
        `<div class="${this.classes.POINTER} ${
          this.classes.POINTER
        }-${i}"></div>`
      )
      append($pointer, this.$control)
      const POINTER = new Pointer($pointer, i, this)
      this.pointer.push(POINTER)
    }

    // alias of pointer
    this.p1 = this.pointer[0]
    if (this.options.isRange) {
      this.p2 = this.pointer[1]
    }
  }

  getValueFromPosition(val) {
    if (val > 0) {
      return this.min + (val / this.getLength()) * this.interval
    }
    return 0
  }

  getAdjacentPointer(start) {
    const value = this.getValueFromPosition(start)
    if (this.options.isRange) {
      const p1 = this.p1.value
      const p2 = this.p2.value
      const diff = Math.abs(p1 - p2)
      if (p1 <= p2) {
        if (value > p1 + diff / 2) {
          return this.p2
        }
        return this.p1
      }

      if (value > p2 + diff / 2) {
        return this.p1
      }

      return this.p2
    }
    return this.p1
  }

  getLength() {
    if (this.options.direction === 'v') {
      return this.$control.clientHeight
    }
    return this.$control.clientWidth
  }

  update(options) {
    this.enter('updating')[('max', 'min', 'step', 'limit', 'value')].forEach(
      value => {
        if (options[value]) {
          this[value] = options[value]
        }
      }
    )
    if (options.max || options.min) {
      this.setInterval(options.min, options.max)
    }

    if (!options.value) {
      this.value = options.min
    }

    each(this.components, (key, value) => {
      if (isFunction(value.update)) {
        value.update(this)
      }
    })

    this.set(this.value)

    this.trigger(EVENTS.UPDATE)

    this.leave('updating')
  }

  getPointerVal() {
    const value = []

    this.pointer.forEach((p, i) => {
      value[i] = p.get()
    })

    if (this.options.isRange) {
      return value
    }

    return value[0]
  }

  get() {
    return this.data
  }

  set(data) {
    if (!data || typeof data === 'undefined') {
      return
    }
    let { input } = data
    const { unit } = data

    if (this.is('units')) {
      if (unit) {
        this.setUnitsAttr(data)
      }

      this.unitsApi.set({
        input,
        unit
      })
    }

    if (this.options.isRange) {
      if (isNumber(input)) {
        input = [input]
      }
      if (!isArray(input)) {
        return
      }
      this.pointer.forEach((p, i) => {
        p.set(input[i])
      })
    } else {
      this.p1.set(input)
    }

    this.data.input = input
  }

  val(value) {
    if (typeof value === 'undefined') {
      const val = this.options.process.call(this, this.get())
      return val
    }
    this.set(this.options.parse.call(this, value))
    return true
  }

  setInterval(start, end) {
    this.min = start
    this.max = end
    this.interval = end - start
  }

  enable() {
    if (this.is('disabled')) {
      removeClass(this.classes.DISABLED, this.$control)

      if (this.unitsApi) {
        this.unitsApi.enable()
      }
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      addClass(this.classes.DISABLED, this.$control)

      if (this.unitsApi) {
        this.unitsApi.disable()
      }
      this.element.disabled = true
      this.enter('disabled')
    }

    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()
      removeClass(this.classes.WRAP, this.$control)
      removeClass(this.getThemeClass(), this.$control)
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }

  static registerComponent(component, methods) {
    components[component] = methods
  }
}

Range.registerComponent('Scale', Scale)
Range.registerComponent('Selected', Selected)
Range.registerComponent('Tip', Tip)

export default Range
