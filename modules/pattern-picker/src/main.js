import Component from '@pluginjs/component'
import { compose } from '@pluginjs/utils'
import template from '@pluginjs/template'
import { addClass, removeClass } from '@pluginjs/classes'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { setStyle } from '@pluginjs/styled'
import {
  query,
  queryAll,
  parent,
  parseHTML,
  getData,
  setData,
  wrap
} from '@pluginjs/dom'
// import Scrollable from '@pluginjs/scrollable'
import PopDialog from '@pluginjs/pop-dialog'
import ColorPicker from '@pluginjs/color-picker'
import Dropdown from '@pluginjs/dropdown'
import Range from '@pluginjs/range'
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

let DATA = null

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
class PatternPicker extends Component {
  constructor(element, options = {}) {
    super(element)
    this.setupOptions(DEFAULTS, options)
    this.setupClasses()

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

    this.setupStates()
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
    // const that = this

    // this.$infoImg = query(`.${this.classes.INFOIMG}`, this.$wrap)
    // this.$previewImg = query(`.${this.classes.PREVIEWIMG}`, this.$wrap)
    // this.$selectorList = query(
    //   `.${this.classes.SELECTORLIST} ul`,
    //   this.$editPanel.MODAL.$content
    // )
    // this.$scrollable = Scrollable.of(
    //   parentWith(hasClass(this.classes.SELECTORLIST), this.$selectorList),
    //   {
    //     contentSelector: '>',
    //     containerSelector: '>'
    //   }
    // )

    // this.$infoAction = parent(query(`.${this.classes.REMOVE}`, this.$wrap))
    const that = this

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
    this.$empty = parseHTML(
      template.compile(this.options.templates.empty())({
        classes: this.classes,
        icon: 'icon-picture',
        text: this.translate('choosePattern')
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
    this.$fill.append(this.$infoAction)
    this.$wrap.append(this.$trigger, this.$dropdown)
    this.$trigger.append(this.$empty, this.$fill)
    this.handelComponent()
    this.$dropdown.append(
      this.$previewBox,
      this.$forePickerBox,
      this.$bgColorBox,
      this.$opacityBox,
      this.$action
    )
    // init popDialog
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
    // const that = this
    const $forePicker = parseHTML(
      `<input class='${this.classes.FORECOLOR}' type="text"/>`
    )
    const $bgPicker = parseHTML(
      `<input class='${this.classes.BGCOLOR}' type="text"/>`
    )
    const $opacityPicker = parseHTML(
      `<input class='${this.classes.OPACITY}' type="text"/>`
    )

    this.$previewBox = parseHTML(
      `<div class='${this.classes.PREVIEW}'><div class='${
        this.classes.PREVIEWIMG
      }'></div></div>`
    )
    this.$preview = query(`.${this.classes.PREVIEWIMG}`, this.$preview)
    this.$forePickerBox = parseHTML(
      `<div class='${this.classes.COMPONENT}'><span class='${
        this.classes.TITLE
      }'>${this.translate('foreColor')}</span><div class='${
        this.classes.CONTENT
      }'><input class='${
        this.classes.FORECOLOR
      } pj-input' type='text' placeholder='choose color' /></div></div>`
    )
    this.$forePicker = query(`.${this.classes.FORECOLOR}`, this.$forePickerBox)
    this.$bgColorBox = parseHTML(
      `<div class='${this.classes.COMPONENT}'><span class='${
        this.classes.TITLE
      }'>${this.translate('bgColor')}</span><div class='${
        this.classes.CONTENT
      }'><input class='${
        this.classes.BGCOLOR
      } pj-input' type='text' placeholder='choose color' /></div></div>`
    )
    this.$bgColor = query(`.${this.classes.BGCOLOR}`, this.$bgColorBox)
    this.$opacityBox = parseHTML(
      `<div class='${this.classes.COMPONENT}'><span class='${
        this.classes.TITLE
      }'>${this.translate('opacity')}</span><div class='${
        this.classes.CONTENT
      }'><input class='${this.classes.OPACITY}' type='text' /></div></div>`
    )
    this.$opacity = query(`.${this.classes.OPACITY}`, this.$opacityBox)
    this.$action = parseHTML(
      `<div class='${this.classes.BTNACTION}'>
        <button type='button' class='${
          this.classes.CANCEL
        } pj-btn pj-btn-transparent'>Cancel</button>
        <button type='button' class='${
          this.classes.SAVE
        } pj-btn pj-btn-transparent'>Save</button>
      </div>`
    )

    Dropdown.of(this.$empty, {
      exclusive: false,
      templates: this.options.template,
      constraintToScrollParent: false,
      constraintToWindow: false,
      hideOnClick: false,
      hideOnSelect: false
    })

    ColorPicker.of(this.$forePicker, {
      theme: 'default',
      module: ['solid'],
      solidMode: 'sample',
      solidModule: {
        alpha: false,
        hex: false
      }
    })

    ColorPicker.of(this.$bgColor, {
      theme: 'default',
      module: ['solid'],
      solidMode: 'sample',
      solidModule: {
        alpha: false,
        hex: false
      }
    })

    Range.of(this.$opacity, {
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
    })
    // this.$editPanel = EditPanel.of(this.element, {
    //   init: { text: this.translate('choosePattern') },
    //   selector: {
    //     title: this.translate('selectorTitle'),
    //     contentTitle: this.translate('selectorContent')
    //   },
    //   components: [
    //     {
    //       title: this.translate('foreColor'),
    //       element: $forePicker,
    //       type: 'colorPicker',
    //       options: {
    //         theme: 'default',
    //         module: ['solid'],
    //         solidMode: 'sample',
    //         solidModule: {
    //           alpha: false,
    //           hex: false
    //         }
    //       }
    //     },
    //     {
    //       title: this.translate('bgColor'),
    //       element: $bgPicker,
    //       type: 'colorPicker',
    //       options: {
    //         theme: 'default',
    //         module: ['solid'],
    //         solidMode: 'sample',
    //         solidModule: {
    //           alpha: false,
    //           hex: false
    //         }
    //       }
    //     },
    //     {
    //       title: this.translate('opacity'),
    //       element: $opacityPicker,
    //       type: 'range',
    //       options: {
    //         theme: 'default',
    //         tip: false,
    //         range: false,
    //         units: {
    //           '%': {
    //             min: 0,
    //             max: 100,
    //             step: 1
    //           }
    //         }
    //       }
    //     }
    //   ],
    //   action: {
    //     panel: {
    //       cancel: {
    //         title: this.translate('cancel'),
    //         class: ''
    //       },
    //       save: {
    //         title: this.translate('save'),
    //         class: ''
    //       }
    //     },
    //     selector: {
    //       cancel: {
    //         title: this.translate('cancel'),
    //         class: ''
    //       },
    //       save: {
    //         title: this.translate('useIt'),
    //         class: ''
    //       }
    //     }
    //   },
    //   templates: {
    //     wrap() {
    //       return `<div class='${that.classes.WRAP} {class}'></div>`
    //     },
    //     info() {
    //       return `<div class='{class}'><image class='{content} ${
    //         that.classes.INFOIMG
    //       }' /></div>`
    //     },
    //     infoAction() {
    //       return `<div class='{class}'><i class='icon-pencil-square  ${
    //         that.classes.EDITOR
    //       }'></i><i class='icon-trash ${that.classes.REMOVE}'></i></div>`
    //     },
    //     previewContent() {
    //       return `<div class='{class} ${that.classes.PREVIEWIMG}'></div>`
    //     },
    //     selectorList() {
    //       return `<div class='${
    //         that.classes.SELECTORLIST
    //       }'><div><ul class='{class}'></ul></div></div>`
    //     }
    //   }
    // })

    this.$wrap = parent(this.element)
    this.$forePicker = ColorPicker.findInstanceByElement($forePicker)
    this.$bgPicker = ColorPicker.findInstanceByElement($bgPicker)
    this.$opacityPicker = Range.findInstanceByElement($opacityPicker)

    // set initial color
    // this.$forePicker.val('#000')
    // this.$bgPicker.val(this.bgColor)
    // this.$opacityPicker.val('100%')
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
        'background-image': val.replace(/\#+/g, '%23')/* eslint-disable-line */
      }
      setData('info', info, $img)
      setStyle(
        {
          backgroundColor: this.bgColor,
          backgroundImage: val.replace(/\#+/g, '%23') /* eslint-disable-line */
        },
        $img
      )

      this.$selectorList.append($img)
    })
  }

  bind() {
    // editor
    compose(
      bindEvent(this.eventName('click'), `.${this.classes.EDITOR}`, () => {
        if (this.is('disabled')) {
          return
        }
        this.$editPanel.openPanel()
      }),

      // info action hover
      bindEvent('mouseover', '.pj-editPanel-info', () => {
        if (this.is('disabled')) {
          return
        }
        addClass(this.classes.HOVER, this.$infoAction)
      }),
      bindEvent('mouseout', '.pj-editPanel-info', () => {
        if (this.is('disabled')) {
          return
        }
        if (this.is('holdHover')) {
          return
        }
        removeClass(this.classes.HOVER, this.$infoAction)
        this.leave('holdHover')
        return
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
      const info = getData('info', this.$selected)

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
      setData('info', info, this.$previewImg)

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
      this.eventName('click'),
      `.${this.classes.SELECTORITEM}`,
      e => {
        const $this = e.target
        queryAll(`.${this.classes.SELECTORITEM}`, this.$selectorList).map(
          removeClass(this.classes.ACTIVE)
        )
        addClass(this.classes.ACTIVE, $this)
        this.$selecting = $this
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
      setData('info', data, this.$previewImg)
      this.setInfo(this.$previewImg)
    } else {
      this.data = getData('info', this.$previewImg)
    }

    setData('info', getData('info', this.$previewImg), this.$infoImg)
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
      getData('info', this.$previewImg)
    )
  }

  setInfo(img) {
    const imgData = getData('info', img)
    setStyle(
      {
        backgroundColor: imgData['background-color'],

        // make '#' to '%23', fixed svg data image not working on FireFox.
        backgroundImage: imgData['background-image'].replace(/\#+/g, '%23')/* eslint-disable-line */

      },
      img
    )

    setData('info', imgData, img)
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
        const info = getData('info', $this)

        removeClass(this.classes.ACTIVE, $this)

        if (info.name === name) {
          if (data['background-color']) {
            this.bgColor = data['background-color']
          } else {
            data['background-color'] = this.bgColor
          }

          addClass(this.classes.ACTIVE, $this)
          getData('info', data, $this)
          getData('info', data, this.$previewImg)

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
    if (typeof value === 'undefined') {
      return this.options.process.call(this, this.get())
    }
    const val = this.options.parse.call(this, value)
    this.set(val)
    return null
  }

  setAttr(key, el) {
    const info = getData('info', el)
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
    setData('info', info, el)
    this.setInfo(el)
  }

  clear() {
    setData('info', '', this.$previewImg)
    setStyle(
      {
        backgroundColor: 'transparent',
        backgroundImage: 'none'
      },
      this.$previewImg
    )

    setData('info', '', this.$infoImg)
    setStyle(
      {
        backgroundColor: 'transparent',
        backgroundImage: 'none'
      },
      this.$infoImg
    )

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
