import Component from '@pluginjs/component'
import { deepMerge } from '@pluginjs/utils'
import { addClass } from '@pluginjs/classes'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable
} from '@pluginjs/pluginjs'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'

import ONTOP from './mode/ontop'
import PINNED from './mode/pinned'
import STICK from './mode/stick'

const mode = {}

@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@register(
  NAMESPACE,
  {
    defaults: DEFAULTS,
    methods: METHODS
  }
)
class Headroom extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)
    this.options = deepMerge(DEFAULTS, options, this.getDataOptions())
    this.initClasses(CLASSES)

    this.initStates()
    this.initialize()
  }

  initialize() {
    if (typeof mode[this.options.type] !== 'undefined') {
            this.modal = new mode[this.options.type](this)
    }

    addClass(this.classes.NAMESPACE, this.element)
    this.enter('initialized')
    this.trigger(EVENTS.READY)
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
      this.leave('initialized')
    }

    this.modal.destroy()

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }

  static registerMode(type, API) {
    mode[type] = API
  }
}

Headroom.registerMode('pinned', PINNED)
Headroom.registerMode('ontop', ONTOP)
Headroom.registerMode('stick', STICK)

export default Headroom
