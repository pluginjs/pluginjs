import Component from '@pluginjs/component'
import { compose, triggerNative } from '@pluginjs/utils'
import template from '@pluginjs/template'
import { addClass, removeClass } from '@pluginjs/classes'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { hideElement } from '@pluginjs/styled'
import { isNull } from '@pluginjs/is'
import {
  append,
  parseHTML,
  children,
  query,
  attr,
  wrap,
  unwrap,
  getData,
  empty
} from '@pluginjs/dom'
import Dropdown from '@pluginjs/dropdown'
import ColorPicker from '@pluginjs/color-picker'
import GradientPicker from '@pluginjs/gradient-picker'
import { Gradient } from '@pluginjs/gradient'
import { Color } from '@pluginjs/color'
import Clearable from './clearable'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  translateable,
  optionable
} from '@pluginjs/decorator'
import Preview from './components/preview'
import Collection from './collection'
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
class ColorSelector extends Component {
  constructor(element, options = {}) {
    super(element)
    // options
    this.setupOptions(options)
    this.modules = this.options.gradient
      ? ['collection', 'solid', 'gradient']
      : ['collection', 'solid']

    this.setupI18n()
    // class
    this.setupClasses()
    compose(
      attr({ placeholder: this.options.placeholder }),
      addClass(this.classes.INPUT, 'pj-input')
    )(this.element)
    // init global vars
    this.$body = query('body')

    this.data = DATA || this.options.data
    this.oldColor = {}
    this.color = ''
    // init
    this.setupStates()
    this.initialize()
  }

  initialize() {
    // take element defalut value
    this.elementColor = this.element.value

    // init frame
    this.initFrame()

    // set theme
    if (this.options.theme) {
      addClass(this.getThemeClass(), this.$wrap)
    }

    if (this.options.clearable) {
      this.CLEARABLE = new Clearable(this)
    }

    if (this.element.disabled || this.options.disabled) {
      this.disable()
    }

    // swtichover default mode
    this.switchModule()

    // set default data
    this.initData()
    this.bind()
    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  initData() {
    if (this.elementColor) {
      this.val(this.elementColor, false)
    } else {
      this.clear()
    }
  }

  bind() {
    // input remove color
    if (this.options.clearable) {
      compose(
        bindEvent(this.eventName('click'), `.${this.classes.CLEAR}`, () => {
          hideElement(this.CLEARABLE.element)
        }),
        bindEvent(
          this.eventName('mouseout'),
          `.${this.classes.TRIGGER}`,
          () => {
            hideElement(this.CLEARABLE.element)
          }
        ),
        bindEvent(
          this.eventName('mouseover'),
          `.${this.classes.TRIGGER}`,
          () => {
            if (this.element.value.length > 0) {
              if (!this.is('disabled')) {
                this.CLEARABLE.element.style.display = 'inline'
              }
            }
          }
        )
      )(this.$wrap)
    }

    bindEvent(
      this.eventName('input'),
      e => {
        if (
          new Color().matchString(e.target.value) ||
          new Gradient().matchString(e.target.value)
        ) {
          this.set(this.options.parse.call(this, e.target.value))
        }
      },
      this.element
    )

    compose(
      // manage event
      bindEvent(this.eventName('click'), `.${this.classes.MANAGE}`, () => {
        this.options.manage()
      }),
      // switch mode
      bindEvent(
        this.eventName('click'),
        `.${this.classes.PANELTRIGGER}>i`,
        e => {
          const $this = e.target
          this.switchModule(getData('type', $this))
        }
      ),
      // Collection event
      bindEvent(
        this.eventName('click'),
        `.${this.classes.COLLECTIONITEM}`,
        e => {
          const info = getData('info', e.target)
          this.selectCollection = info
          this.set({ module: 'collection', color: info.title })
          this.closePanel()
        }
      )
    )(this.$panel)
  }

  initPreview() {
    const $preview = this.createEl('preview', {
      classes: this.classes
    })
    append($preview, query(`.${this.classes.TRIGGER}`, this.$wrap))
    this.PREVIEW = new Preview(
      this,
      query(`.${this.classes.PREVIEW}`, this.$wrap)
    )
  }

  initPanel() {
    this.$panel = this.createEl('panel', {
      classes: this.classes
    })

    // set module
    this.modules.forEach(v => {
      const triggerClassName = `${this.classes.PANELTRIGGER}-${v}`
      const wrapClassName = `${this.classes.PANEL}-${v}`
      const colorClassName = `${this.classes.NAMESPACE}-${v}`
      const trigger = this.createEl(`${v}Trigger`, { class: triggerClassName })
      const wrap = this.createEl('moduleWrap', {
        classes: {
          wrapClassName,
          colorClassName
        }
      })
      append(trigger, query(`.${this.classes.PANELTRIGGER}`, this.$panel))
      append(wrap, query(`.${this.classes.PANELCONTAINER}`, this.$panel))
      if (this.modules.length <= 1) {
        hideElement(query(`.${this.classes.PANELTRIGGER}`, this.$panel))
      }
    })

    append(this.$panel, this.$wrap)
    query(`.${this.classes.NAMESPACE}-collection`, this.$panel).remove()

    // init element
    this.$trigger = query(`.${this.classes.PANELTRIGGER}`, this.$panel)
    this.$container = query(`.${this.classes.PANELCONTAINER}`, this.$panel)

    // init Popper
    this.setupDropdown(this.options.dropdown)
  }

  initFrame() {
    const $wrap = this.createEl('wrap', { class: this.classes.WRAP })
    this.$wrap = wrap($wrap, this.element)
    wrap(`<div class='${this.classes.TRIGGER}'></div>`, this.element)

    // init preview
    this.initPreview()

    // create panel
    this.initPanel()
  }

  setupDropdown(options) {
    this.setupCollection()
    this.setupSolid()
    this.setupGradient()

    this.DROPDOWN = new Dropdown(this.PREVIEW.element, {
      ...options,
      reference: this.element,
      target: this.$panel,
      responsiveFull: this.options.responsiveDropdownFull,
      hideOnSelect: false,
      hideOutClick: true,
      onShown: () => {
        this.leave('save')
        this.COLORPICKER.oldColor = this.COLORPICKER.color
        if (this.options.gradient) {
          this.GRADIENTPICKER.oldColor = this.GRADIENTPICKER.color
        }

        this.oldColor.module = this.module
        this.oldColor.color = this.color
        this.switchModule(this.module)
      },
      onHided: () => {
        this.update()
      }
    })
  }

  setupCollection() {
    this.COLLECTION = new Collection(
      this,
      query(`.${this.classes.PANELCOLLECTION}`, this.$panel)
    )
  }

  setupSolid() {
    this.colorPickerTrigger = query('.pj-colorSelector-solid', this.$wrap)
    this.COLORPICKER = new ColorPicker(this.colorPickerTrigger, {
      ...this.options.colorPicker,
      inline: true,
      showControl: true,
      onChangeColor: (color, val) => {
        if (this.module === 'solid') {
          this.setInput(val)
        }
      },
      onClick: val => {
        this.enter('save')
        this.COLORPICKER.HISTORY.set(val)
        this.DROPDOWN.hide()
      }
    })
  }

  setupGradient() {
    if (!this.options.gradient) {
      return
    }
    this.gradientPickerTrigger = query('.pj-colorSelector-gradient', this.$wrap)
    this.GRADIENTPICKER = new GradientPicker(this.gradientPickerTrigger, {
      ...this.options.gradientPicker,
      inline: true,
      showControl: true,
      onUpdate: val => {
        if (this.module === 'gradient') {
          this.setInput(val)
        }
      },
      onClick: () => {
        this.enter('save')
        this.DROPDOWN.hide()
      }
    })
  }

  switchModule(typeName) {
    if (!typeName) {
      typeName = 'solid'
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

        if (typeName === 'solid' && this.options.responsiveDropdownFull) {
          this.COLORPICKER.Saturation.init()
        } else if (
          typeName === 'gradient' &&
          this.options.responsiveDropdownFull
        ) {
          this.GRADIENTPICKER.COLORPICKER.Saturation.init()
        }
      }
    })

    // switch module state
    this.enter(`${typeName}Module`)
    this.module = typeName

    switch (this.module) {
      case 'solid':
        this.setInput(this.COLORPICKER.color)
        this.COLORPICKER.HISTORY.updateHistory()
        break
      case 'gradient':
        this.setInput(this.GRADIENTPICKER.color)
        this.GRADIENTPICKER.COLORPICKER.HISTORY.updateHistory()
        break
      default:
        break
    }
    this.trigger(EVENTS.SWITCHMODULE, this.module)
  }

  setInput(val) {
    this.color = val
    this.element.value = val
    this.trigger(EVENTS.CHANGECOLOR, val)
    return null
  }

  createEl(tempName, options) {
    return parseHTML(
      template.compile(this.options.templates[tempName]())(options)
    )
  }

  openPanel() {
    this.DROPDOWN.show()
  }

  closePanel() {
    this.enter('save')
    this.DROPDOWN.hide()
  }

  update(trigger = true) {
    if (this.is('save')) {
      this.setInput(this.color)
      if (trigger) {
        this.trigger(EVENTS.CHANGE, this.color)
        triggerNative(this.element, 'change')
      }
    } else {
      this.color = this.oldColor.color
      this.module = this.oldColor.module
      this.setInput(this.color)
      this.COLORPICKER.set(this.COLORPICKER.oldColor)
      if (this.options.gradient) {
        this.GRADIENTPICKER.reset()
      }
    }
  }

  clear(trigger = false) {
    if (trigger) {
      this.trigger(EVENTS.CHANGE, '')
      triggerNative(this.element, 'change')
    }
    this.set(null, false)
  }

  unbind() {
    removeEvent(this.eventName(), this.element)
  }

  val(color, trigger = true) {
    if (!color) {
      return this.options.process.call(this, this.get(), this.module)
    }

    const val = this.options.parse.call(this, color)

    this.set(val, trigger)

    return null
  }

  get() {
    return this.color
  }

  set(val, trigger = true) {
    if (isNull(val)) {
      this.color = ''
      this.COLORPICKER.clear()
      if (this.options.gradient) {
        this.GRADIENTPICKER.clear()
      }
      this.switchModule(this.modules[0])
      this.PREVIEW.update('transparent')
      this.element.value = ''
    } else {
      const module = val.module
      const color = val.color

      this.color = color
      this.switchModule(module)

      // collection
      if (module === 'collection') {
        this.COLLECTION.setCollection(color)
        return false
      }

      // gradient
      if (module === 'gradient') {
        if (typeof color === 'string' && color.indexOf('gradient') > -1) {
          this.GRADIENTPICKER.set(color)
        }
        return false
      }

      // solid
      if (module === 'solid') {
        this.COLORPICKER.set(color)
      }

      this.enter('save')
      this.update(trigger)
      this.leave('save')
    }

    return null
  }

  enable() {
    if (this.is('disabled')) {
      this.element.disabled = false
      this.leave('disabled')
    }
    removeClass(this.classes.DISABLED, this.$wrap)
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      this.DROPDOWN.disable()
      this.element.disabled = true
      this.enter('disabled')
    }
    addClass(this.classes.DISABLED, this.$wrap)
    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()
      this.clear()
      this.DROPDOWN.destroy()
      empty(this.element)
      this.element.setAttribute('placeholder', '')
      unwrap(unwrap(this.element))
      this.PREVIEW.remove()

      if (this.options.clearable) {
        this.CLEARABLE.destroy()
      }

      this.$panel.remove()
      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.element)
      }
      this.leave('initialized')
    }
    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }

  static setCollectionData(data) {
    DATA = data
  }
}

export default ColorSelector
