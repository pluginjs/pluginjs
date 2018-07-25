import Component from '@pluginjs/component'
import is from '@pluginjs/is'
import template from '@pluginjs/template'
import { arraysEqual, deepMerge, compose } from '@pluginjs/utils'
import {
  query,
  queryAll,
  children,
  parent,
  parentWith,
  parseHTML,
  append,
  prepend,
  insertAfter,
  insertBefore,
  nextElementWith,
  getObjData,
  setObjData
} from '@pluginjs/dom'
import {
  contentWidth,
  hideElement,
  showElement,
  outerWidth
} from '@pluginjs/styled'
import { removeClass, addClass, hasClass } from '@pluginjs/classes'
import { removeEvent, bindEvent } from '@pluginjs/events'
import Pj from '@pluginjs/pluginjs'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable
} from '@pluginjs/decorator'
import Popper from 'popper.js'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  dependencies as DEPENDENCIES,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'

const $doc = Pj.doc
const childrenMatchSelector = (selector, el) =>
  compose(
    elementList => {
      if (elementList) {
        return elementList.filter(el => el.matches(selector))
      }
      return []
    },
    children
  )(el)

@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@register(NAMESPACE, {
  defaults: DEFAULTS,
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class Choice extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)
    this.$element = this.element
    this.$options = queryAll('option', this.$element)
    const override = {}
    if (this.$options.length !== 0) {
      override.data = {}
      override.value = this.$element.multiple
        ? Array.from(this.$element.selectedOptions).map(el => el.value)
        : this.$element.value
      override.multiple = this.$element.multiple

      this.$options.forEach($item => {
        const value = $item.getAttribute('value')
        const data = $item.dataset

        if (is.undefined(data.label)) {
          data.label = $item.innerHTML
        }

        if ($item.disabled) {
          data.disabled = true
        }
        override.data[value] = data
      })
    }
    this.options = deepMerge(DEFAULTS, options, override)
    this.initClasses(CLASSES)
    this.data = this.options.data
    this.value = this.options.value
    this.initStates()
    this.initialize()
  }

  initialize() {
    hideElement(this.$element)

    this.createWrap()
    this.createItems()

    if (this.options.overflow === true) {
      this.createToggle()
      this.createDropdown()
      // this.setupPopper()
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

      setObjData('item', item, $item)

      this.$wrap.append($item)
    })

    this.$items = queryAll('[data-value]', this.$wrap)

    insertAfter(this.$wrap, this.$element)
  }

  createToggle() {
    this.$toggle = parseHTML(
      template.render(this.options.templates.toggle.call(this), {
        classes: this.classes,
        icon: this.options.toggleIcon
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
    const dropdown = nextElementWith(
      hasClass(this.classes.DROPDOWN),
      this.$wrap
    )

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
        : parentWith(el => el.matches('[data-value]'), target)
      const value = $item.dataset.value
      const data = getObjData('item', $item)
      if (data.disabled) {
        return false
      }
      if (this.options.multiple) {
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
      bindEvent({
        type: this.eventName('click'),
        identity: { type: 'selector', value: '[data-value]' },
        handler: onItemClick.bind(this)
      }),
      bindEvent({
        type: this.eventName('touchstart'),
        identity: { type: 'selector', value: '[data-value]' },
        handler: onItemClick.bind(this)
      })
    )(this.$wrap)

    if (this.options.overflow === true) {
      compose(
        bindEvent({
          type: this.eventName('click'),
          identity: { type: 'selector', value: '[data-value]' },
          handler: onItemClick.bind(this)
        }),
        bindEvent({
          type: this.eventName('touchstart'),
          identity: { type: 'selector', value: '[data-value]' },
          handler: onItemClick.bind(this)
        })
      )(this.$dropdown)

      if (this.options.toggleTrigger === 'hover') {
        compose(
          bindEvent({
            type: this.eventName('mouseenter'),
            handler: () => {
              this.showDropdown()
            }
          }),
          bindEvent({
            type: this.eventName('mouseleave'),
            handler: () => {
              setTimeout(() => {
                if (!this.is('enterDropdown')) {
                  this.hideDropdown()
                }
              }, 200)
            }
          })
        )(this.$toggle)
        compose(
          bindEvent({
            type: this.eventName('mouseenter'),
            handler: () => {
              this.enter('enterDropdown')
            }
          }),
          bindEvent({
            type: this.eventName('mouseleave'),
            handler: () => {
              this.leave('enterDropdown')
              this.hideDropdown()
            }
          })
        )(this.$dropdown)
      } else {
        compose(
          bindEvent({
            type: this.eventName('touchstart'),
            handler: () => {
              if (this.is('shown')) {
                this.hideDropdown()
              } else {
                this.showDropdown()
              }

              return false
            }
          }),
          bindEvent({
            type: this.eventName('click'),
            handler: () => {
              if (this.is('shown')) {
                this.hideDropdown()
              } else {
                this.showDropdown()
              }

              return false
            }
          })
        )(this.$toggle)
      }

      bindEvent(
        {
          type: this.eventNameWithId('click'),
          handler: event => {
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
          }
        },
        $doc
      )
    }

    bindEvent(
      {
        type: this.eventName('change'),
        handler: () => {
          this.set(this.$element.value)
        }
      },
      this.$element
    )
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

  set(value) {
    if (
      this.value === value ||
      (is.array(value) && arraysEqual(this.value, value))
    ) {
      return
    }

    this.value = value
    this.$element.value = this.value

    this.$items.forEach($item => {
      const value = $item.dataset.value

      if (this.isSelected(value)) {
        this.select($item, false)
      } else {
        this.unselect($item, false)
      }
    })
    this.trigger(EVENTS.CHANGE, this.value)
  }

  get() {
    return this.value
  }

  val(value) {
    if (is.undefined(value)) {
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

  select(value, update = true, trigger = true) {
    let $item
    if (value instanceof HTMLElement) {
      $item = value
      value = $item.dataset.value
    } else {
      $item = this.getItemByValue(value)
    }

    if (!this.options.multiple) {
      this.$items
        .filter(el => el.matches(`.${this.classes.SELECTED}`))
        .forEach(el => this.unselect(el))
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
        this.value.push(value)
      } else {
        this.value = value
      }

      this.$element.value = this.value
      this.trigger(EVENTS.CHANGE, this.value)
    }

    if (trigger === true) {
      this.trigger(EVENTS.SELECT, value, getObjData('item', $item))
    }
  }

  unselect(value, update = true, trigger = true) {
    let $item

    if (value instanceof HTMLElement) {
      $item = value
      value = $item.dataset.value
    } else {
      $item = this.getItemByValue(value)
    }

    if (!$item.matches(`.${this.classes.SELECTED}`)) {
      return
    }

    removeClass(this.classes.SELECTED, $item)

    if (this.options.overflow) {
      if (
        this.$dropdown.contains($item) &&
        query(`.${this.classes.SELECTED}`, this.$dropdown)
      ) {
        removeClass(this.classes.SELECTED, this.$toggle)
      }
    }

    if (update === true) {
      if (this.options.multiple) {
        const index = this.value.indexOf(value)
        this.value.splice(index, 1)
      } else if (this.value === value) {
        this.value = ''
      }

      this.$element.value = this.value
      this.trigger(EVENTS.CHANGE, this.value)
    }

    if (trigger === true) {
      this.trigger(EVENTS.UNSELECT, value, getObjData('item', $item))
    }
  }

  getItemByValue(value) {
    return this.$items.filter(el => el.matches(`[data-value="${value}"]`))
  }

  updateOverflow() {
    if (this.options.overflow === false) {
      return
    }
    const containerWidth = contentWidth(parent(this.$wrap))
    const width = contentWidth(this.$wrap)
    let totalWidth
    const $items = []

    if (this.$wrap.scrollWidth > containerWidth) {
      append(this.$toggle, this.$wrap)

      totalWidth = outerWidth(this.$toggle)
      childrenMatchSelector('[data-value]', this.$wrap).forEach($item => {
        const itemWidth = outerWidth($item)
        $item.dataset.width = itemWidth
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
          const itemWidth = $item.dataset.width
          totalWidth += itemWidth
          if (totalWidth < containerWidth) {
            $items.push($item)
          }
        })

        $items.forEach($item => {
          insertBefore(this.$toggle, $item)
        })

        if (
          childrenMatchSelector(`.${this.classes.SELECTED}`, this.$dropdown)
            .length === 0
        ) {
          removeClass(this.classes.SELECTED, this.$toggle)
        }
      }

      if (childrenMatchSelector('[data-value]', this.$dropdown).length === 0) {
        this.$toggle.remove()
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
        const value = $item.dataset.value

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

      this.$wrap.map(el => el.remove)
      showElement(this.$element)
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default Choice
