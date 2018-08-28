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
    this.initOptions(DEFAULTS, options)
    this.initClasses()

    if (this.options.theme) {
      addClass(this.getThemeClass, this.element)
    }

    this.initStates()
    this.initialize()
  }

  initialize() {
    this.verification()
    this.isSvgIcon()
    this.score = this.options.value
    this.hoverscore = 0
    this.range = this.createHtml()
    this.stars = queryAll(`.${this.classes.STAR}`, this.range)
    if (!this.svgIcon) {
      this.setIconStyle()
    } else {
      this.setSvgStyle()
    }

    if (isNumber(this.options.value)) {
      this.updateStar(this.options.value)
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
    } else {
      setStyle('font-size', '40px', this.range)
    }

    this.defaulColor = this.options.iconColorClass
      ? this.options.iconColorClass
      : this.classes.DEFAULTCOLOR
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
          this.updateStar(score)
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
        this.updateStar(this.score)
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
    const typestar = event.target.parentNode
    let index

    if (typestar.classList.contains(this.classes.FULlSTAR)) {
      const element = typestar.parentNode
      for (let i = 0; i < this.stars.length; i++) {
        if (this.stars[i] === element) {
          index = i
          break
        }
      }
      return index + 1
    } else if (typestar.classList.contains(this.classes.HALFSTAR)) {
      const element = typestar.parentNode
      for (let i = 0; i < this.stars.length; i++) {
        if (this.stars[i] === element) {
          index = i
          break
        }
      }
      return index + Number(this.options.step)
    }

    return undefined /* eslint-disable-line */
  }

  updateStar(score) {
    if (typeof score === 'undefined') {
      return
    }

    if (!this.svgIcon) {
      const starNub = this.correctScore(Number(score))
      const fullStar = Math.floor(starNub)

      this.clearIconColor()

      this.resetStar(fullStar)

      if (starNub > fullStar) {
        this.resetHalfStar(fullStar)
      }
    } else {
      const starNub = this.correctScore(Number(score))
      const fullStar = Math.floor(starNub)
      this.removeClassAll(this.classes.HALFSTARACTIVE)
      if (starNub > fullStar) {
        // addClass(this.classes.HALFSTARACTIVE, $(this.$stars[fullStar]))
        addClass(this.classes.HALFSTARACTIVE, this.stars[fullStar])
      }

      const length = this.svgs.length
      for (let i = 0; i < length; i++) {
        if (i < starNub * 2) {
          this.svgs[i].src = this.options.svg.defaultPath
        } else {
          this.svgs[i].src = this.options.svg.clearPath
        }
      }
    }
  }

  resetHalfStar(fullStar) {
    addClass(this.classes.HALFSTARACTIVE, this.stars[fullStar])
    const element = query(`.${this.classes.HALFSTAR}`, this.stars[fullStar])
    this.addColor(element)
  }

  resetStar(fullStar) {
    for (let i = 0; i < fullStar; i++) {
      const element = query(`.${this.classes.FULlSTAR}`, this.stars[i])
      this.addColor(element)
    }
  }

  removerColor(element) {
    removeClass(this.defaulColor, element)
    addClass(this.classes.CLEARCOLOR, element)
  }

  addColor(element) {
    removeClass(this.classes.CLEARCOLOR, element)
    addClass(this.defaulColor, element)
  }

  clearIconColor() {
    this.removeClassAll(this.classes.HALFSTARACTIVE)

    const fullstars = queryAll(`.${this.classes.FULlSTAR}`, this.range)
    const halfstars = queryAll(`.${this.classes.HALFSTAR}`, this.range)

    fullstars.forEach(f => {
      this.removerColor(f)
    })
    halfstars.forEach(h => {
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
    let star = ''
    let svg = ''

    if (this.svgIcon) {
      const width = this.options.iconSize || 48
      svg = templateEngine.render(this.options.templates.svg.call(this), {
        path: this.options.svg.clearPath,
        width
      })

      star = templateEngine.render(this.options.templates.stars.call(this), {
        classes: this.classes,
        svg
      })
    } else {
      icon = templateEngine.render(this.options.templates.icon.call(this), {
        iconClass: this.options.iconClass
      })

      star = templateEngine.render(this.options.templates.star.call(this), {
        classes: this.classes,
        icon
      })
    }

    const html = templateEngine.render(this.options.template.call(this), {
      classes: this.classes
    })

    const wrap = parseHTML(html)
    for (let i = 0; i < this.options.max; i++) {
      prepend(star, wrap)
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
    this.updateStar(score)
  }

  setScore(score) {
    this.changeScore(score)
    this.updateStar(this.score)
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
    this.updateStar(this.score)
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
