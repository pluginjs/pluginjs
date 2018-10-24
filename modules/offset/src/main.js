import Component from '@pluginjs/component'
import template from '@pluginjs/template'
import { addClass, removeClass } from '@pluginjs/classes'
import { setStyle } from '@pluginjs/styled' // getStyle
import { bindEvent, removeEvent } from '@pluginjs/events'
import { parseHTML, queryAll, query, insertAfter, closest } from '@pluginjs/dom'
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

import Select from '@pluginjs/select'

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
class Offset extends Component {
  constructor(element, options = {}) {
    super(element)

    this.$doc = document.body

    this.setupOptions(options)
    this.setupClasses()
    this.setupI18n()

    this.setupStates()
    this.initialize()
  }

  initialize() {
    this.create()

    addClass(this.classes.NAMESPACE, this.element)
    if (this.options.theme) {
      addClass(this.getThemeClass(), this.element)
    }
    this.SELECT = Select.of(this.$selecttrigger, {
      value: this.options.source[0].value,
      source: this.options.source,
      keyboard: true,
      onChange: () => {
        if (this.is('disabled')) {
          return
        }
        this.update()
      }
    })
    let val = this.element.value

    if (val) {
      if (!this.options.parse.call(this, val).unit) {
        val = val.replace('}', ',"unit":"px"}')
      }
      this.val(val)
    }
    setStyle('display', 'none', this.element)

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
      this.eventName('click'),
      `.${this.classes.LOCK}`,
      e => {
        if (that.is('disabled')) {
          return
        }
        const $this = closest(`.${this.classes.LOCK}`, e.target)

        if (that.is('lock')) {
          removeClass(that.classes.LOCKACTIVE, $this)
          that.leave('lock')
          return
        }

        addClass(that.classes.LOCKACTIVE, $this)
        that.enter('lock')
      },
      this.$wrap
    )
    bindEvent(
      this.eventName('change'),
      `.${this.classes.TOP}`,
      () => {
        if (query(`.${this.classes.LOCKACTIVE}`, this.$wrap)) {
          const all = queryAll(`.${this.classes.INPUT}`, this.$wrap)
          for (let i = 0; i < all.length; i++) {
            all[i].value = this.$top.value
          }
        }
        this.update()
      },
      this.$wrap
    )
    bindEvent(
      this.eventName('change'),
      `.${this.classes.RIGHT}`,
      () => {
        if (query(`.${this.classes.LOCKACTIVE}`, this.$wrap)) {
          const all = queryAll(`.${this.classes.INPUT}`, this.$wrap)
          for (let i = 0; i < all.length; i++) {
            all[i].value = this.$right.value
          }
        }
        this.update()
      },
      this.$wrap
    )
    bindEvent(
      this.eventName('change'),
      `.${this.classes.BOTTOM}`,
      () => {
        if (query(`.${this.classes.LOCKACTIVE}`, this.$wrap)) {
          const all = queryAll(`.${this.classes.INPUT}`, this.$wrap)
          for (let i = 0; i < all.length; i++) {
            all[i].value = this.$bottom.value
          }
        }
        this.update()
      },
      this.$wrap
    )
    bindEvent(
      this.eventName('change'),
      `.${this.classes.LEFT}`,
      () => {
        if (query(`.${this.classes.LOCKACTIVE}`, this.$wrap)) {
          const all = queryAll(`.${this.classes.INPUT}`, this.$wrap)
          for (let i = 0; i < all.length; i++) {
            all[i].value = this.$left.value
          }
        }
        this.update()
      },
      this.$wrap
    )
  }

  unbind() {
    removeEvent(this.eventName(), this.$wrap)
    removeEvent(this.eventNameWithId(), this.$doc)
  }

  create() {
    this.$wrap = parseHTML(
      template.compile(this.options.template())({
        classes: this.classes
      })
    )

    insertAfter(this.$wrap, this.element)

    this.$select = query(`.${this.classes.SELECT}`, this.$wrap)
    this.$selecttrigger = query(`.${this.classes.SELECTTRIGGER}`, this.$wrap)
    this.$top = query(`.${this.classes.TOP}`, this.$wrap)
    this.$right = query(`.${this.classes.RIGHT}`, this.$wrap)
    this.$bottom = query(`.${this.classes.BOTTOM}`, this.$wrap)
    this.$left = query(`.${this.classes.LEFT}`, this.$wrap)
    this.$unit = query(`.${this.classes.SELECTTRIGGER}`, this.$wrap)
  }

  update(trigger = true) {
    const value = this.val()
    console.log(value)
    this.element.value = value
    this.trigger(EVENTS.CHANGE, value)
    if (trigger) {
      this.trigger(EVENTS.CHANGE, this.value)
    }
  }

  clear(update = true) {
    if (update !== false) {
      this.set(this.value)
    }
  }

  set(value) {
    if (!value || typeof value === 'undefined') {
      return
    }
    this.$top.value = value.top
    this.$right.value = value.right
    this.$bottom.value = value.bottom
    this.$left.value = value.left
    this.$unit.value = value.unit
    this.SELECT.select(value.unit)
    this.update()
  }

  get() {
    return {
      top: this.$top.value,
      right: this.$right.value,
      bottom: this.$bottom.value,
      left: this.$left.value,
      unit: this.$unit.value
    }
  }

  val(value) {
    if (typeof value === 'undefined') {
      return this.options.process.call(this, this.get())
    }
    return this.set(this.options.parse.call(this, value))
  }

  enable() {
    if (this.is('disabled')) {
      removeClass(this.classes.DISABLED, this.$wrap)
      this.element.disabled = false
      this.enableTooltip()
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      addClass(this.classes.DISABLED, this.$wrap)
      this.SELECT.disable()
      this.element.disabled = true
      // this.disableTooltip()
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

      this.element.display = ''
      this.$wrap.remove()
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default Offset
