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
  isEmpty,
  isElement,
  isString
} from '@pluginjs/is'
import Clearable from './clearable'
import Filterable from './filterable'
import Manage from './manage'
import Loading from './loading'
import { removeEvent } from '@pluginjs/events'
import { addClass, removeClass } from '@pluginjs/classes'
import Dropdown from '@pluginjs/dropdown'
import {
  query,
  insertAfter,
  appendTo,
  html,
  parseHTML,
  detach,
  children
} from '@pluginjs/dom'
import Tooltip from '@pluginjs/tooltip'

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
class SvgPicker extends Component {
  constructor(element, options = {}) {
    super(element)

    this.setupOptions(options)
    this.setupClasses()
    this.setupStates()
    this.setupI18n()
    this.initialize()
  }

  initialize() {
    this.items = []
    this.selected = null

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

    this.bind()

    this.setupDropdown(this.options.dropdown)

    if (this.options.clearable) {
      this.CLEARABLE = new Clearable(this)
    }

    this.LOADING = new Loading(this)

    if (this.element.disabled || this.options.disabled) {
      this.disable()
    }

    const value = this.element.value || this.options.value

    if (!isEmpty(value)) {
      this.set(this.options.parse.call(this, value), false)
    }

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  setupDropdown(options) {
    this.$dropdown = appendTo(
      templateEngine.render(this.options.templates.dropdown.call(this), {
        classes: this.classes
      }),
      this.$wrap
    )

    this.$items = query(`.${this.classes.ITEMS}`, this.$dropdown)

    this.DROPDOWN = Dropdown.of(this.$trigger, {
      ...options,
      target: this.$dropdown,
      keyboard: this.options.keyboard ? this.$wrap : false,
      classes: {
        PLACEMENT: `${this.classes.NAMESPACE}-on-{placement}`
      },
      onShow: () => {
        if (!this.data) {
          this.initData()
        }

        if (this.is('loading')) {
          this.LOADING.show()
        }

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
        this.setByValue(value)
      }
    })
  }

  bind() {} // eslint-disable-line

  unbind() {
    removeEvent(this.eventName(), this.element)
  }

  buildDropdown() {
    if (this.options.filterable) {
      this.FILTERABLE = new Filterable(this)
    }
    if (this.options.manage) {
      this.MANAGE = new Manage(this)
    }
    if (this.data) {
      this.buildDropdownItems()
    }

    this.enter('builded')
  }

  initData() {
    if (isArray(this.options.source) || isPlainObject(this.options.source)) {
      this.resolveData(this.options.source)
    } else if (isFunction(this.options.source)) {
      this.enter('loading')
      this.options.source.call(this, this.resolveData.bind(this))
    } else if (
      isString(this.options.source) ||
      isElement(this.options.source)
    ) {
      this.resolveData(this.getDataFromSvgSprite())
    }
  }

  resolveData(data) {
    this.items.forEach(item => {
      if (item.__dom) {
        item.__dom.remove()
      }
    })

    if (isPlainObject(data)) {
      data = Object.keys(data).map(name => {
        return {
          name,
          svg: data[name]
        }
      })
    }

    this.data = data
    this.items = this.flatItems(data)

    if (this.is('loading')) {
      if (this.LOADING) {
        this.LOADING.hide()
      }

      this.leave('loading')
    }
    if (this.items.length > 0) {
      this.hideEmpty()

      if (this.is('builded') || this.is('shown')) {
        this.buildDropdownItems()
      }
    } else {
      this.showEmpty()
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

  set(item, trigger = true) {
    if (item !== this.selected) {
      if (this.selected) {
        if (this.DROPDOWN) {
          this.DROPDOWN.unselectByValue(this.getItemValue(this.selected), false)
        }
      }
      if (isNull(item)) {
        this.setLabel(this.placeholder)
        removeClass(this.classes.SELECTED, this.$wrap)

        if (trigger) {
          this.trigger(EVENTS.CLEAR)
        }
      } else {
        this.setLabel(this.getItemLabel(item))
        addClass(this.classes.SELECTED, this.$wrap)

        if (trigger) {
          this.trigger(EVENTS.SELECT, item)
        }
      }

      this.selected = item
      let value
      if (item) {
        const { __dom, ...pureItem } = item
        value = this.options.process.call(this, pureItem)
      } else {
        value = ''
      }

      if (value !== this.element.value) {
        this.element.value = value

        if (trigger) {
          this.trigger(EVENTS.CHANGE, value)
        }
      }
    }
  }

  setByValue(value, trigger = true) {
    const item = this.getItemByValue(value)
    return this.set(item, trigger)
  }

  val(value) {
    if (typeof value === 'undefined') {
      return this.options.process.call(this, this.get())
    }
    return this.set(this.options.parse.call(this, value))
  }

  get() {
    if (this.selected) {
      const { __dom, ...item } = this.selected

      return item
    }
    return null
  }

  clear() {
    this.set(null)
  }

  getItemLabel(item) {
    return this.options.itemLabel.call(this, item)
  }

  getItemValue(item) {
    return this.options.itemValue.call(this, item)
  }

  setLabel(label) {
    html(label, this.$label)
  }

  getItemByValue(value) {
    return this.items.find(item => {
      return item.name === value
    })
  }

  getDataFromSvgSprite() {
    if (isString(this.options.source)) {
      this.options.source = query(this.options.source)
    }
    if (isElement(this.options.source)) {
      return children('symbol', this.options.source).map(symbol => {
        return {
          disabled: symbol.disabled,
          svg: `<svg><use xlink:href="#${symbol.id}"/></svg>`,
          name: symbol.id
        }
      })
    }
    return []
  }

  buildDropdownItems() {
    const $items = this.buildItems(this.data)

    this.$items.appendChild($items)

    this.selectForDropdown()
  }

  selectForDropdown() {
    if (this.selected) {
      this.DROPDOWN.selectByValue(this.getItemValue(this.selected), false)
    }
  }

  buildItems(items) {
    const $fragment = document.createDocumentFragment()

    items.forEach(item => {
      if (item.children) {
        $fragment.appendChild(this.buildGroup(item))
      } else {
        $fragment.appendChild(this.buildItem(item))
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

    group.children.forEach(item => {
      $group.appendChild(this.buildItem(item))
    })

    return $group
  }

  buildItem(item) {
    if (!this.itemTemplate) {
      this.itemTemplate = templateEngine.compile(
        this.options.templates.item.call(this)
      )
    }

    const $item = parseHTML(
      this.itemTemplate({
        classes: this.classes,
        item,
        value: this.getItemValue(item),
        label: this.getItemLabel(item)
      })
    )

    if (item.disabled) {
      addClass(this.classes.ITEMDISABLED, $item)
    }

    Tooltip.of($item, {
      ...this.options.tooltip
    })

    item.__dom = $item

    return $item
  }

  showEmpty() {
    if (!this.$empty) {
      this.$empty = parseHTML(
        `<div class="${this.classes.EMPTY}">${this.translate(
          'emptyText'
        )}</div>`
      )
    }

    appendTo(this.$empty, this.$items)
  }

  hideEmpty() {
    if (this.$empty) {
      detach(this.$empty)
    }
  }

  manage() {
    if (isFunction(this.options.manage)) {
      this.options.manage.call(this, this.resolveManage.bind(this))
    }
  }

  resolveManage(data) {
    if (data) {
      if (this.FILTERABLE) {
        this.FILTERABLE.refreshDefault()
      }

      this.resolveData(data)
    }
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

export default SvgPicker
