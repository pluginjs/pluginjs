import Component from '@pluginjs/component'
import { isArray, isIE, isIE11, isElement } from '@pluginjs/is'
import template from '@pluginjs/template'
import { arrayEqual, deepMerge, compose, triggerNative } from '@pluginjs/utils'
import {
  query,
  queryAll,
  children,
  parent,
  closest,
  parseHTML,
  append,
  prepend,
  insertAfter,
  insertBefore,
  nextWith,
  getData,
  setData
} from '@pluginjs/dom'
import {
  getWidth,
  hideElement,
  showElement,
  outerWidth
} from '@pluginjs/styled'
import { removeClass, addClass, hasClass } from '@pluginjs/classes'
import { removeEvent, bindEvent } from '@pluginjs/events'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  optionable
} from '@pluginjs/decorator'
import Modal from '@pluginjs/modal'
import Popper from 'popper.js'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  dependencies as DEPENDENCIES,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'

const $doc = window.document
const childrenMatchSelector = (selector, el) =>
  compose(elementList => {
    if (elementList) {
      return elementList.filter(el => el.matches(selector))
    }
    return []
  }, children)(el)
@themeable()
@optionable(DEFAULTS, true)
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@register(NAMESPACE, {
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class Choice extends Component {
  constructor(element, options = {}) {
    super(element)
    this.$element = this.element
    this.$options = queryAll('option', this.$element)
    const override = {}

    if (!Element.prototype.matches) {
      Element.prototype.matches = Element.prototype.msMatchesSelector
    }

    if (this.$options.length !== 0) {
      override.data = {}

      if (isIE() || isIE11()) {
        const elements = queryAll('option[selected]', this.$element)
        const value = []
        for (const i in elements) {
          if (Object.prototype.hasOwnProperty.call(elements, i)) {
            value.push(elements[i].value)
          }
        }
        override.value = this.$element.multiple ? value : this.$element.value
      } else {
        override.value = this.$element.multiple
          ? Array.from(this.$element.selectedOptions).map(el => el.value)
          : this.$element.value
      }

      override.multiple = this.$element.multiple
      this.$options.forEach($item => {
        const value = $item.getAttribute('value')
        const data = $item.dataset
        if (typeof data.label === 'undefined') {
          data.label = $item.innerHTML
        }

        if ($item.disabled) {
          data.disabled = true
        }
        override.data[value] = data
      })
    }

    this.setupClasses()
    this.setupOptions(options)

    this.options = deepMerge({}, this.options, override)
    this.data = this.options.data || getData('data', this.$element)
    this.value = this.$element.value
    if (this.options.multiple) {
      if (this.$options.length !== 0) {
        this.value = override.value
      } else {
        this.value = this.$element.value
        if (this.value === '') {
          this.value = []
        } else {
          this.value = this.value.split(',')
        }
      }
    }

    if (this.$element.value) {
      this.val(this.value)
    }

    this.setupStates()
    this.initialize()
  }

  initialize() {
    hideElement(this.$element)

    this.createWrap()
    this.createItems()

    if (this.options.overflow === true) {
      this.createToggle()
      this.createDropdown()
      this.updateOverflow()
    }

    this.bind()
    if (this.$element.disabled || this.options.disabled) {
      this.disable()
    }

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  createWrap() {
    this.$wrap = parseHTML(
      template.render(this.options.templates.wrap.call(this), {
        classes: this.classes
      })
    )

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.$warp)
    }
  }

  createItems() {
    const itemTemplate = template.compile(
      this.options.templates.item.call(this)
    )
    Object.entries(this.data).forEach(([value, item]) => {
      const $item = parseHTML(
        itemTemplate({
          classes: this.classes,
          item,
          value
        })
      )
      if (this.isSelected(value)) {
        addClass(this.classes.SELECTED, $item)
      }

      if (item.disabled === true) {
        $item.setAttribute('disabled', 'disabled')
      }

      setData('item', item, $item)
      append($item, this.$wrap)
    })

    this.$items = queryAll('[data-value]', this.$wrap)
    insertAfter(this.$wrap, this.$element)
  }

  createToggle() {
    this.$toggle = parseHTML(
      template.render(this.options.templates.toggle.call(this), {
        classes: this.classes,
        icon: this.options.toggleIcon,
        text: this.options.toggleText
      })
    )
  }

  createDropdown() {
    this.$dropdown = parseHTML(
      template.render(this.options.templates.dropdown.call(this), {
        classes: this.classes
      })
    )

    insertAfter(this.$dropdown, this.$wrap)
  }

  setupPopper() {
    const toggle = query(`.${this.classes.TOGGLE}`, this.$wrap)
    const dropdown = nextWith(hasClass(this.classes.DROPDOWN), this.$wrap)

    this.POPPER = new Popper(toggle, dropdown, { placement: 'bottom' })

    this.enter('popper')
  }

  bind() {
    const onItemClick = ({ target }) => {
      if (this.is('disabled')) {
        return false
      }

      const $item = target.matches('[data-value]')
        ? target
        : closest('[data-value]', target)
      const value = getData('value', $item)
      const data = getData('item', $item)

      if (data.disabled) {
        return false
      }

      if (this.options.clickModal) {
        Modal.open({
          content: this.options.modalContent,
          title: this.options.modalTitle,
          theme: this.options.modalTheme,
          buttons: [
            {
              action: 'cancel',
              label: 'Cancel',
              classes: 'pj-btn pj-modal-btn-alignment'
            },
            {
              action: 'success',
              label: 'Ok',
              classes: 'pj-btn pj-modal-btn-alignment pj-btn-danger',
              fn: resolve => {
                resolve()
                if (this.options.multiple) {
                  if (this.isSelected(value)) {
                    this.unselect($item)
                  } else {
                    this.select($item)
                  }
                } else {
                  this.select($item)
                }
              }
            }
          ]
        })
      } else if (this.options.multiple) {
        if (this.isSelected(value)) {
          this.unselect($item)
        } else {
          this.select($item)
        }
      } else {
        this.select($item)
      }

      return false
    }
    compose(
      bindEvent(
        this.eventName('click'),
        '[data-value]',
        onItemClick.bind(this)
      ),
      bindEvent(
        this.eventName('touchstart'),
        '[data-value]',
        onItemClick.bind(this)
      )
    )(this.$wrap)

    if (this.options.overflow === true) {
      compose(
        bindEvent(
          this.eventName('click'),
          '[data-value]',
          onItemClick.bind(this)
        ),
        bindEvent(
          this.eventName('touchstart'),
          '[data-value]',
          onItemClick.bind(this)
        )
      )(this.$dropdown)

      if (this.options.toggleTrigger === 'hover') {
        compose(
          bindEvent(this.eventName('mouseenter'), () => {
            this.showDropdown()
          }),
          bindEvent(this.eventName('mouseleave'), () => {
            setTimeout(() => {
              if (!this.is('enterDropdown')) {
                this.hideDropdown()
              }
            }, 200)
          })
        )(this.$toggle)
        compose(
          bindEvent(this.eventName('mouseenter'), () => {
            this.enter('enterDropdown')
          }),
          bindEvent(this.eventName('mouseleave'), () => {
            this.leave('enterDropdown')
            this.hideDropdown()
          })
        )(this.$dropdown)
      } else {
        compose(
          bindEvent(this.eventName('touchstart'), () => {
            if (this.is('shown')) {
              this.hideDropdown()
            } else {
              this.showDropdown()
            }

            return false
          }),
          bindEvent(this.eventName('click'), () => {
            if (this.is('shown')) {
              this.hideDropdown()
            } else {
              this.showDropdown()
            }

            return false
          })
        )(this.$toggle)
      }

      bindEvent(
        this.eventNameWithId('click'),
        event => {
          if (event && event.which === 3) {
            return
          }

          if (!this.is('shown')) {
            return
          }

          if (
            this.$dropdown === event.target ||
            this.$wrap === event.target ||
            this.$dropdown.contains(event.target) ||
            this.$wrap.contains(event.target)
          ) {
            return
          }

          this.hideDropdown()
        },
        $doc
      )
    }
  }

  unbind() {
    removeEvent(this.eventName(), this.$wrap)
    removeEvent(this.eventName(), this.$element)
    if (this.options.overflow === true) {
      removeEvent(this.eventNameWithId(), $doc)
    }
  }

  showDropdown() {
    if (this.options.overflow === false) {
      return
    }
    if (this.is('shown')) {
      return
    }
    this.$toggle.setAttribute('aria-expanded', true)
    addClass(this.classes.DROPDOWNSHOW, this.$dropdown)

    this.$dropdown.focus()

    this.enter('shown')

    if (!this.is('popper')) {
      this.setupPopper()
      this.POPPER.scheduleUpdate()
    }

    if (this.is('popper')) {
      this.POPPER.enableEventListeners()
    }
  }

  hideDropdown() {
    if (this.options.overflow === false) {
      return
    }
    if (!this.is('shown')) {
      return
    }
    this.$toggle.setAttribute('aria-expanded', false)
    removeClass(this.classes.DROPDOWNSHOW, this.$dropdown)

    this.leave('shown')

    if (this.is('popper')) {
      this.POPPER.disableEventListeners()
    }
  }

  set(value, trigger = true) {
    if (
      this.value === value ||
      (isArray(value) && arrayEqual(this.value, value))
    ) {
      if (this.$options.length !== 0) {
        return
      }
      if (this.options.multiple) {
        this.$element.value = this.options.process.call(this, this.value)
      } else {
        this.$element.value = this.value
      }

      return
    }

    this.value = value
    // this.$element.value = this.value

    this.$items.forEach($item => {
      const value = getData('value', $item)

      if (this.isSelected(value)) {
        this.select($item, trigger)
      } else {
        this.unselect($item, trigger)
      }
    })

    if (trigger) {
      this.trigger(EVENTS.CHANGE, this.value)
    }
  }

  get() {
    return this.value
  }

  val(value) {
    if (typeof value === 'undefined') {
      return this.get()
    }
    return this.set(value)
  }

  isSelected(value) {
    if (this.options.multiple) {
      return this.value.indexOf(value) !== -1
    }
    return this.value === value
  }

  select(value, trigger = true, update = true) {
    let $item
    if (value instanceof HTMLElement || isElement(value)) {
      $item = value
      value = getData('value', $item)
    } else {
      $item = this.getItemByValue(value)
    }

    if (!this.options.multiple) {
      this.$items
        .filter(el => el.matches(`.${this.classes.SELECTED}`))
        .forEach(el => this.unselect(el, trigger))
    }

    if ($item.matches(`.${this.classes.SELECTED}`)) {
      return
    }

    if (this.options.overflow) {
      if (this.$dropdown.contains($item)) {
        addClass(this.classes.SELECTED, this.$toggle)
      }
    }

    addClass(this.classes.SELECTED, $item)

    if (update === true) {
      if (this.options.multiple) {
        if (this.$options.length !== 0) {
          this.value.push(value)
          this.$options.forEach(item => {
            this.value.forEach(v => {
              if (v === item.value) {
                item.selected = 'selected'
              }
            })
          })
        } else {
          this.value.push(value)
          this.$element.value = this.options.process.call(this, this.value)
        }
      } else {
        this.value = value
        this.$element.value = this.value
      }

      if (trigger === true) {
        this.trigger(EVENTS.CHANGE, this.value)
        triggerNative(this.$element, 'change')
      }
    }

    if (trigger === true) {
      this.trigger(EVENTS.SELECT, value, getData('item', $item))
    }
  }

  unselect(value, trigger = true, update = true) {
    let $item
    if (value instanceof HTMLElement || isElement(value)) {
      $item = value
      value = getData('value', $item)
    } else {
      $item = this.getItemByValue(value)
    }

    if (this.options.overflow) {
      if (
        this.$dropdown.contains($item) &&
        queryAll(`.${this.classes.SELECTED}`, this.$dropdown).length === 1
      ) {
        removeClass(this.classes.SELECTED, this.$toggle)
      }
    }

    if (!$item.matches(`.${this.classes.SELECTED}`)) {
      return
    }

    removeClass(this.classes.SELECTED, $item)

    if (update === true) {
      if (this.options.multiple) {
        const index = this.value.indexOf(value)
        this.value.splice(index, 1)
        if (this.$options.length !== 0) {
          this.$options.forEach(item => {
            if (this.value.length === 0) {
              item.selected = ''
            } else {
              this.value.forEach(v => {
                if (v === item.value) {
                  item.selected = 'selected'
                } else {
                  item.selected = ''
                }
              })
            }
          })
        } else {
          this.$element.value = this.options.process.call(this, this.value)
        }
      } else if (this.value === value) {
        this.value = ''
        this.$element.value = this.value
      }

      if (trigger === true) {
        this.trigger(EVENTS.CHANGE, this.value)
        triggerNative(this.$element, 'change')
      }
    }

    if (trigger === true) {
      this.trigger(EVENTS.UNSELECT, value, getData('item', $item))
    }
  }

  getItemByValue(value) {
    return this.$items.filter(el => el.matches(`[data-value="${value}"]`))
  }

  updateOverflow() {
    if (this.options.overflow === false) {
      return
    }
    const containerWidth = getWidth(parent(this.$wrap))
    const width = getWidth(this.$wrap)
    let totalWidth
    const $items = []

    if (this.$wrap.scrollWidth > containerWidth) {
      append(this.$toggle, this.$wrap)
      totalWidth = outerWidth(this.$toggle)
      childrenMatchSelector('[data-value]', this.$wrap).forEach($item => {
        const itemWidth = outerWidth($item)
        setData('width', itemWidth, $item)
        totalWidth += itemWidth
        if (totalWidth > width) {
          $items.push($item)
        }
      })
      $items.reverse().forEach($item => {
        prepend($item, this.$dropdown)
      })

      if (
        childrenMatchSelector(`.${this.classes.SELECTED}`, this.$dropdown)
          .length > 0
      ) {
        addClass(this.classes.SELECTED, this.$toggle)
      }
    } else {
      if (width < containerWidth) {
        totalWidth = width
        childrenMatchSelector('[data-value]', this.$dropdown).forEach($item => {
          totalWidth += getData('width', $item)
          if (totalWidth < containerWidth) {
            $items.push($item)
          }
        })
        $items.forEach($item => {
          insertBefore($item, this.$toggle)
        })

        if (
          childrenMatchSelector(`.${this.classes.SELECTED}`, this.$dropdown)
            .length === 0
        ) {
          removeClass(this.classes.SELECTED, this.$toggle)
        }
      }

      if (childrenMatchSelector('[data-value]', this.$dropdown).length === 0) {
        if (isIE() || isIE11()) {
          this.$toggle.removeNode(true)
        } else {
          this.$toggle.remove()
        }
      }

      if (this.is('popper')) {
        this.POPPER = null
        this.leave('popper')
      }
    }
  }

  resize() {
    if (!this.is('disabled')) {
      this.updateOverflow()
    }
  }

  enable() {
    if (this.is('disabled')) {
      removeClass(this.classes.DISABLED, this.$wrap)
      this.$items.forEach($item => {
        const value = getData('value', $item)
        if (this.data[value].disabled === true) {
          $item.setAttribute('disabled', 'disabled')
        } else {
          $item.removeAttribute('disabled')
        }
      })

      if (this.options.overflow) {
        this.$toggle.removeAttribute('disabled')
      }

      this.leave('disabled')
      this.$element.disabled = false
    }
    this.trigger(EVENTS.ENABLE)
    return this
  }

  disable() {
    if (!this.is('disabled')) {
      addClass(this.classes.DISABLED, this.$wrap)
      this.$items.forEach($item => {
        $item.setAttribute('disabled', 'disabled')
      })
      this.enter('disabled')
      this.$element.disabled = true
    }

    if (this.options.overflow) {
      this.$toggle.setAttribute('disabled', 'disabled')
    }

    this.trigger(EVENTS.DISABLE)
    return this
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()

      if (isIE() || isIE11()) {
        this.$wrap.removeNode(true)
      } else {
        this.$wrap.remove()
      }

      showElement(this.$element)
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default Choice
