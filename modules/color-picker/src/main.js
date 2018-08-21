import Component from '@pluginjs/component'
import { compose } from '@pluginjs/utils'
import { isString } from '@pluginjs/is'
import template from '@pluginjs/template'
import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import { bindEvent } from '@pluginjs/events' // , removeEvent
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
  // unwrap,
  // setData,
  getData
  // empty
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
import { Color } from '@pluginjs/color'
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

    console.log(this.data)
    console.log(this.color)
    this.initialize()
  }

  initialize() {
    this.asColor = Color.of(this.options.defaultColor, this.options.color)
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

    this.switchModule()

    this.bind()
    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  initCollection() {
    new Collection(this, query(`.${this.classes.PANELCOLLECTION}`, this.$panel))  /* eslint-disable-line */
  }

  initSolid() {
    this.$Solid = query(`.${this.classes.PANELSOLID}`, this.$panel)
    new Solid(this, query(`.${this.classes.PANELSOLID}`, this.$panel))  /* eslint-disable-line */
    this.registerComponent()
  }

  initGradient() {
    this.$gradient = query(`.${this.classes.PANELGRADIENT}`, this.$panel)
    new Gradients(this, query(`.${this.classes.PANELGRADIENT}`, this.$panel)) /* eslint-disable-line */
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

    console.log(this.options.module)
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
    console.log(query(`.${this.classes.PANELCOLLECTION}`, this.$panel))
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
      new Hex(this, query(`.${this.classes.HEX}`, this.$gradient))    /* eslint-disable-line */
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
      bindEvent(
        this.eventName('click'),
        `.${this.classes.PANELTRIGGER}>i`,
        e => {
          const $this = e.target
          this.switchModule(getData('type', $this))
        }
      ),
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

  setupPopper() {
    this.POPPER = new Popper(this.element, this.$panelWrap, {
      placement: 'bottom'
    })
    this.enter('popper')
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
      // this.scrollable.update()
    }
    // switch module state
    this.enter(`${typeName}Module`)
    this.module = typeName

    // switch (this.module) {
    //   case 'solid':
    //     this.setSolid(this.info.solid)
    //     break
    //   case 'collection':
    //     this.setCollection(this.info.collection)
    //     break
    //   case 'gradient':
    //     this.setGradient(this.info.gradient)
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
    addClass(this.classes.OPENPANEL, this.$panelWrap)
    addClass(this.classes.OPENACTIVE, this.element)
    showElement(this.$mask)
  }

  closePanel() {
    removeClass(this.classes.OPENPANEL, this.$panelWrap)
    removeClass(this.classes.OPENACTIVE, this.element)
    hideElement(this.$mask)
    // this.element.style.removeProperty('border-color')

    // this.update()

    // // this.element.openPanel = false;
    this.leave('openPanel')
  }

  hasModule(name) {
    return this.options.module.indexOf(name) > -1
  }

  setCollection(colorName) {
    Object.entries(this.data).forEach(([, v]) => {
      Object.entries(v).forEach(([name, dataColor]) => {
        if (colorName.toLowerCase() === name.toLowerCase()) {
          if (
            dataColor.indexOf('gradient') > -1 &&
            this.hasModule('gradient')
          ) {
            this.info.gradient = dataColor
            this.setGradient(dataColor)
          } else if (this.hasModule('solid')) {
            this.info.solid = dataColor
            this.setSolid(dataColor)
          }

          this.setInput(name)
          this.PREVIEW.update(dataColor)
        }
      })
    })
  }

  setSolid(val) {
    if (!val) {
      val = this.info.solid
    }

    const color = this.asColor.val(val)
    if (isString(val) && val.indexOf('#') > -1) {
      this.setInput(color.toHEX())
    } else if (isString(val) && !val.match(/\d/g)) {
      this.setInput(color.toNAME())
    } else {
      this.setInput(color.toRGBA())
    }

    this.tempColor = color
    this.PREVIEW.update(color)
    console.log(EVENTS.CHANGE)
    console.log(this.element)
    this.trigger(EVENTS.CHANGE, color)
  }

  setGradient(color) {
    if (!color) {
      color = this.info.gradient
    }
    this.GRADIENT.set(color)
  }

  setInput(val) {
    // if (this.module === 'gradient' && this.is('noSelectedMarker')) {
    //   return false
    // }
    this.info[this.module] = val
    this.element.value = val
    return null
  }

  updateGradient(color) {
    this.PREVIEW.update(color, true)
    this.setInput(color)
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

  set(val) {
    const module = val.module
    const color = val.color

    if (this.hasModule(module || this.module)) {
      this.info[module] = color
      this.switchModule(module)

      // collection
      if (module === 'collection') {
        this.setCollection(color)
        return false
      }

      // gradient
      if (module === 'gradient') {
        if (typeof color === 'string' && color.indexOf('gradient') > -1) {
          this.setGradient(color)
        }
        return false
      }

      // solid
      if (module === 'solid') {
        this.setSolid(color)
      }
    }
    return null
  }

  static setCollectionData(data) {
    DATA = data
  }
}

export default ColorPicker
