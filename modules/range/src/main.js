import Component from '@pluginjs/component'
import { isString, isNumeric } from '@pluginjs/is'
import { addClass, removeClass } from '@pluginjs/classes'
import { offset as getOffset, setStyle } from '@pluginjs/styled'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { each, deepMerge } from '@pluginjs/utils'
import { wrap, unwrap, prepend, append } from '@pluginjs/dom'
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
import Pointer from './pointer'
import Track from './track'
import Tip from './tip'

@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class Range extends Component {
  constructor(element, options = {}) {
    super(element)

    const metas = {}
    each(['min', 'max', 'step'], key => {
      const val = parseFloat(this.element.getAttribute(key), 10)
      if (!isNaN(val)) {
        metas[key] = val
      }
    })

    this.setupOptions(options, metas)
    this.setupClasses()
    this.setupStates()

    this.min = this.options.min
    this.max = this.options.max
    this.step = this.options.step
    this.interval = this.max - this.min

    const value = this.element.value
    if (isString(value) && value !== '') {
      this.value = this.options.parse.call(this, value)
    }

    if (!this.value) {
      if (this.options.range) {
        this.value = [this.options.min, this.options.min]
      } else {
        this.value = this.options.min
      }
    }

    if (this.max < this.min || this.step >= this.interval) {
      throw new Error('error options about max min step')
    }

    if (this.options.vertical) {
      this.direction = {
        axis: 'pageY',
        position: 'top'
      }
    } else {
      this.direction = {
        axis: 'pageX',
        position: 'left'
      }
    }

    this.initialize()
  }

  initialize() {
    this.$wrap = wrap(`<div class="${this.classes.WRAP}"></div>`, this.element)
    this.$control = document.createElement('div')
    prepend(this.$control, this.$wrap)

    if (this.options.input) {
      addClass(this.classes.INPUT, this.element)
    } else {
      setStyle('display', 'none', this.element)
    }

    addClass(this.classes.WRAP, this.$wrap)
    addClass(this.classes.CONTROL, this.$control)

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.$wrap)
    }

    if (this.options.vertical) {
      addClass(this.classes.VERTICAL, this.$wrap)
    }

    append(`<div class="${this.classes.RAIL}" />`, this.$control)

    // build pointers
    this.buildPointers()

    // initial components
    this.TRACK = new Track(this)

    if (this.options.tip) {
      this.TIP = new Tip(this)
    }

    if (this.options.keyboard) {
      this.KEYBOARD = new Keyboard(this)
    }

    if (this.element.disabled || this.options.disabled) {
      this.disable()
    }

    // Bind events
    this.bind()

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  bind() {
    bindEvent(
      this.selfEventName(EVENTS.POINTERMOVE),
      () => {
        if (this.options.range) {
          this.set([this.p1.value, this.p2.value], false)
        } else {
          this.set(this.p1.value, false)
        }
      },
      this.element
    )

    bindEvent(
      this.selfEventName(EVENTS.UPDATE),
      (e, instance, value) => {
        if (this.options.range) {
          this.p1.set(value[0])
          this.p2.set(value[1])
        } else {
          this.p1.set(value)
        }
      },
      this.element
    )

    bindEvent(
      this.eventName('change'),
      () => {
        this.val(this.element.value)
      },
      this.element
    )

    bindEvent(
      this.eventName('mousedown touchstart'),
      event => {
        if (this.is('disabled')) {
          return
        }
        const rightclick = event.which ? event.which === 3 : event.button === 2
        if (rightclick) {
          return
        }

        const offset = getOffset(this.$control)
        const start =
          event[this.direction.axis] - offset[this.direction.position]
        const pointer = this.getAdjacentPointer(start)

        pointer.mousedown(event)
      },
      this.$control
    )
  }

  unbind() {
    removeEvent(this.eventName(), this.element)
    removeEvent(this.eventName(), this.$control)
  }

  buildPointers() {
    if (this.options.range) {
      this.p1 = new Pointer(1, this, this.value[0])
      this.p2 = new Pointer(2, this, this.value[1])

      this.pointers = [this.p1, this.p2]
    } else {
      this.p1 = new Pointer(1, this, this.value)

      this.pointers = [this.p1]
    }
  }

  getValueFromPosition(val) {
    if (val > 0) {
      return this.min + (val / this.getLength()) * this.interval
    }
    return 0
  }

  getAdjacentPointer(start) {
    if (this.options.range) {
      const value = this.getValueFromPosition(start)

      if (this.p1.value === this.p2.value) {
        if (value > this.p1.value) {
          return this.p2
        }
        return this.p1
      }
      return Math.abs(this.p1.value - value) > Math.abs(this.p2.value - value)
        ? this.p2
        : this.p1
    }

    return this.p1
  }

  getLength() {
    if (this.options.vertical) {
      return this.$control.clientHeight
    }
    return this.$control.clientWidth
  }

  get() {
    return this.value
  }

  getMatchedValue(value) {
    if (!isNumeric(value)) {
      return this.min
    }
    if (value > this.max) {
      return this.max
    } else if (value < this.min) {
      return this.min
    }
    return value
  }

  set(value, update = true, trigger = true, force = false) {
    if (this.value !== value || force) {
      if (this.options.range) {
        this.value = value.map(v => this.getMatchedValue(v))
      } else {
        this.value = this.getMatchedValue(value)
      }

      this.element.value = this.val()

      if (update) {
        this.trigger(EVENTS.UPDATE, this.value)
      }

      if (trigger) {
        this.trigger(EVENTS.CHANGE, this.element.value)
      }
    }
  }

  val(value) {
    if (typeof value === 'undefined') {
      return this.options.process.call(this, this.get())
    }
    return this.set(this.options.parse.call(this, value))
  }

  update(options) {
    let value

    if (options.value) {
      value = options.value
      delete options.value
    } else {
      value = this.value
    }

    this.options = deepMerge(this.options, options)

    each(['min', 'max', 'step'], key => {
      this[key] = this.options[key]
    })

    this.interval = this.max - this.min

    this.set(value, true, true, true)
  }

  enable() {
    if (this.is('disabled')) {
      removeClass(this.classes.DISABLED, this.$control)
      this.element.disabled = false
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      addClass(this.classes.DISABLED, this.$control)

      this.element.disabled = true
      this.enter('disabled')
    }

    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()

      this.pointers.forEach(pointer => pointer.destroy())
      this.$control.remove()
      if (this.options.input) {
        removeClass(this.classes.INPUT, this.element)
      } else {
        setStyle('display', null, this.element)
      }
      unwrap(this.element)
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default Range
