import Component from '@pluginjs/component'
import { compose, triggerNative } from '@pluginjs/utils'
import template from '@pluginjs/template'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { addClass, removeClass } from '@pluginjs/classes'
import {
  query,
  queryAll,
  // parent,
  parseHTML,
  setData,
  getData,
  children,
  // has,
  wrap
} from '@pluginjs/dom'
import { setStyle, hideElement } from '@pluginjs/styled' // , getStyle
import GradientPicker from '@pluginjs/gradient-picker'
import Dropdown from '@pluginjs/dropdown'
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

    // this.color = new Color()

    this.data = {
      name: '',
      color: ''
    }
    this.actived = false

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
      // this.disable()
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
        `.${this.classes.GRADIENTTRIGGER}`,
        e => {
          if (this.actived) {
            addClass(this.classes.TRIGGERACTIVE, e.target)
          } else {
            removeClass(this.classes.TRIGGERACTIVE, e.target)
          }
        }
      )
    )(this.$panel)

    // select color
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
        this.switchModule('gradient')
        this.setPlugins()
        this.updateColor()
      },
      this.$panel
    )
  }

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
    this.$fillImg = query(`.${this.classes.FILLIMG}`, this.TRIGGER.$fill)

    this.$panel = this.createEl('panel', {
      classes: this.classes
    })
    this.$wrap.append(this.$panel)

    this.$trigger = query(`.${this.classes.TRIGGERPANEL}`, this.$panel)
    this.$container = query(`.${this.classes.CONTAINERPANEL}`, this.$panel)

    this.setupCollection()
    this.setupGradientPicker()
    this.setupDropdown(this.options.dropdown)
  }

  setupDropdown(options) {
    this.DROPDOWN = Dropdown.of(this.TRIGGER.$empty, {
      ...options,
      target: this.$panel,
      responsiveFull: this.options.responsiveDropdownFull,
      reference: this.TRIGGER.$trigger,
      templates: this.options.template,
      hideOutClick: true,
      hideOnSelect: false,
      onShown: () => {
        this.$selected = this.$selecting
        if (this.$selected) {
          const data = JSON.parse(
            JSON.stringify(getData('info', this.$fillImg))
          )
          setData('info', data, this.TRIGGER.$fill)
        }

        this.switchModule(this.module)
        this.GRADIENTPICKER.COLORPICKER.HISTORY.updateHistory()
        this.leave('save')
      },
      onHided: () => {
        this.update()
        removeClass(this.classes.OPENDISABLE, this.TRIGGER.$trigger)
      }
    })
  }

  setupCollection() {
    this.COLLECTION = new Collection(
      this,
      query(`.${this.classes.COLLECTIONPANEL}`, this.$panel)
    )
  }

  setupGradientPicker() {
    this.$elGradientPicker = query(`.${this.classes.GRADIENT}`, this.$container)
    this.GRADIENTPICKER = new GradientPicker(this.$elGradientPicker, {
      inline: true,
      showControl: true,
      onUpdate: color => {
        this.color = color
        // this.updateColor()
        this.setAttr(this.$fillImg)
      },
      onClick: () => {
        this.enter('save')
        this.DROPDOWN.hide()
      }
    })
  }

  switchModule(typeName) {
    if (!typeName) {
      typeName = 'collection'
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
        if (typeName === 'gradient') {
          this.GRADIENTPICKER.clearMarks()
          this.GRADIENTPICKER.GRADIENT.reorder()
          this.GRADIENTPICKER.GRADIENT.value.stops.forEach((v, i) => {
            let percent = parseFloat(v.position * 100, 10)
            if (i === this.GRADIENTPICKER.GRADIENT.length - 1) {
              percent = 100
            } else if (i === 0) {
              percent = 0
            }
            const options = {
              color: v.color.toRGBA(),
              index: i,
              percent
            }
            // this.actionBarSize = getData('value', $marker).maxLenght
            this.GRADIENTPICKER.addMarker(0, options)
          })

          this.GRADIENTPICKER.COLORPICKER.Saturation.init()
          this.GRADIENTPICKER.COLORPICKER.Saturation.position(
            this.GRADIENTPICKER.COLORPICKER.COLOR.val(getData('value', this.GRADIENTPICKER.$marker).color)
          )
        }
      }
    })

    if (typeName === 'collection' && this.scrollable) {
      this.scrollable.update()
    }
    // switch module state
    this.enter(`${typeName}Module`)
    this.module = typeName

    // switch (this.module) {
    //   case 'solid':
    //     this.setInput(this.COLORPICKER.color)
    //     this.COLORPICKER.HISTORY.updateHistory()
    //     break
    //   case 'gradient':
    //     this.setInput(this.GRADIENTPICKER.color)
    //     this.GRADIENTPICKER.COLORPICKER.HISTORY.updateHistory()
    //     break
    //   default:
    //     break
    // }
    this.trigger(EVENTS.SWITCHMODULE, this.module)
  }

  createEl(tempName, options) {
    return parseHTML(
      template.compile(this.options.templates[tempName]())(options)
    )
  }

  setAttr(el) {
    const info = getData('info', el)
    if (!info) {
      return
    }

    info.color = this.color

    setData('info', info, el)

    this.setInfo(el)
  }

  setInfo(color) {
    const colorData = getData('info', color)
    setStyle(
      {
        backgroundImage: colorData.color
      },
      color
    )

    setData('info', colorData, color)
  }

  updateColor() {
    if (this.$selecting) {
      this.GRADIENTPICKER.val(getData('info', this.$selecting).color)
    }
    this.setInfo(this.$fillImg)
  }

  setPlugins() {
    const info = JSON.parse(JSON.stringify(getData('info', this.$selecting)))
    setData('info', info, this.$fillImg)
  }

  update(data, trigger = true) {
    if (this.is('save')) {
      if (data) {
        setData('info', data, this.$fillImg)
        this.setInfo(this.$fillImg)
      } else {
        this.data = getData('info', this.$fillImg)
      }
      this.module = 'gradient'
      this.actived = true
      this.element.value = this.val()
      addClass(this.classes.SHOW, this.$wrap)

      if (trigger) {
        this.trigger(EVENTS.CHANGE, this.data)
        triggerNative(this.element, 'change')
      }
    } else if (!this.$selected) {
      this.clear()
    } else {
      const info = JSON.parse(
        JSON.stringify(getData('info', this.TRIGGER.$fill))
      )
      setData('info', info, this.$fillImg)
      this.GRADIENTPICKER.val(info.color)
      // set preview
      this.setInfo(this.$fillImg)
    }
  }

  get() {
    return this.data
  }

  val(value, trigger = true) {
    if (typeof value === 'undefined') {
      return this.options.process.call(this, this.get())
    }
    const val = this.options.parse.call(this, value)
    this.set(val, trigger)
    return null
  }

  set(data, trigger = true) {
    if (!this.colors || !data) {
      return
    }

    const name = data.name

    if (!this.colors[name]) {
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
        addClass(this.classes.COLLECTIONITEMACTIVE, $this)
        setData('info', data, this.$fillImg)

        this.$selecting = $this

        this.GRADIENTPICKER.set(data.color)

        this.enter('save')
        this.update(data, trigger)
      }
    })
  }

  clear() {
    setData('info', '', this.$fillImg)
    setStyle(
      {
        backgroundImage: 'none'
      },
      this.$fillImg
    )

    this.GRADIENTPICKER.clear()

    this.$selecting = null
    this.$selected = null
    this.actived = false
    this.module = this.options.module

    this.element.value = ''

    removeClass(this.classes.SHOW, this.$wrap)
  }

  unbind() {
    removeEvent(this.eventName(), this.element)
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
