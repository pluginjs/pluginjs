import Component from '@pluginjs/component'
import template from '@pluginjs/template'
import { addClass, removeClass } from '@pluginjs/classes'
import { setStyle } from '@pluginjs/styled' // getStyle
import { bindEvent, removeEvent } from '@pluginjs/events'
import {
  parseHTML,
  queryAll,
  query,
  insertAfter,
  appendTo
} from '@pluginjs/dom'
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

import Lock from './lock'
import Unit from './unit'

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
    this.lock = new Lock(this)
    this.unit = new Unit(this)

    const val = this.element.value

    if (val) {
      this.val(val, false)
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
    bindEvent(
      this.eventName('change'),
      `.${this.classes.INPUT}`,
      e => {
        if (query(`.${this.classes.LOCKACTIVE}`, this.$wrap)) {
          const all = queryAll(`.${this.classes.INPUT}`, this.$wrap)
          for (let i = 0; i < all.length; i++) {
            all[i].value = e.target.value
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
    this.$wrap = this.createEl('wrap', { classes: this.classes })

    const top = this.createEl('size', {
      classes: this.classes,
      field: this.classes.TOP,
      reverse: 'TOP'
    })
    const right = this.createEl('size', {
      classes: this.classes,
      field: this.classes.RIGHT,
      reverse: 'RIGHT'
    })
    const bottom = this.createEl('size', {
      classes: this.classes,
      field: this.classes.BOTTOM,
      reverse: 'BOTTOM'
    })
    const left = this.createEl('size', {
      classes: this.classes,
      field: this.classes.LEFT,
      reverse: 'LEFT'
    })


    appendTo(top, this.$wrap)
    appendTo(right, this.$wrap)
    appendTo(bottom, this.$wrap)
    appendTo(left, this.$wrap)
    insertAfter(this.$wrap, this.element)

    this.$top = query(`.${this.classes.TOP}`, this.$wrap)
    this.$right = query(`.${this.classes.RIGHT}`, this.$wrap)
    this.$bottom = query(`.${this.classes.BOTTOM}`, this.$wrap)
    this.$left = query(`.${this.classes.LEFT}`, this.$wrap)
  }

  createEl(tempName, options) {
    return parseHTML(
      template.compile(this.options.templates[tempName]())(options)
    )
  }

  update(trigger = true) {
    const value = this.val()
    this.element.value = value
    if (trigger) {
      this.trigger(EVENTS.CHANGE, value)
    }
  }

  set(value, trigger = true) {
    if (!value || typeof value === 'undefined') {
      return
    }

    if(JSON.stringify(value) =="{}") {
      this.$top.value = '';
      this.$right.value = '';
      this.$bottom.value = '';
      this.$left.value = '';
    } else {
      this.$top.value = value.top
      this.$right.value = value.right
      this.$bottom.value = value.bottom
      this.$left.value = value.left

      if (typeof value.unit !== 'undefined') {
        this.unit.set(value.unit)
      }
    } 
    
    this.update(trigger)
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

  val(value, trigger = true) {
    if (typeof value === 'undefined') {
      return this.options.process.call(this, this.get())
    }
    return this.set(this.options.parse.call(this, value), trigger)
  }

  enable() {
    if (this.is('disabled')) {
      removeClass(this.classes.DISABLED, this.$wrap)
      this.element.disabled = false
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      addClass(this.classes.DISABLED, this.$wrap)
      this.element.disabled = true
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
