import Component from '@pluginjs/component'
import { compose } from '@pluginjs/utils'
import template from '@pluginjs/template'
import { addClass, removeClass } from '@pluginjs/classes'
import { bindEvent } from '@pluginjs/events'
import { hideElement } from '@pluginjs/styled'
import {
  append,
  parseHTML,
  children,
  query,
  attr,
  wrap,
  //   unwrap,
  getData
  //   empty
} from '@pluginjs/dom'
// import Tooltip from '@pluginjs/tooltip'
// import Scrollable from '@pluginjs/scrollable'
import Dropdown from '@pluginjs/dropdown'
import ColorPicker from '@pluginjs/color-picker'
import GradientPicker from '@pluginjs/gradient-picker'
// import Popper from 'popper.js'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  translateable,
  optionable
} from '@pluginjs/decorator'
// import { Color } from '@pluginjs/color'
// import { Gradient } from '@pluginjs/gradient'
// import Alpha from './components/alpha'
import Preview from './components/preview'
// import Contrast from './components/contrast'
// import Hex from './components/hex'
// import History from './components/history'
// import Hue from './components/hue'
// import Saturation from './components/saturation'
// import Collection from './modules/collection'
// import Solid from './modules/solid'
// import Gradients from './modules/gradient'
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
    if (options.module) {
      this.options.module = options.module
    }
    //   this.firstClassName = this.element.className
    this.setupI18n()
    // class
    this.setupClasses()
    compose(
      attr({ placeholder: this.options.placeholder }),
      addClass(this.classes.INPUT, 'pj-input')
    )(this.element)
    // init global vars
    this.$body = query('body')

    //   this.module = this.options.module[0]
    //   this.contrast = true
    //   this.history = true

    this.data = DATA
    //   this.color = null
    //   this.oldColor = null
    //   this.solidModule = this.options.solidModule

    //   this.info = {
    //     collection: '',
    //     solid: this.options.defaultColor || '#000',
    //     gradient: 'linear-gradient(90deg, #fff 0%,#000 100%)'
    //   }
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
    // swtichover default mode
    this.switchModule()

    this.bind()
  }

  bind() {
    // input remove color
    if (this.options.displayMode !== 'inline') {
      compose(
        bindEvent(this.eventName('click'), `.${this.classes.REMOVE}`, () => {
          hideElement(this.$remove)
          this.clear()
        }),
        bindEvent(
          this.eventName('mouseout'),
          `.${this.classes.TRIGGER}`,
          () => {
            hideElement(this.$remove)
          }
        ),
        bindEvent(
          this.eventName('mouseover'),
          `.${this.classes.TRIGGER}`,
          () => {
            if (this.element.value.length > 0) {
              if (!this.is('disabled')) {
                this.$remove.style.display = 'inline'
              }
            }
          }
        )
      )(this.$wrap)
    }

    // switch mode
    bindEvent(
      this.eventName('click'),
      `.${this.classes.PANELTRIGGER}>i`,
      e => {
        const $this = e.target
        this.switchModule(getData('type', $this))
      },
      this.$panel
    )
  }

  initRemove() {
    const $remove = this.createEl('remove', { classes: this.classes })
    append($remove, query(`.${this.classes.TRIGGER}`, this.$wrap))
    this.$remove = query(`.${this.classes.REMOVE}`, this.$wrap)
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
    this.options.module.forEach(v => {
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
      if (this.options.module.length <= 1) {
        hideElement(query(`.${this.classes.PANELTRIGGER}`, this.$panel))
      }
    })

    append(this.$panel, this.$wrap)

    // init element
    this.$trigger = query(`.${this.classes.PANELTRIGGER}`, this.$panel)
    this.$container = query(`.${this.classes.PANELCONTAINER}`, this.$panel)

    // init Popper
    this.setupDropdown()
  }

  initFrame() {
    const $wrap = this.createEl('wrap', { class: this.classes.WRAP })
    this.$wrap = wrap($wrap, this.element)
    wrap(`<div class='${this.classes.TRIGGER}'></div>`, this.element)

    // init remove button
    this.initRemove()
    // init preview
    this.initPreview()

    // create panel
    this.initPanel()
  }

  setupDropdown() {
    this.DROPDOWN = new Dropdown(this.element, {
      target: this.$panel,
      hideOnSelect: false,
      hideOutClick: false
    })

    this.setupSolid()
    this.setupGradient()
  }

  setupSolid() {
    this.colorPickerTrigger = query('.pj-colorSelector-solid', this.$wrap)
    this.COLORPICKER = new ColorPicker(this.colorPickerTrigger, {
      displayMode: 'inline'
    })
  }

  setupGradient() {
    this.gradientPickerTrigger = query('.pj-colorSelector-gradient', this.$wrap)
    this.GRADIENTPICKER = new GradientPicker(this.gradientPickerTrigger, {
      displayMode: 'inline'
    })
  }

  switchModule(typeName) {
    if (!typeName) {
      typeName = 'solid'
    }
    // this.saveMarker(typeName)
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

    if (typeName === 'collection' && this.scrollable) {
      this.scrollable.update()
    }
    // switch module state
    this.enter(`${typeName}Module`)
    this.module = typeName

    // switch (this.module) {
    //   case 'solid':
    //     this.SOLID.setSolid(this.info.solid)
    //     break
    //   case 'collection':
    //     this.COLLECTION.setCollection(this.info.collection)
    //     break
    //   case 'gradient':
    //     this.GRADIENT.setGradient(this.info.gradient)
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

  openPanel() {
    this.DROPDOWN.show()
  }

  closePanel() {
    this.enter('save')
    this.DROPDOWN.hide()
  }

  static setCollectionData(data) {
    DATA = data
  }
}

export default ColorSelector
