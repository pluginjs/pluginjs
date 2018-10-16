import Component from '@pluginjs/component'
import template from '@pluginjs/template'
import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import { isElement } from '@pluginjs/is'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { query, parseHTML, wrap, insertAfter, children } from '@pluginjs/dom'
import { PasswordStrength } from './password_strength'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  translateable,
  optionable
} from '@pluginjs/decorator'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE,
  translations as TRANSLATIONS
} from './constant'

@translateable(TRANSLATIONS)
@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS
})
class Strength extends Component {
  constructor(element, options = {}) {
    super(element)

    this.setupOptions(options)
    this.setupClasses()

    if (this.options.usernameField) {
      this.$username = query(this.options.usernameField)
    }

    this.score = 0
    this.status = null

    this.shown = false

    this.setupI18n()
    this.setupStates()
    this.initialize()
  }

  initialize() {
    this.createHtml()

    addClass(this.classes.INPUT, this.element)

    this.$input = query(`.${this.classes.INPUT}`, this.$wrap)

    this.bind()

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  bind() {
    const that = this
    if (this.$toggle) {
      if (this.$toggle.getAttribute('type')) {
        bindEvent(
          this.eventName('change'),
          () => {
            this.toggle()
          },
          this.$toggle
        )
      } else {
        bindEvent(
          this.eventName('click'),
          () => {
            this.toggle()
          },
          this.$toggle
        )
      }
    }

    bindEvent(
      this.eventName('keydown'),
      () => {
        this.check()
      },
      this.$input
    )
    bindEvent(
      this.eventName('keyup'),
      () => {
        this.check()
      },
      this.$input
    )

    bindEvent(
      this.selfEventName(EVENTS.CHECK),
      (e, el, score, status) => {
        if (this.$score) {
          this.$score.innerHTML = this.translate(
            this.options.scoreLables[status]
          )
        }
        if (status !== this.status) {
          const newClass = this.options.scoreClasses[status]
          const oldClass = this.options.scoreClasses[this.status]
          if (oldClass) {
            removeClass(oldClass, this.$score)
          }
          if (newClass) {
            addClass(newClass, this.$score)
          }

          this.trigger(EVENTS.STATUSCHANGE, status, this.status)
        }

        this.status = status
        this.score = score
      },
      this.element
    )

    bindEvent(
      this.selfEventName(EVENTS.STATUSCHANGE),
      (e, el, current, old) => {
        if (old) {
          removeClass(that.getStatusClass(old), that.$wrap)
        }
        if (current) {
          addClass(that.getStatusClass(current), that.$wrap)
        }
      },
      this.element
    )

    if (this.$addon) {
      bindEvent(
        this.eventName('click'),
        // `.${this.classes.ADDON}`,
        () => {
          if (hasClass(that.classes.ACTIVE, that.$addon)) {
            removeClass(that.classes.ACTIVE, that.$addon)
            that.toggle()
            return
          }
          addClass(that.classes.ACTIVE, that.$addon)
          that.toggle()
        },
        this.$addon
      )
    }

    if (this.$icon) {
      bindEvent(
        this.eventName('click'),
        () => {
          if (hasClass(that.classes.SHOW, that.$wrap)) {
            removeClass(that.classes.SHOW, that.$wrap)
            that.toggle()
            return
          }
          addClass(that.classes.SHOW, that.$wrap)
          that.toggle()
        },
        this.$icon
      )
    }
  }

  unbind() {
    // this.$element.off(this.eventName())
    removeEvent(this.eventName(), this.$toggle)
  }

  getStatusClass(status) {
    return template.compile(this.classes.STATUS)({ status })
  }

  createHtml() {
    if (isElement(this.options.container)) {
      this.$wrap = this.options.container
      addClass(this.classes.CONTAINER, this.$wrap)
    } else if (this.options.container) {
      this.$wrap = wrap(
        `<div class='${this.classes.CONTAINER}'></div>`,
        this.element
      )
    }

    this.generateScore()
    this.generateToggle()

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.$wrap)
    }
  }

  generateToggle() {
    if (isElement(this.options.toggle)) {
      this.$addon = this.options.toggle
      addClass(this.classes.ADDON, this.$addon)

      if (query(`.${this.classes.CHECK}`)) {
        this.$toggle = query(`.${this.classes.CHECK}`)
      }

      this.$toggle = children(this.$addon)[0]

      addClass(this.classes.TOGGLE, this.$toggle)
      insertAfter(this.$addon, this.element)
    } else if (this.options.toggle) {
      addClass(`${this.classes.HASICON}`, this.$wrap)
      this.$icon = parseHTML(
        template.render(this.options.templates.icon(), {
          classes: this.classes
        })
      )

      insertAfter(this.$icon, this.element)
    }
  }

  generateScore() {
    if (isElement(this.options.score)) {
      addClass(this.classes.SCORE, this.options.score)
      this.$score = this.options.score
      insertAfter(this.$score, this.$wrap)
    } else if (this.options.score) {
      this.$score = parseHTML(
        template.render(this.options.templates.score(), {
          classes: this.classes
        })
      )
      insertAfter(this.$score, this.$wrap)
    }
  }

  isFunction(func) {
    return typeof func === 'function'
  }

  check() {
    let score = 0
    let status = null

    if (this.isFunction(this.options.scoreCallback)) {
      score = this.options.scoreCallback.call(this)

      if (this.isFunction(this.options.statusCallback)) {
        status = this.options.statusCallback.call(this, score)
      }
    } else {
      const CHECK = new PasswordStrength()
      const value = this.$username ? this.$username.value : null
      CHECK.username = value
      CHECK.password = this.$input.value

      score = CHECK.test()
      status = CHECK.status
    }

    if (
      this.options.emptyStatus &&
      status !== 'invalid' &&
      this.$input.value === ''
    ) {
      status = 'empty'
    }

    this.trigger(EVENTS.CHECK, score, status)
  }

  getScore() {
    if (!this.score) {
      this.check()
    }
    return this.score
  }

  getStatus() {
    if (!this.status) {
      this.check()
    }
    return this.status
  }

  toggle() {
    let type
    if (this.$addon && children(this.$addon)[0].tagName === 'input') {
      if (this.$toggle.matches(`.${this.classes.ADDON} input`)) {
        type = this.$toggle.matches(':checked') ? 'text' : 'password'
      } else {
        type = this.shown === false ? 'text' : 'password'
      }
    } else if (this.$addon && this.$addon.matches(`.${this.classes.ADDON}`)) {
      type = hasClass(this.classes.ACTIVE, this.$addon) ? 'text' : 'password'
    } else if (this.$icon && this.$icon.matches(`.${this.classes.ICON}`)) {
      type = hasClass(this.classes.SHOW, this.$wrap) ? 'text' : 'password'
    } else {
      type = this.shown === false ? 'text' : 'password'
    }

    this.shown = type === 'text'

    if (this.shown) {
      addClass(this.classes.SHOWN, this.$wrap)
    } else {
      removeClass(this.classes.SHOWN, this.$wrap)
    }
    this.$input.setAttribute('type', type)

    this.trigger(EVENTS.TOGGLE, type)
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
      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.element)
      }
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default Strength
