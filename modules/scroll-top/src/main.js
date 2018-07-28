import Component from '@pluginjs/component'
import { transitionProperty } from '@pluginjs/feature'
import is from '@pluginjs/is'
import { throttle } from '@pluginjs/utils'
import { addClass, removeClass } from '@pluginjs/classes'
import { setStyle, getOffset } from '@pluginjs/styled'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { query, append, parseHTML } from '@pluginjs/dom'
import Pj from '@pluginjs/factory'
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
@optionable(true)
@register(NAMESPACE, {
  defaults: DEFAULTS,
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class ScrollTop extends Component {
  /* eslint consistent-return: "off" */
  constructor(element, options = {}) {
    super(NAMESPACE, element)

    this.initOptions(DEFAULTS, options)
    this.initClasses(CLASSES)

    this.setupI18n()
    this.initStates()
    this.initialize()
  }

  initialize() {
    this.build()

    if (this.options.target) {
      if (is.number(this.options.target)) {
        this.target = this.options.target
      } else if (is.string(this.options.target)) {
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
        `<a href="#" class="${
          this.classes.TRIGGER
        } ${this.getThemeClass()}">${this.translate('label')}</a>`
      )
      append(this.$trigger, document.body)
    }

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
      setStyle({ key: `${this.options.animationDuration}ms` }, this.$trigger)
    }
  }

  bind() {
    bindEvent(
      {
        type: this.eventName('click'),
        handler: () => {
          this.jump()
          return false
        }
      },
      this.$trigger
    )

    this.scrollHandle = throttle(() => {
      if (this.is('disabled')) {
        return
      }

      this.toggleVisible()
    }, this.options.throttle)

    Pj.emitter.on('scroll', this.scrollHandle.bind(this))
  }

  unbind() {
    removeEvent(this.eventName('click'), this.$trigger)

    Pj.emitter.off('scroll', this.scrollHandle)
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
        const key = `${transitionProperty()}-duration`
        setStyle(
          { key: `${this.options.mobile.animationDuration}ms` },
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
        const key = `${transitionProperty()}-duration`
        setStyle({ key: `${this.options.animationDuration}ms` }, this.$trigger)
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
    if (this.scrollTop() > this.distance + this.target) {
      return true
    }
    return false
  }

  show() {
    if (!this.is('shown')) {
      this.enter('shown')
      addClass(this.classes.SHOW, this.$trigger)

      this.trigger(EVENTS.SHOW)
    }
  }

  hide() {
    if (this.is('shown')) {
      this.leave('shown')
      removeClass(this.classes.SHOW, this.$trigger)

      this.trigger(EVENTS.HIDE)
    }
  }

  jump() {
    if (this.is('disabled')) {
      return
    }

    addClass(this.classes.ANIMATING, this.element)

    const top = this.target

    if (Pj.scroll) {
      Pj.scroll.toY({
        value: top,
        duration: this.duration,
        easing: this.easing,
        complete: () => {
          removeClass(this.classes.ANIMATING, this.element)
        }
      })
    } else {
      let easing = this.easing
      if (!is.function($.easing[this.easing])) {
        easing = 'swing'
      }

      $('html, body').animate(
        { scrollTop: top },
        {
          duration: this.duration,
          easing,
          complete: () => {
            removeClass(this.classes.ANIMATING, this.element)
          }
        }
      )
    }

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

      if (!this.options.trigger) {
        this.$trigger.remove()
      }
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default ScrollTop
