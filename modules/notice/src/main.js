import templateEngine from '@pluginjs/template'
import { isNumber } from '@pluginjs/is'
import GlobalComponent from '@pluginjs/global-component'
import { reflow } from '@pluginjs/utils'
import { addClass, removeClass } from '@pluginjs/classes'
import { setStyle } from '@pluginjs/styled'
import { bindEvent } from '@pluginjs/events'
import { append, parseHTML, query, remove } from '@pluginjs/dom'
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
@register(NAMESPACE, { defaults: DEFAULTS })
class Notice extends GlobalComponent {
  constructor(options = {}) {
    super(NAMESPACE)
    this.initOptions(DEFAULTS, options)
    this.initClasses(CLASSES)
    this.$element = parseHTML(this.createHtml())

    this.initStates()
    this.initialize()
    this.show()
  }

  show() {
    // Notice.hideAll()
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
    setStyle({ 'text-align': this.options.contentAlignment }, this.$container)

    if (this.options.backgroundImage) {
      const url = `url(${this.options.backgroundImage})`
      setStyle(
        {
          background: url,
          color: this.options.fontColor
        },
        this.$element
      )
      addClass(this.classes.BACKGROUND, this.$element)
    } else {
      setStyle(
        {
          'background-color': this.options.backgroundColor,
          color: this.options.fontColor
        },
        this.$element
      )
    }
    if (this.options.layout === 'bottom') {
      setStyle({ bottom: '0px' }, this.$element)
    } else {
      setStyle({ top: '0px' }, this.$element)
    }
    if (this.options.buttonAlign === 'right') {
      setStyle({ float: this.options.buttonAlign }, this.$position)
    }
    if (this.options.closeBottonColor) {
      setStyle({ color: this.options.closeBottonColor }, this.$closeBtn)
    }
  }

  bind() {
    bindEvent(
      {
        type: this.eventName('click'),
        handler: event => {
          if (!event.target.classList.contains(this.classes.CLOSE)) {
            return
          }

          this.hide()
        }
      },
      this.$element
    )

    if (this.options.buttons) {
      bindEvent(
        {
          type: this.eventName('click'),
          handler: event => {
            if (!event.target.classList.contains(this.classes.BUTTON)) {
              return
            }
            const key = event.target.dataset.btntype
            if (this.options.buttons[key].fn) {
              this.options.buttons[key].fn()
            }
            this.hide()
          }
        },
        this.$buttons
      )
    }

    if (isNumber(this.options.timeout)) {
      let settime = setTimeout(() => {
        this.hide()
      }, this.options.timeout)

      bindEvent(
        {
          type: this.eventName('mouseenter'),
          handler: () => {
            clearInterval(settime)
          }
        },
        this.$element
      )
      bindEvent(
        {
          type: this.eventName('mouseleave'),
          handler: () => {
            settime = setTimeout(() => {
              this.hide()
            }, this.options.timeout)
          }
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
    bindEvent(
      {
        type: 'animationend',
        handler: () => {
          this.destroy()
        }
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

    this.setContent(this.options.content)

    if (this.options.fixedWidth) {
      addClass(`${this.classes.NAMESPACE}-fixed`, this.$element)
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
