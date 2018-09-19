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
  // isUndefined,
  isNull,
  isPlainObject
} from '@pluginjs/is'
import Clearable from './clearable'
import Filterable from './filterable'
// import { bindEvent, removeEvent } from '@pluginjs/events'
import { addClass, removeClass } from '@pluginjs/classes'
import Dropdown from '@pluginjs/dropdown'
import { insertAfter, appendTo, html } from '@pluginjs/dom'

const isInput = el => el.tagName === 'INPUT'
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
    this.value = null
    this.placeholder = this.element.getAttribute('placeholder')
    if (!this.placeholder) {
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
      `<div class="${this.classes.TRIGGER}"></div>`,
      this.$wrap
    )

    this.$label = appendTo(
      `<div class="${this.classes.LABEL}">${this.placeholder}</div>`,
      this.$trigger
    )

    this.initData()
    this.setupDropdown()

    if (this.options.clearable) {
      this.CLEARABLE = new Clearable(this)
    }
    if (this.options.filterable) {
      this.FILTERABLE = new Filterable(this)
    }

    if (this.element.disabled || this.options.disabled) {
      this.disable()
    }
    // this.bind()
    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  get selectOptions() {
    if (isSelect(this.element)) {
      return Array.from(this.element.children)
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
      classes: {
        PLACEMENT: `${this.classes.NAMESPACE}-on-{placement}`
      },
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
    this.items = this.flatItems(data)

    let value = this.element.value

    if (value === '') {
      value = this.options.value
    }
    if (value) {
      console.log(value)
      this.select(value, false)
    }
  }

  flatItems(data) {
    let items = []
    data.forEach(item => {
      if (item.children) {
        items = items.concat(item.children)
      } else {
        items.push(item)
      }
    })

    return items
  }

  select(value, trigger = true) {
    if (value !== this.value) {
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
        this.setLabel(this.getOptionLabel(option))
        addClass(this.classes.SELECTED, this.$wrap)
      } else {
        this.setLabel(this.placeholder)
        removeClass(this.classes.SELECTED, this.$wrap)
      }
    }
  }

  getOptionLabel(option) {
    return this.options.optionLabel.call(this, option)
  }

  setLabel(label) {
    if (isInput(this.$label)) {
      this.$label.value = label
    } else {
      html(label, this.$label)
    }
  }

  getOptionByValue(value) {
    return this.items.find(option => {
      return option.value == value // eslint-disable-line
    })
  }

  getDataFromOptions() {
    const getDataFromOption = option => {
      return {
        ...option.dataset,
        disabled: option.disabled,
        label: option.innerHTML,
        value: option.value
      }
    }
    return this.selectOptions.map(option => {
      if (option.tagName === 'OPTGROUP') {
        return {
          ...option.dataset,
          label: option.label,
          children: Array.from(option.children).map(option => {
            return getDataFromOption(option)
          })
        }
      }
      return getDataFromOption(option)
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
      if (option.children) {
        content += this.buildGroup(option)
      } else {
        content += this.buildOption(option)
      }
    })

    return content
  }

  buildGroup(group) {
    let options = ''
    group.children.forEach(option => {
      options += this.buildOption(option)
    })

    return template.render(this.options.templates.group(), {
      classes: this.classes,
      group,
      options
    })
  }

  buildOption(option) {
    return template.render(this.options.templates.option(option), {
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

  clear() {
    this.set(null)
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

      if (this.CLEARABLE) {
        this.CLEARABLE.destroy()
      }
      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.$wrap)
      }
      this.$wrap.remove()
      removeClass(this.classes.ELEMENT, this.element)
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default Select
