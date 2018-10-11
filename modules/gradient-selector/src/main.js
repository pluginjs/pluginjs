import Component from '@pluginjs/component'
import template from '@pluginjs/template'
// import { bindEvent, removeEvent } from '@pluginjs/events'
import { addClass, removeClass } from '@pluginjs/classes'
import {
  // query,
  // queryAll,
  // parent,
  parseHTML,
  // setData,
  // getData,
  // has,
  wrap
} from '@pluginjs/dom'
// import { setStyle } from '@pluginjs/styled' // , getStyle
import { Color } from '@pluginjs/color'
// import Scrollable from '@pluginjs/scrollable'
// import Range from '@pluginjs/range'
// import ColorSelector from '@pluginjs/color-selector'
import Dropdown from '@pluginjs/dropdown'
import Trigger from './trigger'
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

let DATA = {}

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
class GradientSelector extends Component {
  constructor(element, options = {}) {
    super(element)
    this.setupOptions(options)
    this.setupClasses()
    this.setupI18n()

    addClass(this.classes.NAMESPACE, this.element)

    this.color = new Color()

    this.data = {
      name: '',
      color: '',
      opacity: 1,
      opacityColor: ''
    }

    this.setupStates()
    this.initialize()
  }

  initialize() {
    this.colors = DATA

    this.create()

    // this.bind()

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.element)
    }

    this.$selected = null

    // this.initData()

    if (this.element.disabled || this.options.disabled) {
      // this.disable()
    }

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  // initData() {
  //   const data = this.element.value
  //   if (data) {
  //     this.val(data)
  //   }
  // }
  create() {
    this.handelComponent()
  }

  handelComponent() {
    addClass(this.classes.INPUT, this.element)

    this.$wrap = wrap(
      `<div class='${this.classes.NAMESPACE}'></div>`,
      this.element
    )

    if (this.options.theme) {
      addClass(this.classes.THEME, this.$wrap)
    }

    this.TRIGGER = new Trigger(this)

    this.$panel = this.createEl('panel', {
      classes: this.classes
    })
    this.$wrap.append(this.$panel)

    this.setupDropdown()
  }

  setupDropdown() {
    this.DROPDOWN = Dropdown.of(this.TRIGGER.$empty, {
      target: this.$panel,
      reference: this.TRIGGER.$trigger,
      templates: this.options.template,
      hideOutClick: true,
      hideOnSelect: false
    })
  }

  createEl(tempName, options) {
    return parseHTML(
      template.compile(this.options.templates[tempName]())(options)
    )
  }

  enable() {
    if (this.is('disabled')) {
      this.DROPDOWN.enable()
      this.element.disabled = false
      this.leave('disabled')
      removeClass(this.classes.DISABLED, this.$wrap)
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      this.DROPDOWN.disable()
      this.element.disabled = true
      this.enter('disabled')
      addClass(this.classes.DISABLED, this.$wrap)
    }
    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()
      this.clear()
      removeClass(this.classes.NAMESPACE, this.element)
      this.DROPDOWN.destroy()
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }

  static setData(data) {
    DATA = data
  }
}

export default GradientSelector
