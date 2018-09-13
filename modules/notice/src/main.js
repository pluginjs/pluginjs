import templateEngine from '@pluginjs/template'
import { isNumber, isString } from '@pluginjs/is'
import GlobalComponent from '@pluginjs/global-component'
import { reflow } from '@pluginjs/utils'
import { addClass, removeClass } from '@pluginjs/classes'
import { setStyle } from '@pluginjs/styled'
import { bindEvent, bindEventOnce } from '@pluginjs/events'
import { append, parseHTML, query, remove, data } from '@pluginjs/dom'
import Breakpoints from '@pluginjs/breakpoints'
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

@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, false)
@register(NAMESPACE)
class Notice extends GlobalComponent {
  constructor(options = {}) {
    super()
    this.setupOptions(options)
    this.setupClasses()
    this.$element = parseHTML(this.createHtml())

    this.setupStates()
    this.initialize()
    this.show()
  }

  show() {
    this.setStyles()
    this.bind()
    this.animate()
    append(this.$element, window.document.body)
    this.trigger(EVENTS.SHOW)
  }

  animate() {
    reflow(this.$element)
    if (this.options.layout === 'top') {
      addClass(`${this.classes.NAMESPACE}-Intop`, this.$element)
    } else {
      addClass(`${this.classes.NAMESPACE}-Inbottom`, this.$element)
    }
  }

  setStyles() {
    if (this.options.backgroundImage) {
      const url = `url(${this.options.backgroundImage})`
      setStyle(
        {
          background: url,
          color: this.options.fontColor
        },
        this.$element
      )
    } else {
      setStyle(
        {
          'background-color': this.options.backgroundColor,
          color: this.options.fontColor
        },
        this.$element
      )
    }
    if (this.options.layout) {
      addClass(
        this.getClass(this.classes.LOCATION, 'location', this.options.layout),
        this.$element
      )
    }
    if (this.options.buttonAlign) {
      addClass(
        this.getClass(
          this.classes.BUTTONSLOCATION,
          'location',
          this.options.buttonAlign
        ),
        this.$position
      )
    }
    if (this.options.closeBottonColor) {
      setStyle('color', this.options.closeBottonColor, this.$closeBtn)
    }
  }

  bind() {
    if (this.options.allowClose) {
      bindEvent(
        this.eventName('click'),
        () => {
          this.hide()
        },
        this.$closeBtn
      )
    }

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

    if (isNumber(this.options.timeout)) {
      let settime = setTimeout(() => {
        this.hide()
      }, this.options.timeout)

      bindEvent(
        this.eventName('mouseenter'),
        () => {
          clearInterval(settime)
        },
        this.$element
      )
      bindEvent(
        this.eventName('mouseleave'),
        () => {
          settime = setTimeout(() => {
            if (this.is('initialized')) {
              this.hide()
            }
          }, this.options.timeout)
        },
        this.$element
      )
    }
  }

  hide() {
    this.trigger(EVENTS.HIDE)
    if (this.options.layout === 'top') {
      removeClass(`${this.classes.NAMESPACE}-Intop`, this.$element)
      addClass(`${this.classes.NAMESPACE}-Outtop`, this.$element)
    } else {
      removeClass(`${this.classes.NAMESPACE}-Inbottom`, this.$element)
      addClass(`${this.classes.NAMESPACE}-Outbottom`, this.$element)
    }
    bindEventOnce(
      this.eventName('animationend'),
      () => {
        this.destroy()
      },
      this.$element
    )
  }

  initialize() {
    this.$content = query(`.${this.classes.CONTENT}`, this.$element)
    this.$buttons = query(`.${this.classes.BUTTONS}`, this.$element)
    this.$container = query(`.${this.classes.CONTAINER}`, this.$element)
    this.$position = query(`.${this.classes.POSITION}`, this.$element)
    this.$closeBtn = query(`.${this.classes.CLOSE}`, this.$element)

    if (this.options.content !== '') {
      this.setContent(this.options.content)
      this.setContentloction(this.options.contentAlignment)
    }

    if (this.options.fixedWidth) {
      addClass(`${this.classes.NAMESPACE}-fixed`, this.$element)
    }

    if (this.options.backgroundColor || this.options.backgroundImage) {
      addClass(this.classes.BACKGROUND, this.$element)
    }

    if (this.options.breakpoint) {
      this.initBreakpoints()
    }

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  initBreakpoints() {
    if (isString(this.options.breakpoint)) {
      Breakpoints.init()
      const breakpoint = this.options.breakpoint
      const that = this
      if (Breakpoints.is(`${breakpoint}-`)) {
        addClass(this.classes.RESPONSIVE, this.$element)
      }
      Breakpoints.to(breakpoint, {
        enter() {
          addClass(that.classes.RESPONSIVE, that.$element)
        },
        leave() {
          removeClass(that.classes.RESPONSIVE, that.$element)
        }
      })
    }
  }

  setContent(content) {
    if (this.options.html) {
      this.$content.innerHTML = content
    } else {
      this.$content.textContent = content
    }
  }

  setContentloction(contentLocation) {
    if (contentLocation) {
      addClass(
        this.getClass(
          this.classes.CONTENTLOCATION,
          'location',
          this.options.contentAlignment
        ),
        this.$element
      )
    }
  }

  destroy() {
    if (this.is('initialized')) {
      this.leave('initialized')
    }
    this.trigger(EVENTS.DESTROY)
    remove(this.$element)

    super.destroy()
  }

  createHtml() {
    let close = ''
    let content = ''
    let buttons = ''

    if (this.options.allowClose) {
      close = templateEngine.render(this.options.templates.close.call(this), {
        classes: this.classes
      })
    }

    if (this.options.content !== '') {
      content = templateEngine.render(
        this.options.templates.content.call(this),
        { classes: this.classes }
      )
    }

    if (this.options.buttons) {
      buttons = templateEngine.render(
        this.options.templates.buttons.call(this),
        {
          classes: this.classes,
          buttons: this.createBtns()
        }
      )
    }

    const html = templateEngine.render(this.options.template.call(this), {
      classes: this.classes,
      close,
      content,
      buttons
    })
    return html
  }

  creatBtn(button, key) {
    return templateEngine.render(this.options.templates.button.call(this), {
      classes: this.classes,
      btnClass: button.class,
      title: button.title,
      key
    })
  }

  createBtns() {
    const buttons = this.options.buttons
    let result = ''
    for (const key in buttons) {
      if (Object.prototype.hasOwnProperty.call(buttons, key)) {
        const btn = this.creatBtn(buttons[key], key)
        result += btn
      }
    }
    return result
  }

  static show(options = {}) {
    const instance = new Notice(options)
    return instance
  }

  static hideAll() {
    const instances = this.getInstances()

    instances.forEach(instance => instance.hide())
    return true
  }
}

export default Notice
