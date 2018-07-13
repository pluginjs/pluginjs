import Component from '@pluginjs/component'
import { deepMerge } from '@pluginjs/utils'
import { register, stateable, styleable, eventable } from '@pluginjs/pluginjs'
import is from '@pluginjs/is'
import { addClass, removeClass } from '@pluginjs/classes'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  methods as METHODS,
  events as EVENTS,
  namespace as NAMESPACE,
  labelMap as LABELMAP
} from './constant'
import TimeType from './time'
import { getDiffTime } from './util'

import Ordinary from './modes/ordinary'
import Flip from './modes/flip'
import Progress from './modes/progress'

const MODES = {}

@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@register(NAMESPACE, {
  defaults: DEFAULTS,
  methods: METHODS
})
class CountDown extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)

    this.options = deepMerge(DEFAULTS, options, this.getDataOptions())

    this.$counters = this.options.format.split(/,|，|\s+/)

    this.initClasses(CLASSES)
    this.initStates()
    this.initialize()
    this.trigger(EVENTS.READY)
  }

  initialize() {
    if (!is.undefined(MODES[this.options.mode])) {
      this.modeInstance = new MODES[this.options.mode](this)
    }

    this.createHtml()

    this.start()

    this.enter('initialized')
  }

  createHtml() {
    this.element.classList.add(
      this.getClass(this.classes.MODE, 'mode', this.options.mode)
    )

    if (!is.undefined(MODES[this.options.mode])) {
      this.$counters.map((type, index) => {
        const getLabel = type => {
          return {
            labelMap: LABELMAP[type],
            labelName:
              this.options.label !== true
                ? this.options.label.split(/,|，|\s+/)[index]
                : LABELMAP[type]
          }
        }

        return this.modeInstance.html(type, getLabel(type))
      })
    }
  }

  start() {
    if (!this.is('started')) {
      this.enter('started')

      this.interval = setInterval(() => {
        const dueTime = new Date(this.options.due).getTime()
        const diffTime = getDiffTime(dueTime)

        this.$counters.forEach(type => {
          const countDownTime = new TimeType(type, diffTime, this.options.due)
          if (!is.undefined(MODES[this.options.mode])) {
            this.modeInstance.animate(countDownTime, type)
          }
        })
      }, 1000)
    }
  }

  stop() {
    if (this.is('started')) {
      this.leave('started')

      clearInterval(this.interval)
    }
  }

  enable() {
    if (this.is('disabled')) {
      this.element.disabled = false

      this.leave('disabled')
    }

    removeClass(this.classes.DISABLED, this.element)
    this.start()
  }

  disable() {
    if (!this.is('disabled')) {
      this.element.disabled = true
      this.enter('disabled')
    }

    addClass(this.classes.DISABLED, this.element)
    this.stop()
  }

  destroy() {
    if (this.is('initialized')) {
      removeClass(this.classes.PROGRESS, this.element)
      this.element.innerHTML = ''
      this.leave('initialized')
    }

    super.destroy()
  }

  static registerMode(name, defination) {
    MODES[name] = defination

    if (defination.classes) {
      Object.assign(CLASSES, defination.classes)
    }
  }
}

CountDown.registerMode('ordinary', Ordinary)
CountDown.registerMode('progress', Progress)
CountDown.registerMode('flip', Flip)

export default CountDown
