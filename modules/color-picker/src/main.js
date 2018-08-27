import Component from '@pluginjs/component'
import { compose } from '@pluginjs/utils'
import template from '@pluginjs/template'
import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { hideElement, showElement } from '@pluginjs/styled' // setStyle
import {
  append,
  parseHTML,
  parent,
  children,
  // prepend,
  query,
  attr,
  parentWith,
  wrap,
  unwrap,
  // setData,
  getData,
  empty
} from '@pluginjs/dom'
import Tooltip from '@pluginjs/tooltip'
// import Scrollable from '@pluginjs/scrollable'
import Popper from 'popper.js'
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
import Alpha from './components/alpha'
import Preview from './components/preview'
// import Contrast from './components/contrast'
import Hex from './components/hex'
import History from './components/history'
import Hue from './components/hue'
import Saturation from './components/saturation'
import Collection from './modules/collection'
import Solid from './modules/solid'
import Gradients from './modules/gradient'
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
class ColorPicker extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)
    // options
    this.initOptions(DEFAULTS, options)
    if (options.module) {
      this.options.module = options.module
    }
    this.firstClassName = this.element.className
    this.setupI18n()
    // class
    this.initClasses(CLASSES)
    compose(
      attr({ placeholder: this.options.placeholder }),
      addClass(this.classes.NAMESPACE, 'pj-input')
    )(this.element)
    // init global vars
    this.$body = query('body')

    this.module = this.options.module[0]
    this.contrast = true
    this.history = true

    this.data = DATA
    this.color = null
    this.oldColor = null
    this.solidModule = this.options.solidModule

    this.info = {
      collection: '',
      solid: this.options.defaultColor || '#000',
      gradient: 'linear-gradient(90deg, #fff 0%,#000 100%)'
    }
    // init
    this.initStates()
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

    // init collection
    if (this.hasModule('collection')) {
      this.initCollection()
    }

    // init solid
    if (this.hasModule('solid')) {
      this.initSolid()
    }

    // init gradient
    if (this.hasModule('gradient')) {
      this.initGradient()
    }

    // swtichover default mode
    this.switchModule()

    // set default data
    this.initData()

    this.bind()

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

  initCollection() {
    this.COLLECTION = new Collection(this, query(`.${this.classes.PANELCOLLECTION}`, this.$panel))  /* eslint-disable-line */
  }

  initSolid() {
    this.$solid = query(`.${this.classes.PANELSOLID}`, this.$panel)
    this.SOLID = new Solid(this, query(`.${this.classes.PANELSOLID}`, this.$panel))  /* eslint-disable-line */
    this.registerComponent()
  }

  initGradient() {
    this.$gradient = query(`.${this.classes.PANELGRADIENT}`, this.$panel)
    this.GRADIENT = new Gradients(this, query(`.${this.classes.PANELGRADIENT}`, this.$panel)) /* eslint-disable-line */
    // this.registerComponent()
    this.initHistory(true)
    this.initDone(true)
    this.initHex(true)
    this.initSaturation(true)
    this.initHue(true)
    this.initAlpha(true)
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
      const trigger = this.createEl(`${v}Trigger`, { class: triggerClassName })
      const wrap = this.createEl('moduleWrap', { class: wrapClassName })
      append(trigger, query(`.${this.classes.PANELTRIGGER}`, this.$panel))
      append(wrap, query(`.${this.classes.PANELCONTAINER}`, this.$panel))
      if (this.options.module.length <= 1) {
        hideElement(query(`.${this.classes.PANELTRIGGER}`, this.$panel))
      }
    })

    append(this.$panel, this.$wrap)
    wrap(
      parseHTML(`<div class='${this.classes.PANELWRAP}'></div>`),
      this.$panel
    )
    this.$panelWrap = parent(this.$panel)

    // init element
    this.$trigger = query(`.${this.classes.PANELTRIGGER}`, this.$panel)
    this.$container = query(`.${this.classes.PANELCONTAINER}`, this.$panel)

    // tooltip
    const locale = {
      Collection: 'collection',
      Solid: 'solid',
      Gradient: 'gradient'
    }
    children(this.$trigger)
      .filter(el => el.tagName === 'I')
      .forEach($this => {
        const title = getData('type', $this).replace(/^[a-zA-Z]?/g, v =>
          v.toLocaleUpperCase()
        )
        Tooltip.of($this, {
          title: this.translate(locale[title]),
          placement: 'bottom',
          offset: '7 0'
        })
      })

    // init Popper
    this.setupPopper()
  }

  initFrame() {
    // create wrap
    const $wrap = this.createEl('wrap', { class: this.classes.WRAP })
    wrap($wrap, this.element)
    wrap(`<div class='${this.classes.TRIGGER}'></div>`, this.element)
    this.$wrap = parentWith(hasClass(this.classes.WRAP), this.element)

    // init remove button
    this.initRemove()
    // init preview
    this.initPreview()

    // create panel
    this.initPanel()

    // create mask
    this.$mask = parseHTML(`<div class="${this.classes.MASK}"></div>`)
    append(this.$mask, this.$body)
  }

  initHistory(gradient) {
    const history = this.createEl('history', { classes: this.classes })
    if (gradient) {
      append(history, query(`.${this.classes.GRADIENTHISTORY}`, this.$gradient))
      this.HISTORY = new History(
        this,
        query(`.${this.classes.HISTORY}`, this.$gradient)
      )
    } else {
      append(history, query(`.${this.classes.SOLIDHISTORY}`, this.$solid))
      this.HISTORY = new History(
        this,
        query(`.${this.classes.HISTORY}`, this.$solid)
      )
    }
  }

  initSaturation(gradient) {
    const saturation = this.createEl('saturation', {
      classes: this.classes
    })

    if (gradient) {
      append(
        saturation,
        query(`.${this.classes.GRADIENTPRIMARY}`, this.$gradient)
      )
      new Saturation(this, query(`.${this.classes.SATURATION}`, this.$gradient))  /* eslint-disable-line */
    } else {
      append(saturation, query(`.${this.classes.SOLIDPRIMARY}`, this.$solid))
      new Saturation(this, query(`.${this.classes.SATURATION}`, this.$solid))   /* eslint-disable-line */
    }
  }

  initHue(gradient) {
    const hue = this.createEl('hue', { classes: this.classes })

    if (gradient) {
      append(hue, query(`.${this.classes.GRADIENTPRIMARY}`, this.$gradient))
      new Hue(this, query(`.${this.classes.HUE}`, this.$gradient))    /* eslint-disable-line */
    } else {
      append(hue, query(`.${this.classes.SOLIDPRIMARY}`, this.$solid))
      new Hue(this, query(`.${this.classes.HUE}`, this.$solid))   /* eslint-disable-line */
    }
  }

  initAlpha(gradient) {
    const alpha = this.createEl('alpha', { classes: this.classes })

    if (gradient) {
      append(alpha, query(`.${this.classes.GRADIENTPRIMARY}`, this.$gradient))
      new Alpha(this, query(`.${this.classes.ALPHA}`, this.$gradient))    /* eslint-disable-line */
    } else {
      append(alpha, query(`.${this.classes.SOLIDPRIMARY}`, this.$solid))
      new Alpha(this, query(`.${this.classes.ALPHA}`, this.$solid))   /* eslint-disable-line */
    }
  }

  initHex(gradient) {
    const hex = this.createEl('hex', { classes: this.classes })

    if (gradient) {
      append(hex, query(`.${this.classes.GRADIENTACTION}`, this.$gradient))
      this.HEX = new Hex(this, query(`.${this.classes.HEX}`, this.$gradient))    /* eslint-disable-line */
    } else {
      append(hex, query(`.${this.classes.SOLIDACTION}`, this.$solid))
      new Hex(this, query(`.${this.classes.HEX}`, this.$solid))  /* eslint-disable-line */
    }
  }

  initDone(gradient) {
    const $ok = this.createEl('ok', {
      class: this.classes.OK,
      text: this.translate('ok')
    })
    if (gradient) {
      const gradientDone = query(
        `.${this.classes.GRADIENTDONE}`,
        this.$gradient
      )
      if (gradientDone) {
        ;[$ok].map(el =>
          append(el, query(`.${this.classes.GRADIENTDONE}`, this.$gradient))
        )
      }
    } else {
      const solidDone = query(`.${this.classes.SOLIDDONE}`, this.$solid)
      if (solidDone) {
        ;[$ok].map(el =>
          append(el, query(`.${this.classes.SOLIDDONE}`, this.$solid))
        )
      }
    }
  }

  bind() {
    compose(
      // input color
      bindEvent(this.eventName('change'), e => {
        const val = e.target.value
        this.set(this.options.parse.call(this, val))
      }),
      // switch panel
      bindEvent(this.eventName('click'), () => {
        if (this.is('disabled')) {
          return false
        }
        this.openPanel()
        return null
      })
    )(this.element)

    compose(
      // manage event
      bindEvent(this.eventName('click'), `.${this.classes.MANAGE}`, () => {
        this.options.manage()
      }),
      // action event
      bindEvent(this.eventName('click'), `.${this.classes.OK}`, () => {
        if (this.is('disabled')) {
          return false
        }
        // this.oldColor = this.color
        // if (this.oldColor != null) {
        //   if (this.oldColor.indexOf('linear-gradient') > -1) {
        //     this.setGradient(this.oldColor)
        //   } else {
        //     this.setSolid(this.oldColor)
        //   }
        // }

        this.closePanel()
        return null
      }),
      // action event
      bindEvent(this.eventName('click'), `.${this.classes.CANCEL}`, () => {
        if (this.is('disabled')) {
          return false
        }

        if (this.hasModule('solid')) {
          this.SOLID.setSolid(
            this.HISTORY.colors[this.HISTORY.colors.length - 1]
          )
        }

        // if (this.hasModule('gradient')) {

        //   this.setGradient(
        //     this.HISTORY.colors[this.HISTORY.colors.length - 1]
        //   )
        //             // }
        this.closePanel()
        return null
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

    bindEvent(
      this.eventName('click'),
      () => {
        if (!this.is('openPanel')) {
          return false
        }
        this.enter('Cancel')
        this.closePanel()
        return null
      },
      this.$mask
    )

    // input remove color
    compose(
      bindEvent(this.eventName('click'), `.${this.classes.REMOVE}`, () => {
        hideElement(this.$remove)
        // this.$element.blur()
        this.closePanel()
        this.clear()
      }),
      bindEvent(this.eventName('mouseout'), `.${this.classes.TRIGGER}`, () => {
        hideElement(this.$remove)
      }),
      bindEvent(this.eventName('mouseover'), `.${this.classes.TRIGGER}`, () => {
        if (this.element.value.length > 0) {
          if (!this.is('disabled')) {
            this.$remove.style.display = 'inline'
          }
        }
      })
    )(this.$wrap)

    bindEvent(
      this.eventNameWithId('click'),
      ({ target }) => {
        if (this.is('openPanel')) {
          if (!this.$wrap.contains(target)) {
            // if (this.is('disabled')) {
            //   return false
            // }
            this.closePanel()
          }
        }
      },
      window.document
    )
  }

  unbind() {
    removeEvent(this.eventName(), this.element)
  }

  setupPopper() {
    this.POPPER = new Popper(this.element, this.$panelWrap, {
      placement: 'bottom'
    })
    this.enter('popper')
  }

  saveMarker(typeName) {
    if (typeName === 'gradient') {
      if (this.$marker) {
        this.lastActiveMarker = this.$marker
      }
    }
  }

  switchModule(typeName) {
    if (!typeName) {
      typeName = this.module
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

    switch (this.module) {
      case 'solid':
        this.SOLID.setSolid(this.info.solid)
        break
      case 'collection':
        this.COLLECTION.setCollection(this.info.collection)
        break
      case 'gradient':
        this.GRADIENT.setGradient(this.info.gradient)
        break
      default:
        break
    }
    this.trigger(EVENTS.SWITCHMODULE, this.module)
  }

  createEl(tempName, options) {
    return parseHTML(
      template.compile(this.options.templates[tempName]())(options)
    )
  }

  openPanel() {
    // console.log(this.info)
    const colorArr = Object.entries(this.info)
    this.oldColor = {
      collection: colorArr[0][1],
      solid: colorArr[1][1],
      gradient: colorArr[2][1]
    }
    // console.log(this.oldColor)
    addClass(this.classes.OPENPANEL, this.$panelWrap)
    addClass(this.classes.OPENACTIVE, this.element)
    showElement(this.$mask)
    // update scollable height
    if (this.scrollable) {
      this.scrollable.update()
    }

    this.POPPER.scheduleUpdate()
    // this.element.openPanel = true
    this.enter('openPanel')
    this.trigger(EVENTS.OPENPANEL)
  }

  closePanel() {
    removeClass(this.classes.OPENPANEL, this.$panelWrap)
    removeClass(this.classes.OPENACTIVE, this.element)
    hideElement(this.$mask)
    // this.element.style.removeProperty('border-color')

    this.update()

    // // this.element.openPanel = false;
    this.leave('Cancel')
    this.leave('openPanel')
  }

  hasModule(name) {
    return this.options.module.indexOf(name) > -1
  }

  setInput(val) {
    if (this.module === 'gradient' && this.is('noSelectedMarker')) {
      return false
    }
    this.info[this.module] = val
    this.element.value = val
    return null
  }

  registerComponent() {
    const solidMode = this.options.solidMode
    if (solidMode === 'full') {
      // this.initContrast()
      this.initHistory()
      this.initDone()
    }

    if (solidMode === 'default') {
      query(`.${this.classes.SOLIDHANDLE}`, this.$solid).remove()
    }

    if (solidMode === 'sample') {
      query(`.${this.classes.SOLIDHANDLE}`, this.$solid).remove()
      query(`.${this.classes.SOLIDACTION}`, this.$solid).remove()
    }

    if (solidMode !== 'sample') {
      if (this.solidModule.hex) {
        this.initHex()
      }
    }

    if (this.solidModule.saturation) {
      this.initSaturation()
    }

    if (this.solidModule.hue) {
      this.initHue()
    }

    if (this.solidModule.alpha) {
      this.initAlpha()
    }
  }

  update() {
    if (this.module === 'gradient' && this.is('noSelectedMarker')) {
      return false
    }
    if (this.is('Cancel')) {
      this.color = this.oldColor[this.module]
      if (this.color === '') {
        this.color = 'transparent'
      }
      const colorArr = Object.entries(this.oldColor)
      this.info = {
        collection: colorArr[0][1],
        solid: colorArr[1][1],
        gradient: colorArr[2][1]
      }
      if (this.module === 'gradient') {
        this.GRADIENT.set(this.oldColor.gradient)
      }

      this.element.value = this.color
      this.PREVIEW.update(this.color)
    } else {
      this.color = this.info[this.module]
      if (this.color === '') {
        this.color = 'transparent'
      }
      this.element.value = this.color
      if (this.module === 'gradient') {
        this.color = this.HEX.color.toRGBA()
      }
      this.trigger(EVENTS.UPDATE, this.color)
    }

    return null
  }

  val(color) {
    if (!color) {
      return this.options.process.call(this, this.get(), this.module)
    }

    const val = this.options.parse.call(this, color)

    this.set(val)
    // this.update();
    return null
  }

  get() {
    const data = {}
    Object.entries(this.info).forEach(([i, v]) => {
      if (this.hasModule(i)) {
        data[i] = v
      }
    })
    return data
  }

  set(val) {
    const module = val.module
    const color = val.color

    if (this.hasModule(module || this.module)) {
      this.info[module] = color
      this.switchModule(module)

      // collection
      if (module === 'collection') {
        this.COLLECTION.setCollection(color)
        return false
      }

      // gradient
      if (module === 'gradient') {
        if (typeof color === 'string' && color.indexOf('gradient') > -1) {
          this.GRADIENT.setGradient(color)
        }
        return false
      }

      // solid
      if (module === 'solid') {
        this.SOLID.setSolid(color)
      }
    }
    return null
  }

  clear() {
    this.info = {
      collection: '',
      solid: this.options.defaultColor || '#000',
      gradient: 'linear-gradient(90deg, #fff 0%,#000 100%)'
    }

    Object.entries(this.info).forEach(([module, color]) =>
      this.set({ module, color })
    )

    this.switchModule(this.options.module[0])
    this.PREVIEW.update('transparent')
    this.element.value = ''
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
      this.element.disabled = true
      this.enter('disabled')
    }
    addClass(this.classes.DISABLED, this.$wrap)
    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()
      this.POPPER.destroy()
      empty(this.element)
      this.element.className = this.firstClassName
      this.element.setAttribute('placeholder', '')
      unwrap(unwrap(this.element))
      this.$remove.remove()
      this.PREVIEW.remove()
      this.$panelWrap.remove()
      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.element)
      }
      this.leave('initialized')
    }
    this.clear()
    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }

  static setCollectionData(data) {
    DATA = data
  }
}

export default ColorPicker
