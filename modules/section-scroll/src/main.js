import Component from '@pluginjs/component'
import Hammer from 'hammerjs'
import { addClass, removeClass } from '@pluginjs/classes'
import { bindEvent, removeEvent } from '@pluginjs/events'
import { append, queryAll, query } from '@pluginjs/dom'
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
  info as INFO,
  methods as METHODS,
  namespace as NAMESPACE
} from './constant'
import Dots from './dots'
import SCROLL from './type/scroll'
import STACK from './type/stack'

const ANIMATION = {}

@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(
  NAMESPACE,
  {
    methods: METHODS,
    dependencies: DEPENDENCIES
  },
  INFO
)
class SectionScroll extends Component {
  constructor(element, options = {}) {
    super(NAMESPACE, element)
    this.initOptions(DEFAULTS, options)
    this.initClasses(CLASSES)

    this.initStates()
    this.initialize()
  }

  initialize() {
    this.$sections = queryAll(this.options.itemSelector, this.element)
    this.currIndex = 1
    this.initStyle()
    this.Dots = new Dots(this)
    this.Animation = ANIMATION[this.options.animation]
      ? new ANIMATION[this.options.animation](this)
      : new ANIMATION.SCROLL(this)

    this.bind()

    // first init
    const id = window.location.hash
      ? window.location.hash
      : `#${this.$sections[0].id}`
    this.goTo(id)

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  bind() {
    if (this.options.touch) {
      // this.bindChouch()
    }
    if (this.options.mousewheel) {
      this.onMousewheel()
    }
    this.bindKeydown()
  }

  unbind() {
    this.unbindKeydown()
    if (this.options.mousewheel) {
      this.offMousewheel()
    }
    // this.unbindChouch()
  }

  onMousewheel() {
    bindEvent(
      {
        type: this.eventName('mousewheel'),
        handler: e => {
          e.preventDefault()

          const value = event.wheelDelta || -event.detail
          const delta = Math.max(-1, Math.min(1, value))

          if (delta > 0) {
            this.previous()
          } else if (delta < 0) {
            this.next()
          }
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
      {
        type: this.eventName('keydown'),
        handler: event => {
          if (event.keyCode === 38) {
            this.previous()
          } else if (event.keyCode === 40) {
            this.next()
          }
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
    // stop scale
    append(
      '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">',
      query('head')
    )
    addClass(this.classes.CONTAINER, this.element)

    addClass(this.classes.SECTION, this.element)
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
    if (this.currIndex <= 1) {
      return
    }

    if (!this.is('moveing')) {
      this.currIndex--
      this.Animation.changePage()
    }
  }

  next() {
    if (this.currIndex >= this.$sections.length) {
      return
    }

    if (!this.is('moveing')) {
      this.currIndex++
      this.Animation.changePage()
    }
  }

  goTo(id) {
    const index = this.getIndexById(id)

    if (
      index > 0 < this.$sections.length &&
      (this.currIndex !== index || !this.is('initialized'))
    ) {
      this.currIndex = index
      this.Animation.changePage()
    }
  }

  scrollTo(id) {
    const index = this.getIndexById(id)
    if (index > 0 < this.$sections.length && this.currIndex !== index) {
      if (!this.is('moveing')) {
        this.currIndex = index
        this.Animation.changePage()
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
      // this.$dots.asDots('destroy');
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
