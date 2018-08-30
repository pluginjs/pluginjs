import Component from '@pluginjs/component'
import { addClass, removeClass } from '@pluginjs/classes'
import { append, appendTo } from '@pluginjs/dom'
import { setStyle } from '@pluginjs/styled'
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
    addClass(this.classes.MASK, this.element)

    this.$spinner = appendTo(
      `<div class="${this.classes.NAMESPACE}"></div>`,
      this.element
    )

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.$spinner)
    }

    if (this.options.background) {
      setStyle('background', this.options.background, this.element)
    }
    if (this.options.text) {
      this.$text = append(
        `<div class="${this.classes.TEXT}">${this.options.text}</div>`,
        this.element
      )
    }

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()

      if (this.options.text) {
        this.$text.remove()
      }

      this.$spinner.remove()

      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.$spinner)
      }

      if (this.is('hidden')) {
        removeClass(this.classes.HIDDEN, this.element)
      }

      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }

  toggle() {
    if (this.is('hidden')) {
      this.show()
    } else {
      this.hide()
    }
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
