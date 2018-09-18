import Component from '@pluginjs/component'
import { compose } from '@pluginjs/utils'
import { isNull } from '@pluginjs/is'
import Dropdown from '@pluginjs/dropdown'
import InputMask from '@pluginjs/input-mask'
import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import { getStyle, hideElement } from '@pluginjs/styled'
import { bindEvent, removeEvent } from '@pluginjs/events'
import {
  wrap,
  unwrap,
  append,
  query,
  insertAfter,
  parseHTML
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
  dependencies as DEPENDENCIES,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'
import Keyboard from './keyboard'
import { formatTime, splitTime, time2Minute } from './lib'

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

    this.time = ''

    this.setupStates()
    this.initialize()
  }

  initialize() {
    this.build()
    this.bind()

    if (this.options.value) {
      this.val(this.options.value)
    }

    if (this.element.value) {
      this.val(this.element.value)
    }

    if (this.element.disabled || this.options.disabled) {
      this.disable()
    }

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  build() {
    addClass(this.classes.INFO, this.element)
    wrap(`<div class="${this.classes.NAMESPACE}"></div>`, this.element)
    insertAfter(
      `<div class="${this.classes.DROPDOWN} pj-input-group">
      <input class="pj-dropdown-trigger"/><div></div></div>`,
      this.element
    )

    this.$timePicker = this.element.parentNode
    this.$wrap = this.$timePicker.parentNode
    addClass(this.classes.WRAP, this.$wrap)
    this.$dropdownEl = query(`.${this.classes.DROPDOWN}`, this.$timePicker)
    this.$timeTrigger = query('.pj-dropdown-trigger', this.$dropdownEl)
    if (this.options.theme) {
      addClass(this.getThemeClass(), this.$timePicker)
    }

    this.initDropdown()
    this.initInputMask()
    this.$dropdown = query('.pj-dropdown', this.$wrap)
    insertAfter(this.$dropdown, this.$dropdownEl)
    if (this.options.keyboard) {
      this.keyboard = new Keyboard(this)
    }

    this.itemValues = []
    this.DROPDOWN.options.data.forEach(item => {
      const text = item.textContent
      this.itemValues.push(text)
    })
    this.markIndex = -1
  }

  initDropdown() {
    this.DROPDOWN = Dropdown.of(this.$timeTrigger, {
      data: this.getTimeList().map(value => ({ label: value, value })),
      target: this.$dropdown,
      placeholder: this.options.placeholder,
      placement: 'bottom-left',
      hideOutClick: true,
      templates: this.options.templates,
      onChange: value => {
        this.trigger(EVENTS.CHANGE, value)
      }
    })

    this.$remove = parseHTML(
      `<i class="${
        this.classes.REMOVE
      } pj-icon  pj-icon-close" style="display:none;"></i>`
    )
    this.$icon = parseHTML(
      '<i class="pj-icon  pj-icon-clock-solid pj-input-group-addon"></i>'
    )
    insertAfter(this.$remove, this.DROPDOWN.element)
    insertAfter(this.$icon, this.$remove)
    compose(
      bindEvent(this.eventName('click'), `.${this.classes.REMOVE}`, () => {
        hideElement(this.$remove)
        this.DROPDOWN.set('')
        this.time = ''
        // return false
      }),
      bindEvent(this.eventName('mouseout'), `.${this.classes.DROPDOWN}`, () => {
        hideElement(this.$remove)
      }),
      bindEvent(
        this.eventName('mouseover'),
        `.${this.classes.DROPDOWN}`,
        () => {
          if (hasClass('pj-dropdown-trigger-active', this.$timeTrigger)) {
            if (!this.is('disabled')) {
              this.$remove.style.display = 'block'
            }
          }
        }
      )
    )(this.$wrap)
  }

  initInputMask() {
    this.$input = query('input', this.$dropdownEl)
    this.$input.setAttribute('name', this.options.name)
    this.$input.setAttribute('placeholder', 'Select Time')

    this.MASK = InputMask.of(this.$input, {
      type: 'time',
      onFocus: () => {
        if (this.is('focus') || this.is('disabled')) {
          return
        }

        if (this.options.keyboard) {
          this.keyboard.bind()
        }
        this.enter('focus')
      },
      onBlur: () => {
        if (!this.is('focus') || this.is('disabled')) {
          return
        }

        if (this.options.keyboard) {
          this.keyboard.unbind()
        }
        this.leave('focus')
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

  timeLimit({ min, max }) {
    this.options.min = min
    this.options.max = max
    const data = this.getTimeList()
    this.DROPDOWN.replaceByData(data.map(value => ({ label: value })))
  }

  get() {
    return this.time
  }

  set(time) {
    this.DROPDOWN.set(time)
  }

  markItem(action) {
    let index = this.markIndex
    switch (action) {
      case 'up':
        if (index > 0) {
          index--
        }
        break
      case 'down':
        if (index < this.itemValues.length - 1) {
          index++
        }
        break
      default:
        break
    }

    if (index !== this.markIndex) {
      const text = this.itemValues[index]
      this.set(text)
    }
  }

  getOffsetTop(element) {
    const margin = getStyle('margin-top', element)
    const padding = getStyle('padding-top', element)
    const border = getStyle('border-top', element)
    return (
      parseInt(margin.slice(0, margin.length - 2), 10) +
      parseInt(padding.slice(0, padding.length - 2), 10) +
      parseInt(border.slice(0, border.length - 2), 10)
    )
  }

  val(time) {
    if (isNull(time) || typeof time === 'undefined') {
      return this.get()
    }

    return this.set(time)
  }

  render(dom) {
    this.element.textContent = ''
    append(dom, this.element)
  }

  bind() {
    bindEvent(
      this.eventName('change'),
      () => {   /* eslint-disable-line */
        const time = this.$input.value.trim()
        const timeList = this.getTimeList()
        if (timeList.indexOf(time) < 0) {
          this.DROPDOWN.set(this.time)
          return false
        }
        this.DROPDOWN.set(time)
      },
      this.$input
    )
    bindEvent(
      this.eventName('focusin'),
      () => {
        addClass(this.classes.BORDER, this.$icon)
      },
      this.$timeTrigger
    )
    bindEvent(
      this.eventName('focusout'),
      () => {
        removeClass(this.classes.BORDER, this.$icon)
      },
      this.$timeTrigger
    )

    bindEvent(
      this.eventName('click'),
      () => {
        this.DROPDOWN.show()
      },
      this.$icon
    )

    bindEvent(
      this.selfEventName(EVENTS.CHANGE),
      (e, api, data) => {
        const [value] = data
        this.markIndex = this.itemValues.indexOf(value)
        this.update(data)
      },
      this.element
    )
  }

  unbind() {
    removeEvent(this.eventName('change'), this.$input)
    removeEvent(this.eventName(), this.$dropdownEl)
    removeEvent(this.eventName(), this.element)
  }

  update(time) {
    console.log(time)
    this.time = time
    this.element.value = this.time
  }

  enable() {
    if (this.is('disabled')) {
      this.DROPDOWN.enable()
      this.element.disabled = false
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      this.DROPDOWN.disable()
      this.element.disabled = true
      this.enter('disabled')
    }

    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()
      removeClass(this.classes.WRAP, this.$wrap)
      this.DROPDOWN.destroy()
      unwrap(this.element)
      removeClass(this.classes.INFO, this.element)
      this.$dropdownEl.remove()
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default TimePicker
