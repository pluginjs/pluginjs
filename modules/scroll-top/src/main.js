import GlobalComponent from '@pluginjs/global-component'
import { transitionProperty } from '@pluginjs/feature'
import { isString, isNumber, isIE, isIE11 } from '@pluginjs/is'
import { throttle } from '@pluginjs/utils'
import { addClass, removeClass } from '@pluginjs/classes'
import { setStyle, offset as getOffset } from '@pluginjs/styled'
import { bindEvent, removeEvent } from '@pluginjs/events'
import templateEngine from '@pluginjs/template'
import { query, append, parseHTML } from '@pluginjs/dom'
import Scroll from '@pluginjs/scroll'
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
  dependencies as DEPENDENCIES,
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
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class ScrollTop extends GlobalComponent {
  /* eslint consistent-return: "off" */
  constructor(options = {}) {
    super()

    this.setupOptions(options)
    this.setupClasses()

    this.setupI18n()
    this.setupStates()
    this.initialize()
  }

  initialize() {
    this.build()

    if (this.options.target) {
      if (isNumber(this.options.target)) {
        this.target = this.options.target
      } else if (isString(this.options.target)) {
        this.target = Math.floor(getOffset(query(this.options.target)).top)
      }
    } else {
      this.target = 0
    }

    this.bind()
    this.toggleMobile()
    this.toggleVisible()

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  build() {
    if (this.options.trigger) {
      this.$trigger = parseHTML(this.options.trigger)
    } else {
      this.$trigger = parseHTML(
        templateEngine.render(this.options.template.call(this), {
          classes: this.classes,
          icon: this.options.icon
            ? `<i class="${this.options.icon}"></i>`
            : null,
          label: this.translate('label')
        })
      )
    }

    if (this.options.type) {
      addClass(this.getTypeClass(), this.$trigger)
    }

    if (this.options.color) {
      setStyle(
        {
          color: this.options.color
        },
        this.$trigger
      )
    }

    if (this.options.background && this.options.type.indexOf('text') === -1) {
      setStyle(
        {
          backgroundColor: this.options.background
        },
        this.$trigger
      )
    }

    append(this.$trigger, document.body)

    if (this.options.mobile.animation === this.options.animation) {
      addClass(
        this.getClass(
          this.classes.ANIMATION,
          'animation',
          this.options.animation
        ),
        this.$trigger
      )
    }

    if (
      this.options.mobile.animationDuration === this.options.animationDuration
    ) {
      const key = `${transitionProperty()}-duration`
      setStyle(key, `${this.options.animationDuration}ms`, this.$trigger)
    }
  }

  getTypeClass(types, TYPE) {
    if (typeof types === 'undefined' && this.options.type) {
      return this.getTypeClass(this.options.type)
    }
    if (isString(types)) {
      if (typeof TYPE === 'undefined') {
        TYPE = this.classes.TYPE
      }
      types = types.split(' ')

      if (TYPE) {
        for (let i = 0; i < types.length; i++) {
          types[i] = TYPE.replace('{type}', types[i])
        }
      } else {
        for (let i = 0; i < types.length; i++) {
          types[i] = this.getClass(types[i])
        }
      }

      return types
    }

    return ''
  }

  bind() {
    bindEvent(
      this.eventName('click'),
      () => {
        this.jump()
        return false
      },
      this.$trigger
    )

    bindEvent(
      this.eventName('scroll'),
      throttle(() => {
        if (this.is('disabled')) {
          return
        }

        this.toggleVisible()
      }, this.options.throttle),
      window
    )
  }

  unbind() {
    removeEvent(this.eventName('click'), this.$trigger)
    removeEvent(this.eventName('scroll'), window)
  }

  resize() {
    this.toggleMobile()
    this.toggleVisible()
  }

  toggleMobile() {
    if (
      window.document.documentElement.clientWidth < this.options.mobile.width &&
      this.mobile !== true
    ) {
      this.distance = this.options.mobile.distance
      this.animation = this.options.mobile.animation
      this.duration = this.options.mobile.duration
      this.easing = this.options.mobile.easing

      if (this.options.mobile.animation !== this.options.animation) {
        addClass(
          this.getClass(
            this.classes.ANIMATION,
            'animation',
            this.options.mobile.animation
          ),
          this.$trigger
        )
        removeClass(
          this.getClass(
            this.classes.ANIMATION,
            'animation',
            this.options.animation
          ),
          this.$trigger
        )
      }

      if (
        this.options.mobile.animationDuration !== this.options.animationDuration
      ) {
        setStyle(
          `${transitionProperty()}-duration`,
          `${this.options.mobile.animationDuration}ms`,
          this.$trigger
        )
      }

      this.mobile = true
    } else if (this.mobile !== false) {
      this.distance = this.options.distance
      this.animation = this.options.animation
      this.duration = this.options.duration
      this.easing = this.options.easing

      if (this.options.mobile.animation !== this.options.animation) {
        addClass(
          this.getClass(
            this.classes.ANIMATION,
            'animation',
            this.options.animation
          ),
          this.$trigger
        )
        removeClass(
          this.getClass(
            this.classes.ANIMATION,
            'animation',
            this.options.mobile.animation
          ),
          this.$trigger
        )
      }

      if (
        this.options.mobile.animationDuration !== this.options.animationDuration
      ) {
        setStyle(
          `${transitionProperty()}-duration`,
          `${this.options.animationDuration}ms`,
          this.$trigger
        )
      }

      this.mobile = false
    }
  }

  toggleVisible() {
    if (this.can()) {
      this.show()
    } else {
      this.hide()
    }
  }

  scrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop
  }

  can() {
    const scrollTop = this.scrollTop()
    const clientHeight = document.documentElement.clientHeight
    const height = document.body.scrollHeight
    const total = (scrollTop / (height - clientHeight)) * 100
    if (scrollTop > this.distance + this.target || total > 100) {
      return true
    }
    return false
  }

  show() {
    if (!this.is('shown')) {
      addClass(this.classes.SHOW, this.$trigger)

      this.trigger(EVENTS.SHOW)

      this.enter('shown')
    }
  }

  hide() {
    if (this.is('shown')) {
      removeClass(this.classes.SHOW, this.$trigger)

      // this.trigger(EVENTS.HIDE)

      this.leave('shown')
    }
  }

  jump() {
    if (this.is('disabled')) {
      return
    }

    addClass(this.classes.ANIMATING, this.element)

    const top = this.target

    Scroll.toY({
      value: top,
      duration: this.duration,
      easing: this.easing,
      complete: () => {
        removeClass(this.classes.ANIMATING, this.element)
      }
    })

    this.trigger(EVENTS.JUMP, top)
  }

  enable() {
    if (this.is('disabled')) {
      this.leave('disabled')
      removeClass(this.classes.DISABLED, this.$trigger)
      this.toggleVisible()
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      addClass(this.classes.DISABLED, this.$trigger)
      this.enter('disabled')
    }
    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()

      if(isIE() || isIE11()) {
        this.$trigger.removeNode(true);
      } else {
        this.$trigger.remove()
      }

      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default ScrollTop
