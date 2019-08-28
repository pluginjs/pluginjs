import Component from '@pluginjs/component'
import { isString, isBoolean } from '@pluginjs/is'
import { wrap, parseHTML, unwrap } from '@pluginjs/dom'
import { addClass, removeClass } from '@pluginjs/classes'
import { getWidth, setStyle, getStyle } from '@pluginjs/styled'
import { triggerNative } from '@pluginjs/utils'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  translateable,
  optionable
} from '@pluginjs/decorator'
import Hammer from 'hammerjs'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  dependencies as DEPENDENCIES,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE,
  translations as TRANSLATIONS
} from './constant'
import toggleAnimation from './animate'

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
class Toggle extends Component {
  constructor(element, options = {}) {
    super(element)

    this.setupOptions(options)
    this.setupClasses()
    this.setupStates()

    this.checked =
      this.options.checked === null ? element.checked : this.options.checked

    this.setupI18n()
    this.initialize()
  }

  initialize() {
    this.initContent()

    this.$wrap = wrap(`<div class="${this.classes.WRAP}"></div>`, this.element)

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.$wrap)
    }

    this.$inner = parseHTML(`<div class="${this.classes.INNER}"></div>`)
    this.$on = parseHTML(`<div class="${this.classes.ON}">${this.onText}</div>`)
    this.$off = parseHTML(
      `<div class="${this.classes.OFF}">${this.offText}</div>`
    )
    this.$handle = parseHTML(`<div class="${this.classes.HANDLE}"></div>`)

    this.$inner.append(this.$on, this.$handle, this.$off)
    this.$wrap.append(this.$inner)

    this.initIcon()

    if (this.options.size !== null) {
      addClass(
        this.getClass(this.classes.SIZE, 'size', this.options.size),
        this.$wrap
      )
    }
    // get components width
    this.distance = this.$wrap.clientWidth - getWidth(this.$handle)

    if (!this.distance) {
      const clientWidth =
        parseInt(getStyle('width', this.$wrap).replace(/px|pt|em/gi, ''), 0) -
        Math.abs(getWidth(this.$wrap))
      this.distance =
        clientWidth -
        parseInt(getStyle('width', this.$handle).replace(/px|pt|em/gi, ''), 0)
    }

    this.bind()
    this.set(this.checked, false)
    if (this.element.disabled || this.options.disabled) {
      this.disable()
    }

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  initContent() {
    const isShow = this.options.showText
    if (isShow) {
      if (this.options.onText === null) {
        this.onText = this.translate('on')
      } else {
        this.onText = this.options.onText
      }

      if (this.options.offText === null) {
        this.offText = this.translate('off')
      } else {
        this.offText = this.options.offText
      }
    } else {
      this.onText = ''

      this.offText = ''
    }
  }

  initIcon() {
    if (this.options.showIcon && !this.options.showText) {
      addClass(this.classes.ICONON, this.$on)
      addClass(this.classes.ICONOFF, this.$off)
    }
  }
  bind() {
    if (this.options.clickable === true) {
      this.wrapHammer = new Hammer(this.$wrap)
      this.wrapHammer.on('tap', () => {
        if (this.is('disabled')) {
          return
        }

        this.toggle()
      })
    }

    if (this.options.dragable === true) {
      this.handleHammer = new Hammer(this.$handle)
      this.handleHammer
        .on('panstart', () => {
          if (this.is('disabled')) {
            return
          }

          this.dragStart = true
        })
        .on('horizontal pan', e => {
          if (this.is('disabled')) {
            return
          }

          this.drag(e)
        })
        .on('panend', e => {
          if (this.is('disabled')) {
            return
          }

          this.dragEnd(e)
        })
    }
  }

  drag(event) {
    if (!this.dragStart) {
      return
    }

    const deltaX = event.deltaX
    let pos = deltaX

    if (deltaX < -this.distance) {
      pos = -this.distance

      this.set(false)
      this.dragStart = false
    } else if (deltaX > 0) {
      pos = 0

      this.set(true)
      this.dragStart = false
    }
    if (pos !== -this.distance && pos !== 0) {
      setStyle('marginLeft', `${pos}px`, this.$inner)
    }
  }

  dragEnd(event) {
    if (!this.dragStart) {
      return
    }

    const deltaX = event.deltaX

    if (deltaX < this.distance / -2) {
      this.set(false)
    } else {
      this.set(true)
    }

    this.dragStart = false
  }

  unbind() {
    this.wrapHammer.destroy()
    this.handleHammer.destroy()
  }

  toggle() {
    this.set(!this.checked)

    return false
  }

  set(value, update = true) {
    if (isString(value)) {
      value = value === 'false' ? false : Boolean(value)
    }

    if (isBoolean(value)) {
      this.checked = value
    } else {
      this.checked = Boolean(value)
    }

    if (this.checked === true) {
      toggleAnimation(
        { marginLeft: 0 },
        { duration: this.options.duration },
        this.$inner
      )

      removeClass(this.classes.ISOFF, this.$wrap)
    } else {
      toggleAnimation(
        { marginLeft: `${-this.distance}px` },
        { duration: this.options.duration },
        this.$inner
      )
      addClass(this.classes.ISOFF, this.$wrap)
    }

    this.element.checked = this.checked

    if (update) {
      this.trigger(EVENTS.CHANGE, this.checked)
      triggerNative(this.element, 'change')
    }
    return this
  }

  check(update = true) {
    if (!this.checked) {
      this.set(true, update)
    }

    return this
  }

  uncheck(update = true) {
    if (this.checked) {
      this.set(false, update)
    }

    return this
  }

  get() {
    return this.element.checked
  }

  val(value, trigger = true) {
    if (typeof value !== 'undefined') {
      this.set(value, trigger)
    } else {
      return this.get()
    }

    return null
  }

  enable() {
    if (this.is('disabled')) {
      this.element.disabled = false
      this.leave('disabled')
    }

    removeClass(this.classes.DISABLED, this.$wrap)
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      this.element.disabled = true
      this.enter('disabled')
    }

    addClass(this.classes.DISABLED, this.$wrap)
    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()
      removeClass(this.classes.WRAP, this.$wrap)
      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.$wrap)
      }
      unwrap(this.element)
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default Toggle
