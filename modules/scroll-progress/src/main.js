import Component from '@pluginjs/component'
import templateEngine from '@pluginjs/template'
import Pj from '@pluginjs/factory'
import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import { setStyle } from '@pluginjs/styled'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { prepend, parseHTML, query } from '@pluginjs/dom'
import {
  eventable,
  register,
  stateable,
  styleable,
  optionable
} from '@pluginjs/decorator'
import {
  classes as CLASSES,
  defaults as DEFAULTS,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'

const POSITIONS = [
  'top-left',
  'top-right',
  'bottom-left',
  'bottom-right',
  'left-bottom',
  'left-top',
  'right-bottom',
  'right-top'
]

@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS
})
class ScrollProgress extends Component {
  constructor(element, options = {}) {
    super(element)

    this.setupOptions(options)
    this.setupClasses()
    this.setupStates()
    this.initialize()
  }

  initialize() {
    addClass(this.classes.NAMESPACE, this.element)

    this.$bar = query(`.${this.classes.BAR}`)
      ? query(`.${this.classes.BAR}`)
      : parseHTML(this.creatHtml())

    this.position = POSITIONS.includes(this.options.position)
      ? this.options.position
      : POSITIONS[0]
    this.direction = this.getDirection()
    this.resetBarPosition()

    prepend(this.$bar, query(this.options.appendTo))

    this.bind()
    if (this.options.custom === true) {
      this.initBar()
    }

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  setBardefaultAttr() {
    if (this.direction === 'vertical') {
      setStyle(
        {
          width: this.options.size,
          backgroundColor: this.options.color,
          opacity: this.options.opacity
        },
        this.$bar
      )
    } else {
      setStyle(
        {
          height: this.options.size,
          backgroundColor: this.options.color,
          opacity: this.options.opacity
        },
        this.$bar
      )
    }
  }

  resetBarPosition() {
    if (hasClass(this.getClass(`{namespace}-${this.position}`), this.$bar)) {
      return
    }
    this.setBardefaultAttr()
    for (let i = 0; i < POSITIONS.length; i++) {
      removeClass(this.getClass(`{namespace}-${POSITIONS[i]}`), this.$bar)
    }
    addClass(this.getClass(`{namespace}-${this.position}`), this.$bar)
  }

  getDirection() {
    let direction = ''
    const p = this.position.split('-')[0]
    if (p === 'left' || p === 'right') {
      direction = 'vertical'
    } else {
      direction = 'level'
    }
    return direction
  }

  scrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop
  }

  initBar() {
    const scrollTop = this.scrollTop()
    const clientHeight = document.documentElement.clientHeight
    const height = document.body.scrollHeight

    const total = (scrollTop / (height - clientHeight)) * 100
    this.setBarSize(total)
  }

  setBarSize(size) {
    if (this.direction === 'vertical') {
      setStyle('height', `${size}%`, this.$bar)
    } else {
      setStyle('width', `${size}%`, this.$bar)
    }
  }

  bind() {
    this.bindElement = this.options.custom ? this.element : document.body
    if (!this.options.custom || this.bindElement === document.body) {
      Pj.emitter.on(
        this.eventNameWithId('scroll'),
        this.scrollHandle.bind(this)
      )
    } else {
      bindEvent(
        this.eventName('scroll'),
        this.scrollHandle.bind(this),
        this.bindElement
      )
    }
  }

  unbind() {
    this.setBarSize(0)
    if (!this.options.custom || this.bindElement === document.body) {
      Pj.emitter.off(this.eventNameWithId('scroll'))
    } else {
      removeEvent(this.eventName(), this.bindElement)
    }
  }

  scrollHandle() {
    if (this.is('disabled')) {
      return
    }
    this.resetBarPosition()
    let clientHeight
    let height
    let scrollTop

    if (this.options.custom === false) {
      scrollTop = this.scrollTop()
      clientHeight = document.documentElement.clientHeight
      height = document.body.scrollHeight
    } else {
      scrollTop = this.element.scrollTop
      clientHeight = this.element.clientHeight
      height = this.element.scrollHeight
    }

    const total = (scrollTop / (height - clientHeight)) * 100
    this.setBarSize(total)
  }

  creatHtml() {
    const html = templateEngine.render(this.options.templates.bar.call(this), {
      classes: this.classes
    })

    return html
  }

  refresh() {
    this.scrollHandle()
    this.trigger(EVENTS.REFRESH)
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
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default ScrollProgress
