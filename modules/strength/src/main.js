import Component from '@pluginjs/component'
import template from '@pluginjs/template'
import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import { isElement } from '@pluginjs/is'
import { bindEvent, removeEvent } from '@pluginjs/events'
import {
  query,
  insertBefore,
  parseHTML,
  wrap,
  insertAfter
} from '@pluginjs/dom'
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
    this.createHtm1l()
    // this.createHtml()

    addClass(this.classes.INPUT, this.element)

    // this.$toggle = query(`.${this.classes.TOGGLE}`, this.$wrap)
    // this.$meter = query(`.${this.classes.METER}`, this.$wrap)

    this.$scoreElement = query(`.${this.classes.SCORE}`, this.$wrap)
    this.$input = query(`.${this.classes.INPUT}`, this.$wrap)
    this.$addon = query(`.${this.classes.ADDON}`, this.$wrap)

    this.bind()

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  bind() {
    if (this.$toggle) {
      console.log(this.$toggle.type)
      if (this.$toggle.getAttribute('checkbox')) {
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
        this.$scoreElement.innerHTML = this.translate(
          this.options.scoreLables[status]
        )
        if (status !== this.status) {
          const newClass = this.options.scoreClasses[status]
          const oldClass = this.options.scoreClasses[this.status]
          if (oldClass) {
            removeClass(oldClass, this.$scoreElement)
          }
          if (newClass) {
            addClass(newClass, this.$scoreElement)
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
          removeClass(this.getStatusClass(old), this.$wrap)
        }
        if (current) {
          addClass(this.getStatusClass(current), this.$wrap)
        }
      },
      this.element
    )
    bindEvent(
      this.eventName('click'),
      // `.${this.classes.ADDON}`,
      () => {
        if (hasClass(this.classes.ACTIVE, this.$addon)) {
          removeClass(this.classes.ACTIVE, this.$addon)
          this.iconToggle()
          return
        }
        addClass(this.classes.ACTIVE, this.$addon)
        this.iconToggle()
      },
      this.$addon
    )
  }

  unbind() {
    // this.$element.off(this.eventName())
    removeEvent(this.eventName(), this.$toggle)
  }

  getStatusClass(status) {
    return template.compile(this.classes.STATUS)({ status })
  }

  createHtm1l() {
    this.$wrap = wrap(
      `<div class='${this.classes.CONTAINER}'></div>`,
      this.element
    )

    this.generateScore()
    this.generateToggle()

    console.log(this.$wrap)
    if (this.options.theme) {
      addClass(this.getThemeClass(), this.$wrap)
    }
  }

  createHtml() {
    const html = template.render(this.options.templates.main, {
      classes: this.classes,
      toggle: this.generateToggle(),
      meter: this.generateMeter(),
      input: `<div class="${this.classes.INPUT}"></div>`
    })

    this.$wrap = parseHTML(html)

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.$wrap)
    }

    insertBefore(this.$wrap, this.element)

    const $holder = query(`.${this.classes.INPUT}`, this.$wrap)
    // this.element.remove()
    insertBefore(this.element, $holder)
    $holder.remove()
  }

  generateToggle() {
    if (isElement(this.options.showToggle)) {
      this.$toggle = parseHTML(
        template.render(this.options.templates.toggle(), {
          classes: this.classes
        })
      )
      this.$toggle.append(this.options.showToggle)
      insertAfter(this.$toggle, this.element)
    } else if (this.options.showToggle) {
      this.$toggle = parseHTML(
        template.render(this.options.templates.toggle(), {
          classes: this.classes
        })
      )
      insertAfter(this.$toggle, this.element)

      this.$iconShow = parseHTML(
        template.render(this.options.templates.iconShow(), {
          classes: this.classes
        })
      )
      this.$iconHide = parseHTML(
        template.render(this.options.templates.iconHide(), {
          classes: this.classes
        })
      )
      this.$toggle.append(this.$iconShow, this.$iconHide)
    }
  }

  generateMeter() {
    if (this.options.showMeter) {
      return template.render(this.options.templates.meter, {
        classes: this.classes,
        score: this.generateScore()
      })
    }
    return ''
  }

  generateScore() {
    if (this.options.showScore) {
      this.$score = template.render(this.options.templates.score(), {
        classes: this.classes
      })
      insertAfter(this.$score, this.element)
    } else if (isElement(this.options.showScore)) {
      this.$score = this.options.showScore
      insertAfter(this.$score, this.element)
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

  iconToggle() {
    let type
    if (this.$addon.matches('.pj-istrength-addon')) {
      type = hasClass(this.classes.ACTIVE, this.$addon) ? 'text' : 'password'
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

  toggle() {
    let type

    if (this.$toggle.matches('.pj-strength-addon input')) {
      type = this.$toggle.matches(':checked') ? 'text' : 'password'
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
