import Component from '@pluginjs/component'
import { addClass, removeClass } from '@pluginjs/classes'
import { setStyle } from '@pluginjs/styled'
import { sticky as canSticky } from '@pluginjs/feature'
import {
  eventable,
  register,
  stateable,
  styleable,
  optionable
} from '@pluginjs/decorator'
import STICKYTOP from './stickyType/stickyTop'
import STICKYBOTTOM from './stickyType/stickyBottom'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'

let _canSticky
const TYPES = {}
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(true)
@register(NAMESPACE, {
  defaults: DEFAULTS,
  methods: METHODS
})
class Sticky extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)
    this.initOptions(DEFAULTS, options)
    this.initClasses(CLASSES)
    this.initStates()
    this.EVENTS = EVENTS

    this.initialize()
  }

  seppuku() {
    const type = this.options.verticalPosition
    if (typeof TYPES[type] === 'function') {
      this.API = new TYPES[type](this)
    }
  }

  initialize() {
    this.seppuku()

    // if (this.canSticky()) {
    //   this.setSticky()
    // } else {
    //   this.seppuku()
    // }
    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  bind() {
    // Pj.emitter.on('scroll', () => {
    //   const offset = this.offset(this.element)
    //       // })
  }

  unbind() {
    //
  }

  offset(el) {
    const box = el.getBoundingClientRect()

    return {
      top: box.top + window.pageYOffset - document.documentElement.clientTop,
      left: box.left + window.pageXOffset - document.documentElement.clientLeft
    }
  }

  setSticky() {
    setStyle({ position: 'sticky' }, this.element)
    const { spacing } = this.options
    setStyle({ top: `${parseInt(spacing, 10)}px` }, this.element)
  }

  canSticky() {
    if (!_canSticky) {
      _canSticky = canSticky()
    }

    return _canSticky
  }

  enable() {
    if (this.is('disabled')) {
      removeClass(this.classes.DISABLED, this.element)
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      addClass(this.classes.DISABLED, this.element)
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

  static registerType(type, API) {
    TYPES[type] = API
  }
}

Sticky.registerType('top', STICKYTOP)
Sticky.registerType('bottom', STICKYBOTTOM)

export default Sticky
