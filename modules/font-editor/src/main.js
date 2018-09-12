import Component from '@pluginjs/component'
import { compose, deepMerge } from '@pluginjs/utils'
import template from '@pluginjs/template'
import { parseHTML, query, insertAfter } from '@pluginjs/dom'
import { addClass, removeClass } from '@pluginjs/classes'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { hideElement, showElement, setStyle } from '@pluginjs/styled'
import PopDialog from '@pluginjs/pop-dialog'
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
    this.emptyize()
  }

  emptyize() {
    this.createHtml()

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.$wrap)
    }

    this.defaultVal = this.initVal()

    this.value = deepMerge(
      {},
      this.defaultVal,
      this.options.parse(this.element.value.replace(/'/g, '"'))
    )
    console.log(this.value)

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
      this.value.fontFamily === 'inherit' ||
      typeof this.value.fontFamily === 'undefined'
    ) {
      compose(
        removeClass(this.classes.EXSIT),
        addClass(this.classes.WRITE)
      )(this.$wrap)
      this.$fillFontName.textContent = this.translate('fontFamily')
    } else {
      compose(
        addClass(this.classes.EXSIT),
        removeClass(this.classes.WRITE)
      )(this.$wrap)
      this.$fillFontName.textContent = this.value.fontFamily
    }

    this.initDropdown()
    this.bind()

    if (this.element.disabled || this.options.disabled) {
      this.disable()
    }
    this.set(this.value, true)

    this.enter('emptyized')

    this.trigger(EVENTS.READY)
  }

  initDropdown() {
    this.$defaultDropdown = Dropdown.of(this.$empty, {
      theme: 'dafault',
      placement: 'bottom-left',
      // imitateSelect: true,
      // exclusive: false,
      reference: this.$trigger,
      target: this.$expandPanel,
      hideOutClick: false,
      hideOnSelect: false,
      constraintToScrollParent: false,
      constraintToWindow: false,
      templates: this.options.templates
    })
  }

  bind() {
    const that = this

    bindEvent(
      this.eventName('click'),
      () => {
        if (that.is('disabled')) {
          return
        }

        addClass(that.classes.EXPAND, that.$wrap)
        return
      },
      this.$empty
    )

    compose(
      bindEvent(this.eventName('mouseenter'), ({ target }) => {
        if (that.is('disabled')) {
          return false
        }

        addClass(that.classes.HOVER, target)
        return false
      }),
      bindEvent(this.eventName('mouseleave'), ({ target }) => {
        if (that.is('disabled')) {
          return false
        }
        if (that.is('holdHover')) {
          return false
        }
        removeClass(that.classes.HOVER, target)
        that.leave('holdHover')
        return false
      })
    )(this.$fill)

    bindEvent(
      this.eventName('click'),
      () => {
        if (that.is('disabled')) {
          return
        }
        // removeClass(this.classes.EXSIT, this.$wrap)
        addClass(that.classes.EXPAND, that.$wrap)
        this.$defaultDropdown.show()
        return
      },
      this.$editBtn
    )

    bindEvent(
      this.eventName('click'),
      () => {
        if (that.is('disabled')) {
          return
        }
        // addClass(that.classes.EXPAND, that.$wrap)
        this.$defaultDropdown.hide()
        // addClass(that.classes.EXPAND, that.$wrap)
        return
      },
      this.$fillRemove
    )

    bindEvent(
      this.eventName('click'),
      () => {
        removeClass(this.classes.EXPAND, this.$wrap)
        addClass(this.classes.EXSIT, this.$wrap)
        this.$defaultDropdown.hide()
        return
      },
      this.$expandCancel
    )

    bindEvent(
      this.eventName('click'),
      () => {
        // if ($.isEmptyObject(that.value)) {
        //   addClass(that.classes.WRITE, removeClass(that.classes.EXSIT, that.$wrap));
        // }
        addClass(this.classes.EXSIT, this.$wrap)
        removeClass(this.classes.EXPAND, this.$wrap)
        // hasClass(`${this.classes.WRITE}`, this.$wrap)
        //   ? removeClass(this.classes.WRITE, this.$wrap)
        //   : null
        this.update()
        this.$defaultDropdown.hide()
        return
      },
      this.$expandSave
    )

    // pop event
    this.pop.options.onShow = () => {
      this.enter('holdHover')
    }
    this.pop.options.onHide = () => {
      removeClass(this.classes.HOVER, this.$fill)
      this.leave('holdHover')
    }
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
    const that = this
    this.$wrap = parseHTML(
      template.compile(this.options.template())({
        classes: this.classes,
        addTypography: this.translate('addTypography'),
        fontFamily: this.translate('fontFamily')
      })
    )

    insertAfter(this.$wrap, this.element)

    this.$empty = query(`.${this.classes.EMPTY}`, this.$wrap)
    this.$fill = query(`.${this.classes.FILL}`, this.$wrap)
    this.$fillFont = query(`.${this.classes.FILLFONT}`, this.$fill)
    this.$fillFontName = query(`.${this.classes.FILLFONTNAME}`, this.$fill)
    this.$fillFontSub = query(`.${this.classes.FILLFONTSUB}`, this.$fill)
    this.$fillChange = query(`.${this.classes.FILLCHANGE}`, this.$fill)
    this.$fillRemove = query(`.${this.classes.FILLREMOVE}`, this.$fill)
    this.$editBtn = query(`.${this.classes.FILLEDIT}`, this.$fill)
    this.$trigger = query(`.${this.classes.TRIGGER}`, this.$wrap)
    this.$expandPanel = query(`.${this.classes.EXPANDPANEL}`, this.$wrap)
    this.$expandControl = query(
      `.${this.classes.EXPANDCONTROL}`,
      this.$expandPanel
    )
    this.$expandCancel = query(
      `.${this.classes.EXPANDCANCEL}`,
      this.$expandPanel
    )
    this.$expandSave = query(`.${this.classes.EXPANDSAVE}`, this.$expandPanel)

    // init pop
    this.pop = PopDialog.of(this.$fillRemove, {
      content: 'Are you sure you want to delete?',
      placement: 'bottom',
      buttons: {
        cancel: { label: 'Cancel' },
        delete: {
          label: 'Delete',
          color: 'danger',
          fn(resolve) {
            that.clear(true)
            compose(
              removeClass(that.classes.EXSIT),
              addClass(that.classes.WRITE)
            )(that.$wrap)
            resolve()
          }
        }
      }
    })
  }

  unbind() {
    removeEvent(this.eventName(), this.element)
  }

  update() {
    const value = this.val()
    this.element.value = value
    // set attr
    Object.entries(this.value).forEach(([i, v]) => {
      if (this.defaultVal[i] === v) {
        return
      }
      if (i === 'fontSize' || i === 'lineHeight') {
        return
      }
      if (i === 'fontFamily' && v !== 'inherit') {
        this.$fillFontName.textContent = v
      }
      if (i === 'textAlign') {
        i = 'align-self'
        setStyle('alignSelf', v, this.$fillFontSub)
      }

      i = i.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)

      const attr = {}
      attr[i] = v
      setStyle(attr, this.$fillFontName)
    })

    // set sub
    this.$fillFontSub.textContent = `${this.value.fontSize ||
      'inherit'} / ${this.value.lineHeight || 'inherit'}`
    if (this.value.fontFamily && this.value.fontFamily !== 'inherit') {
      compose(
        removeClass(this.classes.EXPAND),
        addClass(this.classes.EXSIT)
      )(this.$wrap)
    }
    this.trigger(EVENTS.CHANGE, value)
  }

  val(value) {
    if (typeof value === 'undefined') {
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

  set(value, update = true) {
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
      this.update()
    }
  }

  clear(update) {
    this.value = {}

    if (update !== false) {
      this.textAlign.clear()
      this.fontStyle.clear()
      this.textTransform.clear()
      this.textDecoration.clear()
      this.fontWeight.clear()
      this.lineHeight.clear()
      this.fontSize.clear()
      this.fontFamily.clear()

      this.update()
    }
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

  updateFontFamilyList(value) {
    this.fontFamily.values = value
    this.fontFamily.updateList()
  }

  setFontWeight(value) {
    this.value.fontFamily = value
    this.fontFamily.set(value)
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

  get() {
    return this.value
  }

  enable() {
    if (this.is('disabled')) {
      removeClass(this.classes.DISABLED, this.$wrap)
      this.pop.enable()
      this.element.disabled = false
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      addClass(this.classes.DISABLED, this.$wrap)
      this.pop.disable()
      this.element.disabled = true
      this.enter('disabled')
    }

    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('emptyized')) {
      this.unbind()
      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.element)
      }
      this.$wrap.remove()
      showElement(removeClass(`${this.classes.NAMESPACE}-input`, this.element))
      this.element.value = ''
      this.leave('emptyized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default FontEditor
