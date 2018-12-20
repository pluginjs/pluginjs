import Component from '@pluginjs/component'
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
import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import Breakpoints from '@pluginjs/breakpoints'
import { getWidth, getHeight, setStyle } from '@pluginjs/styled'
import { query, queryAll } from '@pluginjs/dom'
import Arrows from '@pluginjs/arrows'
import Anime from 'animejs'

@themeable()
@styleable(CLASSES)
@eventable(EVENTS)
@stateable()
@optionable(DEFAULTS, true)
@register(NAMESPACE, {
  methods: METHODS,
  dependencies: DEPENDENCIES
})
class Timeline extends Component {
  constructor(element, options = {}) {
    super(element)

    this.setupOptions(options)
    this.setupClasses()
    this.setupStates()
    this.initialize()
  }

  initialize() {
    if (this.options.theme) {
      addClass(this.getThemeClass(), this.element)
    }

    addClass(this.classes.HORIZONTAL, this.element)

    this.$list = query(`.${this.classes.LIST}`, this.element)
    this.$itemAll = queryAll(`.${this.classes.ITEM}`, this.element)

    this.width = getWidth(this.element)
    this.itemWidth = this.width / Number(this.options.visibleItems)

    this.maxIndex = this.$itemAll.length - this.options.visibleItems
    this.currentIndex = 0

    if (this.options.breakpoint) {
      this.initBreakpoints()
    }

    this.init()

    this.bind()

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  init() {
    if (hasClass(this.classes.HORIZONTAL, this.element)) {
      setStyle(
        {
          width: `${this.itemWidth * this.$itemAll.length}px`
        },
        this.$list
      )

      this.height = this.$itemAll
        .map(item => getHeight(item))
        .sort()
        .reverse()[0]

      setStyle(
        {
          height: `${this.height * 2}px`
        },
        this.$list
      )
    } else {
      setStyle(
        {
          width: 'auto',
          height: 'auto'
        },
        this.$list
      )
    }

    this.buildArrows()
  }

  buildArrows() {
    this.$arrows = Arrows.of(this.element, this.options.arrows)
    setStyle(
      {
        top: `${(this.height * 2 - this.$arrows.$next.clientHeight) / 2}px`,
        position: 'absolute'
      },
      this.$arrows.$next
    )
    setStyle(
      {
        top: `${(this.height * 2 - this.$arrows.$prev.clientHeight) / 2}px`,
        position: 'absolute'
      },
      this.$arrows.$prev
    )
    if (!this.options.loop) {
      this.$arrows.disable('prev')
    }
  }

  initBreakpoints() {
    Breakpoints.init()
    if (Breakpoints.all().includes(this.options.breakpoint)) {
      const breakpoint = this.options.breakpoint
      const that = this
      if (Breakpoints.is(`${breakpoint}-`)) {
        removeClass(this.classes.HORIZONTAL, this.element)
      }
      Breakpoints.to(breakpoint, {
        enter() {
          removeClass(that.classes.HORIZONTAL, that.element)
        },
        leave() {
          addClass(that.classes.HORIZONTAL, that.element)
        }
      })
    }
  }

  bind() {
    if (this.$arrows) {
      this.$arrows.options.onNext = () => {
        this.next()
      }

      this.$arrows.options.onPrev = () => {
        this.prev()
      }
    }
  }

  next() {
    const index = this.options.loop ? 0 : this.maxIndex
    this.currentIndex =
      this.currentIndex < this.maxIndex ? this.currentIndex + 1 : index
    this.move()
  }

  prev() {
    const index = this.options.loop ? this.maxIndex : 0
    this.currentIndex = this.currentIndex === 0 ? index : this.currentIndex - 1
    this.move()
  }

  move() {
    const distance = this.itemWidth * this.currentIndex

    if (hasClass(this.classes.HORIZONTAL, this.element)) {
      if (this.$anime) {
        this.$anime.pause()
      }
      this.$anime = Anime({
        targets: this.$list,
        translateX: -distance,
        translateZ: 0,
        easing: 'easeOutSine',
        duration: 700
      })
    } else {
      setStyle(
        {
          transform: 'none'
        },
        this.$list
      )
    }

    if (!this.options.loop) {
      if (this.currentIndex === 0) {
        this.$arrows.disable('prev')
        this.$arrows.enable('next')
      } else if (this.currentIndex === this.maxIndex) {
        this.$arrows.disable('next')
        this.$arrows.enable('prev')
      } else {
        this.$arrows.enable()
      }
    }
  }

  resize() {
    this.resizeInit()
  }

  resizeInit() {
    this.width = getWidth(this.element)
    this.itemWidth = this.width / Number(this.options.visibleItems)

    if (hasClass(this.classes.HORIZONTAL, this.element)) {
      setStyle(
        {
          width: `${this.itemWidth * this.$itemAll.length}px`,
          height: 'auto'
        },
        this.$list
      )

      this.height = this.$itemAll
        .map(item => getHeight(item))
        .sort()
        .reverse()[0]

      setStyle(
        {
          height: `${this.height * 2}px`
        },
        this.$list
      )

      setStyle(
        {
          top: `${(this.height * 2 - this.$arrows.$next.clientHeight) / 2}px`,
          position: 'absolute'
        },
        this.$arrows.$next
      )
      setStyle(
        {
          top: `${(this.height * 2 - this.$arrows.$prev.clientHeight) / 2}px`,
          position: 'absolute'
        },
        this.$arrows.$prev
      )
    } else {
      setStyle(
        {
          width: 'auto',
          height: 'auto',
          transform: 'none'
        },
        this.$list
      )
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
      this.$arrows.destroy()
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default Timeline
