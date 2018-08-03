import Component from '@pluginjs/component'
import { compose } from '@pluginjs/utils'
import { addClass } from '@pluginjs/classes'
import { bindEvent, removeEvent } from '@pluginjs/events'
import {
  eventable,
  register,
  stateable,
  styleable,
  optionable
} from '@pluginjs/decorator'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'
import { Model, chain } from './validator/model'
import {
  baseFormat,
  computeLens,
  dateLimit,
  lensLimit,
  // timeFormat,
  timeLimit
} from './validator'

@eventable(EVENTS)
@styleable(CLASSES)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS
})
class InputMask extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)
    this.initOptions(DEFAULTS, options)
    this.initClasses(CLASSES)
    addClass(this.classes.INPUT, this.element)
    addClass(this.classes.INPUTMODE, this.element)
    this.data = ''
    this.initStates()
    this.initialize()
  }

  initialize() {
    this.bind()
    this.lastValue = ''
    const options = this.match(this.options.type)

    const input = newData => {
      if (this.data.length && this._hasBackspace) {
        this._hasBackspace = false
        return Model.of(this.data.slice(0, -1))
      }
      return Model.of(this.data + newData)
    }

    const updateMiddleware = options => {
      const { type, blocks } = options
      const lens = computeLens(blocks).join()
      switch (type) {
        case 'time': {
          const { format } = options
          const timeLens = format === '12' ? lens + 2 : lens
          return compose(
            timeLimit(format),
            lensLimit(timeLens)
          )
        }
        case 'date': {
          return compose(
            dateLimit,
            lensLimit(lens)
          )
        }
        default: {
          return lensLimit(lens)
        }
      }
    }

    const formatMiddleware = options => {
      const { type } = options
      switch (type) {
        // case 'time': {
        //   return compose(
        //     timeFormat,
        //     baseFormat(options)
        //   )
        // }
        default: {
          return baseFormat(options)
        }
      }
    }

    // update :: String -> monad
    const update = compose(
      chain(updateMiddleware(options)),
      input
    )

    // getFormattedData :: {} -> String
    const format = compose(
      chain(formatMiddleware(options)),
      Model.of
    )
    this.onChange = event => {
      const data = event.target.value.slice(this.lastValue.length)
      this.data = update(data)
      this.element.value = format(this.data)
    }
    this.observe()
    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  observe() {
    const getLastValue = e => {
      const keyCode = e.keyCode || e.which
      if (keyCode === 8) {
        this._hasBackspace = true
      }
      this.lastValue = e.target.value
    }
    compose(
      bindEvent({ type: 'keydown', handler: getLastValue }),
      bindEvent({ type: 'input', handler: this.onChange })
    )(this.element)
    // this.element.addEventListener('keydown', getLastValue, false)
    // this.element.addEventListener('input', this.onChange, false)
    this.hasObserve = true
  }

  unObserve() {
    if (this.hasObserve) {
      removeEvent('input', this.element)
      // this.element.removeEventListener('input', this.onChange, false)
      this.hasObserve = false
    }
  }

  match(type) {
    switch (type) {
      default: {
        return {
          type,
          blocks: this.options.blocks,
          delimiter: this.options.delimiter
        }
      }
      case 'time': {
        return {
          type,
          delimiter: ':',
          blocks: [2, 2],
          format: this.options.hours
        }
      }
      case 'card': {
        return {
          type,
          delimiter: ' ',
          blocks: [4, 4, 4, 4]
        }
      }
      case 'date': {
        return {
          type,
          delimiter: '/',
          blocks: [4, 2, 2]
        }
      }
    }
  }

  bind() {
    compose(
      ...[
        { type: this.eventName('touch'), handler: () => false },
        { type: this.eventName('click'), handler: () => false },
        {
          type: this.eventName('focus.keyboard'),
          handler: () => this.trigger(EVENTS.FOCUS)
        },
        {
          type: this.eventName('blur.keyboard'),
          handler: () => this.trigger(EVENTS.BLUR)
        }
      ].map(options => bindEvent(options))
    )(this.element)
  }

  unbind() {
    removeEvent(this.eventName())
    this.unObserve()
  }

  enable() {
    if (this.is('disabled')) {
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      this.enter('disabled')
    }

    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()

      this.leave('initialized')
    }
    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default InputMask
