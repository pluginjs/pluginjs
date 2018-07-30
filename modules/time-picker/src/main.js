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
    super(NAMESPACE, element)

    this.initOptions(DEFAULTS, options)
    this.initClasses(CLASSES)

    this.time = ''

    this.initStates()
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
      `<div class="${
        this.classes.DROPDOWN
      }"><input class="pj-dropdown-trigger" /></div>`,
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

    if (this.options.keyboard) {
      this.keyboard = new Keyboard(this)
    }

    this.itemValues = []
    this.dropdown.$items.forEach(item => {
      const text = item.textContent
      this.itemValues.push(text)
    })
    this.markIndex = -1
  }

  initDropdown() {
    const dropdownConf = {
      data: this.getTimeList().map(value => ({ label: value })),
      placeholder: this.options.placeholder,
      placement: 'bottom-left',
      icon: 'icon-char icon-oclock',
      imitateSelect: true,
      inputLabel: true,
      hideOutClick: true,
      constraintToScrollParent: false,
      templates: this.options.templates
    }
    this.dropdown = Dropdown.of(this.$timeTrigger, dropdownConf)
    this.$remove = parseHTML(
      `<i class="${this.classes.REMOVE} icon-close" style="display: none;"></i>`
    )
    insertAfter(this.$remove, this.dropdown.element)
    compose(
      bindEvent({
        type: this.eventName('click'),
        identity: { type: 'selector', value: `.${this.classes.REMOVE}` },
        handler: () => {
          hideElement(this.$remove)
          this.dropdown.set('')
          this.time = ''
          return false
        }
      }),
      bindEvent({
        type: this.eventName('mouseout'),
        identity: {
          type: 'selector',
          value: `.${this.classes.DROPDOWN}`
        },
        handler: () => {
          hideElement(this.$remove)
        }
      }),
      bindEvent({
        type: this.eventName('mouseover'),
        identity: {
          type: 'selector',
          value: `.${this.classes.DROPDOWN}`
        },
        handler: () => {
          if (hasClass('pj-dropdown-trigger-active', this.$timeTrigger)) {
            if (!this.is('disabled')) {
              this.$remove.style.display = 'block'
            }
          }
        }
      })
    )(this.$wrap)
    // this.dropdown = this.$dropdownEl.asDropdown(dropdownConf).data('dropdown')
  }

  initInputMask() {
    this.$inputEl = query('input', this.$dropdownEl)
    this.$inputEl.setAttribute('name', this.options.name)
    this.$inputEl.setAttribute('placeholder', 'Select Time')

    this.mask = InputMask.of(this.$inputEl, {
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
    this.dropdown.replaceByData(data.map(value => ({ label: value })))
  }

  // observeOtherTimePicker (el) {
  //   const $elDropdown = $(el).data(NAMESPACE).$dropdown
  //
  //   $elDropdown.on('dropdown:change', (e, i) => {
  //       //     this.timeLimit({ minTime: i.value })
  //   })
  //
  //   this.$dropdownEl.on('dropdown:change', (e, i) => {
  //     el.asTimePicker('timeLimit', { maxTime: i.value })
  //   })
  // }

  get() {
    return this.time
  }

  set(time) {
    this.dropdown.set(time)
    this.correctionScrollTop()
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

  correctionScrollTop() {
    const { active, panel } = this.dropdown
    if (active && panel) {
      const scrollTop = panel.scrollTop + this.getOffsetTop(panel)
      const activeOffset = active.offsetTop
      if (scrollTop > activeOffset) {
        panel.scrollTop = activeOffset - this.getOffsetTop(panel)
      } else if (
        scrollTop + panel.clientHeight <
        activeOffset + active.getBoundingClientRect().height
      ) {
        panel.scrollTop =
          activeOffset +
          active.getBoundingClientRect().height -
          panel.clientHeight -
          this.getOffsetTop(panel)
      }
    }
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
      {
        type: 'dropdown:change',
        handler: () => {
          this.trigger(EVENTS.CHANGE, this.dropdown.get())
        }
      },
      this.$dropdownEl
    )
    bindEvent(
      {
        type: 'dropdown:show',
        handler: () => {
          this.correctionScrollTop()
        }
      },
      this.$dropdownEl
    )
    bindEvent(
      {
        type: this.eventName('change'),
        handler: () => { /* eslint-disable-line */
          const time = this.$inputEl.value.trim()
          const timeList = this.getTimeList()
          if (timeList.indexOf(time) < 0) {
            this.dropdown.set(this.time)
            return false
          }
          this.dropdown.set(time)
        }
      },
      this.$inputEl
    )

    bindEvent(
      {
        type: `${NAMESPACE}:change`,
        handler: e => {
          const [value] = e.detail.data
          this.markIndex = this.itemValues.indexOf(value)
          this.update(value)
        }
      },
      this.element
    )
  }

  unbind() {
    removeEvent(this.eventName('change'), this.$inputEl)
    removeEvent(this.eventName(), this.$dropdownEl)
    removeEvent(this.eventName(), this.element)
  }

  update(time) {
    this.time = time
    this.element.value = this.time
  }

  enable() {
    if (this.is('disabled')) {
      this.dropdown.enable()
      this.element.disabled = false
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      this.dropdown.disable()
      this.element.disabled = true
      this.enter('disabled')
    }

    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()
      removeClass(this.classes.WRAP, this.$wrap)
      this.dropdown.destroy()
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
