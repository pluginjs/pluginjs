import Component from '@pluginjs/component'
import { addClass, removeClass } from '@pluginjs/classes'
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
  methods: METHODS
})
class Loader extends Component {
  constructor(element, options = {}) {
    super(element)

    this.setupOptions(options)
    this.setupClasses()
    this.setupStates()
    this.initialize()
  }

  initialize() {
    addClass(this.classes.NAMESPACE, this.element)

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.element)
    }

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()

      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.element)
      }

      if (this.is('hidden')) {
        removeClass(this.classes.HIDDEN, this.element)
      }

      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }

  show() {
    if (this.is('hidden')) {
      removeClass(this.classes.HIDDEN, this.element)
      this.leave('hidden')
    }
    this.trigger(EVENTS.SHOW)
  }

  hide() {
    if (!this.is('hidden')) {
      addClass(this.classes.HIDDEN, this.element)
      this.enter('hidden')
    }
    this.trigger(EVENTS.HIDE)
  }
}

export default Loader
