import Component from '@pluginjs/component'
import { deepMerge } from '@pluginjs/utils'
import template from '@pluginjs/template'
import { addClass, removeClass } from '@pluginjs/classes'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { query, insertBefore, parseHTML } from '@pluginjs/dom'
import { PasswordStrength } from './password_strength'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  translateable
} from '@pluginjs/pluginjs'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  events as EVENTS,
  info as INFO,
  methods as METHODS,
  namespace as NAMESPACE,
  translations as TRANSLATIONS
} from './constant'

@translateable(TRANSLATIONS)
@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@register(
  NAMESPACE,
  {
    defaults: DEFAULTS,
    methods: METHODS
  },
  INFO
)
class Strength extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)

    this.options = deepMerge(DEFAULTS, options, this.getDataOptions())
    this.initClasses(CLASSES)

    if (this.options.usernameField) {
      this.username = query(this.options.usernameField)
    }

    this.score = 0
    this.status = null

    this.shown = false

    this.setupI18n()
    this.initStates()
    this.initialize()
  }

  initialize() {
    this.createHtml()

    addClass(this.classes.INPUT, this.element)

    this.$toggle = query(`.${this.classes.TOGGLE}`, this.container)
    this.meter = query(`.${this.classes.METER}`, this.container)

    this.scoreElement = query(`.${this.classes.SCORE}`, this.container)
    this.input = query(`.${this.classes.INPUT}`, this.container)

    this.bind()

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  bind() {
    if (this.$toggle) {
      if (this.$toggle.getAttribute('checkbox')) {
        bindEvent(
          {
            type: 'change',
            handler: () => {
              this.toggle()
            }
          },
          this.$toggle
        )
      } else {
        bindEvent(
          {
            type: 'click',
            handler: () => {
              this.toggle()
            }
          },
          this.$toggle
        )
      }
    }

    bindEvent(
      {
        type: 'keydown',
        handler: () => {
          this.check()
        }
      },
      this.input
    )
    bindEvent(
      {
        type: 'keyup',
        handler: () => {
          this.check()
        }
      },
      this.input
    )

    bindEvent(
      {
        type: `${NAMESPACE}:check`,
        handler: e => {
          const [score, status] = e.detail.data
          this.scoreElement.innerHTML = this.translate(
            this.options.scoreLables[status]
          )

          if (status !== this.status) {
            const newClass = this.options.scoreClasses[status]
            const oldClass = this.options.scoreClasses[this.status]
            if (oldClass) {
              removeClass(oldClass, this.scoreElement)
            }
            if (newClass) {
              addClass(newClass, this.scoreElement)
            }

            this.trigger(EVENTS.STATUSCHANGE, status, this.status)
          }

          this.status = status
          this.score = score
        }
      },
      this.element
    )

    bindEvent(
      {
        type: `${NAMESPACE}:statusChange`,
        handler: e => {
          const [current, old] = e.detail.data
          if (old) {
            removeClass(this.getStatusClass(old), this.container)
          }
          if (current) {
            addClass(this.getStatusClass(current), this.container)
          }
        }
      },
      this.element
    )
  }

  unbind() {
    this.$element.off(this.eventName())
    removeEvent('click', this.$toggle)
    removeEvent('change', this.$toggle)
    removeEvent('keydown', this.$toggle)
    removeEvent('keyup', this.$toggle)
  }

  getStatusClass(status) {
    return template.compile(this.classes.STATUS)({ status })
  }

  createHtml() {
    const html = template.render(this.options.templates.main, {
      classes: this.classes,
      toggle: this.generateToggle(),
      meter: this.generateMeter(),
      input: `<div class="${this.classes.INPUT}"></div>`
    })
    this.container = parseHTML(html)

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.container)
    }

    insertBefore(this.container, this.element)

    const holder = query(`.${this.classes.INPUT}`, this.container)
    // this.element.remove()
    insertBefore(this.element, holder)
    holder.remove()
  }

  generateToggle() {
    if (this.options.showToggle) {
      return template.render(this.options.templates.toggle, {
        classes: this.classes,
        label: this.translate('toggle')
      })
    }
    return ''
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
    return template.render(this.options.templates.score, {
      classes: this.classes
    })
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
      const value = this.username ? this.username.value : null
      CHECK.username = value
      CHECK.password = this.input.value

      score = CHECK.test()
      status = CHECK.status
    }

    if (
      this.options.emptyStatus &&
      status !== 'invalid' &&
      this.input.value === ''
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

    if (this.$toggle.matches(':checkbox')) {
      type = this.$toggle.matches(':checked') ? 'text' : 'password'
    } else {
      type = this.shown === false ? 'text' : 'password'
    }

    this.shown = type === 'text'

    if (this.shown) {
      addClass(this.classes.SHOWN, this.container)
    } else {
      removeClass(this.classes.SHOWN, this.container)
    }
    this.input.setAttribute('type', type)

    this.trigger(EVENTS.TOGGLE, type)
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
