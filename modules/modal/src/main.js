import templateEngine from '@pluginjs/template'
import { deepMerge, compose } from '@pluginjs/utils'
import is from '@pluginjs/is'
import { addClass, removeClass } from '@pluginjs/classes'
import { setStyle } from '@pluginjs/styled'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { append, parseHTML, query } from '@pluginjs/dom'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  translateable
} from '@pluginjs/pluginjs'
import GlobalComponent from '@pluginjs/global-plugin'
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
@register(NAMESPACE, { defaults: DEFAULTS }, INFO)
class Modal extends GlobalComponent {
  constructor(options = {}) {
    super(NAMESPACE)
    // this.options = deepMerge(window.Pj.modal.defaults, options);
    this.options = deepMerge(DEFAULTS, options)
    this.initClasses(CLASSES)
    this.$element = parseHTML(this.createHtml())
    this.$container = query(`.${this.classes.CONTAINER}`, this.$element)
    this.autoDestroy = this.options.autoDestroy

    this.initStates()
    this.setupI18n()

    this.initialize()
    this.bind()
  }

  validate() {
    if (this.options.buttons) {
      const buttons = this.options.buttons
      for (const id in this.options.buttons) {
        if (this.options.buttons.hasOwnProperty(id)) {
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
        {
          type: this.eventName('click'),
          handler: () => {
            this.close()
          }
        },
        this.$closeBtn
      )
    }
    // band buttons
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

            if (this.options.buttons[key].close === false) {
              return
            }
            this.close()
          }
        },
        this.$buttons
      )
    }

    // bind overlay
    if (this.options.overlayClosesOnClick && this.options.overlay) {
      bindEvent(
        {
          type: this.eventName('click'),
          handler: () => {
            this.close()
          }
        },
        this.$overlay
      )
    }
  }

  _getIndex() {
    const instances = window.Pj.instances[NAMESPACE]
    for (let i = 0; i < instances.length; i++) {
      if (instances[i].instanceId === this.instanceId) {
        return i
      }
    }
    return false
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
        compose(removeEvent('animationend'), setStyle({ display: 'none' }))(
          this.$element
        )
        this.enter('hide')
        this.removeOverflow()
      } else {
        this.destroy()
        this.removeOverflow()
      }
    }

    // const animationendCallback = () => do {
    //   if (!this.options.autoDestroy) {
    //     this.$element
    //       |> removeEvent('animationend', animationendCallback)
    //       |> setStyle({ display: 'none' })
    //     this.enter('hide')
    //     this.removeOverflow()
    //   } else {
    //     this.destroy()
    //     this.removeOverflow()
    //   }
    // }

    bindEvent(
      { type: 'animationend', handler: animationendCallback },
      this.$element
    )
    // trigger close
    this.trigger(EVENTS.CLOSE)
    this.leave('opened')
    return false
  }

  removeOverflow() {
    let removeOverflow = true
    const length = window.Pj.instances[NAMESPACE].length
    if (length === 0) {
      removeOverflow = true
    } else {
      let hideModel = 0
      window.Pj.instances[NAMESPACE].forEach(instance => {
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

    if (this.options.buttons) {
      this.setButtons(this.options.buttons)
      this.setBtnLocation(this.options.buttonAlignment)
    }

    this.setContent(this.options.content)
    this.setContentloction(this.options.contentAlignment)
    // trigger ready
    this.firstAppend = true
    this.enter('initialized')
  }

  setTitleloction(location) {
    const loc = ['left', 'center']
    if (!loc.includes(location)) {
      setStyle({ 'text-align': 'left' }, this.$title)
    } else {
      setStyle({ 'text-align': location }, this.$title)
    }
  }

  setContentloction(location) {
    const loc = ['left', 'center', 'right']
    if (!loc.includes(location)) {
      setStyle({ 'text-align': 'left' }, this.$content)
    } else {
      setStyle({ 'text-align': location }, this.$content)
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
      if (this.options.titleAlignment === 'center') {
        setStyle(
          {
            display: 'block',
            'font-size': '30px',
            'padding-top': '10px',
            'padding-bottom': '5px'
          },
          this.$icon
        )
      } else {
        setStyle(
          {
            'padding-right': '20px',
            'font-size': '30px',
            bottom: '-5px',
            position: 'relative'
          },
          this.$icon
        )
      }
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
      if (buttons.hasOwnProperty(key)) {
        const btn = this._creatBtn(buttons, key, length)
        append(btn, this.$buttons)
      }
    }
  }

  destroy() {
    if (this.is('initialized')) {
      this.leave('initialized')
      this.$element.parentNode.removeChild(this.$element)
    }

    this.trigger(EVENTS.DESTROY)
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
    const instance = window.Pj.instances[NAMESPACE].filter(
      instance => instance.instanceId === id
    )
    instance[0].close()
  }

  static confirm(...args) {
    // const opt = deepMerge(window.Pj.modal.defaults, {
    const opt = deepMerge(DEFAULTS, {
      title: '',
      content: '',
      contentAlignment: 'center',
      close: true,
      buttonAlignment: 'right',
      buttons: {
        cancel: {
          title: 'Cancel',
          class: 'pj-btn pj-btn-danger',
          fn: ''
        },
        active: {
          title: 'Yes',
          class: 'pj-btn pj-btn-success',
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
      } else if (is.object(args[i]) && !is.function(args[i])) {
        opt.buttons.active.title = args[i].buttons.active.title
        opt.buttons.active.class = args[i].buttons.active.class
        opt.buttons.cancel.title = args[i].buttons.cancel.title
        opt.buttons.cancel.class = args[i].buttons.cancel.class
      } else if (is.function(args[i])) {
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
    const length = window.Pj.instances[NAMESPACE].length
    if (!length) {
      return false
    }
    window.Pj.instances[NAMESPACE][length - 1].close()
    return true
  }

  static closeAll() {
    const length = window.Pj.instances[NAMESPACE].length
    if (!length) {
      return false
    }
    for (let i = 0; i < length; i++) {
      window.Pj.instances[NAMESPACE][0].close()
    }
    return true
  }

  static getAll() {
    return window.Pj.instances[NAMESPACE]
  }

  static getById(id) {
    return window.Pj.instances[NAMESPACE].filter(
      instance => instance.instanceId === id
    )
  }
}

export default Modal
