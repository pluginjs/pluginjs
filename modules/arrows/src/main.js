import Component from '@pluginjs/component'
import templateEngine from '@pluginjs/template'
import { deepMerge, compose } from '@pluginjs/utils'
import { addClass, removeClass } from '@pluginjs/classes'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { query, append, parseHTML, empty } from '@pluginjs/dom'
import {
  eventable,
  register,
  stateable,
  styleable,
  themeable
} from '@pluginjs/pluginjs'
import is from '@pluginjs/is'
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
@register(
  NAMESPACE,
  {
    defaults: DEFAULTS,
    methods: METHODS
  }
)
class Arrows extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)

    this.options = deepMerge(DEFAULTS, options, this.getDataOptions())
    this.initClasses(CLASSES)

    this.prevSelector = this.classes.PREV
    this.nextSelector = this.classes.NEXT

    this.initStates()
    this.initialize()
  }

  initialize() {
    addClass(this.classes.CONTAINER, this.element)

    if (this.options.direction === 'vertical') {
      addClass(this.classes.VERTICAL, this.element)
    } else {
      addClass(this.classes.HORIZONTAL, this.element)
    }

    if (this.options.theme) {
      addClass(this.getThemeClass(), this.element)
    }

    if (this.options.type) {
      addClass(this.getTypeClass(), this.element)
    }

    this.$prev = this.getPrev()
    this.$next = this.getNext()
    if (!this.$prev) {
      this.buildPrev(this.options.prev)
    }

    if (!this.$next) {
      this.buildNext(this.options.next)
    }
    this.bind()
    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  bind() {
    compose(
      bindEvent({
        type: this.eventName('click'),
        identity: `.${this.nextSelector}`,
        handler: () => {
          if (!this.is('disabled')) {
            this.next()
          }
          return false
        }
      }),
      bindEvent({
        type: this.eventName('touch'),
        identity: `.${this.nextSelector}`,
        handler: () => {
          if (!this.is('disabled')) {
            this.next()
          }
          return false
        }
      }),
      bindEvent({
        type: this.eventName('click'),
        identity: `.${this.prevSelector}`,
        handler: () => {
          if (!this.is('disabled')) {
            this.prev()
          }
          return false
        }
      }),
      bindEvent({
        type: this.eventName('touch'),
        identity: `.${this.prevSelector}`,
        handler: () => {
          if (!this.is('disabled')) {
            this.prev()
          }
          return false
        }
      })
    )(this.element)
  }

  unbind() {
    removeEvent(this.eventName(), this.element)
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
    this.$prev = append(
      parseHTML(template({ classes: this.classes, ...prev })),
      this.element
    )
  }

  buildNext(next) {
    const template = templateEngine.compile(
      this.options.templates.next.call(this)
    )
    this.$next = append(
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
    arrows.map(arrow => {
      arrow.remove()
    })
  }

  prev() {
    this.trigger(EVENTS.PREV, this.getArrowValue(this.$prev))
  }

  next() {
    this.trigger(EVENTS.NEXT, this.getArrowValue(this.$next))
  }

  getTypeClass(types, TYPE) {
    if (is.undefined(types) && this.options.type) {
      return this.getTypeClass(this.options.type)
    }
    if (is.string(types)) {
      if (is.undefined(TYPE)) {
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

    if (is.array(this.options.valueFrom)) {
      return query(this.options.valueFrom[0], $arrow).getAttribute(
        this.options.valueFrom[1]
      )
    }

    return $arrow.getAttribute(this.options.valueFrom)
  }

  enable() {
    if (this.is('disabled')) {
      removeClass(this.classes.DISABLED, this.element)
      this.leave('disabled')
    }
    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      addClass(this.classes.DISABLED, this.element)
      this.enter('disabled')
    }
    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      this.unbind()

      if (this.options.direction === 'vertical') {
        removeClass(this.classes.VERTICAL, this.element)
      } else {
        removeClass(this.classes.HORIZONTAL, this.element)
      }

      if (this.options.theme) {
        removeClass(this.getThemeClass(), this.element)
      }

      if (this.is('hidden')) {
        removeClass(this.classes.HIDDEN, this.element)
      }

      if (this.is('disabled')) {
        removeClass(this.classes.DISABLED, this.element)
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
