import jrQrcode from 'jr-qrcode'
import Component from '@pluginjs/component'
import { eventable, register, stateable, optionable } from '@pluginjs/decorator'
import {
  defaults as DEFAULTS,
  dependencies as DEPENDENCIES,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'

@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class Qrcode extends Component {
  constructor(element, options = {}) {
    super(element)

    this.setupOptions(options)
    this.setupStates()
    this.initialize()
  }

  initialize() {
    this.generate()
    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  generate() {
    const { text, correctLevel, ...options } = this.options

    const QRErrorCorrectLevel = {
      L: 1,
      M: 0,
      Q: 3,
      H: 2
    }

    if (
      Object.prototype.hasOwnProperty.call(QRErrorCorrectLevel, correctLevel)
    ) {
      options.correctLevel = QRErrorCorrectLevel[correctLevel]
    }

    this.element.src = jrQrcode.getQrBase64(String(text), options)
  }

  destroy() {
    if (this.is('initialized')) {
      this.element.src = null
      // this.element.innerHTML = ''
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default Qrcode
