import Component from '@pluginjs/component'
import { compose } from '@pluginjs/utils'
import template from '@pluginjs/template'
import { addClass, removeClass } from '@pluginjs/classes'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { setStyle, hideElement } from '@pluginjs/styled' // , getStyle
import {
  query,
  queryAll,
  children,
  parseHTML,
  getData,
  setData,
  wrap
} from '@pluginjs/dom'
import ColorPicker from '@pluginjs/color-picker'
import Dropdown from '@pluginjs/dropdown'
import Range from '@pluginjs/range'
import Trigger from './trigger'
import Collection from './collection'
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
    this.setupOptions(options)
    this.setupClasses()

    addClass(this.classes.NAMESPACE, this.element)

    this.setupI18n()

    this.imgs = DATA
    this.data = {}

    this.foreColor = ''
    this.bgColor = this.options.bgColor
    this.opacity = 1
    this.module = this.options.module

    this.$selecting = null
    this.$selected = null
    this.actived = false

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
      this.val(data, false)
    } else {
      this.clear()
    }
  }

  bind() {
    compose(
      // manage event
      bindEvent(this.eventName('click'), `.${this.classes.MANAGE}`, () => {
        this.options.manage()
      }),
      // switch mode
      bindEvent(
        this.eventName('click'),
        `.${this.classes.TRIGGERPANEL}>i`,
        e => {
          const $this = e.target
          this.switchModule(getData('type', $this))
        }
      ),
      bindEvent(
        this.eventName('mouseover'),
        `.${this.classes.CUSTOMTRIGGER}`,
        e => {
          if (this.actived) {
            addClass(this.classes.TRIGGERACTIVE, e.target)
          } else {
            removeClass(this.classes.TRIGGERACTIVE, e.target)
          }
        }
      )
    )(this.$panel)

    // select SVG img
    bindEvent(
      this.eventName('click'),
      `.${this.classes.COLLECTIONITEM}`,
      e => {
        const $this = e.target
        queryAll(
          `.${this.classes.COLLECTIONITEM}`,
          this.COLLECTION.$selectorList
        ).map(removeClass(this.classes.COLLECTIONITEMACTIVE))
        addClass(this.classes.COLLECTIONITEMACTIVE, $this)
        this.$selecting = $this
        this.actived = true
        addClass(this.classes.SHOW, this.$wrap)
        this.switchModule('custom')
        this.setPlugins()
      },
      this.$panel
    )

    // save
    bindEvent(
      this.eventName('click'),
      `.${this.classes.SAVE}`,
      () => {
        this.enter('save')
        if (this.$selecting) {
          this.DROPDOWN.hide()
        }
      },
      this.$control
    )
  }

  unbind() {
    removeEvent(this.eventName())
  }

  create() {
    addClass(this.classes.INPUT, this.element)
    this.$wrap = wrap(
      `<div class='${this.classes.NAMESPACE}'></div>`,
      this.element
    )
    if (this.options.theme) {
      addClass(this.classes.THEME, this.$wrap)
    }

    this.TRIGGER = new Trigger(this)
    this.$fillImg = query(`.${this.classes.FILLIMG}`, this.TRIGGER.$fill)

    this.$panel = this.createEl('panel', {
      classes: this.classes
    })
    this.$wrap.append(this.$panel)

    this.handelComponent()
    // init element
    this.$trigger = query(`.${this.classes.TRIGGERPANEL}`, this.$panel)
    this.$container = query(`.${this.classes.CONTAINERPANEL}`, this.$panel)

    this.setupDropdown()
    // this.render()
  }

  setupCollection() {
    this.COLLECTION = new Collection(
      this,
      query(`.${this.classes.COLLECTIONPANEL}`, this.$panel)
    )
  }

  handelComponent() {
    this.$custom = query(`.${this.classes.CUSTOMPANEL}`, this.$panel)
    this.$foreColor = this.createEl('foreColor', {
      classes: this.classes,
      field: this.getClassName(this.classes.NAMESPACE, 'foreColor'),
      foreColor: 'foreColor'
    })

    this.$bgColor = this.createEl('bgColor', {
      classes: this.classes,
      field: this.getClassName(this.classes.NAMESPACE, 'bgColor'),
      bgColor: 'bgColor'
    })

    this.$opacity = this.createEl('opacity', {
      classes: this.classes,
      field: this.getClassName(this.classes.NAMESPACE, 'opacity'),
      opacity: 'opacity'
    })

    this.$control = this.createEl('control', {
      classes: this.classes,
      text: this.translate('save')
    })

    this.$custom.append(
      this.$foreColor,
      this.$bgColor,
      this.$opacity,
      this.$control
    )

    this.setupField()
  }

  setupDropdown() {
    this.DROPDOWN = Dropdown.of(this.TRIGGER.$empty, {
      target: this.$panel,
      reference: this.TRIGGER.$trigger,
      templates: this.options.template,
      hideOutClick: true,
      hideOnSelect: false,
      onShown: () => {
        this.$selected = this.$selecting
        if (this.$selected) {
          const data = JSON.parse(
            JSON.stringify(getData('info', this.$selected))
          )
          setData('info', data, this.TRIGGER.$fill)
        }
        this.switchModule(this.module)
        this.leave('save')
      },
      onHided: () => {
        this.update()
        removeClass(this.classes.OPENDISABLE, this.TRIGGER.$trigger)
      }
    })

    this.setupCollection()
  }

  setupField() {
    this.$elForeColor = query(`.${this.classes.FORECOLOR}`, this.$foreColor)
    this.FORECOLOR = ColorPicker.of(this.$elForeColor, {
      theme: 'default',
      module: {
        hex: false
      },
      onChange: val => {
        this.foreColor = val

        this.enter('foreChange')
        this.leave('bgChange')
        this.leave('opacityChange')
        this.updateComponent()

        return
      }
    })

    this.$elBgColor = query(`.${this.classes.BGCOLOR}`, this.$bgColor)
    this.BGCOLOR = ColorPicker.of(this.$elBgColor, {
      theme: 'default',
      module: {
        hex: false
      },
      onChange: val => {
        this.bgColor = val.toHEX()
        this.leave('foreChange')
        this.enter('bgChange')
        this.leave('opacityChange')
        this.updateComponent()
        // return
      }
    })

    this.$elOpacity = query(`.${this.classes.OPACITY}`, this.$opacity)
    this.OPACITY = Range.of(this.$elOpacity, {
      theme: 'default',
      input: true,
      tip: false,
      range: false,
      units: {
        '%': {
          min: 0,
          max: 100,
          step: 1
        }
      },
      onChange: data => {
        this.opacity = data / 100

        this.leave('foreChange')
        this.leave('bgChange')
        this.enter('opacityChange')
        this.updateComponent()

        // return
      }
    })
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

    this.setAttr(key, this.$fillImg)
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

  switchModule(typeName) {
    if (!typeName) {
      typeName = this.module
    }
    if (!this.actived) {
      typeName = 'collection'
    }
    // switch panel tirgger
    children(this.$trigger).forEach(($this, i) => {
      const $content = children(this.$container)[i]

      removeClass(this.classes.SELECTED, $this)
      hideElement($content)
      this.leave(`${getData('type', $this)}Module`)
      if (getData('type', $this) === typeName) {
        addClass(this.classes.SELECTED, $this)
        $content.style.display = 'block'
        // showElement($content)
      }
    })
    // switch module state
    this.enter(`${typeName}Module`)
    this.module = typeName

    this.trigger(EVENTS.SWITCHMODULE, this.module)
  }

  getClassName(namespace, field) {
    return template.compile(this.classes.FIELD)({ namespace, field })
  }

  createEl(tempName, options) {
    return parseHTML(
      template.compile(this.options.templates[tempName]())(options)
    )
  }

  setPlugins() {
    this.$selected = this.$selecting
    if (!this.$selected) {
      return
    }

    const info = JSON.parse(JSON.stringify(getData('info', this.$selected)))
    setData('info', info, this.$fillImg)

    if (info['background-color']) {
      this.bgColor = info['background-color']
    } else {
      info['background-color'] = this.options.bgColor
    }

    this.BGCOLOR.val(this.options.format(info, 'background-color'))
    this.FORECOLOR.val(this.options.format(info, 'color'))
    this.OPACITY.val(`${this.options.format(info, 'opacity')}%`)

    // set preview
    this.setInfo(this.$fillImg)
  }

  setPreset(data) {
    queryAll(
      `.${this.classes.COLLECTIONITEM}`,
      this.COLLECTION.$selectorList
    ).map(el => el.remove())
    this.imgs = data
    this.render()
  }

  update(data, trigger = true) {
    if (this.is('save')) {
      if (data) {
        setData('info', data, this.$fillImg)
        this.setInfo(this.$fillImg)
      } else {
        this.data = getData('info', this.$fillImg)
      }

      this.module = 'custom'
      this.actived = true
      this.element.value = this.val()
      addClass(this.classes.SHOW, this.$wrap)

      if (trigger) {
        this.trigger(EVENTS.CHANGE, this.data)
      }
    } else if (!this.$selected) {
      this.clear()
    } else {
      const info = JSON.parse(JSON.stringify(getData('info', this.$selected)))

      setData('info', info, this.$fillImg)

      if (info['background-color']) {
        this.bgColor = info['background-color']
      } else {
        info['background-color'] = this.options.bgColor
      }

      this.BGCOLOR.val(this.options.format(info, 'background-color'))
      this.FORECOLOR.val(this.options.format(info, 'color'))
      this.OPACITY.val(`${this.options.format(info, 'opacity')}%`)

      // set preview
      this.setInfo(this.$fillImg)
    }
  }

  get() {
    return this.data
  }

  set(data, trigger = true) {
    if (!this.imgs || !data) {
      return
    }
    const name = data.name

    if (!this.imgs[name]) {
      return
    }

    this.data = data

    queryAll(
      `.${this.classes.COLLECTIONITEM}`,
      this.COLLECTION.$selectorList
    ).forEach($this => {
      const info = getData('info', $this)
      removeClass(this.classes.COLLECTIONITEMACTIVE, $this)
      if (info.name === name) {
        if (data['background-color']) {
          this.bgColor = data['background-color']
        } else {
          data['background-color'] = this.bgColor
        }
        addClass(this.classes.COLLECTIONITEMACTIVE, $this)
        // getObjData('info', data, $this)
        setData('info', data, this.$fillImg)

        this.$selecting = $this

        this.BGCOLOR.val(this.options.format(data, 'background-color'))
        this.FORECOLOR.val(this.options.format(data, 'color'))
        this.OPACITY.val(`${this.options.format(data, 'opacity')}%`)
        this.enter('save')
        this.update(data, trigger)
      }
    })

    return
  }

  val(value, trigger = true) {
    if (typeof value === 'undefined') {
      console.log(111)
      console.log(this.get(), 111)
      return this.options.process.call(this, this.get())
    }
    console.log(222)
    const val = this.options.parse.call(this, value)
    this.set(val, trigger)
    return null
  }

  clear() {
    setData('info', '', this.$fillImg)
    setStyle(
      {
        backgroundColor: 'transparent',
        backgroundImage: 'none'
      },
      this.$fillImg
    )

    this.OPACITY.val('100%')
    this.FORECOLOR.clear()
    this.BGCOLOR.clear()

    this.$selecting = null
    this.$selected = null
    this.actived = false
    this.module = this.options.module

    this.element.value = ''

    removeClass(this.classes.SHOW, this.$wrap)
    this.leave('state')
  }

  enable() {
    if (this.is('disabled')) {
      removeClass(this.classes.DISABLED, this.$wrap)
      this.TRIGGER.CLEARPOP.enable()
      this.DROPDOWN.enable()
      this.element.disabled = false
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      addClass(this.classes.DISABLED, this.$wrap)
      this.TRIGGER.CLEARPOP.disable()
      this.DROPDOWN.disable()
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

export default PatternPicker
