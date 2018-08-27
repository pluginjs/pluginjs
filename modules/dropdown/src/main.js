import Component from '@pluginjs/component'
import template from '@pluginjs/template'
import { isString, isNull, isDomNode, isObject, isArray } from '@pluginjs/is'
import { addClass, removeClass } from '@pluginjs/classes'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { append, has, query, children, html } from '@pluginjs/dom'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  optionable
} from '@pluginjs/decorator'
// import Keyboard from './keyboard'
import Popper from 'popper.js'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  dependencies as DEPENDENCIES,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'

const isInput = el => el.tagName === 'INPUT'

@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class Dropdown extends Component {
  constructor(element, options = {}) {
    super(element)

    this.$trigger = this.element

    this.initOptions(DEFAULTS, options)

    this.$reference = this.getReference()

    this.initClasses(CLASSES)

    this.$dropdown = this.getDropdown()

    this.initStates()
    this.initialize()
  }

  getReference() {
    if (isDomNode(this.options.reference)) {
      return this.options.reference
    } else if (isString(this.options.reference)) {
      return query(this.options.reference)
    }
    return this.$trigger
  }

  getDropdown() {
    if (this.options.target === '+') {
      return this.$trigger.nextElementSibling
    }
    if (isString(this.options.target)) {
      return query(this.options.target)
    }

    return this.options.target
  }

  initialize() {
    if (this.options.theme) {
      addClass(this.getThemeClass(), this.$reference)
      addClass(this.getThemeClass(), this.$dropdown)
    }

    addClass(this.classes.TRIGGRER, this.$trigger)
    addClass(this.classes.REFERENCE, this.$reference)
    addClass(this.classes.DROPDOWN, this.$dropdown)

    if (isInput(this.$trigger) || this.options.imitateSelect) {
      addClass(this.classes.INPUT, this.$trigger)
    }

    if (!isNull(this.options.data)) {
      this.appendItems(this.options.data)
    }

    if (!isNull(this.options.value)) {
      this.selectByValue(this.options.value, false)
    } else if (
      this.options.imitateSelect &&
      this.options.placeholder &&
      !isInput(this.$trigger)
    ) {
      html(this.options.placeholder, this.$trigger)
    }

    this.bind()

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  bind() {
    if (isInput(this.$trigger)) {
      bindEvent(
        this.eventName('focus'),
        () => {
          this.show()
          return false
        },
        this.$trigger
      )
    } else if (this.options.trigger === 'hover') {
      bindEvent(
        this.eventName('mouseenter'),
        () => {
          this.show()
          return false
        },
        this.$trigger
      )
    } else {
      bindEvent(
        this.eventName(this.options.trigger),
        e => {
          this.toggle()
          e.preventDefault()
        },
        this.$trigger
      )
    }

    bindEvent(
      this.eventName('click'),
      `.${this.classes.ITEM}`,
      e => {
        const item = e.target
        if (item.parentNode !== this.$dropdown) {
          return
        }
        this.selectItem(item)

        if (this.options.hideOnSelect) {
          this.hide()
        }
      },
      this.$dropdown
    )
  }

  appendItems(data) {
    let items = []

    if (isArray(data)) {
      items = data
    } else if (isObject(data)) {
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          items.push({
            value: key,
            label: data[key]
          })
        }
      }
    }

    if (items.length > 0) {
      let content = ''
      items.forEach(item => {
        content += template.render(this.options.templates.item(), {
          classes: this.classes,
          itemValueAttr: this.options.itemValueAttr,
          item
        })
      })

      append(content, this.$dropdown)
    }
  }

  getActiveItem() {
    const $item = children(`.${this.classes.ACITVE}`, this.$dropdown)

    if ($item.length > 0) {
      return $item[0]
    }
    return null
  }

  selectByValue(value, trigger = true) {
    const selected = children(`.${this.classes.ITEM}`, this.$dropdown).filter(
      item => {
        return this.getItemValue(item) === value
      }
    )

    if (selected.length > 0) {
      this.selectItem(selected[0], trigger)
    }
  }

  getItemValue(item) {
    return item.getAttribute(this.options.itemValueAttr)
  }

  selectItem(item, trigger = true) {
    if (!isNull(this.active)) {
      removeClass(this.classes.ACITVE, this.active)
    }

    const value = this.getItemValue(item)
    if (this.options.imitateSelect) {
      if (isInput(this.$trigger)) {
        this.$trigger.value = value
      } else {
        html(value, this.$trigger)
        addClass('pj-dropdown-checked', this.$trigger)
      }
    }

    if (trigger) {
      this.trigger(EVENTS.SELECT, item)

      if (this.active !== item) {
        this.trigger(EVENTS.CHANGE, value)
      }
    }

    this.active = item
    addClass(this.classes.ACITVE, this.active)
  }

  toggle() {
    if (this.is('show')) {
      this.hide()
    } else {
      this.show()
    }
  }

  show() {
    if (this.is('disabled')) {
      return
    }

    if (!this.is('show')) {
      this.setupPopper()
      addClass(this.classes.SHOW, this.$dropdown)
      this.$trigger.setAttribute('aria-expanded', 'true')

      if (this.options.hideOutClick) {
        bindEvent(
          this.eventNameWithId('click'),
          e => {
            if (
              e.target === this.$dropdown ||
              has(e.target, this.$dropdown) ||
              e.target === this.$trigger ||
              has(e.target, this.$trigger)
            ) {
              return
            }

            this.hide()
          },
          document
        )
      }

      this.enter('show')
    }

    this.trigger(EVENTS.SHOW)
  }

  hide() {
    if (this.is('show')) {
      removeClass(this.classes.SHOW, this.$dropdown)
      this.$trigger.setAttribute('aria-expanded', 'false')

      if (this.options.hideOutClick) {
        removeEvent(this.eventNameWithId('click'), document)
      }

      this.leave('show')
    }

    this.trigger(EVENTS.HIDE)
  }
  set(value) {
    return this.selectByValue(value, true)
  }

  get() {
    const active = this.getActiveItem()

    if (active) {
      return this.getItemValue(active)
    }
    return null
  }
  setupPopper() {
    if (!this.is('popper')) {
      let placementClass

      this.POPPER = new Popper(this.$reference, this.$dropdown, {
        placement: this.options.placement,

        modifiers: {
          flip: {
            enabled: this.options.flip
          },

          preventOverflow: {
            enabled: true,
            boundariesElement: this.options.boundary
          },

          offset: {
            offset: this.options.offset
          }
        },
        onUpdate: data => {
          const newPlacementClass = this.getClass(
            this.classes.PLACEMENT,
            'placement',
            data.placement
          )

          if (placementClass !== newPlacementClass) {
            removeClass(placementClass, this.$reference)
            addClass(placementClass, this.$reference)
          }
        },
        onCreate: data => {
          placementClass = this.getClass(
            this.classes.PLACEMENT,
            'placement',
            data.placement
          )
          addClass(placementClass, this.$reference)
        }
      })
      this.enter('popper')
    }
  }

  enable() {
    if (this.is('disabled')) {
      this.element.disabled = false
      this.leave('disabled')
    }
    removeClass(this.classes.DISABLED, this.$trigger)
    removeClass(this.classes.DISABLED, this.$placement)
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      this.element.disabled = true
      this.enter('disabled')
    }
    addClass(this.classes.DISABLED, this.$trigger)
    addClass(this.classes.DISABLED, this.$placement)
    this.trigger(EVENTS.DISABLE)
  }

  update() {
    if (this.POPPER !== null) {
      this.POPPER.scheduleUpdate()
    }
  }

  destroy() {
    if (this.is('initialized')) {
      removeEvent(this.eventName(), this.$trigger)
      removeEvent(this.eventName(), this.$dropdown)

      this.leave('initialized')
    }

    if (this.POPPER !== null) {
      this.POPPER.destroy()
      this.POPPER = null
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default Dropdown
