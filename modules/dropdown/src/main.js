import Component from '@pluginjs/component'
import templateEngine from '@pluginjs/template'
import { isString, isNull, isDomNode, isObject, isArray } from '@pluginjs/is'
import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import { bindEvent, removeEvent } from '@pluginjs/events'
import {
  append,
  has,
  query,
  queryAll,
  insertAfter,
  parentWith,
  parseHTML,
  offsetParent
} from '@pluginjs/dom'
import { getStyle } from '@pluginjs/styled'
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
    this.$active = []
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

    if (this.options.value) {
      this.selectByValue(this.options.value, false)
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
      bindEvent(
        this.eventName('blur'),
        () => {
          this.hide()
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
    } else if (this.options.trigger !== 'custom') {
      bindEvent(
        this.eventName(this.options.trigger),
        e => {
          this.update()
          this.toggle()
          e.preventDefault()
        },
        this.$trigger
      )
    }

    const self = this // eslint-disable-line

    bindEvent(
      this.eventName('mousedown'),
      `.${this.classes.ITEM}`,
      function() {
        const $item = this // eslint-disable-line

        if (!self.isItemOf($item)) {
          return
        }

        if (!self.isItemDisabled($item)) {
          if (self.options.multiple && self.isItemSelected($item)) {
            self.unselectItem($item)
          } else {
            self.selectItem($item)
          }

          if (self.options.hideOnSelect) {
            self.hide()
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
      const template = templateEngine.compile(
        this.options.templates.item.call(this)
      )
      const $frag = document.createDocumentFragment()

      items.forEach(item => {
        const $item = parseHTML(
          template({
            classes: this.classes,
            itemValueAttr: this.options.itemValueAttr,
            item
          })
        )

        if (item.disabled) {
          addClass(this.classes.ITEMDISABLED, $item)
        }

        $frag.appendChild($item)
      })

      append($frag, this.$dropdown)
    }
  }

  getItems() {
    return queryAll(`.${this.classes.ITEM}`, this.$dropdown).filter($item => {
      return this.isItemOf($item)
    })
  }

  isItemOf($item) {
    return (
      parentWith($parent => hasClass(this.classes.DROPDOWN, $parent), $item) ===
      this.$dropdown
    )
  }

  getActiveItems() {
    return this.$active
  }

  getItemByIndex(index) {
    const $items = this.getItems()
    if (index >= 0 && index <= $items.length) {
      return $items[index]
    }

    return null
  }

  getItemByValue(value) {
    return this.getItems().find($item => {
      return this.getItemValue($item) === value
    })
  }

  selectByValue(value, trigger = true) {
    const $selected = this.getItemByValue(value)
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

  unselectByValue(value, trigger = true) {
    const $selected = this.getItems().find($item => {
      return this.getItemValue($item) === value
    })
    if ($selected) {
      this.unselectItem($selected, trigger)
    }
  }

  isItemSelected($item) {
    return hasClass(this.classes.ACITVE, $item)
  }

  unselectItem($item, trigger = true) {
    if (this.isItemDisabled($item)) {
      return
    }

    if (this.$active.includes($item)) {
      removeClass(this.classes.ACITVE, $item)
      if (trigger) {
        this.trigger(EVENTS.UNSELECT, $item)
      }
      this.$active = this.$active.filter($i => $i !== $item)
    }

    if (trigger) {
      this.trigger(EVENTS.CHANGE, this.get())
    }
  }

  selectItem($item, trigger = true) {
    if (this.isItemDisabled($item)) {
      return
    }

    if (!this.options.multiple) {
      this.$active.forEach($i => this.unselectItem($i, false))
    }

    if (!this.$active.includes($item)) {
      addClass(this.classes.ACITVE, $item)

      if (trigger) {
        this.trigger(EVENTS.SELECT, $item, this.getItemValue($item))
      }
      this.$active.push($item)
    }

    this.highlightItem($item)

    if (trigger) {
      this.trigger(EVENTS.CHANGE, this.get())
    }
  }

  getHighlightedItem() {
    return this.$highlighted
  }

  getHighlightableItem() {
    let index = 0
    const $items = this.getItems()
    let $first = null

    while (index < $items.length) {
      $first = $items[index]
      if (!this.isItemDisabled($first) && !this.isItemHided($first)) {
        return $first
      }

      index++
    }
    return null
  }

  highlightItemByValue(value) {
    const $item = this.getItemByValue(value)
    if ($item) {
      this.highlightItem($item)
    }
  }

  highlightItem(index) {
    if (this.$highlighted) {
      removeClass(this.classes.HIGHLIGHTED, this.$highlighted)
    }
    let $item
    if (isDomNode(index)) {
      $item = index
    } else {
      $item = this.getItemByIndex(index)
    }

    if ($item) {
      let $parent = offsetParent($item)
      if ($parent === document.documentElement) {
        $parent = this.$dropdown
      }
      const { clientHeight, scrollTop } = $parent

      if ($item.clientHeight + $item.offsetTop > clientHeight + scrollTop) {
        $parent.scrollTop = $item.clientHeight + $item.offsetTop - clientHeight
      } else if ($item.offsetTop < scrollTop) {
        $parent.scrollTop = $item.offsetTop
      }
      addClass(this.classes.HIGHLIGHTED, $item)
      this.$highlighted = $item
    }
  }

  showItem($item) {
    removeClass(this.classes.ITEMHIDED, $item)
  }

  hideItem($item) {
    addClass(this.classes.ITEMHIDED, $item)
    if (this.$highlighted === $item) {
      this.unHighlightItem()
    }
  }

  isItemHided($item) {
    return (
      hasClass(this.classes.ITEMHIDED, $item) ||
      getStyle('display', $item) === 'none'
    )
  }

  unHighlightItem() {
    if (this.$highlighted) {
      removeClass(this.classes.HIGHLIGHTED, this.$highlighted)
    }
    this.$highlighted = null
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
    const $active = this.getActiveItems()
    const values = $active.map($item => this.getItemValue($item))

    if (this.options.multiple) {
      return values
    }
    if (values.length > 0) {
      return values[0]
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
      this.$active = []
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
