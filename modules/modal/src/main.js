import templateEngine from '@pluginjs/template'
import { deepMerge, compose } from '@pluginjs/utils'
import { isObject, isFunction } from '@pluginjs/is'
import { addClass, removeClass } from '@pluginjs/classes'
import { bindEvent, bindEventOnce, removeEvent } from '@pluginjs/events'
import { append, parseHTML, query, data, remove } from '@pluginjs/dom'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  translateable,
  optionable
} from '@pluginjs/decorator'
import GlobalComponent from '@pluginjs/global-component'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  events as EVENTS,
  namespace as NAMESPACE,
  translations as TRANSLATIONS
} from './constant'

@translateable(TRANSLATIONS)
@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, false)
@register(NAMESPACE, {
  defaults: DEFAULTS
})
class Modal extends GlobalComponent {
  constructor(options = {}) {
    super(NAMESPACE)

    this.initOptions(DEFAULTS, options)
    this.initClasses(CLASSES)
    this.$element = parseHTML(this.createHtml())
    this.$container = query(`.${this.classes.CONTAINER}`, this.$element)

    this.initStates()
    this.setupI18n()

    this.initialize()
    this.bind()
  }

  validate() {
    if (this.options.buttons) {
      const buttons = this.options.buttons
      for (const id in this.options.buttons) {
        if (Object.prototype.hasOwnProperty.call(this.options.buttons, id)) {
          if (!buttons[id].class) {
            buttons[id].class = this.options.defaultButtonClass
          }
          if (!buttons[id].title) {
            buttons[id].title = 'OK'
          }
          if (buttons[id].close === false) {
            buttons[id].close = true
          }
        }
      }
    }

    return true
  }

  open() {
    if (this.is('opened')) {
      return false
    }

    addClass(`${this.classes.OPEN}`, query('body'))

    if (this.options.autoDestroy === true) {
      append(this.$element, query(this.options.appendTo))
    } else {
      if (this.firstAppend) {
        append(this.$element, query(this.options.appendTo))
        this.firstAppend = false
      }
      this.$element.style.display = ''
    }

    if (this.options.overlay) {
      addClass(`${this.classes.NAMESPACE}-fadeIn`, this.$overlay)
      removeClass(`${this.classes.NAMESPACE}-fadeOut`, this.$overlay)
    }

    removeClass(
      `${this.classes.NAMESPACE}-${this.options.effect}Out`,
      this.$container
    )
    addClass(
      `${this.classes.NAMESPACE}-${this.options.effect}In`,
      this.$container
    )
    // trigger open
    this.trigger(EVENTS.OPEN)
    this.enter('opened')
    this.leave('hide')
    return false
  }

  bind() {
    if (this.options.close) {
      bindEvent(
        this.eventName('click'),
        () => {
          this.close()
        },
        this.$closeBtn
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

          if (this.options.buttons[key].close === false) {
            return
          }
          this.close()
        },
        this.$buttons
      )
    }

    // bind overlay
    if (this.options.overlayClosesOnClick && this.options.overlay) {
      bindEvent(
        this.eventName('click'),
        () => {
          this.close()
        },
        this.$overlay
      )
    }
  }

  close() {
    if (!this.is('opened')) {
      return false
    }
    // close animation
    if (this.options.overlay) {
      addClass(`${this.classes.NAMESPACE}-fadeOut`, this.$overlay)
      removeClass(`${this.classes.NAMESPACE}-fadeIn`, this.$overlay)
    }

    addClass(
      `${this.classes.NAMESPACE}-${this.options.effect}Out`,
      this.$container
    )
    removeClass(
      `${this.classes.NAMESPACE}-${this.options.effect}In`,
      this.$container
    )

    const animationendCallback = () => {
      if (!this.options.autoDestroy) {
        compose(
          removeEvent(this.eventName('animationend'), this.$element),
          addClass('pj-modal-destory')
        )(this.$element)
        this.enter('show')
        this.removeOverflow()
      } else {
        this.removeOverflow()
        this.destroy()
      }
    }

    bindEventOnce(
      this.eventName('animationend'),
      animationendCallback,
      this.$element
    )

    // trigger close
    this.trigger(EVENTS.CLOSE)
    this.leave('opened')
    return false
  }

  removeOverflow() {
    let removeOverflow = true
    const instances = this.constructor.getInstances()
    const length = instances.length
    if (length === 0) {
      removeOverflow = true
    } else {
      let hideModel = 0
      instances.forEach(instance => {
        if (instance.is('hide')) {
          hideModel++
        }
      })
      if (hideModel !== length) {
        removeOverflow = false
      }
    }
    // removeClass
    if (removeOverflow) {
      removeClass(this.classes.OPEN, window.document.body)
    }
  }

  visible() {
    if (this.is('opened')) {
      return true
    }
    return false
  }

  initialize() {
    // Validate data
    if (this.validate() === false) {
      return
    }
    this.$content = query(`.${this.classes.CONTENT}`, this.$element)
    this.$title = query(`.${this.classes.TITLE}`, this.$element)
    this.$closeBtn = query(`.${this.classes.CLOSE}`, this.$element)
    this.$buttons = query(`.${this.classes.BUTTONS}`, this.$element)

    if (this.options.overlay) {
      this.$overlay = query(`.${this.classes.OVERLAY}`, this.$element)
    }
    // theme
    if (this.options.theme) {
      addClass(this.getThemeClass(), this.$container)
    }
    // set
    if (this.options.title !== '') {
      this.setTitle(this.options.title)
      this.setTitleloction(this.options.titleAlignment)
    }

    if (this.options.content !== '') {
      this.setContent(this.options.content)
      this.setContentloction(this.options.contentAlignment)
    }

    if (this.options.buttons) {
      this.setButtons(this.options.buttons)
      this.setBtnLocation(this.options.buttonAlignment)
    }

    // trigger ready
    this.firstAppend = true
    this.trigger(EVENTS.READY)
    this.enter('initialized')
  }

  setTitleloction(location) {
    if (location) {
      addClass(
        this.getClass(
          this.classes.TITLELOCATION,
          'location',
          this.options.titleAlignment
        ),
        this.$title
      )
    }
  }

  setContentloction(contentLocation) {
    if (contentLocation) {
      addClass(
        this.getClass(
          this.classes.CONTENTLOCATION,
          'contentLocation',
          this.options.contentAlignment
        ),
        this.$content
      )
    }
  }

  setBtnLocation(btnLocation) {
    if (btnLocation === 'right') {
      this.$buttons.style['justify-content'] = 'flex-end'
    } else if (btnLocation === 'left') {
      this.$buttons.style['justify-content'] = 'flex-start'
    } else if (btnLocation === 'center') {
      this.$buttons.style['justify-content'] = 'center'
    } else {
      this.$buttons.style['justify-content'] = 'flex-end'
    }
  }

  createHtml() {
    let close = ''
    let buttons = ''
    let overlay = ''
    let title = ''
    let content = ''
    let icon = ''

    if (this.options.close) {
      close = templateEngine.render(this.options.templates.close.call(this), {
        classes: this.classes
      })
    }

    if (this.options.overlay) {
      overlay = templateEngine.render(
        this.options.templates.overlay.call(this),
        { classes: this.classes }
      )
    }

    if (this.options.title !== '') {
      title = templateEngine.render(this.options.templates.title.call(this), {
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
        { classes: this.classes }
      )
    }

    if (this.options.icon || this.options.iconClass) {
      icon = templateEngine.render(this.options.templates.icon.call(this), {
        classes: this.classes,
        iconClass: this.getIconClass()
      })
      this.$icon = parseHTML(icon)
      const color = this.getIconColor()
      this.$icon.style.color = color
    }
    const html = templateEngine.render(this.options.template.call(this), {
      classes: this.classes,
      overlay,
      close,
      title,
      content,
      buttons
    })
    return html
  }
  getIconClass() {
    if (this.options.iconClass) {
      return this.options.iconColor
    }
    this.options.icon = this.options.icon || 'success'
    return this.options.icons[this.options.icon][0]
  }

  getIconColor() {
    if (this.options.iconClass) {
      return this.options.iconClass
    }
    return this.options.icons[this.options.icon][1]
  }

  setTitle(title) {
    this.$title.innerHTML = ''
    if (this.options.icon) {
      append(this.$icon, this.$title)
      addClass(this.getClass(this.classes.ICONTITLE), this.$title)
    }

    append(title, this.$title)
  }

  setContent(content) {
    if (this.options.html) {
      this.$content.innerHTML = content
    } else {
      this.$content.textContent = content
    }
  }

  _creatBtn(buttons, key, length) {
    let btn = ''
    let title = ''
    const btnClass = buttons[key].class
    const local = ['Yes', 'Cancel']
    if (local.includes(buttons[key].title)) {
      title = this.translate(buttons[key].title)
    } else {
      title = buttons[key].title
    }
    if (this.options.theme && length < 3) {
      btn = templateEngine.render(this.options.templates.button.call(this), {
        classes: this.classes,
        btnClass,
        title,
        key
      })
    } else {
      btn = templateEngine.render(this.options.templates.button.call(this), {
        classes: this.classes,
        btnClass,
        title,
        key
      })
    }
    return parseHTML(btn)
  }

  setButtons(buttons) {
    const length = Object.keys(buttons).length
    this.$buttons.innerHTML = ''
    for (const key in buttons) {
      if (Object.prototype.hasOwnProperty.call(buttons, key)) {
        const btn = this._creatBtn(buttons, key, length)
        append(btn, this.$buttons)
      }
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

  static open(options = {}) {
    const instance = new Modal(options)
    instance.open()
    return instance
  }

  static init(options = {}) {
    const o = deepMerge(options, { autoDestroy: false })
    const instance = new Modal(o)
    instance.enter('hide')
    return instance
  }

  static close(id) {
    const instances = this.getInstances()
    instances.forEach(instance => {
      if (instance.instanceId === id) {
        instance.close()
      }
    })
  }

  static confirm(...args) {
    // const opt = deepMerge(window.Pj.modal.defaults, {
    const opt = deepMerge(DEFAULTS, {
      title: '',
      content: '',
      contentAlignment: '',
      close: true,
      buttonAlignment: 'right',
      buttons: {
        cancel: {
          title: 'Cancel',
          class: 'pj-btn pj-btn-outline',
          fn: ''
        },
        active: {
          title: 'Yes',
          class: 'pj-btn pj-btn-primary',
          fn: ''
        }
      }
    })
    const length = args.length
    const str = []
    const func = []
    // get value
    for (let i = 0; i < length; i++) {
      if (typeof args[i] === 'string') {
        str.push(args[i])
      } else if (isObject(args[i]) && !isFunction(args[i])) {
        opt.buttons.active.title = args[i].buttons.active.title
        opt.buttons.active.class = args[i].buttons.active.class
        opt.buttons.cancel.title = args[i].buttons.cancel.title
        opt.buttons.cancel.class = args[i].buttons.cancel.class
      } else if (isFunction(args[i])) {
        func.push(args[i])
      }
    }
    // set title & content
    if (str.length === 1) {
      opt.content = str[0]
    } else if (str.length === 2) {
      opt.title = str[0]
      opt.content = str[1]
    }
    // set buttons fn
    if (func.length === 1) {
      opt.buttons.active.fn = func[0]
    } else if (func.length >= 2) {
      opt.buttons.active.fn = func[0]
      opt.buttons.cancel.fn = func[1]
    }
    const instance = new Modal(opt)
    instance.open()
    return instance
  }

  static alert(...args) {
    // const opt = deepMerge(window.Pj.modal.defaults, {
    const opt = deepMerge(DEFAULTS, {
      title: '',
      content: '',
      contentAlignment: 'left',
      close: true
    })
    const length = args.length
    if (length === 1) {
      opt.content = args[0]
      opt.contentAlignment = 'center'
    } else if (length === 2) {
      opt.title = args[0]
      opt.content = args[1]
    } else {
      return false
    }
    const instance = new Modal(opt)
    instance.open()
    return instance
  }

  static closeTop() {
    const instances = this.getInstances()
    const length = instances.length
    if (!length) {
      return false
    }
    instances[length - 1].close()
    return true
  }

  static closeAll() {
    const instances = this.getInstances()
    instances.forEach(instance => {
      instance.close()
    })
    return true
  }

  static getAll() {
    return this.getInstances()
  }

  static getById(id) {
    const instances = this.getInstances()
    let match = null

    instances.forEach(instance => {
      if (instance.instanceId === id) {
        match = instance
      }
    })

    return match
  }
}

export default Modal
