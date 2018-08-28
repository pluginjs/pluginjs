import templateEngine from '@pluginjs/template'
import { isNumber } from '@pluginjs/is'
import { reflow } from '@pluginjs/utils'
import { addClass, removeClass } from '@pluginjs/classes'
import { setStyle } from '@pluginjs/styled'
import { bindEvent, bindEventOnce } from '@pluginjs/events'
import {
  append,
  parseHTML,
  queryAll,
  query,
  insertAfter,
  remove,
  data
} from '@pluginjs/dom'
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
import Anime from 'animejs'

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
    this.initOptions(DEFAULTS, options)
    this.initClasses()
    this.$element = parseHTML(this.createHtml())

    this.initStates()
    this.initialize()
    this.show()
  }

  show() {
    this.addToDom()
    append(this.$element, this.$wrap)
    if (this.options.stack && isNumber(this.options.stack)) {
      const instances = queryAll(`.${this.classes.NAMESPACE}`, this.$wrap)
      const _prevToastCount = instances.length
      const _extToastCount = _prevToastCount - this.options.stack
      if (_extToastCount > 0) {
        instances.slice(0, _extToastCount).forEach(instance => {
          remove(instance)
        })
      }
    }
    // toast bg
    if (this.options.bgColor) {
      setStyle('background', this.options.bgColor, this.$element)
    }

    this.processLoader()
    this.animate()
    this.bind()
    this.trigger(EVENTS.SHOW)
  }

  processLoader() {
    if (!this.$loader || !isNumber(this.options.duration)) {
      return
    }

    if (this.options.loaderBgColor) {
      setStyle('background-color', this.options.loaderBgColor, this.$loader)
    }

    this.pauseTime = 0

    reflow(this.$loaderInner)

    this.startLoader()
  }

  startLoader() {
    this.startTime = new Date().getTime()
    const time = this.options.duration - this.pauseTime
    const target = this.$loaderInner
    this.$anime = Anime({
      targets: target,
      width: '100%',
      duration: time,
      easing: 'linear'
    })

    this.setTimeOut = setTimeout(() => {
      this.hide()
    }, time)
  }

  pauseLoader() {
    const t = new Date().getTime()
    this.pauseTime += t - this.startTime

    clearInterval(this.setTimeOut)
    this.$anime.pause()
  }

  playLoader() {
    this.startTime = new Date().getTime()
    const time = this.options.duration - this.pauseTime
    this.$anime.play()
    this.setTimeOut = setTimeout(() => {
      this.hide()
    }, time)
  }

  animate() {
    addClass(`${this.classes.NAMESPACE}-iconIn`, this.$icon)

    if (this.$content) {
      addClass(`${this.classes.NAMESPACE}-contentIn`, this.$content)
    }

    if (this.$buttons) {
      addClass(`${this.classes.NAMESPACE}-contentIn`, this.$buttons)
    }

    if (this.$title) {
      addClass(`${this.classes.NAMESPACE}-contentIn`, this.$title)
    }

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
    this.options.effect = effect

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
    if (this.$icon) {
      remove(this.$icon)
    }

    if (this.$content) {
      removeClass(`${this.classes.NAMESPACE}-contentIn`, this.$content)
      addClass(`${this.classes.NAMESPACE}-contentOut`, this.$content)
    }

    if (this.$title) {
      removeClass(`${this.classes.NAMESPACE}-contentIn`, this.$title)
      addClass(`${this.classes.NAMESPACE}-contentOut`, this.$title)
    }

    removeClass(
      `${this.classes.NAMESPACE}-${this.options.effect}`,
      this.$element
    )
    addClass(`${this.classes.NAMESPACE}-Out`, this.$element)

    if (this.$buttons) {
      removeClass(`${this.classes.NAMESPACE}-contentIn`, this.$buttons)
      addClass(`${this.classes.NAMESPACE}-contentOut`, this.$buttons)
    }

    bindEventOnce(
      this.eventName('animationend'),
      () => {
        remove(this.$element)
        this.destroy()
      },
      this.$element
    )
  }

  bind() {
    if (this.$close) {
      bindEvent(
        this.eventName('click'),
        () => {
          this.hide()
        },
        this.$close
      )
    }

    if (isNumber(this.options.duration) && this.$loader) {
      bindEvent(
        this.eventName('mouseenter'),
        () => {
          this.pauseLoader()
        },
        this.$element
      )
      bindEvent(
        this.eventName('mouseleave'),
        () => {
          this.playLoader()
          // this.startLoader()
        },
        this.$element
      )
    }

    // band buttons
    if (this.options.buttons) {
      bindEvent(
        this.eventName('click'),
        event => {
          if (!event.target.classList.contains(this.classes.BUTTON)) {
            return
          }

          const key = data('btntype', event.target)
          if (this.options.buttons[key].fn) {
            this.options.buttons[key].fn()
          }
          this.hide()
        },
        this.$buttons
      )
    }
  }

  addToDom() {
    let positionClass = ''
    if (POSITIONS.includes(this.options.position)) {
      positionClass = this.getClass(
        this.classes.POSITION,
        'position',
        this.options.position
      )
    }

    this.$wrap = query(`.${this.classes.WRAP}.${positionClass}`)
    if (!this.$wrap) {
      const wrap = templateEngine.render(
        this.options.templates.wrap.call(this),
        { classes: this.classes }
      )
      this.$wrap = parseHTML(wrap)
      append(this.$wrap, window.document.body)
      this.position()
    } else if (!this.options.stack) {
      this.$wrap.innerHTML = ''
    }
  }

  getIconClass() {
    if (this.options.iconClass) {
      return this.options.iconClass
    }
    this.options.icon = this.options.icon || 'success'
    return this.options.icons[this.options.icon][0]
  }

  createHtml() {
    let close = ''
    let title = ''
    let content = ''
    let buttons = ''
    let loader = ''
    let icon = ''

    if (this.options.icon) {
      icon = templateEngine.render(this.options.templates.icon.call(this), {
        classes: this.classes,
        iconClass: this.getIconClass()
      })
    }

    if (this.options.allowClose) {
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
      buttons = templateEngine.render(
        this.options.templates.buttons.call(this),
        {
          classes: this.classes,
          button: this.createBtn()
        }
      )
    }

    const html = templateEngine.render(this.options.template.call(this), {
      classes: this.classes,
      close,
      title,
      content,
      buttons,
      // icon,
      loader
    })
    return html
  }

  _creatBtn(buttons, key) {
    let btn = ''
    const btnClass = buttons[key].class
    const title = buttons[key].title
    btn = templateEngine.render(this.options.templates.button.call(this), {
      classes: this.classes,
      btnClass,
      title,
      key
    })
    return btn
  }

  createBtn() {
    const buttons = this.options.buttons
    let result = ''
    for (const key in buttons) {
      if (Object.prototype.hasOwnProperty.call(buttons, key)) {
        const btn = this._creatBtn(buttons, key)
        result += btn
      }
    }
    return result
  }

  initialize() {
    this.$icon = query(`.${this.classes.ICON}`, this.$element)
    this.$content = query(`.${this.classes.CONTENT}`, this.$element)
    this.$title = query(`.${this.classes.TITLE}`, this.$element)
    this.$buttons = query(`.${this.classes.BUTTONS}`, this.$element)
    this.$loader = query(`.${this.classes.LOADER}`, this.$element)
    this.$loaderInner = query(`.${this.classes.LOADERINNER}`, this.$element)
    this.$close = query(`.${this.classes.CLOSE}`, this.$element)

    if (this.options.content) {
      this.setContent(this.options.content)
    }
    this.setTitle(this.options.title)
    // set icon
    if (this.options.iconClass === '' && this.options.icon !== '') {
      setStyle('color', this.options.icons[this.options.icon][1], this.$icon)
      if (this.options.iconColor !== '') {
        setStyle('color', this.options.iconColor, this.$icon)
      }
    } else if (this.$icon) {
      setStyle('color', this.options.iconColor, this.$icon)
    }

    // set X btn
    if (this.options.closeBtnColor) {
      setStyle('color', this.options.closeBtnColor, this.$close)
    }

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  setContent(content) {
    if (this.options.html) {
      this.$content.innerHTML = content
    } else {
      this.$content.textContent = content
    }

    if (this.options.contentColor) {
      setStyle('color', this.options.contentColor, this.$content)
    }
  }

  setTitle(title) {
    const icon = query('i', this.$title)
    if (icon) {
      insertAfter(title, icon)
      addClass('pj-toast-title-icon', this.$title)
    } else {
      this.$title.textContent = title
    }

    if (this.options.titleColor) {
      setStyle('color', this.options.titleColor, this.$title)
    }
  }

  destroy() {
    if (this.is('initialized')) {
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)

    super.destroy()
  }

  static open(options = {}) {
    const instance = new Toast(options)
    return instance
  }

  static reset() {
    const instances = this.getInstances()
    instances.forEach(instance => instance.hide())
    return true
  }

  static warning(...args) {
    const options = { icon: 'warning' }
    const length = args.length
    if (length === 1) {
      options.content = args[0]
    } else if (length === 2) {
      options.title = args[0]
      options.content = args[1]
    }

    const instance = new Toast(options)
    return instance
  }

  static success(...args) {
    const options = { icon: 'success' }
    const length = args.length
    if (length === 1) {
      options.content = args[0]
    } else if (length === 2) {
      options.title = args[0]
      options.content = args[1]
    }

    const instance = new Toast(options)
    return instance
  }

  static error(...args) {
    const options = { icon: 'danger' }
    const length = args.length
    if (length === 1) {
      options.content = args[0]
    } else if (length === 2) {
      options.title = args[0]
      options.content = args[1]
    }

    const instance = new Toast(options)
    return instance
  }
}

export default Toast
