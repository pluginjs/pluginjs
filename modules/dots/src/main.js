import Component from '@pluginjs/component'
import templateEngine from '@pluginjs/template'
import { isString, isArray } from '@pluginjs/is'
import { addClass, removeClass } from '@pluginjs/classes'
import { bindEvent, removeEvent } from '@pluginjs/events'
import {
  prepend,
  append,
  parseHTML,
  queryAll,
  query,
  children
} from '@pluginjs/dom'
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
  methods: METHODS
})
class Dots extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)

    this.initOptions(DEFAULTS, options)
    this.initClasses(CLASSES)
    this.itemSelector = `.${this.classes.ITEM}`

    this.initStates()
    this.initialize()
  }

  initialize() {
    addClass(this.classes.CONTAINER, this.element)

    if (this.options.direction === 'vertical') {
      addClass(this.classes.VERTICAL, this.element)
    } else {
      addClass(this.classes.HORIZONTAL, this.element)
    }

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.element)
    }

    if (this.options.items) {
      this.build(this.options.items)
    }

    if (this.options.type) {
      addClass(this.getTypeClass(), this.element)
    }

    if (!this.$dots) {
      this.dots = this._getDots()
    }

    if (this.options.default) {
      this.setActiveItemByValue(this.options.default)
    }

    this.bind()

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  bind() {
    this.clickItemCallback = e => {
      if (!e.target.parentNode.classList.contains(this.classes.ITEM)) {
        return
      }

      const target = e.target.parentNode

      if (!this.is('disabled')) {
        this.setActiveItem(target)
      }
      this.trigger(EVENTS.CLICK, this.getItemValue(target))
    }

    bindEvent(this.eventName('click'), this.clickItemCallback, this.element)
    bindEvent(this.eventName('touch'), this.clickItemCallback, this.element)
  }

  unbind() {
    removeEvent(this.eventName(), this.element)
  }

  getDots() {
    return children(this.itemSelector, this.element)
  }

  build(items) {
    const html = this.getItemsHtml(items)

    if (html) {
      this.element.innerHTML = html
    }

    this.dots = this._getDots()
  }

  _getDots() {
    return queryAll(this.itemSelector, this.element)
  }

  append(items) {
    const html = this.getItemsHtml(items)

    if (html) {
      append(parseHTML(html), this.element)
    }

    this.dots = this._getDots()
  }

  prepend(items) {
    const html = this.getItemsHtml(items)

    if (html) {
      prepend(parseHTML(html), this.element)
    }

    this.dots = this._getDots()
  }

  add(item) {
    this.append([item])

    this.dots = this._getDots()
  }

  remove(value) {
    const item = this.getItemByValue(value)

    if (item) {
      item.remove()

      this.dots = this._getDots()
    }
  }

  empty() {
    this.dots.forEach(dot => {
      dot.remove()
    })
  }

  load(items, keep = true) {
    const current = this.getActiveItemValue()

    this.build(items)

    if (current && keep) {
      this.setActiveItemByValue(current)
    }

    this.trigger(EVENTS.LOAD, items)
  }

  getTypeClass(types, TYPE) {
    if (typeof types === 'undefined' && this.options.type) {
      return this.getTypeClass(this.options.type)
    }
    if (isString(types)) {
      if (typeof TYPE === 'undefined') {
        TYPE = this.classes.TYPE
      }
      types = types.split(' ')

      if (TYPE) {
        for (let i = 0; i < types.length; i++) {
          types[i] = TYPE.replace('{type}', types[i])
        }
      } else {
        for (let i = 0; i < types.length; i++) {
          types[i] = this.getClass(types[i])
        }
      }
      return types
    }

    return ''
  }

  getItemsHtml(items) {
    let html = ''

    if (isArray(items)) {
      const template = templateEngine.compile(
        this.options.template.item.call(this, this.classes.ITEM)
      )

      items.forEach(item => {
        html += template(item)
      })
    }

    return html
  }

  setActiveItem(activeItem) {
    if (activeItem && !activeItem.classList.contains(this.classes.ACTIVE)) {
      this.dots.forEach(dot => {
        removeClass(this.classes.ACTIVE, dot).setAttribute(
          'aria-hidden',
          'true'
        )
      })
      addClass(this.classes.ACTIVE, activeItem).setAttribute(
        'aria-hidden',
        'false'
      )
      this.trigger(EVENTS.CHANGE, this.getItemValue(activeItem))
    }
  }

  setActiveItemByValue(value) {
    let activeItem
    if (this.options.valueFrom === 'text') {
      this.dots.forEach(dot => {
        if (value === dot.innerHTML.trim()) {
          activeItem = dot
        }
      })
    } else {
      activeItem = query(
        `[${this.options.valueFrom}="${value}"]`,
        this.dots[0].parentNode
      )
    }

    this.setActiveItem(activeItem)
  }

  set(value) {
    return this.setActiveItemByValue(value)
  }

  getItemValue(item) {
    if (this.options.valueFrom === 'text') {
      return item.textContent
    }

    if (isArray(this.options.valueFrom)) {
      return query(this.options.valueFrom[0], item).getAttribute(
        this.options.valueFrom[1]
      )
    }

    return item.getAttribute(this.options.valueFrom)
  }

  getItemByValue(value) {
    let match = null

    this.dots.forEach(dot => {
      if (this.getItemValue(dot) === value) {
        /* eslint consistent-return: "off" */
        match = dot
        return false
      }
    })

    return match
  }

  getActiveItem() {
    return this.dots.filter(dot => dot.classList.contains(this.classes.ACTIVE))
  }

  getActiveItemValue() {
    const item = this.getActiveItem()

    if (item.length > 0) {
      return this.getItemValue(item[0])
    }
    return null
  }

  get() {
    return this.getActiveItemValue()
  }

  enable() {
    if (this.is('disabled')) {
      this.dots.forEach(dot => {
        removeClass(this.classes.DISABLED, dot).setAttribute('disabled', false)
      })
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      this.dots.forEach(dot => {
        addClass(this.classes.DISABLED, dot).setAttribute('disabled', true)
      })
      this.enter('disabled')
    }
    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()

      if (this.options.direction === 'vertical') {
        removeClass(this.classes.VERTICAL, this.element)
      } else {
        removeClass(this.classes.HORIZONTAL, this.element)
      }

      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.element)
      }

      if (this.is('hidden')) {
        removeClass(this.classes.HIDDEN, this.element)
      }

      if (this.is('disabled')) {
        this.dots.forEach(dot => {
          removeClass(this.classes.DISABLED, dot).setAttribute(
            'disabled',
            false
          )
        })
      }

      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }

  show() {
    if (this.is('hidden')) {
      removeClass(this.classes.HIDDEN, this.element)
      this.leave('hidden')
    }
    this.trigger(EVENTS.SHOW)
  }

  hide() {
    if (!this.is('hidden')) {
      addClass(this.classes.HIDDEN, this.element)
      this.enter('hidden')
    }
    this.trigger(EVENTS.HIDE)
  }
}

export default Dots
