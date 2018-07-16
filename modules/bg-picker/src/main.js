import Component from '@pluginjs/component'
import { deepMerge, compose } from '@pluginjs/utils'
import { parseHTML, insertAfter, query } from '@pluginjs/dom'
import { hideElement, showElement, setStyle } from '@pluginjs/styled'
import { addClass, removeClass } from '@pluginjs/classes'
import { bindEvent, removeEvent } from '@pluginjs/events'
import PopDialog from '@pluginjs/pop-dialog'
import is from '@pluginjs/is'
import template from '@pluginjs/template'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  translateable
} from '@pluginjs/pluginjs'
import Attachment from './attachment'
import Position from './position'
import Repeat from './repeat'
import Size from './size'
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
@register(NAMESPACE, {
  defaults: DEFAULTS,
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class BgPicker extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)

    this.options = deepMerge({}, DEFAULTS, options, this.getDataOptions())
    this.initClasses(CLASSES)

    addClass(this.classes.INPUT, this.element)

    this.setupI18n()
    this.initStates()
    this.initialize()
  }

  initialize() {
    this.createHtml()

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.$wrap)
    }

    this.value = this.options.parse(this.element.value.replace(/'/g, '"'))

    this.set(this.value, false)

    // init
    if (!this.value.image) {
      addClass(this.classes.EMPTY, this.$wrap)
    }

    this.SIZE = new Size(this)
    this.ATTACHMENT = new Attachment(this)
    this.POSITION = new Position(this)
    this.REPEAT = new Repeat(this)

    addClass(this.classes.EXIST, this.$wrap)

    this.bind()

    if (this.element.disabled || this.options.disabled) {
      this.disable()
    }

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  bind() {
    const that = this
    bindEvent(
      {
        type: this.eventName('click'),
        handler: () => {
          if (this.is('disabled')) {
            return
          }

          removeClass(
            this.classes.EXIST,
            addClass(this.classes.EXPAND, this.$wrap)
          )
        }
      },
      this.$initiate
    )

    compose(
      bindEvent({
        type: this.eventName('mouseenter'),
        handler: ({ target }) => {
          if (this.is('disabled')) {
            return
          }

          addClass(that.classes.HOVER, target)
        }
      }),
      bindEvent({
        type: this.eventName('mouseleave'),
        handler: ({ target }) => {
          if (this.is('disabled')) {
            return null
          }
          if (this.is('holdHover')) {
            return false
          }
          removeClass(this.classes.HOVER, target)
          this.leave('holdHover')
          return null
        }
      })
    )(this.$info)

    bindEvent(
      {
        type: this.eventName('click'),
        handler: () => {
          if (this.is('disabled')) {
            return null
          }

          this.oldValue = this.val()
          removeClass(
            this.classes.EXIST,
            addClass(this.classes.EXPAND, this.$wrap)
          )

          return null
        }
      },
      this.$edit
    )

    bindEvent(
      {
        type: this.eventName('click'),
        handler: () => {
          if (this.is('disabled')) {
            return null
          }

          this.val(this.oldValue)
          this.update()
          removeClass(
            this.classes.EXPAND,
            addClass(this.classes.EXIST, this.$wrap)
          )
          return false
        }
      },
      this.$cancel
    )

    bindEvent(
      {
        type: this.eventName('click'),
        handler: () => {
          if (this.is('disbaled')) {
            return null
          }

          this.update()
          removeClass(
            this.classes.EXPAND,
            addClass(this.classes.EXIST, this.$wrap)
          )
          return false
        }
      },
      this.$save
    )

    bindEvent(
      {
        type: this.eventName('click'),
        handler: () => {
          if (this.is('disabled')) {
            return
          }
          this.options.select.apply(this)
        }
      },
      this.$image
    )

    // pop event
    this.pop.options.onShow = () => {
      this.enter('holdHover')
    }
    this.pop.options.onHide = () => {
      removeClass(this.classes.HOVER, this.$info)
      this.leave('holdHover')
    }
  }

  unbind() {
    ;[
      this.element,
      this.$initiate,
      this.$info,
      this.$cancel,
      this.$image,
      this.$edit,
      this.$remove
    ].map(removeEvent(this.eventName()))
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

    this.$initiate = query(`.${this.classes.INITIATE}`, this.$wrap)

    this.$info = query(`.${this.classes.INFO}`, this.$wrap)
    this.$infoImageName = hideElement(
      query(`.${this.classes.IMAGENAMEINFO}`, this.$info)
    )
    this.$infoImage = query(`.${this.classes.INFOIMAGE}`, this.$info)
    this.$remove = query(`.${this.classes.REMOVE}`, this.$info)
    this.$edit = query(`.${this.classes.EDIT}`, this.$info)

    this.$expandPanel = query(`.${this.classes.EXPANDPANEL}`, this.$wrap)
    this.$control = query(`.${this.classes.CONTROL}`, this.$expandPanel)
    this.$cancel = query(`.${this.classes.CANCEL}`, this.$control)
    this.$save = query(`.${this.classes.SAVE}`, this.$control)
    this.$imageWrap = query(`.${this.classes.IMAGEWRAP}`, this.$expandPanel)
    this.$image = query(`.${this.classes.IMAGE}`, this.$expandPanel)

    // init pop
    this.pop = new PopDialog(this.$remove, {
      placement: 'bottom',
      content: 'Are you sure you want to delete?',
      buttons: {
        cancel: { label: 'Cancel' },
        delete: {
          label: 'Delete',
          color: 'danger',
          fn: resolve => {
            // this.$remove.closest(`.${this.classes.INFO}`).fadeOut(100, () => {
            //   this.clear()
            //   this.$remove.fadeIn()
            // })

            resolve()
          }
        }
      }
    })
  }

  setState(image) {
    if (!image || image === this.options.image) {
      addClass(this.classes.EMPTY, this.$wrap)
    } else {
      removeClass(this.classes.EMPTY, this.$wrap)
    }
  }

  returnInfo(image) {
    let imgName
    if (!image || image === this.options.image) {
      this.$infoImageName.textContent = this.translate('placeholder')
    } else {
      imgName = image.match(/([\S]+[/])([\S]+\w+$)/i)[2]
      this.$infoImageName.textContent = imgName
    }
  }

  update() {
    const value = this.val()
    this.element.value = value
    this.trigger(EVENTS.CHANGE, value)
  }

  val(value) {
    if (is.undefined(value)) {
      return this.options.process.call(this, this.value)
    }

    const valueObj = this.options.parse.call(this, value)

    if (valueObj) {
      this.set(valueObj)
    } else {
      this.clear()
    }

    return null
  }

  set(value, update) {
    this.value = value

    this.setImage(value.image)

    if (update !== false) {
      if (!is.undefined(value.repeat)) {
        this.REPEAT.set(value.repeat)
      } else {
        this.REPEAT.clear()
      }
      if (!is.undefined(value.size)) {
        this.SIZE.set(value.size)
      } else {
        this.SIZE.clear()
      }
      if (!is.undefined(value.position)) {
        this.POSITION.set(value.position)
      } else {
        this.POSITION.clear()
      }
      if (!is.undefined(value.attachment)) {
        this.ATTACHMENT.set(value.attachment)
      } else {
        this.ATTACHMENT.clear()
      }

      this.update()
    }
  }

  clear(update) {
    this.value = {}

    if (update !== false) {
      const image = ''
      this.setImage(image)

      this.REPEAT.clear()
      this.SIZE.clear()
      this.POSITION.clear()
      this.ATTACHMENT.clear()
      this.update()
    }
  }

  setImage(image) {
    let thumbnailUrl
    this.setState(image)
    this.returnInfo(image)
    if (image === '' || is.undefined(image)) {
      showElement(this.$infoImageName)
      setStyle({ 'background-image': 'none' }, this.$image)

      setStyle({ 'background-image': 'none' }, this.$infoImage)
    } else if (image || image !== this.options.image) {
      thumbnailUrl = this.options.thumbnail ? this.options.thumbnail : image
      const IMG = new Image()
      IMG.onload = () => {
        this.value.image = thumbnailUrl
        this.returnInfo(this.value.image)
        setStyle(
          { 'background-image': `url('${this.value.image}')` },
          this.$image
        )

        setStyle(
          { 'background-image': `url('${this.value.image}')` },
          this.$infoImage
        )
      }
      IMG.onerror = () => {
        this.value.image = image
        this.returnInfo(image)
        this.update()
        setStyle({ 'background-image': 'none' }, this.$image)
        setStyle({ 'background-image': 'none' }, this.$infoImage)
      }
      IMG.src = thumbnailUrl
    }
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

  get() {
    return this.value
  }

  enable() {
    if (this.is('disabled')) {
      this.element.disabled = false
      this.pop.enable()
      removeClass(this.classes.DISABLED, this.$wrap)
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      this.element.disabled = true
      this.pop.disable()
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
