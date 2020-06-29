import Component from '@pluginjs/component'
import DROPDOWN from '@pluginjs/dropdown'
import { isNull, isString, isUndefined, isArray, isObject } from '@pluginjs/is'
import { addClass, removeClass } from '@pluginjs/classes'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { setStyle } from '@pluginjs/styled'
import { wrap, unwrap, query, html } from '@pluginjs/dom'
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

    if (
      isObject(this.options.units) &&
      Object.keys(this.options.units).length === 0
    ) {
      this.options.units = {
        no: true,
        inherit: false,
        px: true,
        '%': true
      }
    }
    
    if (
      isObject(this.options.units) &&
      Object.keys(this.options.units).length < 2
    ) {
      this.only = true
    } else if (isArray(this.options.units) && this.options.units.length < 2) {
      this.only = true
    } else {
      this.only = false
    }

    this.cached = {}

    this.value = {}
    this.setupStates()
    this.initialize()
  }

  getDefaultUnit() {
    const { units, defaultUnit } = this.options

    if (isArray(units) && !units.includes(defaultUnit)) {
      return units[0]
    } else if (isObject(units) && !(defaultUnit in units)) {
      return Object.keys(units)[0]
    }
    return defaultUnit
  }

  initialize() {
    this.val(this.element.value, false)
    this.build()
    this.bind()

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  build() {
    setStyle('display', 'none', this.element)
    this.$wrap = wrap(
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

    if (this.isStatic(this.value)) {
      html(this.value, this.$trigger)
      addClass(this.classes.STATIC, this.$wrap)
    } else {
      this.$input.value = this.value.input
      html(this.getUnit(), this.$trigger)
    }

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.$wrap)
    }

    if (this.element.getAttribute('disabled') || this.options.disabled) {
      this.disable()
    }
  }

  getUnits() {
    if (isArray(this.options.units)) {
      return this.options.units
    } else if (isObject(this.options.units)) {
      return Object.keys(this.options.units)
    }
    return []
  }

  initDropdown() {
    return DROPDOWN.of(this.$trigger, {
      classes: {
        DROPDOWN: `{namespace} ${this.classes.DROPDOWN}`
      },
      trigger: 'click',
      value: isString(this.value) ? this.value : this.value.unit,
      reference: this.$trigger,
      placement: this.options.placement,
      data: this.getUnits().map(i => {
        return { value: i, label: i }
      }),
      onChange: value => {
        if (this.value.unit === value) {
          return
        }
        if (this.isStatic(value)) {
          this.setStatic(value)
        } else {
          this.setUnit(value)
        }
      },

      onShown: () => {
        addClass(this.classes.ACTIVE, this.$wrap)
        this.enter('open')
      },

      onHided: () => {
        removeClass(this.classes.ACTIVE, this.$wrap)
        this.leave('open')
      }
    })
  }

  bind() {
    bindEvent(
      this.selfEventName(EVENTS.CHANGEINPUT),
      (e, instance, input) => {
        this.$input.value = input
      },
      this.element
    )

    bindEvent(
      this.selfEventName(EVENTS.CHANGE),
      (e, instance, value) => {
        if (this.isStatic(value)) {
          addClass(this.classes.STATIC, this.$wrap)
        } else {
          removeClass(this.classes.STATIC, this.$wrap)
        }
      },
      this.element
    )

    bindEvent(
      this.eventName('change'),
      e => {
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

  isStatic(value) {
    return value in this.options.units && this.options.units[value] === false
  }

  setStatic(value, trigger = true) {
    this.set(value, trigger)
  }

  setUnit(unit, trigger = true) {
    const value = {
      unit
    }

    const cached = this.getInputCached(unit)
    if (!isNull(cached)) {
      value.input = cached
    }

    this.set(value, trigger)
  }

  setInput(input, trigger = true) {
    this.set({ input }, trigger)
  }

  set(value, trigger = true) {
    let changed = false
    if (this.isStatic(value)) {
      if (value !== this.value) {
        this.value = value
        html(this.value, this.$trigger)
        this.trigger(EVENTS.CHANGESTATIC, this.value)
        changed = true
      }
    } else if (isObject(value)) {
      if (isString(this.value)) {
        this.value = { unit: '', input: '' }
      }

      if (!isUndefined(value.unit) && value.unit !== this.value.unit) {
        this.value.unit = value.unit ? value.unit : this.getDefaultUnit()
        html(this.value.unit, this.$trigger)
        
        const unit = this.options.units[this.value.unit]

        if(unit.min && unit.min > value.input || unit.max && unit.max < value.input) {
          this.enter('initInput')
        } 
   
        this.trigger(EVENTS.CHANGEUNIT, this.value.unit)
        changed = true
      }
  
      if (!isUndefined(value.input) && value.input !== this.value.input || this.is('initInput')) {
        if(this.is('initInput')) {
          this.leave('initInput')
        }
  
        const unit = this.options.units[this.value.unit]
  
        if(unit.min && unit.min > value.input) {
          this.value.input = unit.min
        } else if (unit.max && unit.max < value.input) {
          this.value.input = unit.max
        } else {
          this.value.input = value.input
        }
    
        if (!isNull(this.value.input)) {
          this.cached.input = this.value.input
        }
 
        this.trigger(EVENTS.CHANGEINPUT, this.value.input)

        changed = true
      }
    }

    if (changed) {
      if (this.value.input) {
        this.element.value = this.val()
      } else {
        if (this.isStatic(value)) {
          console.log(this.$input)
          this.$input ? this.$input.value = "" : null
          this.element.value = value
        } else {
          this.element.value = ''
        }
      }
    }

    if (trigger && changed) {
      this.trigger(EVENTS.CHANGE, this.element.value)
    }
  }

  get() {
    return this.value
  }

  getUnit() {
    return this.value.unit ? this.value.unit : this.getDefaultUnit()
  }

  getInput() {
    return this.value.input ? this.value.input : null
  }

  getInputCached() {
    if (!isUndefined(this.cached.input)) {
      return this.cached.input
    }

    return null
  }

  val(value, trigger = true) {
    if (typeof value === 'undefined') {
      return this.options.process.call(this, this.get())
    }
    return this.set(this.options.parse.call(this, value), trigger)
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
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()

      if (!this.only) {
        this.DROPDOWN.destroy()
      }

      setStyle('display', null, this.element)
      removeClass(this.getThemeClass(), this.$wrap)
      this.$input.remove()
      unwrap(this.element)
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default Units
