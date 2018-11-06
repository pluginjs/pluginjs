import templateEngine from '@pluginjs/template'
import { isNumber, isObject, isFunction } from '@pluginjs/is'
import { addClass, removeClass } from '@pluginjs/classes'
import { setStyle } from '@pluginjs/styled'
import { bindEvent, bindEventOnce } from '@pluginjs/events'
import { append, parseHTML, query, remove, data } from '@pluginjs/dom'
import GlobalComponent from '@pluginjs/global-component'
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
  namespace as NAMESPACE
} from './constant'
import Tween from '@pluginjs/tween'

const POSITIONS = [
  'bottom-left',
  'bottom-right',
  'top-right',
  'top-left',
  'bottom-center',
  'top-center',
  'mid-center'
]

@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, false)
@register(NAMESPACE)
class Toast extends GlobalComponent {
  constructor(options = {}) {
    super()

    this.setupOptions(options)
    this.setupClasses()
    this.setupStates()
    this.initialize()
  }

  initialize() {
    if (this.options.closeable === 'false') {
      this.options.closeable = true
    }
    this.$element = parseHTML(this.createHtml())

    this.$icon = query(`.${this.classes.ICON}`, this.$element)
    this.$content = query(`.${this.classes.CONTENT}`, this.$element)
    this.$title = query(`.${this.classes.TITLE}`, this.$element)
    this.$buttons = query(`.${this.classes.BUTTONS}`, this.$element)
    this.$loader = query(`.${this.classes.LOADER}`, this.$element)
    this.$loaderBar = query(`.${this.classes.LOADERBAR}`, this.$element)
    this.$close = query(`.${this.classes.CLOSE}`, this.$element)

    this.stack = parseInt(this.options.stack, 10)

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.$element)
    }

    if (this.options.type) {
      addClass(this.classes.HASICON, this.$element)

      addClass(
        this.getClass(this.classes.TYPE, 'type', this.options.type),
        this.$element
      )
    }

    if (this.options.closeable) {
      addClass(this.classes.CLOSEABLE, this.$element)
    }

    if (this.options.content) {
      this.setContent(this.options.content)
    }

    if (this.options.title) {
      this.setTitle(this.options.title)
    }

    if (
      this.options.title &&
      this.options.buttons &&
      this.options.content === ''
    ) {
      addClass(this.classes.ONLYTITLE, this.$element)
    }

    this.enter('initialized')
    this.trigger(EVENTS.READY)

    this.show()
  }

  setContent(content) {
    if (this.options.html) {
      this.$content.innerHTML = content
    } else {
      this.$content.textContent = content
    }
  }

  setTitle(title) {
    this.$title.textContent = title
  }

  show() {
    if (this.is('show')) {
      return
    }

    this.appendToDom()

    append(this.$element, this.$wrap)

    if (this.stack && isNumber(this.stack)) {
      const instances = this.constructor.getInstances().filter(instance => {
        return this.$wrap.contains(instance.$element)
      })
      const _prevToastCount = instances.length
      const _extToastCount = _prevToastCount - this.stack
      if (_extToastCount > 0) {
        instances.slice(0, _extToastCount).forEach(instance => {
          remove(instance.$element)
        })
      }
    }

    if (this.options.duration) {
      this.startTween()
    }

    this.animate()
    this.bind()
    this.enter('show')
    this.trigger(EVENTS.SHOW)
  }

  startTween() {
    this.TWEEN = Tween.of({
      from: 0,
      to: 100,
      easing: 'linear',
      duration: this.options.duration,
      autoplay: false
    })
      .on('update', value => {
        if (this.$loaderBar) {
          this.$loaderBar.style.width = `${value}%`
        }
      })
      .on('complete', () => {
        this.hide()
      })

    this.TWEEN.start()
  }

  pauseTween() {
    if (this.TWEEN) {
      this.TWEEN.pause()
    }
  }

  resumeTween() {
    if (this.TWEEN) {
      this.TWEEN.resume()
    }
  }

  animate() {
    let effect = ''
    if (this.options.effect === 'slide') {
      let opt = this.options.position.split('-')[1]
      if (opt === 'center' || opt === 'right') {
        opt = 'Right'
      } else {
        opt = 'Left'
      }
      effect = `slide${opt}`
    } else if (this.options.effect === 'fade') {
      effect = 'fadeIn'
    }
    this.effect = effect

    addClass(`${this.classes.NAMESPACE}-${effect}`, this.$element)
  }

  position() {
    if (
      typeof this.options.position === 'string' &&
      POSITIONS.includes(this.options.position)
    ) {
      addClass(
        this.getClass(this.classes.POSITION, 'position', this.options.position),
        this.$wrap
      )
    } else if (typeof this.options.position === 'object') {
      setStyle(
        {
          top: this.options.position.top ? this.options.position.top : 'auto',
          bottom: this.options.position.bottom
            ? this.options.position.bottom
            : 'auto',
          left: this.options.position.left
            ? this.options.position.left
            : 'auto',
          right: this.options.position.right
            ? this.options.position.right
            : 'auto'
        },
        this.$wrap
      )
    } else {
      addClass(
        this.getClass(this.classes.POSITION, 'position', 'bottom-left'),
        this.$wrap
      )
    }
  }

  hide() {
    if (!this.is('show')) {
      return
    }

    removeClass(`${this.classes.NAMESPACE}-${this.effect}`, this.$element)
    addClass(this.classes.OUT, this.$element)

    bindEventOnce(
      this.eventName('animationend'),
      () => {
        this.destroy()
      },
      this.$element
    )

    this.leave('show')
    this.trigger(EVENTS.HIDE)
  }

  bind() {
    if (this.options.closeable && this.$close) {
      bindEvent(
        this.eventName('click'),
        () => {
          this.hide()
        },
        this.$close
      )
    }

    if (isNumber(this.options.duration)) {
      bindEvent(
        this.eventName('mouseenter'),
        () => {
          this.pauseTween()
        },
        this.$element
      )
      bindEvent(
        this.eventName('mouseleave'),
        () => {
          this.resumeTween()
        },
        this.$element
      )
    }

    if (this.options.buttons) {
      bindEvent(
        this.eventName('click'),
        event => {
          if (
            !event.target.classList.contains(this.classes.BUTTON) ||
            !data('action', event.target)
          ) {
            return false
          }

          const action = data('action', event.target)

          for (let i = 0; i < this.options.buttons.length; i++) {
            if (action === this.options.buttons[i].action) {
              const button = this.options.buttons[i]
              if (isFunction(button.fn)) {
                button.fn(this.hide.bind(this))
              } else {
                this.hide()
              }
            }
          }

          return false
        },
        this.$buttons
      )
    }
  }

  appendToDom() {
    let wrapSelector = `.${this.classes.WRAP}`

    if (POSITIONS.includes(this.options.position)) {
      wrapSelector += `.${this.getClass(
        this.classes.POSITION,
        'position',
        this.options.position
      )}`
    }

    this.$wrap = query(wrapSelector)

    if (!this.$wrap) {
      this.$wrap = parseHTML(
        templateEngine.render(this.options.templates.wrap.call(this), {
          classes: this.classes
        })
      )
      append(this.$wrap, window.document.body)
      this.position()
    } else if (!this.stack) {
      this.$wrap.innerHTML = ''
    }
  }

  getIconClass() {
    if (this.options.icon) {
      return this.options.icon
    }

    if (
      this.options.type &&
      Object.prototype.hasOwnProperty.call(
        this.options.types,
        this.options.type
      )
    ) {
      return this.options.types[this.options.type]
    }
    return ''
  }

  createHtml() {
    let close = ''
    let title = ''
    let content = ''
    let buttons = ''
    let loader = ''
    let icon = ''

    const iconClass = this.getIconClass()

    if (iconClass) {
      icon = templateEngine.render(this.options.templates.icon.call(this), {
        classes: this.classes,
        iconClass
      })
    }

    if (this.options.closeable) {
      close = templateEngine.render(this.options.templates.close.call(this), {
        classes: this.classes
      })
    }

    if (this.options.title !== '') {
      title = templateEngine.render(this.options.templates.title.call(this), {
        classes: this.classes,
        icon
      })
    }

    if (this.options.content !== '') {
      content = templateEngine.render(
        this.options.templates.content.call(this),
        { classes: this.classes }
      )
    }

    if (isNumber(this.options.duration) && this.options.loader) {
      loader = templateEngine.render(this.options.templates.loader.call(this), {
        classes: this.classes
      })
    }

    if (this.options.buttons) {
      buttons = this.createBtns()
    }

    const html = templateEngine.render(this.options.template.call(this), {
      classes: this.classes,
      close,
      icon,
      title,
      content,
      buttons,
      loader
    })
    return html
  }

  createBtns() {
    const buttons = this.options.buttons
    let result = ''

    for (const button in buttons) {
      if (buttons[button].action) {
        result += this.creatBtn(buttons[button].action, buttons[button])
      }
    }

    return templateEngine.render(this.options.templates.buttons.call(this), {
      classes: this.classes,
      buttons: result
    })
  }

  creatBtn(action, button) {
    return templateEngine.render(this.options.templates.button.call(this), {
      classes: this.classes,
      custom: button.classes,
      label: button.label,
      action
    })
  }

  destroy() {
    if (this.is('initialized')) {
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    remove(this.$element)
    super.destroy()
  }

  static reset() {
    const instances = this.getInstances()

    instances.forEach(instance => instance.hide())
    return true
  }

  static open(...args) {
    let options = {}
    let length = args.length

    if (length && isObject(args[length - 1])) {
      options = Object.assign(args[length - 1], options)
      length -= 1
    }

    if (length === 1) {
      options.content = args[0]
    } else if (length === 2) {
      options.title = args[0]
      options.content = args[1]
    }

    return new Toast(options)
  }

  static info(...args) {
    let options = {
      type: 'info'
    }
    let length = args.length

    if (length && isObject(args[length - 1])) {
      options = Object.assign(args[length - 1], options)
      length -= 1
    }

    if (length === 1) {
      options.content = args[0]
    } else if (length === 2) {
      options.title = args[0]
      options.content = args[1]
    }

    return new Toast(options)
  }

  static warning(...args) {
    let options = {
      type: 'warning'
    }
    let length = args.length

    if (length && isObject(args[length - 1])) {
      options = Object.assign(args[length - 1], options)
      length -= 1
    }

    if (length === 1) {
      options.content = args[0]
    } else if (length === 2) {
      options.title = args[0]
      options.content = args[1]
    }

    return new Toast(options)
  }

  static success(...args) {
    let options = {
      type: 'success'
    }
    let length = args.length

    if (length && isObject(args[length - 1])) {
      options = Object.assign(args[length - 1], options)
      length -= 1
    }

    if (length && isObject(args[length - 1])) {
      options = Object.assign(args[length - 1], options)
      length -= 1
    }

    if (length === 1) {
      options.content = args[0]
    } else if (length === 2) {
      options.title = args[0]
      options.content = args[1]
    }

    return new Toast(options)
  }

  static error(...args) {
    let options = {
      type: 'error'
    }
    let length = args.length

    if (length && isObject(args[length - 1])) {
      options = Object.assign(args[length - 1], options)
      length -= 1
    }

    if (length === 1) {
      options.content = args[0]
    } else if (length === 2) {
      options.title = args[0]
      options.content = args[1]
    }

    return new Toast(options)
  }
}

export default Toast
