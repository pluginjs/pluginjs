import Component from '@pluginjs/component'
import template from '@pluginjs/template'
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
import { isNull } from '@pluginjs/is'
import Clearable from './clearable'
import Filterable from './filterable'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { formatTime, splitTime, time2Minute } from './utils'
import { addClass, removeClass } from '@pluginjs/classes'
import Dropdown from '@pluginjs/dropdown'
import InputMask from '@pluginjs/input-mask'
import { wrap, appendTo, parseHTML } from '@pluginjs/dom'

@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class TimePicker extends Component {
  constructor(element, options = {}) {
    super(element)

    this.setupOptions(options)
    this.setupClasses()
    this.setupStates()
    this.initialize()
  }

  initialize() {
    this.$group = wrap(
      `<div class="${this.classes.INPUTWRAP}"></div>`,
      this.element
    )

    this.$wrap = wrap(`<div class="${this.classes.WRAP}"></div>`, this.$group)

    this.$trigger = appendTo(
      `<div class="${this.classes.TRIGGER}"><i class="${
        this.classes.TRIGGERICON
      }"></i></div>`,
      this.$group
    )

    addClass(this.classes.INPUT, this.element)

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.$wrap)
    }

    if (!this.element.getAttribute('placeholder')) {
      this.element.setAttribute('placeholder', this.options.placeholder)
    }

    this.value = null

    const value = this.element.value
    if (value) {
      this.select(value, false)
    }

    if (this.value !== '') {
      addClass(this.classes.SELECTED, this.$wrap)
    } else {
      removeClass(this.classes.SELECTED, this.$wrap)
    }

    this.setupMask()
    this.setupDropdown()

    if (this.options.clearable) {
      this.CLEARABLE = new Clearable(this)
    }
    if (this.options.filterable) {
      this.FILTERABLE = new Filterable(this)
    }

    if (this.element.disabled || this.options.disabled) {
      this.disable()
    }
    this.bind()
    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  setupMask() {
    this.MASK = InputMask.of(this.element, {
      type: 'time'
    })
  }

  setupDropdown() {
    this.$dropdown = appendTo(
      `<div class="${this.classes.DROPDOWN}"></div>`,
      this.$wrap
    )

    this.DROPDOWN = Dropdown.of(this.$group, {
      ...this.options.dropdown,
      data: this.getTimeList().map(value => ({ label: value, value })),
      target: this.$dropdown,
      reference: this.$group,
      keyboard: this.options.keyboard,
      classes: {
        PLACEMENT: `${this.classes.NAMESPACE}-on-{placement}`
      },
      onShow: () => {
        this.DROPDOWN.selectByValue(this.value)
        addClass(this.classes.SHOW, this.$wrap)
        this.trigger(EVENTS.SHOW)
      },
      onShown: () => {
        this.trigger(EVENTS.SHOWN)
      },
      onHide: () => {
        this.trigger(EVENTS.HIDE)
      },
      onHided: () => {
        removeClass(this.classes.SHOW, this.$wrap)
        this.trigger(EVENTS.HIDED)
      },
      onChange: value => {
        this.select(value)
      }
    })
  }

  getTimeList() {
    const { use24HourFormat, max, min, step } = this.options
    const maxTime = max ? time2Minute(max) : 1440
    const minTime = min ? time2Minute(min) : 0
    const timeList = splitTime(step, [minTime, maxTime])
    return formatTime(use24HourFormat, timeList)
  }

  bind() {
    bindEvent(
      this.eventName('focus'),
      () => {
        this.enter('focus')
        addClass(this.classes.FOCUS, this.$wrap)
      },
      this.element
    )

    bindEvent(
      this.eventName('blur'),
      () => {
        this.leave('focus')
        removeClass(this.classes.FOCUS, this.$wrap)
      },
      this.element
    )

    bindEvent(
      this.eventName('input'),
      () => {
        if (this.element.value !== '') {
          addClass(this.classes.SELECTED, this.$wrap)
        } else {
          removeClass(this.classes.SELECTED, this.$wrap)
        }
      },
      this.element
    )
  }

  unbind() {
    removeEvent(this.eventName(), this.element)
  }

  select(value, trigger = true) {
    if (value !== this.value) {
      if (trigger) {
        this.trigger(EVENTS.SELECT, value)

        if (this.value !== value) {
          this.trigger(EVENTS.CHANGE, value)
        }
      }

      this.value = value
      this.element.value = value

      if (isNull(value)) {
        if (trigger) {
          this.trigger(EVENTS.CLEAR, value)
        }
      }
    }
  }

  getItemByValue(value) {
    return this.items.find(item => {
      return item.value === value
    })
  }

  buildDropdown() {
    const $options = this.buildItems(this.data)

    this.$dropdown.appendChild($options)

    this.enter('builded')
  }

  buildItems(options) {
    const $fragment = document.createDocumentFragment()

    options.forEach(option => {
      $fragment.appendChild(this.buildItem(option))
    })

    return $fragment
  }

  buildItem(option) {
    const $option = parseHTML(
      template.render(this.options.templates.option(option), {
        classes: this.classes,
        option
      })
    )

    return $option
  }

  val(value) {
    if (typeof value === 'undefined') {
      return this.options.process.call(this, this.get())
    }

    return this.set(this.options.parse.call(this, value))
  }

  get() {
    return this.value
  }

  set(value) {
    return this.select(value)
  }

  clear() {
    this.set(null)
  }

  enable() {
    if (this.is('disabled')) {
      this.DROPDOWN.enable()
      this.element.disabled = false
      removeClass(this.classes.DISABLED, this.$wrap)
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      this.DROPDOWN.disable()
      this.element.disabled = true
      addClass(this.classes.DISABLED, this.$wrap)
      this.enter('disabled')
    }

    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()

      if (this.MASK) {
        this.MASK.destroy()
      }

      if (this.CLEARABLE) {
        this.CLEARABLE.destroy()
      }
      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.$wrap)
      }
      this.$wrap.remove()
      removeClass(this.classes.INPUT, this.element)
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default TimePicker
