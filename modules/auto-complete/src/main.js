import Component from '@pluginjs/component'
import templateEngine from '@pluginjs/template'
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
  isNull,
  isPlainObject,
  isString,
  isUndefined
} from '@pluginjs/is'
import Clearable from './clearable'
import Hint from './hint'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { addClass, removeClass } from '@pluginjs/classes'
import Dropdown from '@pluginjs/dropdown'
import {
  empty,
  query,
  attr,
  wrap,
  appendTo,
  parseHTML,
  insertAfter,
  removeAttr
} from '@pluginjs/dom'
import { getValueByPath } from '@pluginjs/utils'
import match from '@pluginjs/match'

@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class AutoComplete extends Component {
  constructor(element, options = {}) {
    super(element)
    this.setupOptions(options)
    this.setupClasses()
    this.setupStates()
    this.initialize()
  }

  initialize() {
    this.data = []
    this.items = []

    attr(
      {
        autocomplete: 'off',
        spellcheck: 'false'
      },
      this.element
    )

    if (this.options.placeholder) {
      this.element.placeholder = this.options.placeholder
    }

    addClass(this.classes.INPUT, this.element)

    this.$trigger = wrap(
      templateEngine.render(this.options.templates.trigger.call(this), {
        classes: this.classes
      }),
      this.element
    )

    this.$wrap = wrap(`<div class="${this.classes.WRAP}"></div>`, this.$trigger)

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.$wrap)
    }

    if (this.element.value !== '') {
      this.set(this.element.value, false)
    }

    this.initData()

    this.bind()

    this.setupDropdown()

    if (this.options.clearable) {
      this.CLEARABLE = new Clearable(this)
    }

    if (this.options.hint) {
      this.HINT = new Hint(this)
    }

    if (this.element.disabled || this.options.disabled) {
      this.disable()
    }

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  setupDropdown() {
    this.$dropdown = appendTo(
      templateEngine.render(this.options.templates.dropdown.call(this), {
        classes: this.classes
      }),
      this.$wrap
    )

    this.$items = query(`.${this.classes.ITEMS}`, this.$dropdown)

    this.DROPDOWN = Dropdown.of(this.$trigger, {
      ...this.options.dropdown,
      target: this.$dropdown,
      keyboard: this.options.keyboard,
      classes: {
        PLACEMENT: `${this.classes.NAMESPACE}-on-{placement}`
      },
      trigger: 'custom',
      onShow: () => {
        if (this.items.length > 0 && !this.is('builded')) {
          this.buildDropdownItems()
        }
        addClass(this.classes.SHOW, this.$wrap)
        this.trigger(EVENTS.SHOW)
      },
      onShown: () => {
        this.enter('shown')
        this.trigger(EVENTS.SHOWN)
      },
      onHide: () => {
        this.leave('shown')
        this.trigger(EVENTS.HIDE)
      },
      onHided: () => {
        removeClass(this.classes.SHOW, this.$wrap)
        this.trigger(EVENTS.HIDED)
      },
      onSelect: ($item, value) => {
        const item = this.getItemByValue(value)
        this.trigger(EVENTS.SELECT, item)
      },
      onChange: value => {
        if (this.options.clearOnSelected) {
          this.clear()
        } else {
          this.set(value, true, false)
        }
      }
    })
  }

  bind() {
    bindEvent(
      this.eventName('input'),
      () => {
        this.set(this.element.value)
      },
      this.element
    )

    bindEvent(
      this.eventName('focus'),
      () => {
        if (
          this.options.showOnFocus &&
          !this.is('loading') &&
          this.items.length > 0
        ) {
          this.DROPDOWN.show()
        }
        this.enter('focus')
      },
      this.element
    )

    bindEvent(
      this.eventName('blur'),
      () => {
        if (this.options.hideOnBlur && this.is('shown')) {
          this.DROPDOWN.hide()
        }

        this.leave('focus')
      },
      this.element
    )
  }

  unbind() {
    removeEvent(this.eventName(), this.element)
  }

  initData() {
    this.queryItems(this.value)
  }

  queryItems(query = '') {
    if (query.length < this.options.minChars) {
      query = ''
    }

    this.query = query
    if (isArray(this.options.source) || isPlainObject(this.options.source)) {
      this.resolveData(this.options.source)
    } else if (isFunction(this.options.source)) {
      this.enter('loading')
      this.options.source.call(this, query, this.resolveData.bind(this))
    }
  }

  resolveData(data) {
    this.data = data
    let items = data

    if (isPlainObject(items)) {
      items = Object.keys(items).map(value => {
        return {
          value,
          label: items[value]
        }
      })
    }

    if (this.query) {
      this.items = this.options.match.call(this, items, this.query)
    } else {
      this.items = items
    }

    if (this.is('loading')) {
      this.leave('loading')
    }

    if (this.items.length > 0) {
      if (this.is('builded') || this.is('shown')) {
        this.updateDropdownItems()
      }

      if (this.is('focus') && !this.is('shown')) {
        this.DROPDOWN.show()
      }
    } else {
      this.restoreDropdownItems()
    }
  }

  match(data, query, options = {}) {
    if (isUndefined(this.keys)) {
      this.keys = options.keys
      if (isNull(this.keys) && data.length > 0) {
        if (isPlainObject(data[0])) {
          this.keys = Object.keys(data[0]).filter(key => isString(data[0][key]))
        }
      }
    }

    options.keys = this.keys

    return match(data, query, options)
  }

  set(value, trigger = true, update = true) {
    if (value !== this.value) {
      this.value = value
      this.element.value = value

      if (value === '') {
        if (this.HINT) {
          this.HINT.clear()
        }
        removeClass(this.classes.FILLED, this.$wrap)

        if (trigger) {
          this.trigger(EVENTS.CLEAR)
        }
      } else {
        if (this.HINT) {
          this.HINT.check(value)
        }

        addClass(this.classes.FILLED, this.$wrap)
      }

      if (update && this.value !== this.query) {
        this.queryItems(this.value)
      }

      if (trigger) {
        this.trigger(EVENTS.CHANGE, this.element.value)
      }
    }
  }

  setItem(item) {
    this.set(this.getItemValue(item))
  }

  getItem() {
    return this.getItemByValue(this.value)
  }

  val(value) {
    if (typeof value === 'undefined') {
      return this.get()
    }

    return this.set(value)
  }

  get() {
    return this.element.value
  }

  clear() {
    this.val('')
  }

  getItemLabel(item) {
    return this.options.itemLabel.call(this, item)
  }

  getItemValue(item) {
    return this.options.itemValue.call(this, item)
  }

  getItemByValue(value) {
    return this.items.find(item => {
      return this.getItemValue(item) == value // eslint-disable-line
    })
  }

  restoreDropdownItems() {
    if (this.$items) {
      empty(this.$items)
    }

    if (this.is('shown')) {
      this.DROPDOWN.hide()
    }
  }

  buildDropdownItems() {
    const items = this.items.slice(0, this.options.limit)
    const $items = this.buildItems(items)

    this.$items.appendChild($items)
    this.DROPDOWN.highlightItemByValue(this.getHighestMatchValue(), false)
    this.enter('builded')
  }

  updateDropdownItems() {
    empty(this.$items)

    const items = this.items.slice(0, this.options.limit)
    const $items = this.buildItems(items)

    this.$items.appendChild($items)
    const matched = this.getHighestMatchValue()
    this.DROPDOWN.highlightItemByValue(matched, false)
    if (this.HINT) {
      if (matched.indexOf(this.value) === 0) {
        this.HINT.set(matched)
      } else {
        this.HINT.clear()
      }
    }
    this.DROPDOWN.update()
  }

  getHighestMatchValue() {
    return this.items.length > 0 ? this.getItemValue(this.items[0]) : this.value
  }

  buildItems(items) {
    const $fragment = document.createDocumentFragment()

    if (this.options.group) {
      const $groups = {}

      items.forEach(item => {
        const group = this.getItemGroup(item)
        if (!$groups[group]) {
          $groups[group] = this.buildGroup(group)
        }

        $groups[group].appendChild(this.buildItem(item))
      })

      Object.keys($groups).forEach(group => {
        $fragment.appendChild($groups[group])
      })
    } else {
      items.forEach(item => {
        $fragment.appendChild(this.buildItem(item))
      })
    }

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
        group: this.getGroupLabel(group)
      })
    )

    return $group
  }

  setMatchItem(item) {
    if (item.matchedSubstrings) {
      const start = item.matchedSubstrings[0].offset
      const length = item.matchedSubstrings[0].length
      const matchWord = item.name.substr(start, length)
      const newValue = item.name.replace(
        new RegExp(`(${matchWord})`),
        `<span class="pj-autoComplete-match">${matchWord}</span>`
      )
      return newValue
    } else if (item.matched_substrings) {
      const start = item.matched_substrings[0].offset
      const length = item.matched_substrings[0].length
      const matchWord = item.description.substr(start, length)
      const newValue = item.structured_formatting.main_text.replace(
        new RegExp(`(${matchWord})`),
        `<span class="pj-autoComplete-match">${matchWord}</span>`
      )
      return newValue
    } else if (isString(item)) {
      const start = item.toUpperCase().search(this.element.value.toUpperCase())
      const length = this.element.value.length
      const matchWord = item.substr(start, length)
      const newValue = item.replace(
        new RegExp(`(${matchWord})`),
        `<span class="pj-autoComplete-match">${matchWord}</span>`
      )
      return newValue
    }
    return item.label ? item.label : item.name
  }

  buildItem(item) {
    if (!this.itemTemplate) {
      this.itemTemplate = templateEngine.compile(
        this.options.templates.item.call(this)
      )
    }
    const nvalue = this.setMatchItem(item)
    const $item = parseHTML(
      this.itemTemplate({
        classes: this.classes,
        item,
        value: this.getItemValue(item),
        label: nvalue
      })
    )

    return $item
  }

  getItemGroup(item) {
    if (isFunction(this.options.group)) {
      return this.options.group.call(this, item)
    }
    return getValueByPath(item, this.options.group)
  }

  getGroupLabel(group) {
    return this.options.groupLabel.call(this, group)
  }

  enable() {
    if (this.is('disabled')) {
      this.DROPDOWN.enable()
      this.element.disabled = false
      removeClass(this.classes.DISABLED, this.$wrap)

      if (this.HINT) {
        this.HINT.enable()
      }
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      this.DROPDOWN.disable()
      this.element.disabled = true
      addClass(this.classes.DISABLED, this.$wrap)

      if (this.HINT) {
        this.HINT.disable()
      }

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
      if (this.HINT) {
        this.HINT.destroy()
      }
      if (this.DROPDOWN) {
        this.DROPDOWN.destroy()
      }
      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.$wrap)
      }
      removeAttr('autocomplete spellcheck', this.element)
      insertAfter(this.element, this.$wrap)
      removeClass(this.classes.INPUT, this.element)

      this.$wrap.remove()

      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default AutoComplete
