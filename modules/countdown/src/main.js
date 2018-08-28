import Component from '@pluginjs/component'
import {
  register,
  stateable,
  styleable,
  eventable,
  themeable,
  optionable
} from '@pluginjs/decorator'
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

import simple from './modes/simple'
import Flip from './modes/flip'
import Progress from './modes/progress'

const MODES = {}

@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS
})
class CountDown extends Component {
  constructor(element, options = {}) {
    super(element)

    this.initOptions(DEFAULTS, options)

    this.$counters = this.options.format.split(/,|，|\s+/)

    this.initClasses()

    // theme
    if (this.options.theme) {
      addClass(this.getThemeClass(), this.element)
    }

    this.initStates()
    this.initialize()
    this.trigger(EVENTS.READY)
  }

  initialize() {
    if (typeof MODES[this.options.mode] !== 'undefined') {
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

    if (typeof MODES[this.options.mode] !== 'undefined') {
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

      if (this.interval !== null) {
        clearInterval(this.interval)
      }

      this.update()

      this.interval = setInterval(() => {
        this.update(this)
      }, 1000)
    }
  }

  update() {
    const dueTime = new Date(this.options.due.toString()).getTime()
    const diffTime = getDiffTime(dueTime)

    if (this.totalSecs === diffTime) {
      return
    }
    this.totalSecs = diffTime

    this.$counters.forEach(type => {
      const countDownTime = new TimeType(type, this.totalSecs)
      const totalastSec = this.totalSecs === 0 ? 0 : this.totalSecs + 1
      const countDownlastTime = new TimeType(type, totalastSec)

      if (
        typeof MODES[this.options.mode] !== 'undefined' &&
        this.options.mode !== 'flip'
      ) {
        this.modeInstance.animate(countDownTime, type)
      } else if (this.options.mode === 'flip') {
        this.modeInstance.animate(countDownTime, countDownlastTime, type)
      }
    })

    if (this.totalSecs === 0) {
      this.stop()
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

CountDown.registerMode('simple', simple)
CountDown.registerMode('progress', Progress)
CountDown.registerMode('flip', Flip)

export default CountDown
