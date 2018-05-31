import Component from '@pluginjs/component'
import { deepMerge, compose } from '@pluginjs/utils'
import is from '@pluginjs/is'
import template from '@pluginjs/template'
import { parseHTML, query, insertAfter } from '@pluginjs/dom'
import { addClass, removeClass } from '@pluginjs/classes'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { hideElement, showElement, setStyle } from '@pluginjs/styled'
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
  info as INFO,
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
@register(
  NAMESPACE,
  {
    defaults: DEFAULTS,
    methods: METHODS,
    dependencies: DEPENDENCIES
  },
  INFO
)
class FontEditor extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)

    this.options = deepMerge(DEFAULTS, options, this.getDataOptions())
    this.initClasses(CLASSES)

    hideElement(addClass(`${this.classes.NAMESPACE}-input`, this.element))

    this.setupI18n()

    this.initStates()
    this.initialize()
  }

  initialize() {
    this.createHtml()

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.$wrap)
    }

    this.defaultVal = this.initVal()
    this.value = Object.assign(
      {},
      this.defaultVal,
      this.options.parse(this.element.value.replace(/'/g, '"'))
    )

    // init
    this.fontFamily = new FontFamily(this)
    this.fontSize = new FontSize(this)
    this.lineHeight = new LineHeight(this)
    this.fontWeight = new FontWeight(this)
    this.textAlign = new TextAlign(this)
    this.fontStyle = new FontStyle(this)
    this.textTransform = new TextTransform(this)
    this.textDecoration = new TextDecoration(this)

    if (
      this.value.fontFamily === 'inherit' ||
      is.undefined(this.value.fontFamily)
    ) {
      compose(removeClass(this.classes.EXSIT), addClass(this.classes.EMPTY))(
        this.$wrap
      )
      this.$infoFontName.textContent = this.translate('fontFamily')
    } else {
      compose(addClass(this.classes.EXSIT), removeClass(this.classes.EMPTY))(
        this.$wrap
      )
      this.$infoFontName.textContent = this.value.fontFamily
    }

    this.bind()

    if (this.element.disabled || this.options.disabled) {
      this.disable()
    }

    this.set(this.value, true)

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  bind() {
    const that = this

    bindEvent(
      {
        type: this.eventName('click'),
        handler: () => {
          if (that.is('disabled')) {
            return
          }

          addClass(that.classes.EXPAND, that.$wrap)
          return
        }
      },
      this.$initial
    )

    compose(
      bindEvent({
        type: this.eventName('mouseenter'),
        handler: ({ target }) => {
          if (that.is('disabled')) {
            return false
          }

          addClass(that.classes.HOVER, target)
          return false
        }
      }),
      bindEvent({
        type: this.eventName('mouseleave'),
        handler: ({ target }) => {
          if (that.is('disabled')) {
            return false
          }
          if (that.is('holdHover')) {
            return false
          }
          removeClass(that.classes.HOVER, target)
          that.leave('holdHover')
          return false
        }
      })
    )(this.$info)

    bindEvent(
      {
        type: this.eventName('click'),
        handler: () => {
          if (that.is('disabled')) {
            return
          }

          addClass(that.classes.EXPAND, that.$wrap)
          return
        }
      },
      this.$editBtn
    )

    // this.$infoRemove.bindEvent({
    // type: this.eventName('click'),
    // handler: () => {
    //   that.clear(true);
    //   that.$wrap.removeClass(that.classes.EXSIT).addClass(that.classes.EMPTY);
    //   return false;
    // });

    bindEvent(
      {
        type: this.eventName('click'),
        handler: () => {
          removeClass(this.classes.EXPAND, this.$wrap)
          return
        }
      },
      this.$expandCancel
    )

    bindEvent(
      {
        type: this.eventName('click'),
        handler: () => {
          // if ($.isEmptyObject(that.value)) {
          //   that.$wrap.removeClass(that.classes.EXSIT).addClass(that.classes.EMPTY);
          // }
          this.update()
          return
        }
      },
      this.$expandSave
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
        namespace: this.classes.NAMESPACE,
        addTypography: this.translate('addTypography'),
        fontFamily: this.translate('fontFamily')
      })
    )

    insertAfter(this.$wrap, this.element)

    this.$initial = query(`.${this.classes.NAMESPACE}-initial`, this.$wrap)

    this.$info = query(`.${this.classes.NAMESPACE}-info`, this.$wrap)
    this.$infoFont = query(`.${this.classes.NAMESPACE}-info-font`, this.$info)
    this.$infoFontName = query(
      `.${this.classes.NAMESPACE}-info-font-name`,
      this.$info
    )
    this.$infoFontSub = query(
      `.${this.classes.NAMESPACE}-info-font-sub`,
      this.$info
    )
    this.$infoChange = query(
      `.${this.classes.NAMESPACE}-info-change`,
      this.$info
    )
    this.$infoRemove = query(
      `.${this.classes.NAMESPACE}-info-remove`,
      this.$info
    )
    this.$editBtn = query(`.${this.classes.NAMESPACE}-info-edit`, this.$info)

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
    this.pop = PopDialog.of(this.$infoRemove, {
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
              addClass(that.classes.EMPTY)
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
        this.$infoFontName.textContent = v
      }
      if (i === 'textAlign') {
        i = 'align-self'
        setStyle({ alignSelf: v }, this.$infoFontSub)
      }

      i = i.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)

      const attr = {}
      attr[i] = v
      setStyle(attr, this.$infoFontName)
    })

    // set sub
    this.$infoFontSub.textContent = `${this.value.fontSize ||
      'inherit'} / ${this.value.lineHeight || 'inherit'}`
    if (this.value.fontFamily && this.value.fontFamily !== 'inherit') {
      compose(removeClass(this.classes.EXPAND), addClass(this.classes.EXSIT))(
        this.$wrap
      )
    }
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

  set(value, update = true) {
    if (update !== false) {
      if (!is.undefined(value.textAlign)) {
        this.textAlign.set(value.textAlign)
      } else {
        this.textAlign.clear()
      }

      if (!is.undefined(value.fontStyle)) {
        this.fontStyle.set(value.fontStyle)
      }
      if (!is.undefined(value.textTransform)) {
        this.textTransform.set(value.textTransform)
      }

      if (!is.undefined(value.textDecoration)) {
        this.textDecoration.set(value.textDecoration)
      }

      if (!is.undefined(value.fontWeight)) {
        this.fontWeight.set(value.fontWeight)
      }
      if (!is.undefined(value.lineHeight)) {
        this.lineHeight.set(value.lineHeight)
      }
      if (!is.undefined(value.fontSize)) {
        this.fontSize.set(value.fontSize)
      }
      if (!is.undefined(value.fontFamily)) {
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
    if (this.is('initialized')) {
      this.unbind()
      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.element)
      }
      this.$wrap.remove()
      showElement(removeClass(`${this.classes.NAMESPACE}-input`, this.element))
      this.element.value = ''
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default FontEditor
