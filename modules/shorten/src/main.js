import Component from '@pluginjs/component'
import { compose } from '@pluginjs/utils'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { removeClass, addClass, hasClass } from '@pluginjs/classes'
import { closest, setData, query, html } from '@pluginjs/dom'
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
class Shorten extends Component {
  constructor(element, options = {}) {
    super(element)

    this.text = this.element.textContent

    // options
    this.initOptions(DEFAULTS, options)
    this.initClasses()
    this.initStates()

    if (this.needShorten()) {
      this.initialize()
    }
  }

  initialize() {
    this.prepare()

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.element)
    }

    // bind event
    compose(
      bindEvent(this.selfEventName(EVENTS.COLLAPSE), () => {
        this.leave('expand')
        removeClass(this.classes.EXPAND, this.element)
      }),
      bindEvent(this.selfEventName(EVENTS.EXPAND), () => {
        this.enter('expand')
        addClass(this.classes.EXPAND, this.element)
      })
    )(this.element)

    this.bind()

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  prepare() {
    if (this.options.line) {
      return this.prepareByLine()
    }
    this.summaryText = this.text.slice(0, this.options.chars)
    this.detailText = this.text.slice(this.summaryText.length)
    this.element.innerHTML = `${this.summaryText +
      this.ellipsesHtml()}<span class="${this.classes.DETAIL}">${
      this.detailText
    }</span>${this.toggleHtml()}`
    return true
  }

  ellipsesHtml() {
    if (this.options.ellipses) {
      return `<span class="${this.classes.ELLIPSES}">${
        this.options.ellipses
      }</span>`
    }
    return ''
  }

  prepareByLine() {
    const lineHeight = parseFloat(
      window.getComputedStyle(this.element).lineHeight.slice(0, -2)
    )
    const maxHeight = lineHeight * this.options.line
    const computeRange = (max, min) => {
      const pivot = (min + max + 1) >> 1 // eslint-disable-line
      this.summaryText = this.text.slice(0, pivot)
      this.detailText = this.text.slice(this.summaryText.length)
      this.element.innerHTML = `${this.summaryText +
        this.ellipsesHtml()}<span class="${this.classes.DETAIL}">${
        this.detailText
      }</span>${this.toggleHtml()}`
      if (min >= max) {
        return [max, min]
      }
      if (this.element.offsetHeight > maxHeight) {
        return computeRange(pivot - 1, min)
      }
      return computeRange(max, pivot)
    }
    return computeRange(this.text.length - 1, 0)
  }

  toggleHtml() {
    let text
    if (this.is('expand')) {
      text = this.options.less
    } else {
      text = this.options.more
    }
    return `<a class="${this.classes.TOGGLE}" href="#">${text}</a>`
  }

  bind() {
    this.$toggle = query(`.${this.classes.TOGGLE}`, this.element)
    bindEvent(
      this.eventName('click'),
      `.${this.classes.TOGGLE}`,
      ({ target }) => {
        const item = hasClass(this.classes.TOGGLE, target)
          ? target
          : closest(`${this.classes.TOGGLE}`, target)
        if (this.is('expand')) {
          this.trigger(EVENTS.COLLAPSE)
          item.innerHTML = this.options.more
        } else {
          this.trigger(EVENTS.EXPAND)
          item.innerHTML = this.options.less
        }
        return false
      },
      this.element
    )
  }

  needShorten() {
    if (this.text.length > this.options.chars) {
      return true
    }
    return false
  }

  text() {
    return this.text
  }

  expand() {
    this.trigger(EVENTS.EXPAND)
  }

  collapse() {
    this.trigger(EVENTS.COLLAPSE)
  }

  update(text) {
    this.text = text
    if (this.needShorten()) {
      this.prepare()
    } else {
      this.element.innerHTML = text
    }

    this.trigger(EVENTS.EXPAND, text)
  }

  destroy() {
    if (this.is('initialized')) {
      compose(
        removeEvent(this.selfEventName(EVENTS.COLLAPSE)),
        removeEvent(this.selfEventName(EVENTS.EXPAND)),
        removeEvent(this.eventName()),
        setData('shorten', null),
        html(this.text)
      )(this.element)

      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.element)
      }

      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }

  resize() {
    if (!this.is('disabled')) {
      this.prepare()
    }
  }
}

export default Shorten
