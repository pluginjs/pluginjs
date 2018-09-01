import Component from '@pluginjs/component'
import DROPDOWN from '@pluginjs/dropdown'
import { isNull, isUndefined } from '@pluginjs/is'
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

    this.value = null
    this.unit = null
    this.cached = {}
    this.only = this.options.units.length < 2
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

    if (this.only) {
      addClass(this.classes.ONLY, this.$trigger)
    } else {
      this.DROPDOWN = this.initDropdown()
    }

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.$wrap)
    }

    if (this.element.getAttribute('disabled') || this.options.disabled) {
      this.disable()
    }

    this.set(this.options.parse.call(this, this.element.value), false)
    this.bind()

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  initDropdown() {
    this.unit = this.options.defaultUnit

    return DROPDOWN.of(this.$trigger, {
      classes: {
        DROPDOWN: `{namespace} ${this.classes.DROPDOWN}`
      },
      width: this.options.width,
      trigger: 'click',
      reference: this.$trigger,
      data: this.options.units.map(i => {
        return { value: i, label: i }
      }),
      imitateSelect: true,
      value: this.unit,
      onChange: value => {
        if (this.unit === value) {
          return
        }
        this.setUnit(value)
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

  bind() {
    bindEvent(
      this.selfEventName([EVENTS.CHANGEUNIT, EVENTS.CHANGEINPUT]),
      () => {
        this.element.value = this.val()
        this.trigger(EVENTS.CHANGE, this.element.value)
      },
      this.element
    )

    bindEvent(
      this.eventName('change'),
      () => {
        this.setInput(this.$input.value)
      },
      this.$input
    )
  }

  unbind() {
    removeEvent(this.eventName(), this.$input)
    if (!this.only) {
      this.DROPDOWN.unbind()
    }
  }

  set(data, trigger = true) {
    const { unit, value } = data
    this.setUnit(unit, trigger)
    this.setInput(value, trigger)
  }

  get() {
    return {
      unit: this.getUnit(),
      value: this.getInput()
    }
  }

  getUnit() {
    return this.unit ? this.unit : this.options.defaultUnit
  }

  getInput() {
    return this.value ? this.value : null
  }

  setUnit(unit, trigger = true) {
    if (this.unit === unit) {
      return false
    }

    this.unit = unit
    if (!this.only) {
      this.DROPDOWN.set(unit)
    } else {
      this.$trigger.innerHTML = this.getUnit()
    }

    if (!isUndefined(this.cached[unit])) {
      this.setInput(this.cached[unit], false)
    }

    if (trigger) {
      this.trigger(EVENTS.CHANGEUNIT, unit)
    }
    return true
  }

  setInput(value, trigger = true) {
    if (this.value === value) {
      return false
    }
    this.value = value
    if (value === undefined) {
      this.$input.value = ''
    } else {
      this.$input.value = value
    }

    if (!isNull(value)) {
      this.cached[this.getUnit()] = value
    }

    if (trigger) {
      this.trigger(EVENTS.CHANGEINPUT, value)
    }
    return true
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
      if (!this.only) {
        this.DROPDOWN.enable()
      }

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

      if (!this.only) {
        this.DROPDOWN.disable()
      }
    }
    this.trigger(EVENTS.DISABLE)

    return this
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()

      if (!this.only) {
        this.DROPDOWN.destroy()
      }

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
