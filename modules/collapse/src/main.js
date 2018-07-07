import Component from '@pluginjs/component'
import { deepMerge, compose } from '@pluginjs/utils'
import { children } from '@pluginjs/dom'
import { addClass, removeClass } from '@pluginjs/classes'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { outerHeight } from '@pluginjs/styled'
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

/* Credit to https://github.com/filamentgroup/collapse MIT */

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
class Collapse extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)

    this.options = deepMerge(DEFAULTS, options, this.getDataOptions())

    this.initClasses(CLASSES)

    if (this.element.matches(`.${this.classes.COLLAPSED}`)) {
      this.options.collapsed = true
    }

    this.initStates()
    this.initialize()
  }

  initialize() {
    this.$header = this.element.querySelectorAll(`.${this.classes.HEADER}`)[0]
    if (!this.$header) {
      this.$header = children(this.element)[0]
      addClass(this.classes.HEADER, this.$header)
    }

    this.$switch = this.options.switch
      ? this.$header.querySelectorAll(`.${this.options.switch}`)[0]
      : this.$header

    this.$content = this.element.querySelectorAll(`.${this.classes.CONTENT}`)[0]
    if (!this.$content) {
      this.$content = this.$header.nextElementSibling
      addClass(this.classes.CONTENT, this.$content)
    }

    this.$contentinner = this.$content.querySelectorAll(
      `.${this.classes.CONTENTINNER}`
    )[0]
    if (!this.$contentinner) {
      this.$contentinner = children(this.$content)[0]
      addClass(this.classes.CONTENTINNER, this.$contentinner)
    }

    addClass(this.classes.CONTAINER, this.element)
    if (this.options.theme) {
      addClass(this.getThemeClass(), this.element)
    }

    this.addA11yAttrs()
    this.bind()

    if (this.options.collapsed) {
      this._collapse()
    } else {
      this.$content.style.height = `${outerHeight(this.$contentinner)}px`
      this._expand()
    }

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  bind() {
    compose(
      bindEvent({
        type: this.eventName('keydown'),
        handler: e => {
          if (this.is('disabled')) {
            return
          }
          if (e.which === 13 || e.which === 32) {
            this.toggle()
            e.preventDefault()
          }
        }
      }),
      bindEvent({
        type: this.eventName('click'),
        handler: e => {
          if (this.is('disabled')) {
            return
          }
          this.toggle()
          e.preventDefault()
        }
      }),
      bindEvent({
        type: this.eventName('touch'),
        handler: e => {
          if (this.is('disabled')) {
            return
          }
          this.toggle()
          e.preventDefault()
        }
      })
    )(this.$switch)
  }

  addA11yAttrs() {
    this.$switch.setAttribute('role', 'button')
    this.$switch.setAttribute('tabindex', '0')
    if (this.options.instructions) {
      this.$header.setAttribute('title', this.options.instructions)
    }
  }

  removeA11yAttrs() {
    this.$switch.removeAttribute('role')
    this.$switch.removeAttribute('tabindex')
    this.$header.removeAttribute('title')
  }

  unbind() {
    removeEvent(this.eventName(), this.$switch)
  }

  _expand() {
    removeClass(this.classes.COLLAPSED, this.element)
    addClass(this.classes.EXPANDED, this.element)
    this.$switch.setAttribute('aria-expanded', 'true')

    this.leave('collapsed')
  }

  expand() {
    if (
      !this.is('initialized') ||
      !this.is('collapsed') ||
      this.is('disabled')
    ) {
      return
    }

    this.$content.style.height = `${outerHeight(this.$contentinner)}px`
    this._expand()
  }

  _collapse() {
    removeClass(this.classes.EXPANDED, this.element)
    addClass(this.classes.COLLAPSED, this.element)
    this.$switch.setAttribute('aria-expanded', 'false')

    this.enter('collapsed')
  }

  collapse() {
    if (
      !this.is('initialized') ||
      this.is('collapsed') ||
      this.is('disabled')
    ) {
      return
    }

    this.$content.style.height = '0'
    this._collapse()
  }

  toggle() {
    if (this.is('collapsed')) {
      this.expand()
    } else {
      this.collapse()
    }
  }

  resize() {
    if (this.is('initialized') && !this.is('collapsed')) {
      this.$content.style.height = `${outerHeight(this.$contentinner)}px`

      this.trigger(EVENTS.RESIZE)
    }
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
      this.removeA11yAttrs()

      if (!this.is('collapsed')) {
        this.$content.style.height = 'auto'
      }

      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.element)
      }
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default Collapse
