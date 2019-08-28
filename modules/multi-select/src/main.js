import Select from '@pluginjs/select'
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
  events as EVENTS,
  methods as METHODS,
  translations as TRANSLATIONS,
  namespace as NAMESPACE
} from './constant'
import templateEngine from '@pluginjs/template'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import { arrayEqual, arrayDiff, triggerNative } from '@pluginjs/utils'
import { append, detach, insertBefore, parseHTML, parent } from '@pluginjs/dom'
import { isArray } from '@pluginjs/is'
const isSelect = el => el.tagName === 'SELECT'
const isInput = el => el.tagName === 'INPUT'

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
class MultiSelect extends Select {
  constructor(element, options = {}) {
    super(element, options)
  }

  initialize() {
    this.value = []
    this.selected = []
    this.options.dropdown = Object.assign(
      {
        trigger: 'custom',
        multiple: true,
        select: true,
        hideOnSelect: false
      },
      this.options.dropdown
    )

    super.initialize()

    if (this.options.hideSelected) {
      addClass(this.classes.HIDESELECTED, this.$wrap)
    }
  }

  bind() {
    bindEvent(
      this.eventName('click'),
      e => {
        if (hasClass(this.classes.CHIPUNSELECT, e.target)) {
          return
        }

        if (this.DROPDOWN) {
          this.DROPDOWN.show()
        }
      },
      this.$trigger
    )

    bindEvent(
      this.eventName('click'),
      `.${this.classes.CHIPUNSELECT}`,
      e => {
        const $clip = parent(e.target)
        this.unselect($clip.dataset.value)

        return false
      },
      this.$trigger
    )
  }

  getValueFromData() {
    const selecteds = this.items.filter(item => {
      return item.selected
    })

    if (selecteds.length > 0) {
      return selecteds.map(item => item.value)
    }
    return []
  }

  getValueFromElement() {
    if (isSelect(this.element)) {
      return Array.from(this.element.options)
        .filter(option => option.selected)
        .map(option => option.value)
    } else if (isInput(this.element)) {
      return this.options.parse.call(this, this.element.value)
    }
    return []
  }

  setValueForElement(value) {
    if (isSelect(this.element)) {
      Array.from(this.element.options).forEach(option => {
        if (value.includes(option.value)) {
          option.selected = true
        } else {
          option.selected = false
        }
      })
    } else if (isInput(this.element)) {
      this.element.value = this.options.process.call(this, value)
    }
  }

  val(value, trigger = true) {
    if (typeof value === 'undefined') {
      return null
    }
    this.set(value, trigger)
  }

  set(value, trigger) {
    value = this.purifyValue(value)
    if (!arrayEqual(value, this.value)) {
      const unselected = arrayDiff(this.value, value)
      const selected = arrayDiff(value, this.value)
      this.value = value
      selected.forEach(v => this.select(v, trigger, false))
      unselected.forEach(v => this.unselect(v, trigger, false))

      this.setValueForElement(value)

      if (this.DROPDOWN) {
        this.DROPDOWN.update()
      }

      if (value.length === 0) {
        removeClass(this.classes.SELECTED, this.$wrap)

        if (trigger) {
          this.trigger(EVENTS.CLEAR)
        }
      } else {
        addClass(this.classes.SELECTED, this.$wrap)
      }
      if (this.options.max) {
        if (value.length >= this.options.max) {
          this.showReachMax()
        } else {
          this.hideReachMax()
        }
      }

      if (this.options.hideSelected && value.length === this.items.length) {
        addClass(this.classes.ALLSELECTED, this.$wrap)
      } else {
        removeClass(this.classes.ALLSELECTED, this.$wrap)
      }

      if (trigger) {
        this.trigger(EVENTS.CHANGE, value)
        triggerNative(this.element, 'change')
      }
    }
  }

  purifyValue(value) {
    if (isArray(value)) {
      return value.filter(v => this.isValidValue(v))
    }
    return []
  }

  select(value, trigger = true, update = true) {
    if (!this.isValidValue(value)) {
      return
    }

    if (!this.selected.includes(value)) {
      const option = this.getOptionByValue(value)

      insertBefore(this.buildChip(option), this.$label)
      this.selected.push(value)

      if (trigger) {
        this.trigger(EVENTS.SELECT, option)
        triggerNative(this.element, 'change')
      }
      if (this.DROPDOWN) {
        this.DROPDOWN.selectByValue(value, false)
      }
    }
    if (update && !this.value.includes(value)) {
      this.set(this.value.concat([value]), true)
    }
  }

  unselect(value, trigger = true, update = true) {
    if (!this.isValidValue(value)) {
      return
    }
    
    if (this.selected.includes(value)) {
      const option = this.getOptionByValue(value)

      if (option.__chip) {
        option.__chip.remove()
      }

      this.selected = this.selected.filter(v => v !== value)

      if (trigger) {
        this.trigger(EVENTS.UNSELECT, option)
      }

      if (this.DROPDOWN) {
        if (this.DROPDOWN.$dropdown.childNodes.length !== 0) {
          this.DROPDOWN.unselectByValue(value, false)
        }
      }
    }

    if (update && this.value.includes(value)) {
      this.set(this.value.filter(v => v !== value), true)
    }
  }

  buildChip(option) {
    if (!this.chipTemplate) {
      this.chipTemplate = templateEngine.compile(
        this.options.templates.chip.call(this)
      )
    }

    const $chip = parseHTML(
      this.chipTemplate({
        classes: this.classes,
        option
      })
    )

    option.__chip = $chip

    return $chip
  }

  clear() {
    this.set([])
  }

  selectForDropdown() {
    this.value.forEach(v => this.DROPDOWN.selectByValue(v, false))
  }

  showReachMax() {
    if (this.reachMax) {
      return
    }

    if (!this.$reachMax) {
      this.$reachMax = parseHTML(
        `<div class="${this.classes.REACHMAXTEXT}">${this.translate(
          'reachMaxText',
          {
            max: this.options.max,
            _number: 'max'
          }
        )}</div>`
      )
    }
    addClass(this.classes.REACHMAX, this.$wrap)
    append(this.$reachMax, this.$dropdown)

    this.reachMax = true
  }

  hideReachMax() {
    if (!this.reachMax) {
      return
    }

    if (this.$reachMax) {
      detach(this.$reachMax)
    }
    removeClass(this.classes.REACHMAX, this.$wrap)
    this.reachMax = false
  }

  unbind() {
    removeEvent(this.eventName(), this.element)
  }
}

export default MultiSelect
