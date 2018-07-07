import Component from '@pluginjs/component'
import { deepMerge, compose } from '@pluginjs/utils'
import is from '@pluginjs/is'
import template from '@pluginjs/template'
import { addClass, removeClass } from '@pluginjs/classes'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { setStyle } from '@pluginjs/styled'
import {
  query,
  queryAll,
  parent,
  parseHTML,
  getObjData,
  setObjData,
  closest
} from '@pluginjs/dom'
import Scrollable from '@pluginjs/scrollable'
import EditPanel from '@pluginjs/edit-panel'
import PopDialog from '@pluginjs/pop-dialog'
import '@pluginjs/color-picker'
import '@pluginjs/range'
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

let DATA = null

@translateable(TRANSLATIONS)
@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@register(NAMESPACE, {
  defaults: DEFAULTS,
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class PatternPicker extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)
    this.options = deepMerge(DEFAULTS, options, this.getDataOptions())

    this.initClasses(CLASSES)

    addClass(this.classes.NAMESPACE, this.element)

    this.setupI18n()

    this.imgs = DATA
    this.data = {}

    this.foreColor = ''
    this.bgColor = this.options.bgcolor
    this.opacity = 1

    this.$selecting = null
    this.$selected = null

    this.$content = null

    this.initStates()
    this.initialize()
  }

  initialize() {
    this.create()
    this.bind()

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.$wrap)
    }

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
    // init pop
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
              that.$infoAction.fadeOut(100, () => {
                that.clear()
                that.$infoAction.fadeIn()
              })
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
    const $forePicker = parseHTML(
      `<input class='${this.classes.FORECOLOR}' type="text"/>`
    )
    const $bgPicker = parseHTML(
      `<input class='${this.classes.BGCOLOR}' type="text"/>`
    )
    const $opacityPicker = parseHTML(
      `<input class='${this.classes.OPACITY}' type="text"/>`
    )

    this.$editPanel = EditPanel.of(this.element, {
      init: { text: this.translate('choosePattern') },
      selector: {
        title: this.translate('selectorTitle'),
        contentTitle: this.translate('selectorContent')
      },
      components: [
        {
          title: this.translate('foreColor'),
          element: $forePicker,
          type: 'colorPicker',
          options: {
            theme: 'default',
            module: ['solid'],
            solidMode: 'sample',
            solidModule: {
              alpha: false,
              hex: false
            }
          }
        },
        {
          title: this.translate('bgColor'),
          element: $bgPicker,
          type: 'colorPicker',
          options: {
            theme: 'default',
            module: ['solid'],
            solidMode: 'sample',
            solidModule: {
              alpha: false,
              hex: false
            }
          }
        },
        {
          title: this.translate('opacity'),
          element: $opacityPicker,
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
            title: this.translate('cancel'),
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
          return `<div class='{class}'><image class='{content} ${
            that.classes.INFOIMG
          }' /></div>`
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
    const findInstanceByElement = (namespace, el) =>
      window.Pj.instances[namespace].find(plugin => plugin.element === el)
    this.$wrap = parent(this.element)
    this.$forePicker = findInstanceByElement('colorPicker', $forePicker)
    this.$bgPicker = findInstanceByElement('colorPicker', $bgPicker)
    this.$opacityPicker = findInstanceByElement('range', $opacityPicker)

    // set initial color
    this.$forePicker.val('#000')
    this.$bgPicker.val(this.bgColor)
    this.$opacityPicker.val('100%')
  }

  render() {
    Object.entries(this.imgs).forEach(([key, val]) => {
      const $img = parseHTML(
        template.compile(this.options.templates.item())({
          class: this.classes.SELECTORITEM
        })
      )

      const info = {
        name: key,
        'background-color': this.bgColor,
        // make '#' to '%23', fixed svg data image not working on FireFox.
        'background-image': val.replace(/\#+/g, '%23')
      }
      setObjData('info', info, $img)
      setStyle(
        {
          backgroundColor: this.bgColor,
          backgroundImage: val.replace(/\#+/g, '%23')
        },
        $img
      )

      this.$selectorList.append($img)
    })
  }

  bind() {
    // editor
    compose(
      bindEvent({
        type: this.eventName('click'),
        identity: `.${this.classes.EDITOR}`,
        handler: () => {
          if (this.is('disabled')) {
            return
          }
          this.$editPanel.openPanel()
        }
      }),

      // info action hover
      bindEvent({
        type: 'mouseover',
        identity: '.pj-editPanel-info',
        handler: () => {
          if (this.is('disabled')) {
            return
          }
          addClass(this.classes.HOVER, this.$infoAction)
        }
      }),
      bindEvent({
        type: 'mouseout',
        identity: '.pj-editPanel-info',
        handler: () => {
          if (this.is('disabled')) {
            return
          }
          if (this.is('holdHover')) {
            return
          }
          removeClass(this.classes.HOVER, this.$infoAction)
          this.leave('holdHover')
          return
        }
      })
    )(this.$wrap)
    // pop event
    this.pop.options.onShow = () => {
      this.enter('holdHover')
    }
    this.pop.options.onHide = () => {
      removeClass(this.classes.HOVER, this.$infoAction)
      this.leave('holdHover')
    }
    // update
    this.$editPanel.options.onUpdate = () => {
      if (!this.$selected) {
        return
      }

      this.update()
      return
    }

    // change
    this.$editPanel.options.onChange = () => {
      this.$selected = this.$selecting
      if (!this.$selected) {
        return
      }
      const info = getObjData('info', this.$selected)

      // let color = info['background-image']
      //   .match(/fill='.*?'/g)
      //   .toString()
      //   .match(/(\w){6,8}/g)
      //   .toString();
      // const opacity = parseFloat(
      //   info['background-image']
      //   .match(/fill-opacity='(.*?)'/g)
      //   .toString()
      //   .match(/\d\.\d*|\d/g)[0]
      // );
      setObjData('info', info, this.$previewImg)

      // if (color.length > 6) {
      //   color = `#${color.slice(2)}`;
      // } else {
      //   color = `#${color}`;
      // }
      // set foreColor bgPicker Opacity
      this.$bgPicker.val(this.options.format(info, 'background-color'))
      this.$forePicker.val(this.options.format(info, 'color'))
      this.$opacityPicker.val(`${this.options.format(info, 'opacity')}%`)

      // set preview
      this.setInfo(this.$previewImg)
      this.$editPanel.closeSelector()

      return
    }

    // update scorllable
    this.$editPanel.options.onOpenSelector = () => {
      this.$scrollable.enable()
      this.$scrollable.update()
    }

    // select SVG img
    bindEvent(
      {
        type: this.eventName('click'),
        identity: `.${this.classes.SELECTORITEM}`,
        handler: e => {
          const $this = e.target
          queryAll(`.${this.classes.SELECTORITEM}`, this.$selectorList).map(
            removeClass(this.classes.ACTIVE)
          )
          addClass(this.classes.ACTIVE, $this)
          this.$selecting = $this
        }
      },
      this.$selectorList
    )

    // components change
    this.$forePicker.options.onChange = val => {
      if (!this.$selected) {
        return
      }
      this.foreColor = val

      this.enter('foreChange')
      this.leave('bgChange')
      this.leave('opacityChange')
      this.updateComponent()

      return
    }
    this.$bgPicker.options.onChange = val => {
      if (!this.$selected) {
        return
      }

      this.bgColor = val.toHEX()

      this.leave('foreChange')
      this.enter('bgChange')
      this.leave('opacityChange')
      this.updateComponent()

      return
    }
    this.$opacityPicker.options.onChange = data => {
      if (!this.$selected) {
        return
      }

      this.opacity = data.value / 100

      this.leave('foreChange')
      this.leave('bgChange')
      this.enter('opacityChange')
      this.updateComponent()

      return
    }
  }

  unbind() {
    removeEvent(this.eventName(), this.$wrap)
    // this.$selectPanel.off(this.eventName());
    //
    // this.$forePicker.unbind();
    // this.$bgPicker.unbind();
    // this.$opacityConent.unbind();
  }

  update(data) {
    if (data) {
      setObjData('info', data, this.$previewImg)
      this.setInfo(this.$previewImg)
    } else {
      this.data = getObjData('info', this.$previewImg)
    }

    setObjData('info', getObjData('info', this.$previewImg), this.$infoImg)
    this.setInfo(this.$infoImg)
    this.element.value = this.val()
    this.$editPanel.closePanel()
    addClass(this.classes.SHOW, this.$wrap)
  }

  updateComponent() {
    let key = ''

    if (this.is('foreChange')) {
      key = 'foreColor'
    } else if (this.is('bgChange')) {
      key = 'bgColor'
    } else {
      key = 'opacity'
    }

    this.setAttr(key, this.$previewImg)
    queryAll(`.${this.classes.SELECTORITEM}`, this.$selectorList).forEach(
      $this => {
        this.setAttr(key, $this)
      }
    )
    this.element.value = this.options.process.call(
      this,
      getObjData('info', this.$previewImg)
    )
  }

  setInfo(img) {
    const imgData = getObjData('info', img)
    setStyle(
      {
        backgroundColor: imgData['background-color'],

        // make '#' to '%23', fixed svg data image not working on FireFox.
        backgroundImage: imgData['background-image'].replace(/\#+/g, '%23')
      },
      img
    )

    setObjData('info', imgData, img)
  }

  set(data) {
    if (!this.imgs || !data) {
      return
    }

    const name = data.name

    if (!this.imgs[name]) {
      return
    }

    this.data = data

    queryAll(`.${this.classes.SELECTORITEM}`, this.$selectorList).forEach(
      $this => {
        const info = getObjData('info', $this)

        removeClass(this.classes.ACTIVE, $this)

        if (info.name === name) {
          if (data['background-color']) {
            this.bgColor = data['background-color']
          } else {
            data['background-color'] = this.bgColor
          }

          addClass(this.classes.ACTIVE, $this)
          getObjData('info', data, $this)
          getObjData('info', data, this.$previewImg)

          this.$selected = $this

          this.$bgPicker.val(this.options.format(data, 'background-color'))
          this.$forePicker.val(this.options.format(data, 'color'))
          this.$opacityPicker.val(`${this.options.format(data, 'opacity')}%`)

          this.update(data)
        }
      }
    )

    return
  }

  setPreset(data) {
    queryAll(`.${this.classes.SELECTORITEM}`, this.$selectorList).map(el =>
      el.remove()
    )
    this.imgs = data
    this.render()
  }

  get() {
    return this.data
  }

  val(value) {
    if (is.undefined(value)) {
      return this.options.process.call(this, this.get())
    }
    const val = this.options.parse.call(this, value)
    this.set(val)
    return null
  }

  setAttr(key, el) {
    const info = getObjData('info', el)
    if (!info) {
      return
    }
    if (key !== 'bgColor') {
      const attr = key === 'opacity' ? 'opacity' : 'fill'
      const val = key === 'opacity' ? this.opacity : this.foreColor
      const reg = new RegExp(`${attr}='(.*?)'`, 'g')

      const img = info['background-image'].replace(reg, `${attr}='${val}'`)

      info['background-image'] = img
    } else {
      info['background-color'] = this.bgColor
    }
    setObjData('info', info, el)
    this.setInfo(el)
  }

  clear() {
    const clearInfoAndStyle = compose(
      setObjData('info', ''),
      setStyle({
        backgroundColor: 'transparent',
        backgroundImage: 'none'
      })
    )
    clearInfoAndStyle(this.$previewImg)
    clearInfoAndStyle(this.$infoImg)

    this.$selected = null
    this.$selecting = null

    this.$opacityPicker.val('100%')
    this.$forePicker.clear()
    this.$bgPicker.clear()

    removeClass(this.classes.SHOW, this.$wrap)
  }

  enable() {
    if (this.is('disabled')) {
      removeClass(this.classes.DISABLED, this.$wrap)
      this.pop.enable()
      this.$editPanel.enable()
      this.element.disabled = false
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      addClass(this.classes.DISABLED, this.$wrap)
      this.pop.disable()
      this.$editPanel.disable()
      this.element.disabled = true
      this.enter('disabled')
    }
    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      removeClass(this.classes.NAMESPACE, this.element)
      this.unbind()
      this.clear()
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

export default PatternPicker
