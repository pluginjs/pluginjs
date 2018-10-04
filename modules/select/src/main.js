import Component from '@pluginjs/component'
import templateEngine from '@pluginjs/template'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  optionable,
  translateable
} from '@pluginjs/decorator'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  dependencies as DEPENDENCIES,
  translations as TRANSLATIONS,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'
import {
  isArray,
  isFunction,
  isNull,
  isPlainObject,
  isEmpty
} from '@pluginjs/is'
import Clearable from './clearable'
import Filterable from './filterable'
import Loading from './loading'
import { removeEvent } from '@pluginjs/events'
import { addClass, removeClass } from '@pluginjs/classes'
import Dropdown from '@pluginjs/dropdown'
import { insertAfter, appendTo, html, parseHTML } from '@pluginjs/dom'

const isInput = el => el.tagName === 'INPUT'
const isSelect = el => el.tagName === 'SELECT'

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
class Select extends Component {
  constructor(element, options = {}) {
    super(element)

    this.setupOptions(options)
    this.setupClasses()
    this.setupStates()
    this.setupI18n()
    this.initialize()
  }

  initialize() {
    if (!this.value) {
      this.value = null
    }
    if (!this.selected) {
      this.selected = null
    }

    this.placeholder = this.element.getAttribute('placeholder')
    if (!this.placeholder) {
      this.placeholder = this.options.placeholder
    }

    addClass(this.classes.ELEMENT, this.element)

    this.$wrap = insertAfter(
      `<div class="${this.classes.WRAP}"></div>`,
      this.element
    )

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.$wrap)
    }

    this.$trigger = appendTo(
      `<div class="${this.classes.TRIGGER}"></div>`,
      this.$wrap
    )

    this.$label = appendTo(
      templateEngine.render(this.options.templates.label(), {
        classes: this.classes,
        placeholder: this.placeholder
      }),
      this.$trigger
    )

    if (this.options.filterable) {
      this.FILTERABLE = new Filterable(this)
    }

    this.initData()

    this.bind()

    this.setupDropdown(this.options.dropdown)

    this.LOADING = new Loading(this)

    if (this.is('loading')) {
      this.LOADING.show()
    }

    if (this.options.clearable) {
      this.CLEARABLE = new Clearable(this)
    }

    if (this.element.disabled || this.options.disabled) {
      this.disable()
    }

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  get selectOptions() {
    if (isSelect(this.element)) {
      return Array.from(this.element.children)
    }
    return []
  }

  setupDropdown(options) {
    this.$dropdown = appendTo(
      `<div class="${this.classes.DROPDOWN}"></div>`,
      this.$wrap
    )

    this.DROPDOWN = Dropdown.of(this.$trigger, {
      ...options,
      target: this.$dropdown,
      keyboard: this.options.keyboard,
      classes: {
        PLACEMENT: `${this.classes.NAMESPACE}-on-{placement}`
      },
      onShow: () => {
        if (!this.is('builded')) {
          this.buildDropdown()
        }
        addClass(this.classes.SHOW, this.$wrap)
        this.trigger(EVENTS.SHOW)
      },
      onShown: () => {
        this.trigger(EVENTS.SHOWN)
        this.enter('shown')
      },
      onHide: () => {
        this.trigger(EVENTS.HIDE)
        this.leave('shown')
      },
      onHided: () => {
        removeClass(this.classes.SHOW, this.$wrap)
        this.trigger(EVENTS.HIDED)
      },
      onChange: value => {
        this.set(value)
      }
    })
  }

  bind() {} // eslint-disable-line

  unbind() {
    removeEvent(this.eventName(), this.element)
  }

  initData() {
    if (isArray(this.options.source) || isPlainObject(this.options.source)) {
      this.resolveData(this.options.source)
    } else if (isFunction(this.options.source)) {
      this.enter('loading')
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

    let value = this.getValueFromElement()
    if (isEmpty(value)) {
      value = this.getValueFromData()
      if (isEmpty(value)) {
        value = this.options.value
      }
    }
    if (!isEmpty(value)) {
      this.set(value, false)
    }

    if (this.is('loading')) {
      if (this.LOADING) {
        this.LOADING.hide()
      }

      this.leave('loading')
    }

    if (this.is('builded') || this.is('shown')) {
      this.buildDropdown()
    }
  }

  isValidValue(val) {
    const found = this.getOptionByValue(val)
    if (found) {
      return true
    }
    return false
  }

  getValueFromData() {
    const selected = this.items.find(item => {
      return item.selected
    })

    if (selected) {
      return selected.value
    }
    return null
  }

  getValueFromElement() {
    return this.element.value
  }

  setValueForElement(value) {
    this.element.value = value
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

  select(value, trigger = true, update = true) {
    if (!this.isValidValue(value)) {
      return
    }
    if (value !== this.selected) {
      const option = this.getOptionByValue(value)

      this.setLabel(this.getOptionLabel(option))

      this.selected = value

      if (trigger) {
        this.trigger(EVENTS.SELECT, option)
      }
      if (this.DROPDOWN) {
        this.DROPDOWN.selectByValue(value, false)
      }
    }

    if (update && value !== this.value) {
      this.set(value, true)
    }
  }

  unselect(value, trigger = true, update = true) {
    if (!this.isValidValue(value)) {
      return
    }
    if (value === this.selected) {
      const option = this.getOptionByValue(value)

      this.setLabel(this.placeholder)

      this.selected = null

      if (trigger) {
        this.trigger(EVENTS.UNSELECT, option)
      }
      if (this.DROPDOWN) {
        this.DROPDOWN.unselectByValue(value, false)
      }
    }

    if (update && value === this.value) {
      this.set(null, true)
    }
  }

  set(value, trigger = true) {
    value = this.purifyValue(value)
    if (value !== this.value) {
      this.value = value

      if (isNull(value)) {
        this.unselect(this.selected, trigger, false)
        removeClass(this.classes.SELECTED, this.$wrap)

        if (trigger) {
          this.trigger(EVENTS.CLEAR)
        }
      } else {
        this.select(value, trigger, false)
        addClass(this.classes.SELECTED, this.$wrap)
      }

      this.setValueForElement(value)

      if (trigger) {
        this.trigger(EVENTS.CHANGE, value)
      }
    }
  }

  purifyValue(value) {
    if (this.isValidValue(value)) {
      return value
    }
    return null
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

  clear() {
    this.set(null)
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
        value: option.value,
        selected: option.selected
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
    if (this.data) {
      const $options = this.buildOptions(this.data)

      this.$dropdown.appendChild($options)

      this.selectForDropdown()
    }

    this.enter('builded')
  }

  selectForDropdown() {
    this.DROPDOWN.selectByValue(this.value, false)
  }

  buildOptions(options) {
    const $fragment = document.createDocumentFragment()

    options.forEach(option => {
      if (option.children) {
        $fragment.appendChild(this.buildGroup(option))
      } else {
        $fragment.appendChild(this.buildOption(option))
      }
    })

    return $fragment
  }

  buildGroup(group) {
    if (!this.groupTemplate) {
      this.groupTemplate = templateEngine.compile(
        this.options.templates.group.call(this)
      )
    }

    const $group = parseHTML(
      this.groupTemplate({
        classes: this.classes,
        group
      })
    )

    group.children.forEach(option => {
      $group.appendChild(this.buildOption(option))
    })

    return $group
  }

  buildOption(option) {
    if (!this.optionTemplate) {
      this.optionTemplate = templateEngine.compile(
        this.options.templates.option.call(this)
      )
    }

    const $option = parseHTML(
      this.optionTemplate({
        classes: this.classes,
        option
      })
    )

    if (option.disabled) {
      addClass(this.classes.OPTIONDISABLED, $option)
    }

    option.__dom = $option

    return $option
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
