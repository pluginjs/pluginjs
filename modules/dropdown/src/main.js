import Component from '@pluginjs/component'
import template from '@pluginjs/template'
import { isString, isNull, isDomNode, isObject, isArray } from '@pluginjs/is'
import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { append, has, query, children, insertAfter } from '@pluginjs/dom'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  optionable
} from '@pluginjs/decorator'
import Keyboard from './keyboard'
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
    this.setupOptions(options)

    this.$reference = this.getReference()

    this.setupClasses()

    this.$dropdown = this.getDropdown()
    this.POPPER = null
    this.setupStates()
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
    if (!this.options.target) {
      return insertAfter(document.createElement('div'), this.$trigger)
    }
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

    this.$trigger.tabIndex = 0
    addClass(this.classes.TRIGGRER, this.$trigger)
    addClass(this.classes.REFERENCE, this.$reference)
    addClass(this.classes.DROPDOWN, this.$dropdown)

    if (!isNull(this.options.data)) {
      this.appendItems(this.options.data)
    }

    if (this.options.keyboard) {
      this.KEYBOARD = new Keyboard(this)
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
        },
        this.$trigger
      )
      // bindEvent(
      //   this.eventName('blur'),
      //   () => {
      //     this.hide()
      //   },
      //   this.$trigger
      // )
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
        const $item = e.target
        if ($item.parentNode !== this.$dropdown) {
          return
        }

        if (!this.isItemDisabled($item)) {
          this.selectItem($item)

          if (this.options.hideOnSelect) {
            this.hide()
          }
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
        content += template.render(this.options.templates.item(item), {
          classes: this.classes,
          itemValueAttr: this.options.itemValueAttr,
          item
        })
      })

      append(content, this.$dropdown)
    }
  }

  getItems() {
    return children(`.${this.classes.ITEM}`, this.$dropdown)
  }

  getActiveItem() {
    const $item = children(`.${this.classes.ACITVE}`, this.$dropdown)
    if ($item.length > 0) {
      return $item[0]
    }
    return null
  }

  getItemByIndex(index) {
    const $items = this.getItems()
    if (index >= 0 && index <= $items.length) {
      return $items[index]
    }

    return null
  }

  selectByValue(value, trigger = true) {
    const $selected = this.getItems().find($item => {
      return this.getItemValue($item) === value
    })
    if ($selected) {
      this.selectItem($selected, trigger)
    }
  }

  getItemValue($item) {
    return $item.getAttribute(this.options.itemValueAttr)
  }

  isItemDisabled($item) {
    return hasClass(this.classes.ITEMDISABLED, $item)
  }

  selectItem($item, trigger = true) {
    if (this.isItemDisabled($item)) {
      return
    }
    if (!isNull(this.$active)) {
      removeClass(this.classes.ACITVE, this.$active)
    }

    const value = this.getItemValue($item)
    if (trigger) {
      this.trigger(EVENTS.SELECT, $item)

      if (this.$active !== $item) {
        this.trigger(EVENTS.CHANGE, value)
      }
    }

    this.$active = $item
    addClass(this.classes.ACITVE, this.$active)
  }

  getHighlightedItem() {
    const highlighted = children(`.${this.classes.HIGHLIGHTED}`, this.$dropdown)
    if (highlighted.length === 0) {
      return null
    }
    return highlighted[0]
  }

  highlightItem(index) {
    const $highlighted = this.getHighlightedItem()
    if ($highlighted) {
      removeClass(this.classes.HIGHLIGHTED, $highlighted)
    }
    let $item
    if (isDomNode(index)) {
      $item = index
    } else {
      $item = this.getItemByIndex(index)
    }

    if ($item) {
      addClass(this.classes.HIGHLIGHTED, $item)
    }
  }

  toggle() {
    if (this.is('shown')) {
      this.hide()
    } else {
      this.show()
    }
  }

  show() {
    if (this.is('disabled')) {
      return
    }

    if (!this.is('shown')) {
      this.trigger(EVENTS.SHOW)
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

      this.enter('shown')
      this.trigger(EVENTS.SHOWN)
    }
  }

  hide() {
    if (this.is('shown')) {
      this.trigger(EVENTS.HIDE)
      removeClass(this.classes.SHOW, this.$dropdown)
      this.$trigger.setAttribute('aria-expanded', 'false')

      if (this.options.hideOutClick) {
        removeEvent(this.eventNameWithId('click'), document)
      }

      this.leave('shown')
      this.trigger(EVENTS.HIDED)
    }
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
            addClass(newPlacementClass, this.$reference)

            placementClass = newPlacementClass
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
      if (isInput(this.$trigger)) {
        this.$trigger.disabled = false
      }

      this.leave('disabled')
    }
    removeClass(this.classes.DISABLED, this.$trigger)
    removeClass(this.classes.DISABLED, this.$reference)
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      if (isInput(this.$trigger)) {
        this.$trigger.disabled = true
      }

      this.enter('disabled')
    }
    addClass(this.classes.DISABLED, this.$trigger)
    addClass(this.classes.DISABLED, this.$reference)

    this.trigger(EVENTS.DISABLE)
  }

  update() {
    if (this.POPPER !== null) {
      this.POPPER.scheduleUpdate()
    }
  }

  unbind() {
    removeEvent(this.eventName(), this.$trigger)
    removeEvent(this.eventName(), this.$dropdown)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()

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
