import Component from '@pluginjs/component'
import { addClass, removeClass } from '@pluginjs/classes'
import { parseHTML } from '@pluginjs/dom'
import templateEngine from '@pluginjs/template'
import { deepMerge } from '@pluginjs/utils'
import {
  register,
  stateable,
  styleable,
  eventable,
  themeable,
  optionable
} from '@pluginjs/decorator'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  methods as METHODS,
  events as EVENTS,
  namespace as NAMESPACE,
  KEY_MAP
} from './constant'

import Times from './times'
import simple from './modes/simple'
import Progress from './modes/progress'
import Flip from './modes/flip'

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
  _interval = {
    createTimer: time => {
      this.timer = () => {
        this.update()
      }
      return window.setInterval(this.timer, time)
    },
    removeTimer: () => {
      window.clearInterval(this.timer())
    }
  }

  constructor(element, options = {}) {
    super(element)

    this.setupOptions(options)
    this.setupClasses()
    this.setupStates()
    this.initialize()
  }

  initialize() {
    if (this.options.theme) {
      addClass(this.getThemeClass(), this.element)
    }

    this.format = this.options.format.split(/,|，|\s+/)
    this.places = this.options.places.split(/,|，|\s+/)
    this.maximums = this.options.maximums.split(/,|，|\s+/)
    this.types = []
    this.labels = []

    this.format.forEach((type, index) => {
      const name = KEY_MAP[type]
      const label =
        this.options.label === 'default'
          ? name
          : this.options.label.split(/,|，|\s+/)[index]

      this.types.push(name)
      this.labels.push(label)
      this.places[index] = Number(this.places[index])
      this.maximums[index] = Number(this.maximums[index])
    })

    this.due = new Date(this.options.due).getTime()

    this.start()

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  getHtml(type, ...args) {
    const template = this.options.templates[type]
    let html = ''

    html = templateEngine.render(
      template.call(this),
      deepMerge(
        {
          classes: this.classes
        },
        ...args
      )
    )

    return html
  }

  getElement(type, ...args) {
    return parseHTML(this.getHtml(type, ...args))
  }

  start() {
    if (!this.is('started')) {
      this.enter('started')

      if (this._interval.timer) {
        this.closeInterval()
      }

      this.update()

      if (
        MODES[this.options.mode] &&
        !this.is('built') &&
        !this.options.overall
      ) {
        this.sample = new MODES[this.options.mode](this)
        this.enter('built')
      }

      this.openInterval(this.options.interval)
      this.trigger(EVENTS.START)
    }
  }

  stop() {
    if (this.is('started')) {
      this.leave('started')

      clearInterval(this.interval)
      this.trigger(EVENTS.STOP)
    }
  }

  openInterval(time = 1000) {
    this._interval.timer = this._interval.createTimer(time)
  }

  closeInterval() {
    this._interval.removeTimer()
  }

  processTime(time, places = 2) {
    const length = time.toString().length
    let html = Number(time)

    places = places < 0 ? 0 : places

    for (let i = 0; i < places; i++) {
      if (i >= length) {
        html = `0${html}`
      }
    }

    return html
  }

  getDif() {
    return this.due - Date.now()
  }

  update() {
    const dif = this.getDif()

    if (dif < 0) {
      return
    }

    const newTimes = new Times(dif)

    if (this.options.overall) {
      this.times = newTimes
      this.trigger(EVENTS.UPDATE)
    } else if (this.times) {
      this.types.forEach(type => {
        const newTime = newTimes[type]

        if (this.times[type] !== newTime) {
          this.times[type] = newTime
        }
      })
    } else {
      this.times = new Proxy(newTimes, {
        set: (target, property, value) => {
          const index = this.types.indexOf(property)
          target[property] = value
          this.trigger(
            EVENTS.UPDATE,
            property,
            this.processTime(value, this.places[index])
          )

          return true
        }
      })
    }
  }

  enable() {
    if (this.is('disabled')) {
      removeClass(this.classes.DISABLED, this.element)
      this.start()
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      addClass(this.classes.DISABLED, this.element)
      this.stop()
      this.enter('disabled')
    }
    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      removeClass(this.classes.PROGRESS, this.element)

      this.stop()
      this.element.innerHTML = ''
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }

  static registerMode(name, defination) {
    MODES[name] = defination
  }
}

CountDown.registerMode('simple', simple)
CountDown.registerMode('progress', Progress)
CountDown.registerMode('flip', Flip)

export default CountDown
