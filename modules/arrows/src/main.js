/* eslint-disable no-undefined */
import Component from '@pluginjs/component'
import templateEngine from '@pluginjs/template'
import { compose } from '@pluginjs/utils'
import { addClass, removeClass } from '@pluginjs/classes'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { query, appendTo, parseHTML, empty } from '@pluginjs/dom'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable,
  optionable
} from '@pluginjs/decorator'
import { isString, isArray } from '@pluginjs/is'
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
class Arrows extends Component {
  constructor(element, options = {}) {
    super(element)

    this.setupOptions(options)
    this.setupClasses()

    this.prevSelector = this.classes.PREV
    this.nextSelector = this.classes.NEXT

    this.setupStates()
    this.initialize()
  }

  initialize() {
    addClass(this.classes.CONTAINER, this.element)

    if (this.options.vertical) {
      addClass(this.classes.VERTICAL, this.element)
    }

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.element)
    }

    this.$prev = this.getPrev()
    this.$next = this.getNext()
    if (!this.$prev) {
      this.buildPrev(this.options.prev)
    }

    if (!this.$next) {
      this.buildNext(this.options.next)
    }

    if (this.options.type) {
      const typeClasses = this.getTypeClass()

      addClass(typeClasses, this.$prev)
      addClass(typeClasses, this.$next)
    }

    this.bind()
    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  bind() {
    compose(
      bindEvent(this.eventName('click'), `.${this.nextSelector}`, () => {
        if (!this.is('nextDisabled')) {
          this.next()
        }
        return false
      }),
      bindEvent(this.eventName('touch'), `.${this.nextSelector}`, () => {
        if (!this.is('nextDisabled')) {
          this.next()
        }
        return false
      }),
      bindEvent(this.eventName('click'), `.${this.prevSelector}`, () => {
        if (!this.is('prevDisabled')) {
          this.prev()
        }
        return false
      }),
      bindEvent(this.eventName('touch'), `.${this.prevSelector}`, () => {
        if (!this.is('prevDisabled')) {
          this.prev()
        }
        return false
      })
    )(this.element)
    this.enter('bind')
  }

  unbind() {
    removeEvent(this.eventName(), this.element)
    this.leave('bind')
  }

  getPrev() {
    return query(`.${this.prevSelector}`, this.element)
  }

  getNext() {
    return query(`.${this.nextSelector}`, this.element)
  }

  buildPrev(prev) {
    const template = templateEngine.compile(
      this.options.templates.prev.call(this)
    )
    this.$prev = appendTo(
      parseHTML(template({ classes: this.classes, ...prev })),
      this.element
    )
  }

  buildNext(next) {
    const template = templateEngine.compile(
      this.options.templates.next.call(this)
    )
    this.$next = appendTo(
      parseHTML(template({ classes: this.classes, ...next })),
      this.element
    )
  }

  load(prev, next) {
    empty(this.element)

    this.buildPrev(prev)
    this.buildNext(next)
  }

  empty() {
    const arrows = Array.prototype.slice.call(this.element.children)
    arrows.map(arrow => arrow.remove())
  }

  prev() {
    this.trigger(EVENTS.PREV, this.getArrowValue(this.$prev))
  }

  next() {
    this.trigger(EVENTS.NEXT, this.getArrowValue(this.$next))
  }

  getTypeClass(types, TYPE) {
    if (typeof types === 'undefined' && this.options.type) {
      return this.getTypeClass(this.options.type)
    }
    if (isString(types)) {
      if (typeof TYPE === 'undefined') {
        TYPE = this.classes.TYPE
      }
      types = types.split(' ')

      if (TYPE) {
        for (let i = 0; i < types.length; i++) {
          types[i] = TYPE.replace('{type}', types[i])
        }
      } else {
        for (let i = 0; i < types.length; i++) {
          types[i] = this.getClass(types[i])
        }
      }
      return types
    }

    return ''
  }

  getArrowValue($arrow) {
    if (this.options.valueFrom === 'text') {
      return $arrow.textContent
    }

    if (isArray(this.options.valueFrom)) {
      return query(this.options.valueFrom[0], $arrow).getAttribute(
        this.options.valueFrom[1]
      )
    }

    return $arrow.getAttribute(this.options.valueFrom)
  }

  enable(arg) {
    const prev = this.is('prevDisabled') ? arg !== 'next' : false
    const next = this.is('nextDisabled') ? arg !== 'prev' : false

    if (prev) {
      removeClass(this.classes.DISABLED, this.$prev)
      this.leave('prevDisabled')
      this.trigger(EVENTS.PREVENABLE)
    }

    if (next) {
      removeClass(this.classes.DISABLED, this.$next)
      this.leave('nextDisabled')
      this.trigger(EVENTS.NEXTENABLE)
    }

    if (prev && next) {
      this.trigger(EVENTS.ENABLE)
    }
  }

  disable(arg) {
    const prev = !this.is('prevDisabled') ? arg !== 'next' : false
    const next = !this.is('nextDisabled') ? arg !== 'prev' : false

    if (prev) {
      addClass(this.classes.DISABLED, this.$prev)
      this.enter('prevDisabled')
      this.trigger(EVENTS.PREVDISABLE)
    }

    if (next) {
      addClass(this.classes.DISABLED, this.$next)
      this.enter('nextDisabled')
      this.trigger(EVENTS.NEXTDISABLE)
    }

    if (prev && next) {
      this.trigger(EVENTS.DISABLE)
    }
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()

      if (this.options.vertical) {
        removeClass(this.classes.VERTICAL, this.element)
      }

      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.element)
      }

      if (this.is('hidden')) {
        removeClass(this.classes.HIDDEN, this.element)
      }

      if (this.is('prevDisabled')) {
        removeClass(this.classes.DISABLED, this.$prev)
      }

      if (this.is('nextDisabled')) {
        removeClass(this.classes.DISABLED, this.$next)
      }

      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }

  show() {
    if (this.is('hidden')) {
      removeClass(this.classes.HIDDEN, this.element)
      this.leave('hidden')
    }
    this.trigger(EVENTS.SHOW)
  }

  hide() {
    if (!this.is('hidden')) {
      addClass(this.classes.HIDDEN, this.element)
      this.enter('hidden')
    }
    this.trigger(EVENTS.HIDE)
  }
}

export default Arrows
