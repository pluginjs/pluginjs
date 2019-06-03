import Component from '@pluginjs/component'
import { parseHTML, insertAfter, query, has, insertBefore } from '@pluginjs/dom'
import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import { triggerNative } from '@pluginjs/utils'
import { bindEvent, removeEvent } from '@pluginjs/events'
import Trigger from './trigger'
import template from '@pluginjs/template'
import Dropdown from '@pluginjs/dropdown'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  translateable,
  optionable
} from '@pluginjs/decorator'
import Attachment from './attachment'
import Position from './position'
import Repeat from './repeat'
import Size from './size'
import Preview from './preview'
import Image from './image'
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
class BgPicker extends Component {
  constructor(element, options = {}) {
    super(element)

    this.setupOptions(options)
    this.setupClasses()
    this.value = {}
    this.value.repeat = ''
    this.value.position = ''
    this.value.attachment = ''
    this.value.image = ''
    this.value.thumbnail = ''
    addClass(this.classes.INPUT, this.element)
    this.setupI18n()
    this.setupStates()
    this.initialize()
  }

  initialize() {
    this.createHtml()

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.$wrap)
    }

    this.SIZE = new Size(this)
    this.ATTACHMENT = new Attachment(this)
    this.POSITION = new Position(this)
    this.REPEAT = new Repeat(this)
    this.PREVIEW = new Preview(this)
    this.IMAGE = new Image(this)

    this.value = this.element.value

    this.val(this.value, false)

    this.bind()

    if (this.element.disabled || this.options.disabled) {
      this.disable()
    }

    this.initDropdown(this.options.dropdown)
    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  initDropdown(options) {
    this.DROPDOWN = Dropdown.of(this.TRIGGER.$empty, {
      ...options,
      theme: 'dafault',
      reference: this.TRIGGER.$trigger,
      target: this.$dropdown,
      hideOutClick: true,
      hideOnSelect: false,
      templates: this.options.templates,
      onShow: () => {
        if (!this.DROPDOWN.is('builded')) {
          insertBefore(this.POSITION.$wrap, this.$control)
          insertBefore(this.REPEAT.$wrap, this.$control)
          insertBefore(this.ATTACHMENT.$wrap, this.$control)
          insertBefore(this.SIZE.$wrap, this.$control)
          insertBefore(this.IMAGE.$wrap, this.$control)
        }
      }
    })
  }

  bind() {
    bindEvent(
      this.eventName('click'),
      e => {
        if (
          e.target === this.TRIGGER.$trigger ||
          has(e.target, this.TRIGGER.$trigger) ||
          e.target === this.$dropdown ||
          has(e.target, this.$dropdown)
        ) {
          return
        }
        this.val(this.oldValue)
        this.update()
        if (this.is('status')) {
          removeClass(
            this.classes.SHOW,
            addClass(this.classes.EXIST, this.$wrap)
          )
        } else {
          removeClass(this.classes.SHOW, this.$wrap)
        }
        removeClass(this.classes.OPENDISABLE, this.TRIGGER.$trigger)
      },
      window.document
    )

    bindEvent(
      this.eventName('click'),
      () => {
        if (this.is('disabled')) {
          return null
        }
        this.val(this.oldValue)
        this.update()
        if (this.is('status')) {
          removeClass(
            this.classes.SHOW,
            addClass(this.classes.EXIST, this.$wrap)
          )
        } else {
          removeClass(this.classes.SHOW, this.$wrap)
        }
        this.DROPDOWN.hide()
        removeClass(this.classes.OPENDISABLE, this.TRIGGER.$trigger)
        return false
      },
      this.$cancel
    )

    bindEvent(
      this.eventName('click'),
      () => {
        if (this.is('disbaled')) {
          return null
        }
        this.set(this.value)
        this.update()
        if (hasClass(this.classes.SHOW, this.$wrap)) {
          removeClass(
            this.classes.SHOW,
            addClass(this.classes.EXIST, this.$wrap)
          )
        }
        this.DROPDOWN.hide()
        removeClass(this.classes.OPENDISABLE, this.TRIGGER.$trigger)
        removeClass(this.classes.WRITE, this.$wrap)
        return false
      },
      this.$save
    )
  }

  unbind() {
    removeEvent(this.eventName())
  }

  createHtml() {
    this.$wrap = parseHTML(
      template.compile(this.options.template())({
        classes: this.classes,
        placeholder: this.translate('placeholder'),
        cancel: this.translate('cancel'),
        save: this.translate('save')
      })
    )
    insertAfter(this.$wrap, this.element)

    this.TRIGGER = new Trigger(this)

    this.$dropdown = query(`.${this.classes.DROPDOWN}`, this.$wrap)
    this.$control = query(`.${this.classes.CONTROL}`, this.$dropdown)
    this.$cancel = query(`.${this.classes.CANCEL}`, this.$control)
    this.$save = query(`.${this.classes.SAVE}`, this.$control)
  }

  changeImage(url) {
    this.value.image = url.image
    this.value.id = url.id
    this.$imageName.innerHTML = this.value.image
  }

  update() {
    const value = this.val()
    this.element.value = value
  }

  val(value, trigger = true) {
    if (typeof value === 'undefined') {
      return this.options.process.call(this, this.value)
    }
    const valueObj = this.options.parse.call(this, value)
    if (valueObj) {
      this.set(valueObj, true, trigger)
    } else {
      this.clear()
    }

    return null
  }

  set(value, update, trigger = true) {
    this.value = value
    addClass(this.classes.EXIST, this.$wrap)
    // init
    if (!this.value.image) {
      addClass(this.classes.WRITE, this.$wrap)
      removeClass(this.classes.EXIST, this.$wrap)
    }

    if (update !== false) {
      if (typeof value.image !== 'undefined') {
        this.PREVIEW.set(value.image)
      } else {
        this.PREVIEW.clear()
      }
      if (typeof value.repeat !== 'undefined') {
        this.REPEAT.set(value.repeat)
      } else {
        this.REPEAT.clear()
      }
      if (typeof value.size !== 'undefined') {
        this.SIZE.set(value.size)
      } else {
        this.SIZE.clear()
      }
      if (typeof value.position !== 'undefined') {
        this.POSITION.set(value.position)
      } else {
        this.POSITION.clear()
      }
      if (typeof value.attachment !== 'undefined') {
        this.ATTACHMENT.set(value.attachment)
      } else {
        this.ATTACHMENT.clear()
      }
      this.update()
      if (trigger) {
        this.trigger(EVENTS.CHANGE, value)
        triggerNative(this.element, 'change')
      }
    }
  }

  clear(update = true) {
    this.value = {}
    this.$imageSelected = query(`.${this.classes.IMAGESELECTED}`, this.$wrap)
    removeClass(this.classes.EXIST, this.$wrap)
    removeClass(this.classes.IMAGESELECTED, this.$imageSelected)
    removeClass(this.classes.IMAGECHANGEDDISABLE, this.$imageSelected)
    if (update !== false) {
      const image = ''
      this.PREVIEW.set(image)

      this.REPEAT.clear()
      this.SIZE.clear()
      this.POSITION.clear()
      this.ATTACHMENT.clear()
      this.update()
    }
    this.leave('status')
    triggerNative(this.element, 'change')
  }

  setRepeat(repeat) {
    this.REPEAT.set(repeat)
    this.update()
  }

  setSize(size) {
    this.SIZE.set(size)
    this.update()
  }

  setPosition(position) {
    this.POSITION.set(position)
    this.update()
  }

  setAttachment(attachment) {
    this.ATTACHMENT.set(attachment)
    this.update()
  }

  getClassName(namespace, field) {
    return template.compile(this.classes.FIELD)({ namespace, field })
  }

  get() {
    return this.value
  }

  enable() {
    if (this.is('disabled')) {
      this.element.disabled = false
      this.TRIGGER.CLEARPOP.enable()
      removeClass(this.classes.DISABLED, this.$wrap)
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      this.element.disabled = true
      this.TRIGGER.CLEARPOP.disable()
      addClass(this.classes.DISABLED, this.$wrap)
      this.enter('disabled')
    }

    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()
      this.leave('initialized')

      removeClass(this.classes.INPUT, this.element)
      this.$wrap.remove()
      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.element)
      }
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default BgPicker
