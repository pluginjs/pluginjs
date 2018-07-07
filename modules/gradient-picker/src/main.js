import Component from '@pluginjs/component'
import { deepMerge } from '@pluginjs/utils'
import template from '@pluginjs/template'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { addClass, removeClass } from '@pluginjs/classes'
import {
  query,
  queryAll,
  parent,
  parseHTML,
  setObjData,
  getObjData,
  closest
} from '@pluginjs/dom'
import { fadeOut, fadeIn } from '@pluginjs/dom'
import { setStyle, getStyle } from '@pluginjs/styled'
import PopDialog from '@pluginjs/pop-dialog'
import EditPanel from '@pluginjs/edit-panel'
import core, {
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
import color from '@pluginjs/color'
import Scrollable from '@pluginjs/scrollable'
import '@pluginjs/range'
import '@pluginjs/color-picker'

let DATA = {}

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
class GradientPicker extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)
    this.options = deepMerge(DEFAULTS, options, this.getDataOptions())

    this.initClasses(CLASSES)
    this.setupI18n()

    addClass(this.classes.NAMESPACE, this.element)

    this.color = color()

    this.data = {
      name: '',
      color: '',
      opacity: 1,
      opacityColor: ''
    }

    this.initStates()
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
    const that = this
    this.handelComponent()

    this.$infoImg = query(`.${this.classes.INFOIMG}`, this.$wrap)
    this.$previewImg = query(`.${this.classes.PREVIEWIMG}`, this.$wrap)
    this.$selectorList = query(
      `.${this.classes.SELECTORLIST} ul`,
      this.$editPanel.MODAL.content
    )
    this.$scrollable = Scrollable.of(
      closest(`.${this.classes.SELECTORLIST}`, this.$selectorList),
      {
        contentSelector: '>',
        containerSelector: '>'
      }
    )

    this.$infoAction = parent(query(`.${this.classes.REMOVE}`, this.$wrap))
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
    const that = this
    this.$colorPicker = parseHTML(
      `<input class='${this.classes.COLORPICKER}' />`
    )
    const $opacity = parseHTML(
      `<input class='${this.classes.OPACITY}' type="text"/>`
    )

    this.$editPanel = EditPanel.of(this.element, {
      init: {
        icon: 'icon-paint',
        text: this.translate('chooseGradient')
      },
      selector: {
        title: this.translate('selectTitle'),
        contentTitle: this.translate('selectContentTitle')
      },
      components: [
        {
          title: this.translate('customColor'),
          element: this.$colorPicker,
          type: 'colorPicker',
          options: {
            theme: 'default',
            module: ['gradient'],
            locale: this.options.locale
          }
        },
        {
          title: this.translate('opacity'),
          element: $opacity,
          type: 'range',
          options: {
            theme: 'default',
            tip: false,
            range: false,
            units: {
              '%': {
                min: 0,
                max: 100,
                step: 1
              }
            }
          }
        }
      ],
      action: {
        panel: {
          cancel: {
            title: this.translate('cancel'),
            class: ''
          },
          save: {
            title: this.translate('save'),
            class: ''
          }
        },
        selector: {
          cancel: {
            title: this.translate('selectCancel'),
            class: ''
          },
          save: {
            title: this.translate('useIt'),
            class: ''
          }
        }
      },
      templates: {
        wrap() {
          return `<div class='${that.classes.WRAP} {class}'></div>`
        },
        info() {
          return `<div class='{class}'><div class='{content} ${
            that.classes.INFOIMG
          }'></div></div>`
        },

        infoAction() {
          return `<div class='{class}'><i class='icon-pencil-square  ${
            that.classes.EDITOR
          }'></i><i class='icon-trash ${that.classes.REMOVE}'></i></div>`
        },
        previewContent() {
          return `<div class='{class} ${that.classes.PREVIEWIMG}'></div>`
        },
        selectorList() {
          return `<div class='${
            that.classes.SELECTORLIST
          }'><div><ul class='{class}'></ul></div></div>`
        }
      }
    })

    this.$wrap = parent(this.element)
    // set initialization color
    this.colorPicker = window.Pj.instances.colorPicker.find(
      plugin => plugin.element === this.$colorPicker
    )
    this.colorPicker.clear()

    this.opacity = window.Pj.instances.range.find(
      plugin => plugin.element === $opacity
    )

    this.opacity.val(100)
  }

  render() {
    if (!this.colors) {
      return false
    }

    Object.entries(this.colors).forEach(([key, val]) => {
      const $color = parseHTML(
        template.compile(this.options.templates.item())({
          class: this.classes.SELECTORITEM
        })
      )

      const info = {
        name: key,
        background: val
      }

      setObjData('info', info, $color)
      setStyle({ background: val }, $color)

      this.$selectorList.append($color)
    })
    return null
  }

  bind() {
    // editor
    bindEvent(
      {
        type: this.eventName('click'),
        identity: { type: 'selector', value: `.${this.classes.EDITOR}` },
        handler: () => {
          this.$editPanel.openPanel()
        }
      },
      this.$wrap
    )

    this.$editPanel.options.onOpenSelector = () => {
      if (!this.$scrollable) {
        return false
      }
      this.$scrollable.enable()
      this.$scrollable.update()
      return true
    }
    // info hover
    bindEvent(
      {
        type: this.eventName('mouseover'),
        identity: { type: 'selector', value: '.pj-editPanel-info' },
        handler: () => {
          addClass(this.classes.HOVER, this.$infoAction)
        }
      },
      this.$wrap
    )
    bindEvent(
      {
        type: this.eventName('mouseout'),
        identity: { type: 'selector', value: '.pj-editPanel-info' },
        handler: () => {
          if (this.is('holdHover')) {
            return false
          }
          removeClass(this.classes.HOVER, this.$infoAction)
          this.leave('holdHover')
          return null
        }
      },
      this.$wrap
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
      {
        type: this.eventName('click'),
        identity: { type: 'selector', value: `.${this.classes.SELECTORITEM}` },
        handler: e => {
          const $this = e.target
          queryAll(`.${this.classes.SELECTORITEM}`, this.$selectorList).map(
            removeClass(this.classes.ACTIVE)
          )
          addClass(this.classes.ACTIVE, $this)
          this.$selected = $this
          this.data.name = name
        }
      },
      this.$selectorList
    )

    // change
    this.$editPanel.options.onChange = () => {
      if (!this.$selected) {
        return false
      }

      this.data.color = getStyle('background-image', this.$selected)
      this.colorPicker.val(this.data.color)
      this.setOpacity()
      this.$editPanel.closeSelector()

      this.leave('custom')
      this.enter('preset')
      return null
    }

    // update
    this.$editPanel.options.onUpdate = () => {
      if (!this.data.name && !this.data.color) {
        return false
      }

      this.update()
      this.$editPanel.closePanel()
      addClass(this.classes.SHOW, this.$wrap)
      return null
    }

    // colorPicker update
    this.colorPicker.options.onUpdate = val => {
      this.data.name = ''
      this.data.color = val
      // this.setPreview(val);
      this.setOpacity()

      this.leave('preset')
      this.enter('custom')
    }

    // fixed tetherjs position problem
    this.colorPicker.options.onOpenPanel = () => {
      this.colorPicker.POPPER.scheduleUpdate()
    }

    // opacity change
    this.opacity.options.onChange = val => {
      this.data.opacity = val.value / 100
      this.setOpacity()
    }
  }

  unbind() {
    removeEvent(this.eventName(), this.$wrap)
    this.$editPanel.unbind()
  }

  update() {
    let color =
      parseFloat(this.data.opacity, 10) === 1
        ? this.data.color
        : this.data.opacityColor

    if (color === '') {
      color = 'transparent'
    }
    setStyle({ background: color }, this.$infoImg)

    this.element.value = this.options.process(this.data)
  }

  setOpacity(val) {
    const opacity = val ? val : this.data.opacity
    const oldColor = this.data.color
    const newColor = oldColor.replace(
      /(rgba\(.+?\))|(rgb\(.+?\))|(#\w{3,6})/gi,
      val => {
        if (val) {
          let color = core.color(val).toRGBA()
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
      const $items = queryAll(
        `.${this.classes.SELECTORITEM}`,
        this.$selectorList
      )
      $items.map(removeClass(this.classes.ACTIVE))

      $items.forEach(el => {
        const $this = el
        if (getObjData('info', $this).name === this.data.name) {
          const bgColor = getObjData('info', $this).background
          addClass(this.classes.ACTIVE, $this)

          this.data.color = bgColor
          this.$selected = $this
          this.colorPicker.val(bgColor)
        }
      })
    } else {
      this.colorPicker.val(this.data.color)
    }

    this.opacity.val(this.data.opacity * 100 || '100')
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

    this.render()
  }

  setPreview(color) {
    setStyle({ background: `${color}` }, this.$previewImg)
  }

  clear() {
    this.data = {
      name: '',
      color: '',
      opacity: 1,
      opacityColor: ''
    }

    setStyle({ background: 'none' }, this.$previewImg)
    setStyle({ background: 'none' }, this.$infoImg)

    this.colorPicker.clear()
    this.opacity.val(100)

    removeClass(
      this.classes.ACTIVE,
      query(`.${this.classes.SELECTORITEM}`, this.$selectorList)
    )
    this.$selected = null
    removeClass(this.classes.SHOW, this.$wrap)
  }

  enable() {
    if (this.is('disabled')) {
      this.$editPanel.enable()
      this.element.disabled = false
      this.leave('disabled')
      removeClass(this.classes.DISABLED, this.$wrap)
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      this.$editPanel.disable()
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
      this.$editPanel.destroy()
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
