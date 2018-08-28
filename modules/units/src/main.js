import Component from '@pluginjs/component'
import DROPDOWN from '@pluginjs/dropdown'
import { isNull, isNan } from '@pluginjs/is'
import { addClass, removeClass } from '@pluginjs/classes'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { query, insertAfter } from '@pluginjs/dom'
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

@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class Units extends Component {
  constructor(element, options = {}) {
    super(element)
    this.setupOptions(options)
    this.setupClasses()

    this.value = ''
    this.data = {}

    this.setupStates()
    this.initialize()
  }

  initialize() {
    addClass(this.classes.NAMESPACE, this.element)

    this.$wrap = insertAfter(
      `<div class="${this.classes.WRAP}">
  <input type="text" class="${this.classes.INPUT}">
  <span class="${this.classes.TRIGGER}"></span><div></div>
</div>`,
      this.element
    )

    this.$trigger = query(`.${this.classes.TRIGGER}`, this.$wrap)

    this.$input = query('input', this.$wrap)

    this.options.data.forEach(v => {
      this.data[v] = ''
    })

    this.DROPDOWN = this.initDropdown(this.$trigger)

    if (this.options.data.length < 2) {
      addClass(this.classes.ONLY, this.$trigger)
      this.DROPDOWN.disable()
    }

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.$wrap)
    }

    if (this.element.getAttribute('disabled') || this.options.disabled) {
      this.disable()
    }

    this.initData()
    this.bind()

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  initData() {
    const val = this.element.value
    if (val) {
      let value = parseFloat(val)
      let unit = val.match(/\D+$/g)
      unit = isNull(unit) ? this.options.data[0] : unit[0]

      if (isNan(value)) {
        value = ''
      }
      if (this.options.data.indexOf(unit) < 0) {
        unit = this.options.data[0]
      }
      this.set({
        unit,
        value
      })
    }
  }

  initDropdown($trigger) {
    const data = []
    for (const i in this.data) {
      if ({}.hasOwnProperty.call(this.data, i)) {
        data.push({ value: i, label: i })
      }
    }

    this.unit = this.options.defaultUnit || data[0].label

    return DROPDOWN.of($trigger, {
      classes: {
        DROPDOWN: `{namespace} ${this.classes.DROPDOWN}`
      },
      width: this.options.width,
      trigger: 'click',
      reference: this.$input,
      data,
      imitateSelect: true,
      value: this.unit,
      placement: this.options.placement,
      onChange: value => {
        if (this.unit === value) {
          return
        }

        this.cacheValue(this.unit)
        this.update(value)
        this.trigger(EVENTS.CHANGE, this.unit)
      },

      onShow: () => {
        addClass(this.classes.ACTIVE, this.$wrap)
        this.enter('open')
      },

      onHide: () => {
        removeClass(this.classes.ACTIVE, this.$wrap)
        this.leave('open')
      }
    })
  }

  cacheValue(unit, value = '') {
    if (value) {
      this.data[unit] = value
      return
    }
    this.data[unit] = this.value
  }

  bind() {
    this.enter('bind')

    /* when event change, if this.$input wrap has form, trigger form submit. */
    bindEvent(
      this.eventName('change'),
      () => {
        const value = this.$input.value
        // if (value !== '' && !parseFloat(value, 10)) {
        //   return false;
        // }

        this.value = parseFloat(value, 10)
        this.value = value
        this.cacheValue(this.getUnit(), this.value)
        this.update(this.getUnit())
        this.trigger(EVENTS.CHANGEVAL, this.value)
      },
      this.$input
    )
  }

  unbind() {
    this.leave('bind')

    removeEvent(this.eventName(), this.$input)
    this.DROPDOWN.disable()
  }

  set(data, trigger = true) {
    const hasUnit =
      typeof data.unit !== 'undefined' &&
      data.unit !== null &&
      data.unit !== this.unit

    this.unit = hasUnit ? data.unit : this.unit
    this.value = data.value

    this.$input.value = this.value
    this.element.value = `${this.value}${this.unit}`
    this.cacheValue(this.unit, this.value)

    if (hasUnit) {
      this.DROPDOWN.selectByValue(this.unit)
      this.trigger(EVENTS.SETUNIT, this.unit)
    }

    if (trigger) {
      this.trigger(EVENTS.SUBMIT, this.value)
    }
  }

  update(unit) {
    this.value = this.get(unit).value
    this.$input.value = this.value
    this.unit = unit
    this.trigger(EVENTS.UPDATE, this.unit)
  }

  get(unit) {
    if (unit) {
      return {
        unit,
        value: this.data[unit]
      }
    }
    return {
      unit: this.unit,
      value: this.value
    }
  }

  getUnit() {
    return this.DROPDOWN.get()
  }

  setWidth(width) {
    this.DROPDOWN.setWidth(width)
  }

  toggleUnit(unit) {
    this.DROPDOWN.set(unit)
  }

  getInput() {
    return this.get()
  }

  val(value) {
    if (typeof value === 'undefined') {
      return this.options.process.call(this, this.get())
    }

    this.set(this.options.parse.call(this, value))
    return true
  }

  enable() {
    if (this.is('disabled')) {
      this.leave('disabled')
      this.element.disabled = false
      this.$input.disabled = false
      this.DROPDOWN.enable()
      removeClass(this.classes.DISABLED, this.$wrap)
    }

    this.trigger(EVENTS.ENABLE)

    return this
  }

  disable() {
    if (!this.is('disabled')) {
      this.enter('disabled')
      this.element.disabled = true
      this.$input.disabled = true
      addClass(this.classes.DISABLED, this.$wrap)
      this.DROPDOWN.disable()
    }
    this.trigger(EVENTS.DISABLE)

    return this
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()
      this.DROPDOWN.element.remove()
      this.DROPDOWN.destroy()
      removeClass(this.classes.NAMESPACE, this.element)
      removeClass(this.getThemeClass(), this.$wrap)
      this.element.value = ''
      this.$input.remove()
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
    return this
  }
}

export default Units
