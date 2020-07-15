import Component from '@pluginjs/component'
import { compose, deepMerge, triggerNative } from '@pluginjs/utils'
import template from '@pluginjs/template'
import { parseHTML, query, insertAfter, insertBefore } from '@pluginjs/dom'
import { isIE11, isIE } from '@pluginjs/is'
import { addClass, removeClass } from '@pluginjs/classes'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { hideElement, showElement } from '@pluginjs/styled'
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
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  dependencies as DEPENDENCIES,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE,
  translations as TRANSLATIONS
} from './constant'
import Trigger from './trigger'
import FontFamily from './fontFamily'
import FontSize from './fontSize'
import FontStyle from './fontStyle'
import FontWeight from './fontWeight'
import LineHeight from './lineHeight'
import TextAlign from './textAlign'
import TextDecoration from './textDecoration'
import TextTransform from './textTransform'

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
class FontEditor extends Component {
  constructor(element, options = {}) {
    super(element)

    this.setupOptions(options)
    this.setupClasses()

    hideElement(addClass(`${this.classes.NAMESPACE}-input`, this.element))

    this.setupI18n()

    this.setupStates()
    this.initialize()
  }

  initialize() {
    this.createHtml()
    this.TRIGGER = new Trigger(this)

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.$wrap)
    }

    this.defaultVal = this.initVal()

    this.value = deepMerge(
      {},
      this.defaultVal,
      this.options.parse(this.element.value.replace(/'/g, '"'))
    )

    // init
    this.fontFamily = new FontFamily(this)
    this.fontWeight = new FontWeight(this)
    this.fontSize = new FontSize(this)
    this.lineHeight = new LineHeight(this)
    this.textAlign = new TextAlign(this)
    this.fontStyle = new FontStyle(this)
    this.textTransform = new TextTransform(this)
    this.textDecoration = new TextDecoration(this)
 
    if (
      this.value.fontFamily === "" ||
      typeof this.value.fontFamily === 'undefined'
    ) {
      compose(
        removeClass(this.classes.EXSIT),
        addClass(this.classes.WRITE)
      )(this.$wrap)
      this.TRIGGER.$fillContentName.textContent = this.translate('fontFamily')
    } else {
      compose(
        addClass(this.classes.EXSIT),
        removeClass(this.classes.WRITE)
      )(this.$wrap)
      this.TRIGGER.$fillContentName.textContent = this.value.fontFamily.font
    }

    this.initDropdown(this.options.dropdown)
    this.bind()

    if (this.element.disabled || this.options.disabled) {
      this.disable()
    }

    this.set(this.value, false, true)
    this.enter('initialized')

    this.trigger(EVENTS.READY)
  }

  initDropdown(options) {
    const that = this
    this.DROPDOWN = Dropdown.of(this.TRIGGER.$empty, {
      ...options,
      responsiveFull: this.options.responsiveDropdownFull,
      reference: this.TRIGGER.$trigger,
      target: this.$Panel,
      hideOutClick: true,
      hideOnSelect: false,
      constraintToScrollParent: false,
      constraintToWindow: false,
      templates: this.options.templates,
      onShow: () => {
        if (!this.DROPDOWN.is('builded')) {
          this.buildDropdown()
        }
      },
      onHide: () => {
        removeClass(that.classes.OPENDISABLE, that.TRIGGER.$trigger)
      }
    })
  }

  buildDropdown() {
    insertBefore(this.fontFamily.$wrap, this.$Control)
    insertBefore(this.fontWeight.$wrap, this.$Control)
    insertBefore(this.fontSize.$wrap, this.$Control)
    insertBefore(this.lineHeight.$wrap, this.$Control)
    insertBefore(this.textAlign.$wrap, this.$Control)
  }

  bind() {
    const that = this

    bindEvent(
      this.eventName('click'),
      () => {
        that.DROPDOWN.hide()
        return
      },
      this.$Cancel
    )

    bindEvent(
      this.eventName('click'),
      () => {
        // this.value.fontFamily === "" ? this.value.fontFamily = 'inherit' : null
        that.update()
        that.DROPDOWN.hide()
        return
      },
      this.$Save
    )
  }

  initVal() {
    return {
      fontFamily: this.options.fontFamily.value,
      fontSize: this.options.fontSize.value,
      lineHeight: this.options.lineHeight.value,
      fontWeight: this.options.fontWeight.value,
      textAlign: this.options.textAlign.value,
      textDecoration: this.options.textDecoration.value,
      textTransform: this.options.textTransform.value,
      fontStyle: this.options.fontStyle.value
    }
  }

  createHtml() {
    this.$wrap = parseHTML(
      template.compile(this.options.template())({
        classes: this.classes,
        addTypography: this.translate('addTypography'),
        fontFamily: this.translate('fontFamily')
      })
    )

    insertAfter(this.$wrap, this.element)

    this.$Panel = query(`.${this.classes.DROPDOWN}`, this.$wrap)
    this.$Control = query(`.${this.classes.CONTROL}`, this.$Panel)
    this.$Cancel = query(`.${this.classes.CANCEL}`, this.$Panel)
    this.$Save = query(`.${this.classes.SAVE}`, this.$Panel)
  }

  unbind() {
    removeEvent(this.eventName(), this.element)
  }

  update(trigger = true) {
    const value = this.val()
    this.element.value = value
    this.TRIGGER.update(value)
    
    if (trigger) {
      this.trigger(EVENTS.CHANGE, value)
      triggerNative(this.element, 'change')
    }
  }

  val(value, trigger = true) {
    if (typeof value === 'undefined') {
      return this.options.process.call(this, this.value)
    }

    let valueObj

    if (typeof value === 'object') {
      valueObj = value
    } else {
      valueObj = this.options.parse.call(this, value)
    }

    if (valueObj) {
      this.set(valueObj, trigger)
    } else {
      this.clear()
    }

    return null
  }

  set(value, trigger = true, update = true) {
    if (update !== false) {
      if (typeof value.textAlign !== 'undefined') {
        this.textAlign.set(value.textAlign)
      } else {
        this.textAlign.clear()
      }

      if (typeof value.fontStyle !== 'undefined') {
        this.fontStyle.set(value.fontStyle)
      }
      if (typeof value.textTransform !== 'undefined') {
        this.textTransform.set(value.textTransform)
      }

      if (typeof value.textDecoration !== 'undefined') {
        this.textDecoration.set(value.textDecoration)
      }

      if (typeof value.fontWeight !== 'undefined') {
        this.fontWeight.set(value.fontWeight)
      }
      if (typeof value.lineHeight !== 'undefined') {
        this.lineHeight.set(value.lineHeight)
      }
      if (typeof value.fontSize !== 'undefined') {
        this.fontSize.set(value.fontSize)
      }
      if (typeof value.fontFamily !== 'undefined') {
        this.fontFamily.set(value.fontFamily)
      }
      this.update(trigger)
    }
  }

  clear(update = true) {
    this.textAlign.clear()
    this.fontStyle.clear()
    this.textTransform.clear()
    this.textDecoration.clear()
    this.fontWeight.clear()
    this.lineHeight.clear()
    this.fontSize.clear()
    this.fontFamily.clear()
    this.update(update)
  }

  getUnitNumber(value) {
    let unitValue
    const reg1 = /(\d+)\.(\d+)|\d+/g
    const reg2 = /[^0-9|.]/g

    const arry1 = value.match(reg1)
    const arry2 = value.match(reg2)

    if (arry2) {
      unitValue = arry2.join('')
    } else {
      unitValue = ''
    }

    const numberValue = parseFloat(arry1.join(''))

    return {
      number: numberValue,
      unit: unitValue
    }
  }

  setFontFamily(value) {
    this.value.fontFamily = value
    this.fontFamily.set(value)
    this.update()
  }

  setFontWeight(value) {
    this.value.fontWeight = value
    this.fontWeight.set(value)
    this.update()
  }

  setFontStyle(value) {
    this.value.fontStyle = value
    this.fontStyle.set(value)
    this.update()
  }

  setTextAlign(value) {
    this.value.textAlign = value
    this.textAlign.set(value)
    this.update()
  }

  setTextTranform(value) {
    this.value.textTransform = value
    this.textTransform.set(value)
    this.update()
  }

  setTextDecoration(value) {
    this.value.textDecoration = value
    this.textDecoration.set(value)
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
      removeClass(this.classes.DISABLED, this.$wrap)
      this.TRIGGER.CLEARPOP.enable()
      this.element.disabled = false
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      addClass(this.classes.DISABLED, this.$wrap)
      this.TRIGGER.CLEARPOP.disable()
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
 
      if(isIE() || isIE11()) {
        this.$wrap.removeNode(true);
      } else {
        this.$wrap.remove()
      }

      showElement(removeClass(`${this.classes.NAMESPACE}-input`, this.element))
      this.element.value = ''
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default FontEditor
