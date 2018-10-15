import Component from '@pluginjs/component'
import { compose } from '@pluginjs/utils'
import template from '@pluginjs/template'
import { addClass, removeClass } from '@pluginjs/classes'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { setStyle, hideElement, showElement } from '@pluginjs/styled'
import { isString, isNull } from '@pluginjs/is'
import {
  append,
  parseHTML,
  query,
  attr,
  wrap,
  unwrap,
  empty
} from '@pluginjs/dom'
import Clearable from './clearable'
import Dropdown from '@pluginjs/dropdown'
import { Color } from '@pluginjs/color'
import Alpha from './components/alpha'
import Hex from './components/hex'
import History from './components/history'
import Hue from './components/hue'
import Saturation from './components/saturation'
import Preview from './components/preview'
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
class ColorPicker extends Component {
  constructor(element, options = {}) {
    super(element)
    // options
    this.setupOptions(options)
    this.firstClassName = this.element.className
    this.setupI18n()
    // class
    this.setupClasses()
    compose(
      attr({ placeholder: this.options.placeholder }),
      addClass(this.classes.INPUT, 'pj-input')
    )(this.element)

    // init global vars
    this.$body = query('body')

    this.color = this.options.defaultColor || '#000'
    this.oldColor = null

    this.module = this.options.module
    this.COLOR = Color.of(this.options.defaultColor, this.options.color)

    this.setupStates()
    this.initialize()
  }

  initialize() {
    // take element defalut value
    this.elementColor = this.element.value

    this.createHtml()

    if (this.options.displayMode === 'inline') {
      hideElement(this.element)
      setStyle(
        {
          boxShadow: 'none',
          border: '1px solid #f2f2f2'
        },
        this.$panel
      )
    }

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.element)
    }

    this.initData()

    this.bind()

    if (this.options.clearable && this.options.displayMode === 'dropdown') {
      this.CLEARABLE = new Clearable(this)
    }

    if (this.element.disabled || this.options.disabled) {
      this.disable()
    }

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  initData() {
    if (this.elementColor) {
      this.val(this.elementColor)
    } else {
      this.clear()
    }
  }

  bind() {
    // input remove color
    if (this.options.displayMode !== 'inline') {
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
        this.eventName('change'),
        e => {
          this.set(e.target.value)
        },
        this.element
      )
    }

    // save
    bindEvent(
      this.eventName('click'),
      () => {
        if (this.options.displayMode !== 'inline') {
          this.closePanel()
        }
        this.trigger(EVENTS.CLICK, this.color)
      },
      this.$save
    )
  }

  createHtml() {
    const $wrap = this.createEl('wrap', { classes: this.classes })
    this.$wrap = wrap($wrap, this.element)
    wrap(`<div class='${this.classes.TRIGGER}'></div>`, this.element)

    if (this.options.displayMode !== 'inline') {
      // init preview
      this.initPreview()
    }

    // create panel
    this.initPanel()

    if (this.options.displayMode !== 'inline') {
      this.DROPDOWN = Dropdown.of(this.PREVIEW.element, {
        reference: this.element,
        target: this.$panel,
        hideOnSelect: false,
        hideOutClick: true,
        onShown: () => {
          this.oldColor = this.color
          showElement(this.$mask)

          if (this.HISTORY) {
            this.HISTORY.updateHistory()
          }
          this.leave('save')
        },
        onHided: () => {
          this.update()
          hideElement(this.$mask)
        }
      })
    }

    // create mask
    this.$mask = parseHTML(`<div class="${this.classes.MASK}"></div>`)
    append(this.$mask, this.$body)
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
    append(this.$panel, this.$wrap)

    this.registerComponent()
  }

  initSaturation() {
    const saturation = this.createEl('saturation', {
      classes: this.classes
    })
    append(saturation, query(`.${this.classes.PRIMARY}`, this.$panel))
      new Saturation(this, query(`.${this.classes.SATURATION}`, this.$panel))   /* eslint-disable-line */
  }
  initHue() {
    const hue = this.createEl('hue', { classes: this.classes })
    append(hue, query(`.${this.classes.PRIMARY}`, this.$panel))
     new Hue(this, query(`.${this.classes.HUE}`, this.$panel))   /* eslint-disable-line */
  }
  initAlpha() {
    const alpha = this.createEl('alpha', { classes: this.classes })
    append(alpha, query(`.${this.classes.PRIMARY}`, this.$panel))
     new Alpha(this, query(`.${this.classes.ALPHA}`, this.$panel))   /* eslint-disable-line */
  }

  initHex() {
     new Hex(this, query(`.${this.classes.HEX}`, this.$panel))  /* eslint-disable-line */

  }

  initHistory() {
    this.HISTORY = new History(
      this,
      query(`.${this.classes.HISTORY}`, this.$panel)
    )
  }

  initControl() {
    this.$save = this.createEl('save', {
      classes: this.classes,
      text: this.translate('ok')
    })

    append(this.$save, query(`.${this.classes.CONTROL}`, this.$panel))
  }

  createEl(tempName, options) {
    return parseHTML(
      template.compile(this.options.templates[tempName]())(options)
    )
  }

  setColor(val) {
    if (!val) {
      val = this.color
    }
    const color = this.COLOR.val(val)
    if (isString(val) && val.indexOf('#') > -1) {
      this.setInput(color.toHEX())
    } else if (isString(val) && !val.match(/\d/g)) {
      this.setInput(color.toNAME())
    } else {
      this.setInput(color.toRGBA())
    }
    if (this.options.displayMode !== 'inline') {
      this.PREVIEW.update(color)
    }

    this.trigger(EVENTS.CHANGE, color)
  }

  setInput(val) {
    this.color = val
    this.element.value = val
    return null
  }

  registerComponent() {
    if (this.module.saturation) {
      this.initSaturation()
    }

    if (this.module.hue) {
      this.initHue()
    }

    if (this.module.alpha) {
      this.initAlpha()
    }

    if (this.module.hex) {
      this.initHex()
    } else {
      query(`.${this.classes.HEX}`, this.$panel).remove()
    }
    if (this.module.history) {
      this.initHistory()
    } else {
      query(`.${this.classes.HISTORY}`, this.$panel).remove()
    }

    if (this.options.displayMode === 'dropdown' || this.options.showControl) {
      this.initControl()
    } else {
      query(`.${this.classes.CONTROL}`, this.$panel).remove()
    }
  }

  openPanel() {
    this.DROPDOWN.show()
  }

  closePanel() {
    this.enter('save')
    this.DROPDOWN.hide()
  }

  update() {
    if (this.is('save')) {
      this.element.value = this.color
      this.trigger(EVENTS.UPDATE, this.color)
    } else {
      this.color = this.oldColor

      this.setColor(this.color)
      this.element.value = this.color
    }
    // }

    return null
  }

  unbind() {
    removeEvent(this.eventName(), this.element)
  }

  val(color) {
    if (!color) {
      return this.get()
    }

    this.set(color)
    return null
  }

  get() {
    return this.color
  }

  set(val) {
    if (isNull(val)) {
      this.color = this.options.defaultColor || '#000'
      this.set(this.color)
      if (this.options.displayMode !== 'inline') {
        this.PREVIEW.update('transparent')
      }
      this.element.value = ''
    } else {
      this.color = val
      this.setColor(val)
    }

    return null
  }

  clear() {
    this.set(null)
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
      empty(this.element)
      this.element.className = this.firstClassName
      this.element.setAttribute('placeholder', '')
      unwrap(unwrap(this.element))
      if (this.options.displayMode !== 'inline') {
        this.PREVIEW.remove()
        if (this.options.clearable) {
          this.CLEARABLE.destroy()
        }
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
}

export default ColorPicker
