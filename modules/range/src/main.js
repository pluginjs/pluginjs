import Component from '@pluginjs/component'
import { deepMerge } from '@pluginjs/utils'
import is from '@pluginjs/is'
import Units from '@pluginjs/units'
import { addClass, removeClass } from '@pluginjs/classes'
import { getStyle, getOffset } from '@pluginjs/styled'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { append, parseHTML, insertAfter, Each } from '@pluginjs/dom'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable
} from '@pluginjs/pluginjs'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  dependencies as DEPENDENCIES,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'
// import * as util from './util'
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
@register(
  NAMESPACE,
  {
    defaults: DEFAULTS,
    methods: METHODS,
    dependencies: DEPENDENCIES
  }
)
class Range extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)

    this.events = EVENTS
    const metas = {}
    this.data = {}

    this.cacheValue = []
    this.wrap = document.createElement('div')
    // if (this.$element.is('input')) {
    const value = this.element.value
    Each(['min', 'max', 'step'], key => {
      const val = parseFloat(this.element.getAttribute(key), 10)
      if (!isNaN(val)) {
        metas[key] = val
      }
    })
    this.element.style.display = 'none'
    this.control = document.createElement('div')
    append(this.control, this.wrap)
    insertAfter(this.wrap, this.element)
    this.options = deepMerge(
      {},
      DEFAULTS,
      options,
      this.getDataOptions(),
      metas
    )
    this.initClasses(CLASSES)

    if (is.string(value) && value !== '') {
      this.data = this.options.parse.call(this, value)
    }

    this.components = deepMerge({}, components)

    if (this.options.isRange) {
      this.options.replaceFirst = false
    }

    if (!this.data.value) {
      this.data.value = this.options.min
    }

    if (!this.options.isRange) {
      if (is.array(this.data.value)) {
        this.data.value = this.data.value[0]
      }
    } else if (!is.array(this.data.value)) {
      this.data.value = [this.data.value, this.data.value]
    } else if (this.data.value.length === 1) {
      this.data.value[1] = this.data.value[0]
    }

    this.initClasses(CLASSES)

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

    addClass(this.classes.CONTROL, this.control)
    addClass(this.classes.WRAP, this.wrap)

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.wrap)
    }

    if (this.max < this.min || this.step >= this.interval) {
      throw new Error('error options about max min step')
    }

    this.initStates()
    this.initialize()
  }

  initialize() {
    append(`<div class="${this.classes.BAR}" />`, this.control)

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

      const offset = getOffset(this.control)
      const start = event[that.direction.axis] - offset[that.direction.position]
      const p = that.getAdjacentPointer(start)

      p.mousedown(event)
      return
    }
    bindEvent(
      {
        type: this.eventName('mousedown'),
        handler: mousedownCallback.bind(this)
      },
      this.control
    )
    bindEvent(
      {
        type: this.eventName('touchstart'),
        handler: mousedownCallback.bind(this)
      },
      this.control
    )

    if (this.element.tagName.toLowerCase() === 'input') {
      bindEvent(
        {
          type: `${NAMESPACE}:change`,
          handler: () => {
            let value = this.getPointerVal()
            if (this.options.unit) {
              const data = this.unitsApi.get()
              value = `${data.value}${data.unit}`
            }
            this.element.value = value
          }
        },
        this.element
      )
    }

    this.pointer.map(p => {
      return bindEvent(
        {
          type: `${NAMESPACE}:move`,
          handler: () => {
                        if (!this.is('initialized') || this.is('updating')) {
              return false
            }
            if (this.data.value !== this.getPointerVal()) {
              this.data.value = this.getPointerVal()

              this.set(this.data)

              if (this.cacheValue.toString() !== this.data.value.toString()) {
                this.trigger(EVENTS.CHANGE, this.data)
                this.cacheValue = this.data.value
              }
            }
            return false
          }
        },
        p.element
      )
    })

    if (this.is('units')) {
      this.unitsApi.options.onChange = unit => {
        const data = this.unitsApi.get(unit)
        this.setUnitsAttr(data)
        this.set(this.data)

        this.trigger(EVENTS.CHANGEUNIT, unit)
      }

      this.unitsApi.options.onChangeVal = val => {
        val = this.options.parse.call(this, val).value

        if (is.array(val)) {
          if (val[0] > val[1]) {
            val.sort()
          }

          val[0] = Math.max(Math.min(val[0], this.max), this.min)
          val[1] = Math.max(Math.min(val[1], this.max), this.min)
        } else {
          val = Math.max(Math.min(val, this.max), this.min)
        }

        const data = {
          value: val,
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
    removeEvent(this.eventName(), this.control)
  }

  setUnitsAttr(data) {
    const { value, unit } = data

    this.min = this.options.unit[unit].min
    this.max = this.options.unit[unit].max
    this.step = this.options.unit[unit].step
    this.interval = this.max - this.min

    if (!value) {
      if (this.options.isRange) {
        this.data.value = [this.min, this.min]
      } else {
        this.data.value = this.min
      }
    } else if (is.object(value)) {
      this.data.value = value
    } else {
      this.data = Object.assign(
        {},
        this.data,
        this.options.parse.call(this, value)
      )
    }

    this.data.unit = unit
  }

  unitsInit() {
    this.enter('units')

    const data = []
    Each(this.options.unit, i => {
      data.push(i)
    })

    const input = parseHTML(
      `<input class='${this.classes.UNIT}' type='text' />`
    )
    append(input, this.wrap)
    return Units.of(input, {
      theme: 'default',
      width: parseInt(getStyle('width', input), 10),
      data,
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
      const pointer = parseHTML(
        `<div class="${this.classes.POINTER} ${
          this.classes.POINTER
        }-${i}"></div>`
      )
      append(pointer, this.control)
      const POINTER = new Pointer(pointer, i, this)
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
      return this.min + val / this.getLength() * this.interval
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
      return this.control.clientHeight
    }
    return this.control.clientWidth
  }

  update(options) {
    this.enter('updating')
    Each(['max', 'min', 'step', 'limit', 'value'], value => {
      if (options[value]) {
        this[value] = options[value]
      }
    })
    if (options.max || options.min) {
      this.setInterval(options.min, options.max)
    }

    if (!options.value) {
      this.value = options.min
    }

    Each(this.components, (key, value) => {
      if (is.function(value.update)) {
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
    if (!data || is.undefined(data)) {
      return
    }

    let { value } = data
    const { unit } = data

    if (this.is('units')) {
      if (unit) {
        this.setUnitsAttr(data)
      }

      this.unitsApi.set({
        value,
        unit
      })
    }

    if (this.options.isRange) {
      if (is.number(value)) {
        value = [value]
      }
      if (!is.array(value)) {
        return
      }
      this.pointer.forEach((p, i) => {
        p.set(value[i])
      })
    } else {
      this.p1.set(value)
    }

    this.data.value = value
  }

  val(value) {
    if (is.undefined(value)) {
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
      removeClass(this.classes.DISABLED, this.control)

      if (this.unitsApi) {
        this.unitsApi.enable()
      }
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      addClass(this.classes.DISABLED, this.control)

      if (this.unitsApi) {
        this.unitsApi.disable()
      }
      this.enter('disabled')
    }

    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()
      removeClass(this.classes.WRAP, this.control)
      removeClass(this.getThemeClass(), this.control)
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
// keyboard();

export default Range
