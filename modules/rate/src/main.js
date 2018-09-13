import Component from '@pluginjs/component'
import templateEngine from '@pluginjs/template'
import { addClass, removeClass } from '@pluginjs/classes'
import { setStyle, hideElement } from '@pluginjs/styled'
import { bindEvent, removeEvent } from '@pluginjs/events'
import {
  prepend,
  parseHTML,
  queryAll,
  query,
  insertAfter,
  getData
} from '@pluginjs/dom'
import { isNumber } from '@pluginjs/is'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  optionable
} from '@pluginjs/decorator'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'

@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS
})
class Rate extends Component {
  constructor(element, options = {}) {
    super(element)
    this.setupOptions(options)
    this.setupClasses()

    if (this.options.theme) {
      addClass(this.getThemeClass, this.element)
    }

    this.setupStates()
    this.initialize()
  }

  initialize() {
    this.verification()
    this.isSvgIcon()
    this.score = this.options.value
    this.hoverscore = 0
    this.range = this.createHtml()
    this.units = queryAll(`.${this.classes.UNIT}`, this.range)
    if (!this.svgIcon) {
      this.setIconStyle()
    } else {
      this.setSvgStyle()
    }

    if (isNumber(this.options.value)) {
      this.updateUnit(this.options.value)
    }

    if (!this.options.readonly) {
      this.bind()
    } else {
      addClass(this.classes.DISABLED, this.range)
    }

    hideElement(this.element)

    insertAfter(this.range, this.element)

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  setIconStyle() {
    if (this.options.iconSize) {
      setStyle('font-size', this.options.iconSize, this.range)
    }

    this.defaulColor = this.options.iconColorClass
      ? this.options.iconColorClass
      : ''
  }

  setSvgStyle() {
    this.svgs = queryAll('img', this.range)
  }

  isSvgIcon() {
    if (
      this.options.svg &&
      this.options.svg.clearPath &&
      this.options.svg.defaultPath
    ) {
      this.svgIcon = true
    } else {
      this.svgIcon = false
    }
  }

  verification() {
    if (this.element.tagName.toLowerCase() === 'input') {
      if (getData('min', this.element) || getData('min', this.element) === 0) {
        const m = getData('min', this.element)
        const n = Number(m)
        if (n >= this.options.max) {
          this.options.min = 0
        }
      }

      if (getData('max', this.element) || getData('max', this.element) === 0) {
        const m = getData('max', this.element)
        const n = Number(m)
        if (n <= 0) {
          this.options.max = 2
        }
      }
    }
  }

  bind() {
    // this.eventName('mousemove')
    bindEvent(
      this.eventName('mousemove'),
      event => {
        const score = this._getScore(event)
        if (this.hoverscore !== score && typeof score !== 'undefined') {
          this.updateUnit(score)
          if (score !== this.hoverscore && typeof score !== 'undefined') {
            this.changeHoverScore(score)
          }
        }
      },
      this.range
    )

    bindEvent(
      this.eventName('mouseleave'),
      () => {
        this.updateUnit(this.score)
        this.changeHoverScore(0)
        this.trigger(EVENTS.MOUSELEAVE)
      },
      this.range
    )

    bindEvent(
      this.eventName('mouseup'),
      event => {
        const score = this._getScore(event)
        this.changeScore(score)
        this.trigger(EVENTS.CLICK, this.score)
      },
      this.range
    )

    this.enter('binded')
  }

  unbind() {
    removeEvent(this.eventName(), this.range)

    this.leave('binded')
  }

  _getScore(event) {
    const typeunit = event.target.parentNode
    let index

    if (typeunit.classList.contains(this.classes.FULL)) {
      const element = typeunit.parentNode
      for (let i = 0; i < this.units.length; i++) {
        if (this.units[i] === element) {
          index = i
          break
        }
      }
      return index + 1
    } else if (typeunit.classList.contains(this.classes.HALF)) {
      const element = typeunit.parentNode
      for (let i = 0; i < this.units.length; i++) {
        if (this.units[i] === element) {
          index = i
          break
        }
      }
      return index + Number(this.options.step)
    }

    return undefined /* eslint-disable-line */
  }

  updateUnit(score) {
    if (typeof score === 'undefined') {
      return
    }

    if (!this.svgIcon) {
      const unitNub = this.correctScore(Number(score))
      const fullUnit = Math.floor(unitNub)

      this.clearIconColor()

      this.resetUnit(fullUnit)

      if (unitNub > fullUnit) {
        this.resetHalfUnit(fullUnit)
      }
    } else {
      const unitNub = this.correctScore(Number(score))
      const fullUnit = Math.floor(unitNub)
      this.removeClassAll(this.classes.HALFACTIVE)
      if (unitNub > fullUnit) {
        addClass(this.classes.HALFACTIVE, this.units[fullUnit])
      }

      const length = this.svgs.length
      for (let i = 0; i < length; i++) {
        if (i < unitNub * 2) {
          this.svgs[i].src = this.options.svg.defaultPath
        } else {
          this.svgs[i].src = this.options.svg.clearPath
        }
      }
    }
  }

  resetHalfUnit(fullUnit) {
    addClass(this.classes.HALFACTIVE, this.units[fullUnit])
    const element = query(`.${this.classes.HALF}`, this.units[fullUnit])
    this.addColor(element)
  }

  resetUnit(fullUnit) {
    for (let i = 0; i < fullUnit; i++) {
      const element = query(`.${this.classes.FULL}`, this.units[i])
      this.addColor(element)
    }
  }

  removerColor(element) {
    removeClass(this.defaulColor, element)
    addClass(this.classes.CLEAR, element)
  }

  addColor(element) {
    removeClass(this.classes.CLEAR, element)
    addClass(this.defaulColor, element)
  }

  clearIconColor() {
    this.removeClassAll(this.classes.HALFACTIVE)

    const fullunits = queryAll(`.${this.classes.FULL}`, this.range)
    const halfunits = queryAll(`.${this.classes.HALF}`, this.range)

    fullunits.forEach(f => {
      this.removerColor(f)
    })
    halfunits.forEach(h => {
      this.removerColor(h)
    })
  }

  correctScore(score) {
    if (score > this.options.max) {
      return this.options.max
    } else if (score <= 0) {
      return 0
    }
    let nub = parseInt(score * 10, 10) % 10
    if (nub !== 0) {
      if (nub > 0 && nub <= 5) {
        nub = 5 / 10
      } else {
        nub = 10 / 10
      }
    }

    return parseInt(score, 10) + nub
  }

  createHtml() {
    let icon = ''
    let unit = ''
    let svg = ''

    if (this.svgIcon) {
      const width = this.options.iconSize || 48
      svg = templateEngine.render(this.options.templates.svg.call(this), {
        path: this.options.svg.clearPath,
        width
      })

      unit = templateEngine.render(this.options.templates.units.call(this), {
        classes: this.classes,
        svg
      })
    } else {
      icon = templateEngine.render(this.options.templates.icon.call(this), {
        iconClass: this.options.iconClass
      })

      unit = templateEngine.render(this.options.templates.unit.call(this), {
        classes: this.classes,
        icon
      })
    }

    const html = templateEngine.render(this.options.template.call(this), {
      classes: this.classes
    })

    const wrap = parseHTML(html)
    for (let i = 0; i < this.options.max; i++) {
      prepend(unit, wrap)
    }

    return wrap
  }

  removeClassAll(className) {
    const selector = `.${className}`
    const elements = queryAll(selector, this.range)
    elements.forEach(el => {
      removeClass(className, el)
    })
  }

  getHoverScore() {
    return this.hoverscore
  }

  getScore() {
    return this.score
  }

  setColor(className) {
    this.clearIconColor()
    this.defaulColor = className
    const score = this.hoverscore || this.score
    this.updateUnit(score)
  }

  setScore(score) {
    this.changeScore(score)
    this.updateUnit(this.score)
  }

  changeScore(score) {
    this.score = score
    this.trigger(EVENTS.CHANGESCORE, score)
  }

  changeHoverScore(score) {
    this.hoverscore = score
    this.trigger(EVENTS.CHANGEHOVERSCORE, score)
  }

  clear() {
    this.changeScore(0)
    this.updateUnit(this.score)
  }

  resetIcon(iconClass) {
    const icons = this.$range.find('i')
    icons.attr('class', iconClass)
  }

  readonly(boolean) {
    if (boolean) {
      this.unbind()
      addClass(this.classes.DISABLED, this.range)
    } else if (!this.is('binded')) {
      this.bind()
      removeClass(this.classes.DISABLED, this.range)
    }
  }

  destroy() {
    if (this.is('initialized')) {
      this.leave('initialized')
    }
    removeClass(this.getThemeClass(), this.element)
    this.unbind()

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default Rate
