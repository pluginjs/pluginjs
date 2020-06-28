import Range from '@pluginjs/range'
import Units from '@pluginjs/units'
import { prependTo, wrap, unwrap } from '@pluginjs/dom'
import { bindEvent } from '@pluginjs/events'
import { deepMerge } from '@pluginjs/utils'
import { isObject } from '@pluginjs/is'
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

@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class UnitsRange extends Units {
  constructor(element, options = {}) {
    super(element, options)
    if (
      isObject(this.options.units) &&
      Object.keys(this.options.units).length === 0
    ) {
      this.options.units = {
        inherit: false,
        px: {
          min: 0,
          max: 150,
          step: 1
        },
        '%': {
          min: 0,
          max: 100,
          step: 1
        }
      }
    }
  }

  build() {
    super.build()

    this.$container = wrap(
      `<div class="${this.classes.CONTAINER}"></div>`,
      this.$wrap
    )
    this.$range = prependTo(
      `<input type="text" value="${this.value.input}"/>`,
      this.$container
    )
    this.RANGE = Range.of(
      this.$range,
      deepMerge(this.getRangeOption(this.value.unit), {
        input: false,
        range: false,
        onChange: val => {
          this.setInput(val, false)
        }
      })
    )
  }

  getRangeOption(unit) {
    if (unit in this.options.units) {
      return this.options.units[unit]
    }
    return {}
  }

  bind() {
    bindEvent(
      this.selfEventName(EVENTS.CHANGEINPUT),
      () => {
        this.RANGE.set(this.value.input, false, true)
      },
      this.element
    )

    bindEvent(
      this.selfEventName(EVENTS.CHANGEUNIT),
      (e, instance, unit) => {
        const options = this.getRangeOption(unit)
        if (this.RANGE.is('disabled')) {
          this.RANGE.enable()
        }
        this.RANGE.update(options, false, true)
      },
      this.element
    )

    bindEvent(
      this.selfEventName(EVENTS.CHANGESTATIC),
      () => {
        this.RANGE.disable()
      },
      this.element
    )

    super.bind()
  }

  enable() {
    if (this.is('disabled')) {
      this.RANGE.enable()
    }

    super.enable()
  }

  disable() {
    if (!this.is('disabled')) {
      this.RANGE.disable()
    }

    super.disable()
  }

  destroy() {
    if (this.is('initialized')) {
      this.RANGE.destroy()
      this.$range.remove()
      unwrap(this.$wrap)
    }

    super.destroy()
  }
}

export default UnitsRange
