import Component from '@pluginjs/component'
import { deepMerge, compose } from '@pluginjs/utils'
import is from '@pluginjs/is'
import template from '@pluginjs/template'
import { addClass, removeClass } from '@pluginjs/classes'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { query, parentWith, parseHTML, insertAfter } from '@pluginjs/dom'
import PopDialog from '@pluginjs/pop-dialog'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  translateable
} from '@pluginjs/pluginjs'
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
@register(
  NAMESPACE,
  {
    defaults: DEFAULTS,
    methods: METHODS,
    dependencies: DEPENDENCIES
  }
)
class ImagePicker extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)

    this.options = deepMerge(DEFAULTS, options, this.getDataOptions())
    this.initClasses(CLASSES)

    addClass(`${this.classes.NAMESPACE}-input`, this.element)

    this.setupI18n()
    this.initStates()
    this.initialize()
  }

  initialize() {
    // build dom
    this.createHtml()

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.element)
    }

    // bind events
    this.bind()

    // set initialed value
    this.value = this.options.parse(this.element.value.replace(/'/g, '"'))

    this.setState('empty')
    this.set(this.value, false)

    if (this.element.disabled || this.options.disabled) {
      this.disable()
    }

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  bind() {
    // this.$initial.on(this.eventName('click'), (e) => {
    bindEvent(
      {
        type: this.eventName('click'),
        handler: () => {
          if (this.is('disabled')) {
            return null
          }
          const $info = this.$initial.nextElementSibling
          const val = this.options.select.call(this)
          if (!val) {
            return false
          }

          addClass(`${this.classes.NAMESPACE}-fadeIn`, $info)
          window.setTimeout(() => {
            removeClass(`${this.classes.NAMESPACE}-fadeIn`, $info)
          }, 300)
          return false
        }
      },
      this.$initial
    )

    bindEvent(
      {
        type: this.eventName('click'),
        handler: () => {
          if (this.is('disabled')) {
            return null
          }
          this.options.select.call(this)
          return false
        }
      },
      this.$reselect
    )

    compose(
      bindEvent({
        type: this.eventName('mouseenter'),
        handler: () => {
          if (this.is('disabled')) {
            return null
          }

          addClass(this.classes.HOVER, this.$wrap)
          return null
        }
      }),
      bindEvent({
        type: this.eventName('mouseleave'),
        handler: () => {
          if (this.is('disabled')) {
            return null
          }
          if (this.is('holdHover')) {
            return false
          }
          removeClass(this.classes.HOVER, this.$wrap)
          this.leave('holdHover')
          return null
        }
      })
    )(this.$wrap)

    // pop event
    this.pop.options.onShow = () => {
      this.enter('holdHover')
    }
    this.pop.options.onHide = () => {
      removeClass(this.classes.HOVER, this.$wrap)
      this.leave('holdHover')
    }
  }

  unbind() {
    removeEvent(this.eventName(), this.$wrap)
    removeEvent(this.eventName(), this.$remove)
    removeEvent(this.eventName(), this.$reselect)
    removeEvent(this.eventName(), this.$initial)
  }

  createHtml() {
    const that = this
    this.$wrap = parseHTML(
      template.compile(this.options.template())({
        namespace: this.classes.NAMESPACE,
        placeholder: this.translate('placeholder')
      })
    )

    insertAfter(this.$wrap, this.element)

    this.$initial = query(`.${this.classes.INITIAL}`, this.$wrap)
    this.$image = query(`.${this.classes.INFOIMAGE}`, this.$wrap)
    this.$remove = query(`.${this.classes.INFOREMOVE}`, this.$wrap)
    this.$reselect = query(`.${this.classes.INFORESELECT}`, this.$wrap)

    // init popDialog
    this.pop = PopDialog.of(this.$remove, {
      placement: 'bottom',
      content: this.translate('deleteTitle'),
      buttons: {
        cancel: { label: this.translate('cancel') },
        delete: {
          label: this.translate('delete'),
          color: 'danger',
          fn(resolve) {
            const $info = that.$remove.matches(`.${that.classes.INFO}`)
              ? that.$remove
              : parentWith(
                  el => el.matches(`.${that.classes.INFO}`),
                  that.$remove
                )
            addClass(`${that.classes.NAMESPACE}-fadeOut`, $info)
            window.setTimeout(() => {
              removeClass(`${that.classes.NAMESPACE}-fadeOut`, $info)
              that.clear()
            }, 300)
            // that.$remove.closest(`.${that.classes.INFO}`).fadeOut(100, () => {
            //   that.clear();
            //   that.$remove.fadeIn();
            // });

            resolve()
          }
        }
      }
    })
  }

  setState(state) {
    if (state === 'exist') {
      compose(removeClass(this.classes.EMPTY), addClass(this.classes.EXIST))(
        this.$wrap
      )
    } else if (state === 'empty') {
      compose(removeClass(this.classes.EXIST), addClass(this.classes.EMPTY))(
        this.$wrap
      )
    }
  }

  update() {
    this.element.value = this.val()
    this.trigger(EVENTS.CHANGE, this.value)
  }

  clear(update = true) {
    this.value = null

    this.$image.setAttribute('src', null)

    this.setState('empty')

    if (update !== false) {
      this.update()
    }
  }

  get() {
    return this.value
  }

  set(value, update = true) {
    if (!value) {
      return
    }
    this.value = value

    this.$image.setAttribute('src', value.image)
    this.setState('exist')

    if (update !== false) {
      this.update()
    }
  }

  val(value) {
    if (is.undefined(value)) {
      return this.options.process.call(this, this.get())
    }

    this.set(this.options.parse.call(this, value))
    return null
  }

  enable() {
    if (this.is('disabled')) {
      removeClass(this.classes.DISABLED, this.$wrap)
      this.element.disabled = false
      this.pop.enable()
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      addClass(this.classes.DISABLED, this.$wrap)
      this.element.disabled = true
      this.pop.disable()
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

      removeClass(`${this.classes.NAMESPACE}-input`, this.element)
      this.element.value = ''
      this.$wrap.remove()
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default ImagePicker
