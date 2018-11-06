import templateEngine from '@pluginjs/template'
import { deepMerge } from '@pluginjs/utils'
import { isObject, isFunction, isString } from '@pluginjs/is'
import { addClass, removeClass } from '@pluginjs/classes'
import { bindEvent, bindEventOnce } from '@pluginjs/events'
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
@register(NAMESPACE)
class Modal extends GlobalComponent {
  constructor(options = {}) {
    super()

    this.setupOptions(options)
    this.setupClasses()
    this.$element = parseHTML(this.createHtml())
    this.$container = query(`.${this.classes.CONTAINER}`, this.$element)

    this.setupStates()
    this.setupI18n()
    this.initialize()
    this.bind()
  }

  validate() {
    if (this.options.buttons) {
      this.options.buttons.forEach(button => {
        if (!button.classes) {
          button.classes = this.options.defaultButtonClass
        }
        if (!button.label) {
          button.label = 'Yes'
        }
      })
    }

    return true
  }

  open() {
    if (this.is('opened')) {
      return false
    }

    addClass(`${this.classes.OPEN}`, query('body'))

    append(this.$element, query(this.options.appendTo))

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
    if (this.options.closeable) {
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
                button.fn(this.close.bind(this))
              } else {
                this.close()
              }
            }
          }

          return false
        },
        this.$buttons
      )
    }

    // bind overlay
    if (this.options.overlayCloseOnClick && this.options.overlay) {
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
    removeClass(`${this.classes.OPEN}`, query('body'))

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
      this.removeOverflow()
      this.destroy()
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
    this.validate()

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
    }

    if (this.options.content !== '') {
      this.setContent(this.options.content)
    }

    if (this.options.buttons) {
      this.setButtons(this.options.buttons)
    }

    // trigger ready
    this.trigger(EVENTS.READY)
    this.enter('initialized')
  }

  createHtml() {
    let close = ''
    let buttons = ''
    let overlay = ''
    let title = ''
    let content = ''
    let icon = ''

    if (this.options.closeable) {
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

    if (this.options.icon) {
      icon = templateEngine.render(this.options.templates.icon.call(this), {
        classes: this.classes,
        iconClass: this.getIconClass()
      })
      this.$icon = parseHTML(icon)
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
    if (this.options.icons[this.options.icon]) {
      return this.options.icons[this.options.icon]
    }

    if (isString(this.options.icon)) {
      return this.options.icon
    }

    return this.options.icons.success
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

  setButtons(buttons) {
    this.$buttons.innerHTML = ''
    for (const button in buttons) {
      if (buttons[button].action) {
        const btn = this.createBtn(buttons[button])
        append(btn, this.$buttons)
      }
    }
  }

  createBtn(button) {
    const classes = button.classes
    const action = button.action

    let label = ''
    const local = ['Yes', 'Cancel']
    if (local.includes(button.label)) {
      label = this.translate(button.label)
    } else {
      label = button.label
    }

    const btn = templateEngine.render(
      this.options.templates.button.call(this),
      {
        classes: this.classes,
        custom: classes,
        label,
        action
      }
    )

    return parseHTML(btn)
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
    const o = deepMerge(options)
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
    if (!isString(args[0])) {
      return false
    }

    let opt = deepMerge(DEFAULTS, {
      title: '',
      content: '',
      closeable: true,
      buttons: [
        {
          action: 'cancel',
          label: 'Cancel',
          classes: 'pj-btn pj-btn-outline',
          fn: ''
        },
        {
          action: 'yes',
          label: 'Yes',
          classes: 'pj-btn pj-btn-primary',
          fn: ''
        }
      ]
    })

    const str = []
    const func = []
    let length = args.length

    if (length && isObject(args[length - 1])) {
      if (args[length - 1].buttons) {
        args[length - 1].buttons.forEach(button => {
          opt.buttons.forEach(btn => {
            if (button.action === btn.action) {
              btn.label = button.label
              btn.classes = button.classes
            }
          })
        })

        delete args[length - 1].buttons
      }

      opt = deepMerge(opt, args[length - 1])
      length -= 1
    }

    for (let i = 0; i < length; i++) {
      if (typeof args[i] === 'string') {
        str.push(args[i])
      } else if (isFunction(args[i])) {
        func.push(args[i])
      }
    }

    if (str.length === 1) {
      opt.content = str[0]
    } else if (str.length > 1) {
      opt.title = str[0]
      opt.content = str[1]
    }

    if (func.length === 1) {
      opt.buttons.forEach(button => {
        if (button.action === 'yes') {
          button.fn = func[0]
        }
      })
    } else if (func.length > 1) {
      opt.buttons.forEach(button => {
        if (button.action === 'yes') {
          button.fn = func[0]
        }

        if (button.action === 'cancel') {
          button.fn = func[1]
        }
      })
    }

    const instance = new Modal(opt)
    instance.open()
    return instance
  }

  static alert(...args) {
    if (!isString(args[0])) {
      return false
    }

    let opt = deepMerge(DEFAULTS, {
      title: '',
      content: '',
      closeable: true
    })

    let length = args.length

    if (length && isObject(args[length - 1])) {
      opt = deepMerge(opt, args[length - 1])
      length -= 1
    }

    if (length === 1) {
      opt.content = args[0]
    } else if (length === 2) {
      opt.title = args[0]
      opt.content = args[1]
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
