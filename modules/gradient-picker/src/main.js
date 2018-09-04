import Component from '@pluginjs/component'
import template from '@pluginjs/template'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { addClass, removeClass } from '@pluginjs/classes'
import {
  fadeOut,
  fadeIn,
  query,
  queryAll,
  // parent,
  parseHTML,
  setData,
  getData,
  // closest
  wrap
} from '@pluginjs/dom'
import { setStyle } from '@pluginjs/styled' // , getStyle
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
import { Color } from '@pluginjs/color'
// import Scrollable from '@pluginjs/scrollable'
import Range from '@pluginjs/range'
import ColorPicker from '@pluginjs/color-picker'
import Dropdown from '@pluginjs/dropdown'

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
class GradientPicker extends Component {
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

    this.bind()

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.element)
    }

    this.$selected = null

    this.initData()

    if (this.element.disabled || this.options.disabled) {
      this.disable()
    }

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  initData() {
    const data = this.element.value
    if (data) {
      this.val(data)
    }
  }

  create() {
    // const that = this
    this.handelComponent()

    this.$previewImg = query(`.${this.classes.PREVIEWIMG}`, this.$wrap)

    const that = this

    // init popDialog
    this.pop = PopDialog.of(
      query(`.${this.classes.REMOVE}`, this.$infoAction),
      {
        content: this.translate('deleteTitle'),
        placement: 'bottom',
        buttons: {
          cancel: { label: this.translate('cancel') },
          delete: {
            label: this.translate('delete'),
            color: 'danger',
            fn(resolve) {
              fadeOut(
                {
                  duration: 100,
                  callback: () => {
                    that.clear()
                    fadeIn(
                      {
                        duration: 100
                      },
                      that.$infoAction
                    )
                  }
                },
                that.$infoAction
              )
              resolve()
            }
          }
        }
      }
    )
    this.render()
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
    this.$trigger = parseHTML(
      template.compile(this.options.templates.trigger())({
        classes: this.classes
      })
    )
    this.$fill = parseHTML(
      template.compile(this.options.templates.fill())({
        classes: this.classes
      })
    )
    this.$fillImg = query(`.${this.classes.FILLIMG}`, this.$fill)
    this.$empty = parseHTML(
      template.compile(this.options.templates.empty())({
        classes: this.classes,
        icon: 'pj-icon pj-icon-paint',
        text: this.translate('chooseGradient')
      })
    )
    this.$dropdown = parseHTML(
      template.compile(this.options.templates.dropdown())({
        classes: this.classes
      })
    )
    this.$infoAction = parseHTML(
      template.compile(this.options.templates.infoAction())({
        classes: this.classes
      })
    )
    this.$wrap.append(this.$trigger, this.$dropdown)
    this.$trigger.append(this.$empty, this.$fill)
    this.$fill.append(this.$infoAction)

    this.$previewContent = parseHTML(
      `<div class='${this.classes.PREVIEW}'><div class='${
        this.classes.PREVIEWIMG
      }'></div></div>`
    )
    this.$customColor = parseHTML(
      `<div class='${this.classes.COMPONENT}'><span class='${
        this.classes.COMPONENTTITLE
      }'>${this.translate('customColor')}</span><div class='${
        this.classes.CONTENT
      }'><input class='${
        this.classes.COLORPICKER
      }' placeholder='choose color' /></div></div>`
    )
    this.$colorPicker = query(`.${this.classes.COLORPICKER}`, this.$customColor)
    this.$opacity = parseHTML(
      `<div class='${this.classes.COMPONENT}'><span class='${
        this.classes.COMPONENTTITLE
      }'>${this.translate('opacity')}</span><div class='${
        this.classes.CONTENT
      }'><input type='text' class='${this.classes.OPACITY}' /></div></div>`
    )
    const $opacity = query(`.${this.classes.OPACITY}`, this.$opacity)
    this.$action = parseHTML(
      `<div class='${this.classes.BTNACTION}'>
      <button type='button' class='${
        this.classes.CANCEL
      } pj-btn pj-btn-transparent'>Cancel</button>
      <button type='button' class='${
        this.classes.SAVE
      } pj-btn pj-btn-primary'>Save</button>
      </div>`
    )
    this.$dropdown.append(
      this.$previewContent,
      this.$customColor,
      this.$opacity,
      this.$action
    )

    this.DROPDOWN = Dropdown.of(this.$empty, {
      target: this.$dropdown,
      reference: this.$trigger,
      templates: this.options.template,
      hideoutClick: false,
      hideOnSelect: false
    })

    this.COLORPICKER = ColorPicker.of(this.$colorPicker, {
      theme: 'default',
      module: ['gradient'],
      locale: this.options.locale,
      onUpdate: () => {
        this.data.name = ''
        this.data.color = this.COLORPICKER.GRADIENT.gradientValue
        // this.setPreview(val);
        this.setOpacity()
        this.leave('preset')
        this.enter('custom')
      },
      onOpenPanel: () => {
        this.COLORPICKER.POPPER.scheduleUpdate()
      }
    })

    this.OPACITY = Range.of($opacity, {
      theme: 'default',
      tip: false,
      range: false,
      units: {
        '%': {
          min: 0,
          max: 100,
          step: 1
        }
      },
      onChange: val => {
        this.data.opacity = val.value / 100
        this.setOpacity()
      }
    })

    this.OPACITY.val(100)
  }

  render() {
    if (!this.colors) {
      return false
    }

    const color = Object.entries(this.colors)

    const info = {
      name: color[0][0],
      background: color[0][1]
    }

    setData('info', info, this.$previewImg)
    setStyle('background', color[0][1], this.$previewImg)
    return null
  }

  bind() {
    // editor
    bindEvent(
      this.eventName('click'),
      `.${this.classes.EDITOR}`,
      () => {
        this.DROPDOWN.show()
        return false
      },
      this.$wrap
    )

    // info hover
    bindEvent(
      this.eventName('mouseover'),
      () => {
        addClass(this.classes.HOVER, this.$infoAction)
      },
      this.$fill
    )
    bindEvent(
      this.eventName('mouseout'),
      () => {
        if (this.is('holdHover')) {
          return false
        }
        removeClass(this.classes.HOVER, this.$infoAction)
        this.leave('holdHover')
        return null
      },
      this.$fill
    )
    // pop events
    this.pop.options.onShow = () => {
      this.enter('holdHover')
    }
    this.pop.options.onHide = () => {
      removeClass(this.classes.HOVER, this.$infoAction)
      this.leave('holdHover')
    }

    // select background color
    bindEvent(
      this.eventName('click'),
      `.${this.classes.SELECTORITEM}`,
      e => {
        const $this = e.target
        queryAll(`.${this.classes.SELECTORITEM}`, this.$selectorList).map(
          removeClass(this.classes.ACTIVE)
        )
        addClass(this.classes.ACTIVE, $this)
        this.$selected = $this
        this.data.name = name
      },
      this.$selectorList
    )

    bindEvent(
      this.eventName('click'),
      `.${this.classes.SAVE}`,
      () => {
        if (this.data.opacityColor === '') {
          return
        }
        this.DROPDOWN.hide()
        addClass(this.classes.SHOW, this.$wrap)
        setStyle(
          'background',
          this.data.opacityColor,
          query(`.${this.classes.FILLIMG}`, this.$fill)
        )
        this.update()
        this.enter('state')
      },
      this.$action
    )

    bindEvent(
      this.eventName('click'),
      `.${this.classes.CANCEL}`,
      () => {
        this.DROPDOWN.hide()
        if (!this.is('state')) {
          removeClass(this.classes.SHOW, this.$wrap)
        }
      },
      this.$action
    )
  }

  unbind() {
    removeEvent(this.eventName(), this.$wrap)
    this.DROPDOWN.unbind()
  }

  update() {
    let color =
      parseFloat(this.data.opacity, 10) === 1
        ? this.data.color
        : this.data.opacityColor

    if (color === '') {
      color = 'transparent'
    }
    setStyle('background', color, this.$fillImg)

    this.element.value = this.options.process(this.data)
  }

  setOpacity(val) {
    const opacity = val ? val : this.data.opacity
    const oldColor = this.data.color
    const newColor = oldColor.replace(
      /(rgba\(.+?\))|(rgb\(.+?\))|(#\w{3,6})/gi,
      val => {
        if (val) {
          let color = Color.of(val).toRGBA()
          color = color.replace(/\d\.\d+\)$|\d\)$/gi, val => {
            const num = parseFloat(val.split(')')[0], 10)

            if (val) {
              return `${opacity * num})`
            }

            return null
          })

          return color
        }

        return null
      }
    )
    this.data.opacityColor = newColor
    this.setPreview(newColor)
  }

  set(data) {
    this.data = Object.assign({}, this.data, data)

    if (this.data.name !== '') {
      if (getData('info', this.$previewImg).name === this.data.name) {
        const bgColor = getData('info', this.$previewImg).background

        this.data.color = bgColor
        this.colorPicker.val(bgColor)
      }
    } else {
      this.colorPicker.val(this.data.color)
    }

    this.OPACITY.val(this.data.opacity * 100 || '100')
    this.setOpacity()
    this.setPreview(this.data.opacityColor)
    this.update()
    addClass(this.classes.SHOW, this.$wrap)
  }

  get() {
    return this.data
  }

  val(val) {
    if (val) {
      this.set(this.options.parse.call(this, val))
      return false
    }

    return this.options.process.call(this, this.get())
  }

  setPreset(data) {
    this.colors = data

    // this.render()
  }

  setPreview(color) {
    setStyle('background', color, this.$previewImg)
  }

  clear() {
    this.data = {
      name: '',
      color: '',
      opacity: 1,
      opacityColor: ''
    }

    setStyle('background', 'none', this.$previewImg)
    setStyle('background', 'none', this.$fillImg)

    this.COLORPICKER.clear()
    this.OPACITY.val(100)

    // removeClass(
    //   this.classes.ACTIVE,
    //   query(`.${this.classes.SELECTORITEM}`, this.$selectorList)
    // )
    removeClass(this.classes.SHOW, this.$wrap)
    this.leave('state')
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

export default GradientPicker
