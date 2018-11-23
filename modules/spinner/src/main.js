/* eslint-disable consistent-return */
import Component from '@pluginjs/component'
import { isNumeric } from '@pluginjs/is'
import template from '@pluginjs/template'
import { addClass, removeClass } from '@pluginjs/classes'
import { bindEvent, removeEvent, bindEventOnce } from '@pluginjs/events'
import { unwrap, appendTo, wrap, query } from '@pluginjs/dom'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  optionable
} from '@pluginjs/decorator'
import RULES from './rules'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  dependencies as DEPENDENCIES,
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
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class Spinner extends Component {
  constructor(element, options = {}) {
    super(element)

    this.setupOptions(options)
    this.setupClasses()

    if (this.options.rule) {
      ;['min', 'max', 'step', 'precision'].forEach(value => {
        this[value] = RULES[this.options.rule][value]
      })
    } else {
      this.min = parseFloat(this.options.min)
      this.max = parseFloat(this.options.max)
      this.step = parseFloat(this.options.step)
      this.precision = parseFloat(this.options.precision)
    }

    this.spinTimeout = null
    this.setupStates()
    this.initialize()
  }

  initialize() {
    this.$wrap = wrap(
      `<div tabindex="0" class="${this.classes.WRAP}"></div>`,
      this.element
    )

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.$wrap)
    }
    addClass(
      this.getClass(this.classes.LAYOUT, 'layout', this.options.layout),
      this.$wrap
    )

    this.$control = appendTo(
      template.compile(this.options.templates.control.call(this))({
        classes: this.classes
      }),
      this.$wrap
    )

    this.$down = query(`.${this.classes.DOWN}`, this.$control)
    this.$up = query(`.${this.classes.UP}`, this.$control)

    this.set(this.element.value, false)

    this.bind()

    if (this.element.disabled || this.options.disabled) {
      this.disable()
    }

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  // 500ms to detect if it is a click event
  // 60ms interval execute if it if long pressdown
  spin(fn, timeout) {
    const spinFn = timeout => {
      clearTimeout(this.spinTimeout)

      this.spinTimeout = setTimeout(() => {
        fn.call(this)
        spinFn(60)
      }, timeout)
    }
    spinFn(timeout || 500)
  }

  bind() {
    bindEvent(
      this.eventName('focus'),
      () => {
        bindEventOnce(
          this.eventName('change'),
          () => {
            this.set(this.element.value)
          },
          document
        )
      },
      this.element
    )

    bindEvent(
      this.eventName('focus'),
      () => {
        addClass(this.classes.FOCUS, this.$wrap)
      },
      this.$wrap
    )

    bindEvent(
      this.eventName('blur'),
      () => {
        removeClass(this.classes.FOCUS, this.$wrap)
      },
      this.$wrap
    )

    bindEvent(
      this.eventName('mousedown'),
      () => {
        bindEventOnce(
          this.eventNameWithId('mouseup'),
          () => {
            clearTimeout(this.spinTimeout)
          },
          document
        )
        this.spin(this.spinDown)
      },
      this.$down
    )

    bindEvent(
      this.eventName('mouseup'),
      () => {
        clearTimeout(this.spinTimeout)
        removeEvent(this.eventNameWithId('mouseup'), document)
      },
      this.$down
    )

    bindEvent(
      this.eventName('click'),
      () => {
        this.spinDown()
      },
      this.$down
    )

    bindEvent(
      this.eventName('mousedown'),
      () => {
        bindEventOnce(
          this.eventNameWithId('mouseup'),
          () => {
            clearTimeout(this.spinTimeout)
          },
          document
        )
        this.spin(this.spinUp)
      },
      this.$up
    )

    bindEvent(
      this.eventName('mouseup'),
      () => {
        clearTimeout(this.spinTimeout)
        removeEvent(this.eventNameWithId('mouseup'), document)
      },
      this.$up
    )

    bindEvent(
      this.eventName('click'),
      () => {
        this.spinUp()
      },
      this.$up
    )

    bindEvent(
      this.eventName('focus'),
      () => {
        this.enter('focused')
        addClass(this.classes.FOCUS, this.$wrap)

        // keyboard support
        bindEvent(
          this.eventName('keydown'),
          e => {
            const key = e.keyCode || e.which
            if (key === 38) {
              this.spinUp()
              return false
            }
            if (key === 40) {
              this.spinDown()
              return false
            }
          },
          this.element
        )

        if (this.options.mousewheel) {
          // mousewheel support
          bindEvent(
            this.eventName('wheel'),
            e => {
              e.preventDefault()

              if (e.deltaY < 0) {
                this.spinUp()
              } else if (e.deltaY > 0) {
                this.spinDown()
              }
            },
            this.element
          )
        }
      },
      this.element
    )

    bindEvent(
      this.eventName('blur'),
      () => {
        this.leave('focused')
        removeClass(this.classes.FOCUS, this.$wrap)
        removeEvent(this.eventName('keydown'), this.element)
        if (this.options.mousewheel) {
          removeEvent(this.eventName('wheel'), this.element)
        }
      },
      this.element
    )
  }

  unbind() {
    removeEvent(this.eventName(), this.element)
    removeEvent(this.eventName(), this.$down)
    removeEvent(this.eventName(), this.$up)
    removeEvent(this.eventName(), this.$wrap)
  }

  isOutOfBounds(value) {
    if (value < this.min) {
      return -1
    }
    if (value > this.max) {
      return 1
    }
    return 0
  }

  set(value, trigger = true) {
    if (this.value === value) {
      return
    }
    this.value = this.options.parse(value)
    console.log(this.value)
    this.element.value = this.options.process(this.value)

    if (trigger) {
      this.trigger(EVENTS.CHANGE, this.element.value)
    }
  }

  get() {
    return this.value
  }

  val(value) {
    if (typeof value === 'undefined') {
      return this.options.process.call(this, this.get())
    }
    this.set(this.options.parse.call(this, value))
  }

  spinDown() {
    if (!isNumeric(this.value)) {
      this.value = this.max
    }

    let value = this.value
    value -= this.step

    const valid = this.isOutOfBounds(value)

    if (valid === -1) {
      value = this.options.looping === true ? this.max : this.min
    }
    value = Number(value).toFixed(this.precision)

    this.set(value)
  }

  spinUp() {
    if (!isNumeric(this.value)) {
      this.value = this.min
    }

    let value = this.value
    value += this.step

    const valid = this.isOutOfBounds(value)

    if (valid === 1) {
      value = this.options.looping === true ? this.min : this.max
    }
    value = Number(value).toFixed(this.precision)

    this.set(value)
  }

  enable() {
    if (this.is('disabled')) {
      removeClass(this.classes.DISABLED, this.$wrap)
      this.element.disabled = false

      if (!this.is('eventBinded')) {
        this.bind()
      }
      this.leave('disabled')
    }

    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      this.enter('disabled')

      this.element.disabled = true
      addClass(this.classes.DISABLED, this.$wrap)

      this.unbind()
    }
    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()
      this.$control.remove()
      unwrap(this.element)

      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default Spinner
