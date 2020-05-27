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
  isObject
} from '@pluginjs/is'
import Clearable from './clearable'
import Filterable from './filterable'
import Manage from './manage'
import Switcher from './switcher'
import Loading from './loading'
import FontLoader from './fontLoader'
import { removeEvent } from '@pluginjs/events'
import { addClass, removeClass } from '@pluginjs/classes'
import Dropdown from '@pluginjs/dropdown'
import {
  query,
  insertAfter,
  appendTo,
  html,
  parseHTML,
  closest,
  empty
} from '@pluginjs/dom'
import { deepClone, each, triggerNative } from '@pluginjs/utils'

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
class FontPicker extends Component {
  constructor(element, options = {}) {
    super(element)

    this.setupOptions(options)
    this.setupClasses()
    this.setupStates()
    this.setupI18n()
    this.initialize()
  }

  initialize() {
    this.selected = null
    this.current = null

    this.placeholder = this.element.getAttribute('placeholder')
    if (!this.placeholder && this.options.placeholder) {
      if (this.options.placeholder === true) {
        this.placeholder = this.translate('placeholderText')
      } else {
        this.placeholder = this.options.placeholder
      }
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

    this.initData()

    if (this.options.clearable) {
      this.CLEARABLE = new Clearable(this)
    }

    this.LOADING = new Loading(this)

    if (this.element.disabled || this.options.disabled) {
      this.disable()
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

    this.$main = query(`.${this.classes.MAIN}`, this.$dropdown)

    this.DROPDOWN = Dropdown.of(this.$trigger, {
      ...options,
      target: this.$dropdown,
      responsiveFull: this.options.responsiveDropdownFull,
      keyboard: this.options.keyboard ? this.$wrap : false,
      classes: {
        PLACEMENT: `${this.classes.NAMESPACE}-on-{placement}`
      },
      onShow: () => {
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
      onSelect: $item => {
        const $source = closest(`.${this.classes.SOURCE}`, $item)
        const source = this.getSource($source.dataset.name)

        this.set({
          source: source.name,
          font: $item.dataset.value
        })
      }
    })
  }

  bind() {} // eslint-disable-line

  unbind() {
    removeEvent(this.eventName(), this.element)
  }

  buildDropdown() {
    if (this.options.manage) {
      this.MANAGE = new Manage(this)
    }

    if (!this.FONTLOADER) {
      this.FONTLOADER = new FontLoader(this)
    }

    if (this.data) {
      this.buildDropdownContent()
    }

    this.enter('builded')
  }

  initData() {
    if (isArray(this.options.source) || isPlainObject(this.options.source)) {
      this.resolveData(this.options.source)
    } else if (isFunction(this.options.source)) {
      this.enter('loading')
      this.options.source.call(this, this.resolveData.bind(this))
    }
  }

  resolveData(data) {
    this.data = deepClone(data)
    if (!isArray(this.data)) {
      this.data = [this.data]
    }

    if (this.data.length < 1) {
      return
    }

    const value = this.element.value

    if (!isEmpty(value)) {
      this.set(this.options.parse.call(this, value), false)
    }

    if (isNull(this.current)) {
      this.setCurrentSource(this.data[0].name)
    }

    if (this.is('loading')) {
      if (this.LOADING) {
        this.LOADING.hide()
      }

      this.leave('loading')
    }
    
    if (this.is('builded') || this.is('shown')) {
      this.buildDropdownContent()
    }
  }

  set(item, trigger = true) {
    if (item !== this.selected) {
      if (this.selected) {
        if (this.DROPDOWN) {
          this.DROPDOWN.unselectByValue(this.getItemValue(this.selected), false)
        }
      }
      if (isNull(item)) {
        this.setPlaceholderLabel()
        removeClass(this.classes.SELECTED, this.$wrap)

        if (trigger) {
          this.trigger(EVENTS.CLEAR)
        }
      } else {
        this.setSelectedLabel(item)
        addClass(this.classes.SELECTED, this.$wrap)

        if (trigger) {
          this.trigger(EVENTS.SELECT, item)
        }
      }

      this.selected = item
      let value
      if (item) {
        if (item.source) {
          if(this.getCurrentSource()) {
            addClass(this.classes.SOURCEHIDED, this.current.__dom)
          }
      
          this.setCurrentSource(item.source)

          if(this.SWITCHER) {
            this.SWITCHER.DROPDOWN.selectByValue(this.current.name, false)
            html(this.SWITCHER.getLabel(this.getSource(this.current.name)), this.SWITCHER.$label)
       
            if(this.current.__dom) {
              removeClass(this.classes.SOURCEHIDED, this.current.__dom)
            } else {
              this.buildSource(this.getCurrentSource())
            }

            this.selectForDropdown()
          }
        }

        value = this.options.process.call(this, item)
     
      } else {
        value = ''
      }

      if (value !== this.element.value) {
        this.element.value = value

        if (trigger) {
          this.trigger(EVENTS.CHANGE, value)
          triggerNative(this.element, 'change')
        }
      }
    }
  }

  val(value) {
    if (typeof value === 'undefined') {
      return this.options.process.call(this, this.get())
    }
    return this.set(this.options.parse.call(this, value))
  }

  get() {
    if (this.selected) {
      return this.selected
    }
    return null
  }

  clear() {
    this.set(null)
  }

  getItemLabel(item) {
    return templateEngine.render(this.options.templates.selected.call(this), {
      classes: this.classes,
      value: item.font,
      source: this.getSource(item.source)
    })
  }

  getCurrentSource() {
    return this.current
  }

  setCurrentSource(name) {
    const source = this.getSource(name)
    if (source) {
      this.current = source
    } else {
      this.current = this.data.length > 0 ? this.data[0] : null
    }
  }

  switchSource(name) {
    if (name !== this.current.name) {
      if (this.FILTERABLE) {
        this.FILTERABLE.refreshDefault()
      }

      addClass(this.classes.SOURCEHIDED, this.current.__dom)

      const source = this.getSource(name)

      if (!source.__dom) {
        source.__dom = this.buildSource(source)
      } else {
        removeClass(this.classes.SOURCEHIDED, source.__dom)
      }

      this.$main.scrollTop = 0
      this.setCurrentSource(name)
    }
  }

  getSource(name) {
    return this.data.find(source => source.name === name)
  }

  getSources() {
    return this.data
  }

  getCurrentSourceItems() {
    if (this.current && this.current.__items) {
      return this.current.__items
    }
    return []
  }

  getItemValue(item) {
    return item.font
  }

  setLabel(label) {
    html(label, this.$label)
  }

  setPlaceholderLabel() {
    this.setLabel(this.placeholder)
    this.$label.style.fontFamily = null
  }

  setSelectedLabel(item) {
    this.setLabel(this.getItemLabel(item))
    const source = this.getSource(item.source)

    if (source) {
      source.load(this.$label, item.font)
    }
  }

  selectForDropdown() {
    if (this.selected) {
      this.DROPDOWN.selectByValue(this.getItemValue(this.selected), false)
    }
  }

  buildDropdownContent() {
    if (this.data.length > 1 && !this.SWITCHER) {
      this.SWITCHER = new Switcher(this)
    } else if(this.SWITCHER) {
      this.SWITCHER.DROPDOWN.selectByValue(this.current.name, false)
      html(this.SWITCHER.getLabel(this.getSource(this.current.name)), this.SWITCHER.$label)
    }

    if (this.options.filterable && !this.FILTERABLE) {
      this.FILTERABLE = new Filterable(this)
    } 

    this.$main.innerHTML = "";

    this.buildSource(this.getCurrentSource())

    this.selectForDropdown()
  }

  buildSource(source) {
    if (!this.sourceTemplate) {
      this.sourceTemplate = templateEngine.compile(
        this.options.templates.source.call(this)
      )
    }

    const $source = parseHTML(
      this.sourceTemplate({
        classes: this.classes,
        source
      })
    )

    source.__dom = $source
    source.__items = {}
 
    if (isArray(source.fonts)) {
      source.fonts.forEach(font => {
        $source.appendChild(this.buildItem(source, font))
      })
    } else if (isObject(source.fonts)) {
      each(source.fonts, (category, fonts) => {
        $source.appendChild(this.buildGroup(source, category, fonts))
      })
    }
    
    this.$main.appendChild($source)

    if (isArray(source.fonts)) {
      this.FONTLOADER.observe(source.__items)
    } else if (isObject(source.fonts)) {
      each(source.__items, (k, group) => {
        this.FONTLOADER.observe(group.items)
      })
    }

    return $source
  }

  buildGroup(source, group, fonts) {
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

    source.__items[group] = {
      group,
      items: {},
      $dom: $group
    }

    fonts.forEach(font => {
      $group.appendChild(this.buildItem(source, font, group))
    })

    return $group
  }

  buildItem(source, font, group) {
    if (!this.itemTemplate) {
      this.itemTemplate = templateEngine.compile(
        this.options.templates.item.call(this)
      )
    }
    
    const $item = parseHTML(
      this.itemTemplate({
        classes: this.classes,
        font,
        source
      })
    )

    if (group) {
      source.__items[group].items[font] = {
        font,
        $dom: $item
      }
    } else {
      source.__items[font] = {
        font,
        $dom: $item
      }
    }

    return $item
  }

  getActions() {
    if (!this.$actions) {
      this.$actions = insertAfter(
        `<div class="${this.classes.ACTIONS}"></div>`,
        this.$main
      )
    }
    return this.$actions
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

      empty(this.$main)
      if (this.SWITCHER) {
        this.SWITCHER.destroy()
        this.SWITCHER = null
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

export default FontPicker
