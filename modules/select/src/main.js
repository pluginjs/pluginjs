import Component from '@pluginjs/component'
import template from '@pluginjs/template'
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
import {
  isArray,
  isFunction,
  isUndefined,
  isNull,
  isPlainObject
} from '@pluginjs/is'
// import { bindEvent, removeEvent } from '@pluginjs/events'
import { addClass, removeClass } from '@pluginjs/classes'
import Dropdown from '@pluginjs/dropdown'
import { insertAfter, appendTo, html } from '@pluginjs/dom'

// const isInput = el => el.tagName === 'INPUT'
const isSelect = el => el.tagName === 'SELECT'

@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class Select extends Component {
  constructor(element, options = {}) {
    super(element)

    this.setupOptions(options)
    this.setupClasses()
    this.setupStates()
    this.initialize()
  }

  initialize() {
    this.value = this.element.value
    if (isUndefined(this.value)) {
      this.value = this.options.value
    }
    this.placeholder = this.element.getAttribute('placeholder')
    if (isUndefined(this.placeholder)) {
      this.placeholder = this.options.placeholder
    }

    addClass(this.classes.ELEMENT, this.element)
    if (this.options.theme) {
      addClass(this.getThemeClass(), this.$wrap)
    }
    this.$wrap = insertAfter(
      `<div class="${this.classes.WRAP}"></div>`,
      this.element
    )
    this.$trigger = appendTo(
      `<div class="${this.classes.TRIGGER}">${this.placeholder}</div>`,
      this.$wrap
    )

    this.initData()
    this.setupDropdown()

    if (this.element.disabled || this.options.disabled) {
      this.disable()
    }

    // this.bind()
    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  get selectOptions() {
    if (isSelect(this.element)) {
      return Array.from(this.element.options)
    }
    return []
  }

  setupDropdown() {
    this.$dropdown = appendTo(
      `<div class="${this.classes.DROPDOWN}"></div>`,
      this.$wrap
    )

    this.DROPDOWN = Dropdown.of(this.$trigger, {
      ...this.options.dropdown,
      target: this.$dropdown,
      keyboard: this.options.keyboard,
      onShow: () => {
        if (!this.is('builded')) {
          this.buildDropdown()
          this.DROPDOWN.selectByValue(this.value)
        }

        this.trigger(EVENTS.SHOW)
      },
      onShown: () => {
        this.trigger(EVENTS.SHOWN)
      },
      onHide: () => {
        this.trigger(EVENTS.HIDE)
      },
      onHided: () => {
        this.trigger(EVENTS.HIDED)
      },
      onChange: value => {
        this.select(value)
      }
    })
  }

  // bind() {}

  // unbind() {
  //   removeEvent(this.eventName(), this.element)
  // }

  initData() {
    if (isArray(this.options.source) || isPlainObject(this.options.source)) {
      this.resolveData(this.options.source)
    } else if (isFunction(this.options.source)) {
      this.options.source.call(this, this.resolveData.bind(this))
    } else {
      this.resolveData(this.getDataFromOptions())
    }
  }

  resolveData(data) {
    if (isPlainObject(data)) {
      data = Object.keys(data).map(value => {
        return {
          value,
          label: data[value]
        }
      })
    }
    this.data = data

    if (this.value) {
      this.select(this.value, false)
    }
  }

  select(value, trigger = true) {
    const option = this.getOptionByValue(value)

    if (trigger) {
      this.trigger(EVENTS.SELECT, option)

      if (this.value !== value) {
        this.trigger(EVENTS.CHANGE, value)
      }
    }

    this.value = value
    this.element.value = value

    if (!isNull(value) && option) {
      this.setTriggerLabel(this.getOptionLabel(option))
      addClass(this.classes.SELECTED, this.$trigger)
    } else {
      this.setTriggerLabel(this.placeholder)
      removeClass(this.classes.SELECTED, this.$trigger)
    }
  }

  getOptionLabel(option) {
    return this.options.optionLabel.call(this, option)
  }

  setTriggerLabel(label) {
    html(label, this.$trigger)
  }

  getOptionByValue(value) {
    return this.data.find(option => {
      return option.value == value // eslint-disable-line
    })
  }

  getDataFromOptions() {
    return this.selectOptions.map(option => {
      return {
        ...option.dataset,
        label: option.innerHTML,
        value: option.value
      }
    })
  }

  buildDropdown() {
    const options = this.buildOptions(this.data)

    html(options, this.$dropdown)

    this.enter('builded')
  }

  buildOptions(options) {
    let content = ''
    options.forEach(option => {
      content += this.buildOption(option)
    })

    return content
  }

  buildOption(option) {
    return template.render(this.options.templates.option(), {
      classes: this.classes,
      option
    })
  }

  val(value) {
    if (typeof value === 'undefined') {
      return this.options.process.call(this, this.get())
    }

    return this.set(this.options.parse.call(this, value))
  }

  get() {
    return this.value
  }

  set(value) {
    return this.select(value)
  }

  enable() {
    if (this.is('disabled')) {
      this.DROPDOWN.enable()
      removeClass(this.classes.DISABLED, this.$wrap)
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      this.DROPDOWN.disable()
      addClass(this.classes.DISABLED, this.$wrap)
      this.enter('disabled')
    }

    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()

      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.$wrap)
      }
      removeClass(this.classes.ELEMENT, this.element)
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default Select
