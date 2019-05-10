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
import { isArray, isFunction, isPlainObject, isEmpty } from '@pluginjs/is'
import Loading from './loading'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { addClass, removeClass } from '@pluginjs/classes'
import Dropdown from '@pluginjs/dropdown'
import {
  insertAfter,
  appendTo,
  html,
  parseHTML,
  query,
  queryAll
} from '@pluginjs/dom'
import { compose, deepClone, triggerNative } from '@pluginjs/utils'

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
class ImageSelector extends Component {
  constructor(element, options = {}) {
    super(element)
    this.$active = []
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

    addClass(this.classes.ELEMENT, this.element)

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.$wrap)
    }

    if (!this.options.inline) {
      this.$wrap = insertAfter(
        `<div class="${this.classes.WRAP}"></div>`,
        this.element
      )

      this.$trigger = appendTo(
        templateEngine.render(this.options.templates.trigger(), {
          classes: this.classes
        }),
        this.$wrap
      )

      this.$image = query(`.${this.classes.TRIGGERIMAGE}`, this.$trigger)
      this.$label = query(`.${this.classes.TRIGGERLABEL}`, this.$trigger)
      this.$change = query('.pj-image-selector-change', this.$trigger)
    }

    this.setupDropdown(this.options.dropdown)

    this.initData()

    this.bind()

    this.LOADING = new Loading(this)

    if (this.is('loading')) {
      this.LOADING.show()
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
    if (!this.options.inline) {
      this.$dropdown = appendTo(
        `<div class="${this.classes.DROPDOWN}"></div>`,
        this.$wrap
      )
      this.$content = appendTo(
        templateEngine.render(this.options.templates.content(), {
          classes: this.classes
        }),
        this.$dropdown
      )
    } else {
      this.$content = insertAfter(
        templateEngine.render(this.options.templates.inline(), {
          classes: this.classes
        }),
        this.element
      )
    }

    if (this.options.inline) {
      this.buildDropdown()
    }

    if (!this.options.inline) {
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
  }

  bind() {
    compose(
      bindEvent(this.eventName('mouseenter'), () => {
        if (this.is('disabled')) {
          return null
        }
        addClass(this.classes.HOVER, this.$trigger)
        return null
      }),
      bindEvent(this.eventName('mouseleave'), () => {
        if (this.is('disabled')) {
          return null
        }
        removeClass(this.classes.HOVER, this.$trigger)
        return null
      })
    )(this.$trigger)

    if (this.options.inline) {
      const self = this // eslint-disable-line
      bindEvent(
        this.eventName('mousedown'),
        '.pj-image-selector-option',
        function() {
        const $item = this // eslint-disable-line
          const value = $item.getAttribute(self.options.itemValueAttr)
          self.set(value) // eslint-disable-line
        },
        this.$content
      )
    }
  }

  unbind() {
    removeEvent(this.eventName(), this.element)
    removeEvent(this.eventName(), this.$trigger)
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
          label: value,
          image: data[value]
        }
      })
    }

    this.data = deepClone(data)
    this.items = this.flatItems(this.data)
    let value = this.getValueFromElement()
    if (this.is('builded') || this.is('shown')) {
      this.buildDropdown()
    }

    if (isEmpty(value)) {
      value = this.getValueFromData()

      if (isEmpty(value)) {
        value = 1
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

  setInlineValue(value, trigger = true) {
    const $selected = this.getInlineItemByValue(value)

    if ($selected) {
      this.$active.forEach($a => {
        this.unActiveInlineByValue(this.getItemValue($a), trigger)
      })
      $selected.forEach($s => {
        this.activeInlineItem($s, trigger)
      })
    }
  }

  unActiveInlineByValue(value, trigger = true) {
    const $selected = this.getInlineOption().find($item => {
      return this.getItemValue($item) === value
    })
    if ($selected) {
      this.unActiveInlineItem($selected, trigger)
    }
  }

  unActiveInlineItem($item, trigger = true) { // eslint-disable-line
    if (this.$active.includes($item)) {
      removeClass(this.classes.INLINEACTIVE, $item)
      this.$active = this.$active.filter($i => $i !== $item)
    }
  }

  activeInlineItem($item, trigger = true) { // eslint-disable-line
    if (!this.$active.includes($item)) {
      addClass(this.classes.INLINEACTIVE, $item)
      this.$active.push($item)
    }
  }

  getItemValue($item) {
    return $item.getAttribute(this.options.itemValueAttr)
  }

  getInlineItemByValue(value) {
    return this.getInlineOption().filter($item => {
      return this.getItemValue($item) == value // eslint-disable-line
    })
  }

  getInlineOption() {
    return queryAll('.pj-image-selector-option', this.$content)
  }

  set(value, trigger = true) {
    value = this.purifyValue(value)
    if (value && value !== this.value) {
      this.value = value
      const option = this.getOptionByValue(value)
      if (!this.options.inline) {
        this.updateTrigger(option)
      }

      if (trigger) {
        this.trigger(EVENTS.SELECT, option)
      }

      if (this.DROPDOWN) {
        this.DROPDOWN.selectByValue(value, false)
      }

      if (this.options.inline) {
        this.setInlineValue(value)
      }

      addClass(this.classes.SELECTED, this.$wrap)

      this.setValueForElement(value)

      if (trigger) {
        this.trigger(EVENTS.CHANGE, value)
        triggerNative(this.element, 'change')
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

  getOptionLabel(option) {
    return this.options.optionLabel.call(this, option)
  }

  updateTrigger(option) {
    html(option.label, this.$label)

    this.$image.setAttribute('src', option.image)
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
      this.$content.appendChild($options)
      this.selectForDropdown()
    }

    this.enter('builded')
  }

  selectForDropdown() {
    if (!this.options.inline) {
      this.DROPDOWN.selectByValue(this.value, false)
    }
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
    this.$groupContent = query(`.${this.classes.GROUP}`, $group)
    group.children.forEach(option => {
      this.$groupContent.appendChild(this.buildOption(option))
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

export default ImageSelector
