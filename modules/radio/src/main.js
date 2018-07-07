import Component from '@pluginjs/component'
import { deepMerge } from '@pluginjs/utils'
import is from '@pluginjs/is'
import template from '@pluginjs/template'
import { addClass, removeClass } from '@pluginjs/classes'
import { bindEvent, removeEvent } from '@pluginjs/events'
import {
  append,
  parseHTML,
  setObjData,
  getObjData,
  unwrap,
  wrap,
  prepend
} from '@pluginjs/dom'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable
} from '@pluginjs/pluginjs'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'

@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@register(
  NAMESPACE,
  {
    defaults: DEFAULTS,
    methods: METHODS
  }
)
class Radio extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)

    this.options = deepMerge(DEFAULTS, options, this.getDataOptions())

    this.group = this.options.getGroup.call(this)

    this.initClasses(CLASSES)
    this.initStates()
    this.initialize()
  }

  initialize() {
    this.createLabel()
    this.createWrap()
    this.createIcon()

    // update checked state based on checked prop
    this.update(false)

    if (this.element.disabled || this.options.disabled) {
      this.disable(false)
    }

    this.bind()
    setObjData(NAMESPACE, this, this.element)

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  createWrap() {
    this.wrap = this.options.getWrap.call(this)

    if (!this.wrap) {
      const html = template.render(this.options.templates.wrap.call(this), {
        classes: this.classes
      })

      wrap(html, this.element)

      this.wrap = this.options.getWrap.call(this)
      append(this.label, this.wrap)
      this.enter('wrapped')
    }

    if (this.options.theme) {
      if (this.getThemeClass().split(' ').length > 1) {
        this.getThemeClass()
          .split(' ')
          .map(c => addClass(c, this.wrap))
      } else {
        addClass(this.getThemeClass(), this.wrap)
      }
    }
  }

  createLabel() {
    this.label = this.options.getLabel.call(this)
  }

  createIcon() {
    this.$icon = this.options.getIcon.call(this)

    if (!this.$icon) {
      this.$icon = parseHTML(
        template.render(this.options.templates.icon.call(this), {
          classes: this.classes
        })
      )
      prepend(this.$icon, this.label)
    }
  }

  set(value) {
    if (this.element.value === value) {
      this.check()
    } else {
      this.group.map((item, i) => {
        const api = getObjData(NAMESPACE, this.element)
        if (api && value === this.value) {
          api.check(true, true)
        }
      })
    }
  }

  get() {
    return this.group.filter(i => i.getAttribute('checked')).map(j => j.value)
  }

  check(trigger = true, update = true) {
    if (!this.is('checked')) {
      this.enter('checked')
      addClass(this.classes.CHECKED, this.wrap)
      if (trigger) {
        this.element.setAttribute('checked', true)
        this.trigger(EVENTS.CHECK, this.element.value)
        this.trigger(EVENTS.CHANGE, this.element.value)
      }
    }

    if (update) {
      const that = this
      this.group.map((item, i) => {
        if (item === that.element) {
          return
        }
        const api = getObjData(NAMESPACE, item)
        if (api) {
          api.uncheck(true, false)
        }
      })
    }
  }

  uncheck(trigger = true, update = true) {
    if (this.is('checked')) {
      this.leave('checked')

      removeClass(this.classes.CHECKED, this.wrap)
      if (trigger) {
        this.element.setAttribute('checked', false)
        this.trigger(EVENTS.UNCHECK, this.element.value)
      }
    }

    if (update) {
      const that = this
      this.group.map((item, i) => {
        if (item === that.element) {
          return
        }
        const api = getObjData(NAMESPACE, item)
        if (api) {
          api.update()
        }
      })
    }
  }

  toggle() {
    if (this.is('checked')) {
      this.uncheck()
    } else {
      this.check()
    }
  }

  bind() {
    bindEvent(
      {
        type: 'click',
        handler: () => {
          if (this.is('disabled')) {
            return
          }
          this.toggle()
        }
      },
      this.element
    )
  }

  unbind() {
    removeEvent('click', this.element)
  }

  val(value) {
    if (is.undefined(value)) {
      return this.get()
    }

    return this.set(value)
  }

  enable(trigger = true) {
    if (this.is('disabled')) {
      this.element.disabled = false
      removeClass(this.classes.DISABLED, this.wrap)
      this.leave('disabled')
    }

    if (trigger) {
      this.trigger(EVENTS.ENABLE)
    }
  }

  disable(trigger = true) {
    if (!this.is('disabled')) {
      this.element.disabled = true
      addClass(this.classes.DISABLED, this.wrap)
      // this.wrap.addClass(this.classes.DISABLED);
      // this.$element.prop('disabled', true);
      this.enter('disabled')
    }

    if (trigger) {
      this.trigger(EVENTS.DISABLE)
    }
  }

  // update self status based on checked prop
  update(trigger = true) {
    // if (this.element.getAttribute('checked') === 'false') {
    //   this.element.checked = false
    // }
    const checked = this.element.checked
    if (checked !== this.is('checked')) {
      if (checked) {
        this.check(trigger, false)
      } else {
        this.uncheck(trigger, false)
      }
    }
  }

  destroy() {
    if (this.is('initialized')) {
      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.wrap)
      }
      removeClass(this.classes.DISABLED, this.wrap)
      removeClass(this.classes.CHECKED, this.wrap)
      if (this.is('wrapped')) {
        unwrap(this.element)
        this.$icon.remove()
      }
      this.unbind()
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default Radio
