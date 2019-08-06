import Component from '@pluginjs/component'
import Hammer from 'hammerjs'
import { addClass, removeClass } from '@pluginjs/classes'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { query, queryAll } from '@pluginjs/dom'
import { isArray, isString } from '@pluginjs/is'
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
  dependencies as DEPENDENCIES,
  events as EVENTS,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'
import Dots from './dots'
import History from './history'
import SCROLL from './type/scroll'
import STACK from './type/stack'

const ANIMATION = {}

@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class SectionScroll extends Component {
  constructor(element, options = {}) {
    super(element)
    this.setupOptions(options)
    this.setupClasses()

    this.setupStates()
    this.initialize()
  }

  initialize() {
    // this.initSections()
    this.$sections = queryAll(this.options.itemSelector, this.element)
    this.currIndex = 1
    this.initStyle()
    if (this.options.dots !== false) {
      this.Dots = new Dots(this)
    }
    this.Animation = ANIMATION[this.options.animation]
      ? new ANIMATION[this.options.animation](this)
      : new ANIMATION.SCROLL(this)

    this.history = new History(this)
    this.bind()

    if (window.location.hash) {
      this.goTo(window.location.hash)
    }

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  initSections() {
    this.$sections = []

    if (isString(this.options.itemSelector)) {
      this.$sections = queryAll(this.options.itemSelector, this.element)
    } else if (isArray(this.options.itemSelector)) {
      this.options.itemSelector.forEach(arrItem => {
        if (isString(arrItem) && query(`#${arrItem}`, this.element)) {
          this.$sections.push(query(`#${arrItem}`, this.element))
        }
      })
    }
  }

  bind() {
    if (this.options.touch) {
      this.bindChouch()
    }
    if (this.options.mousewheel || this.options.animation === 'stack') {
      this.onMousewheel()
    }
    this.bindKeydown()
  }

  unbind() {
    this.unbindKeydown()
    if (this.options.mousewheel) {
      this.offMousewheel()
    }
  }

  onMousewheel() {
    bindEvent(
      this.eventName('wheel'),
      e => {
        if (e.cancelable) {
          if (!e.defaultPrevented) {
            e.preventDefault()
          }
        }

        if (e.deltaY > 0) {
          this.next()
        } else if (e.deltaY < 0) {
          this.previous()
        }
      },
      document.body
    )
  }

  offMousewheel() {
    removeEvent(this.eventName(), document.body)
  }

  bindKeydown() {
    bindEvent(
      this.eventName('keydown'),
      event => {
        if (event.keyCode === 38) {
          this.previous()
        } else if (event.keyCode === 40) {
          this.next()
        } else if (event.keyCode === 32) {
          this.next()
        }
      },
      document.body
    )
  }

  unbindKeydown() {
    removeEvent(this.eventName(), document.body)
  }

  bindChouch() {
    this.hammer = new Hammer(this.element)
    this.hammer.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL })

    this.hammer.on('swipe', e => {
      const startY = e.deltaY

      const offset =
        Math.abs(startY) >
        (window.document.documentElement.clientHeight / 100) *
          this.options.touchSensitivity
      if (!offset) {
        return
      }

      if (startY > 0) {
        this.previous()
      } else if (startY < 0) {
        this.next()
      }
    })
  }

  initStyle() {
    addClass(this.classes.OPEN, document.body)

    addClass(this.classes.CONTAINER, this.element)

    addClass(this.classes.SECTION, this.element)

    if (this.options.animation === 'scroll') {
      addClass(this.classes.SCROLL, this.element)
    }

    if (this.options.animation === 'stack') {
      addClass(this.classes.STACK, this.element)
    }
  }

  getIdByIndex(index) {
    const v = index - 1
    const id = `#${this.$sections[v].getAttribute('id')}`
    return id
  }

  getIndexById(id) {
    let index = 0
    let result = 0
    this.$sections.forEach(section => {
      const sectionId = `#${section.getAttribute('id')}`
      if (sectionId === id) {
        result = index + 1
      }
      index++
    })
    return result
  }

  previous() {
    if (this.currIndex <= 1 && this.options.loop === false) {
      return
    }

    if (this.options.loop) {
      if (this.currIndex <= 1) {
        this.currIndex = this.$sections.length + 1
      }
    }

    if (!this.is('moveing')) {
      this.currIndex--
      this.history.changePage()
    }
  }

  next() {
    if (
      this.currIndex >= this.$sections.length &&
      this.options.loop === false
    ) {
      return
    }

    if (this.options.loop) {
      if (this.currIndex >= this.$sections.length) {
        this.currIndex = 0
      }
    }

    if (!this.is('moveing')) {
      this.currIndex++
      this.history.changePage()
    }
  }

  goTo(id) {
    const index = this.getIndexById(id)

    if (
      index > 0 < this.$sections.length &&
      (this.currIndex !== index || !this.is('initialized'))
    ) {
      this.currIndex = index
      this.history.changePage()
    }
  }

  scrollTo(id) {
    const index = this.getIndexById(id)
    if (index > 0 < this.$sections.length && this.currIndex !== index) {
      if (!this.is('moveing')) {
        this.currIndex = index
        this.history.changePage()
      }
    }
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

  getId() {
    const id = this.getIdByIndex(this.currIndex)
    return id
  }

  static registerType(type, API) {
    ANIMATION[type] = API
  }
}

SectionScroll.registerType('stack', STACK)
SectionScroll.registerType('scroll', SCROLL)

export default SectionScroll
