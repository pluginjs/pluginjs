import Component from '@pluginjs/component'
import template from '@pluginjs/template'
import { compose, triggerNative } from '@pluginjs/utils'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import { query, parentWith, parseHTML, insertAfter } from '@pluginjs/dom'
import { setStyle } from '@pluginjs/styled'
import PopDialog from '@pluginjs/pop-dialog'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  translateable,
  optionable
} from '@pluginjs/decorator'
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
class AudioPicker extends Component {
  constructor(element, options = {}) {
    super(element)

    this.setupOptions(options)
    this.setupClasses()
    this.setupI18n()
    this.setupStates()
    this.value = {}
    this.value.image = ''
    addClass(`${this.classes.INPUT}`, this.element)
    this.initialize()
  }

  initialize() {
    if (this.options.theme) {
      addClass(this.getThemeClass(), this.element)
    }

    this.createHtml()

    this.bind()

    this.value = this.options.parse(this.element.value.replace(/'/g, '"'))
    this.setState('write')

    this.val(this.value, false)

    if (this.element.disabled || this.options.disabled) {
      this.disable()
    }

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  createHtml() {
    const that = this
    this.$wrap = parseHTML(
      template.compile(this.options.template())({
        classes: this.classes,
        placeholder: this.translate('placeholder')
      })
    )

    insertAfter(this.$wrap, this.element)

    this.$empty = query(`.${this.classes.EMPTY}`, this.$wrap)
    this.$text = query(`.${this.classes.FILLTEXT}`, this.$wrap)
    this.$remove = query(`.${this.classes.REMOVE}`, this.$wrap)
    this.$reselect = query(`.${this.classes.RESELECT}`, this.$wrap)

    this.deleteMode = PopDialog.of(this.$remove, {
      placement: 'bottom',
      content: this.translate('deleteTitle'),
      buttons: [
        {
          action: 'cancel',
          label: this.translate('cancel')
        },
        {
          action: 'delete',
          label: this.translate('delete'),
          color: 'danger',
          fn(resolve) {
            const $fill = that.$remove.matches(`.${that.classes.FILL}`)
              ? that.$remove
              : parentWith(hasClass(that.classes.FILL), that.$remove)
            addClass(`${that.classes.FADEOUT}`, $fill)
            window.setTimeout(() => {
              removeClass(`${that.classes.FADEOUT}`, $fill)
              that.clear()
            }, 300)
            resolve()
          }
        }
      ],
      onShown: () => {
        this.enter('holdHover')
      },
      onHidden: () => {
        removeClass(this.classes.HOVER, this.$wrap)
        this.leave('holdHover')
      }
    })
  }

  bind() {
    bindEvent(
      this.eventName('click'),
      () => {
        if (this.is('disabled')) {
          return null
        }
        const $fill = this.$empty.nextElementSibling
        const val = this.options.select.call(this, this.set.bind(this))
        if (!val) {
          return false
        }

        addClass(`${this.classes.FADEIN}`, $fill)
        window.setTimeout(() => {
          removeClass(`${this.classes.FADEIN}`, $fill)
        }, 300)
        return false
      },
      this.$empty
    )

    bindEvent(
      this.eventName('click'),
      () => {
        if (this.is('disabled')) {
          return null
        }
        this.options.select.call(this, this.set.bind(this))
        return false
      },
      this.$reselect
    )

    compose(
      bindEvent(this.eventName('mouseenter'), () => {
        if (this.is('disabled')) {
          return null
        }

        addClass(this.classes.HOVER, this.$wrap)
        return null
      }),
      bindEvent(this.eventName('mouseleave'), () => {
        if (this.is('disabled')) {
          return null
        }
        if (this.is('holdHover')) {
          return false
        }
        removeClass(this.classes.HOVER, this.$wrap)
        this.leave('holdHover')
        return null
      })
    )(this.$wrap)
  }

  unbind() {
    removeEvent(this.eventName(), this.$wrap)
    removeEvent(this.eventName(), this.$reselect)
    removeEvent(this.eventName(), this.$empty)
  }

  setState(state) {
    if (state === 'exist') {
      compose(
        removeClass(this.classes.WRITE),
        addClass(this.classes.EXIST)
      )(this.$wrap)
    } else if (state === 'write') {
      compose(
        removeClass(this.classes.EXIST),
        addClass(this.classes.WRITE)
      )(this.$wrap)
    }
  }

  update(trigger = true) {
    this.element.value = this.val()
    if (trigger) {
      this.trigger(EVENTS.CHANGE, this.value)
      triggerNative(this.element, 'change')
    }
  }

  clear(update = true) {
    this.value = null
    this.$text.innerText = ''
    this.$text.removeAttribute('style')
    removeClass(this.classes.WITHIMAGE, this.$text)
    this.setState('write')

    this.update(update)
  }

  get() {
    return this.value
  }

  set(value, update = true) {
    if (!value) {
      return
    }

    this.value = value

    this.$text.innerText = value.title ? value.title : value.audio
    if (value.image) {
      addClass(this.classes.WITHIMAGE, this.$text)
      setStyle(
        {
          'background-image': `url(${value.image})`
        },
        this.$text
      )
    }
    this.setState('exist')

    this.update(update)
  }

  val(value, trigger = true) {
    if (typeof value === 'undefined') {
      return this.options.process.call(this, this.get())
    }

    let valueObj

    if (typeof value === 'object' && value && value.image) {
      valueObj = value
    } else {
      valueObj = this.options.parse.call(this, value)
    }

    if (valueObj) {
      this.set(valueObj, trigger)
    } else {
      this.clear(trigger)
    }

    return null
  }

  enable() {
    if (this.is('disabled')) {
      removeClass(this.classes.DISABLED, this.$wrap)
      this.element.disabled = false
      if (this.deleteMode) {
        this.deleteMode.enable()
      }
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      addClass(this.classes.DISABLED, this.$wrap)
      this.element.disabled = true
      if (this.deleteMode) {
        this.deleteMode.disable()
      }
      this.enter('disabled')
    }

    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()

      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.element)
      }
      removeClass(`${this.classes.INPUT}`, this.element)
      this.element.value = ''
      this.$wrap.remove()
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default AudioPicker
