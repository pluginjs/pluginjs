import Component from '@pluginjs/component'
import { addClass, removeClass, hasClass } from '@pluginjs/classes'
import ScrollDir from '@pluginjs/scroll-dir'
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
class Headroom extends Component {
  constructor(element, options = {}) {
    super(element)

    this.setupOptions(options)
    this.setupClasses()
    this.setupStates()
    this.initialize()
  }

  initialize() {
    addClass(this.classes.NAMESPACE, this.element)

    this.tolerance = this.normalizeTolerance(this.options.tolerance)

    if (typeof this.options.offset === 'number') {
      this.offset = this.options.offset
    } else if (typeof this.options.offset === 'string') {
      this.offset = this.getScrollOffset()
    } else {
      return
    }

    ScrollDir.on(this.update, this)

    Object.assign(this.element.style, {
      transition: `transform ${this.options.duration}s ${this.options.easing}`
    })

    this.enter('initialized')
    this.trigger(EVENTS.READY)
  }

  update(direction, delta, currentScrollY) {
    const horizontalDirection = direction.horizontal
    const toleranceExceeded =
      Math.abs(delta.horizontal) >= this.tolerance[horizontalDirection]

    if (
      this.scrollDown(currentScrollY, toleranceExceeded, horizontalDirection)
    ) {
      this.unpin()
    } else if (
      this.scrollUp(currentScrollY, toleranceExceeded, horizontalDirection)
    ) {
      this.pin()
    }
  }

  unpin() {
    if (
      hasClass(this.classes.PINNED, this.element) ||
      !hasClass(this.classes.UNPINNED, this.element)
    ) {
      addClass(this.classes.UNPINNED, this.element)
      removeClass(this.classes.PINNED, this.element)
      this.trigger('unpinned')
    }
  }

  pin() {
    if (hasClass(this.classes.UNPINNED, this.element)) {
      removeClass(this.classes.UNPINNED, this.element)
      addClass(this.classes.PINNED, this.element)
      this.trigger('pinned')
    }
  }

  scrollDown(currentScrollY, toleranceExceeded, direction) {
    const pastOffset = currentScrollY >= this.offset
    const scrollingDown = direction === 'down'

    return scrollingDown && pastOffset && toleranceExceeded
  }

  scrollUp(currentScrollY, toleranceExceeded, direction) {
    const pastOffset = currentScrollY <= this.offset
    const scrollingUp = direction === 'up'

    return (scrollingUp && toleranceExceeded) || pastOffset
  }

  normalizeTolerance(tolerance) {
    return tolerance === Object(tolerance)
      ? tolerance
      : { down: tolerance, up: tolerance }
  }

  getScrollOffset() {
    if (typeof this.options.offset === 'string') {
      return this.getElementY(
        document.querySelector(this.options.offset),
        this.options.offsetSide
      )
    }
    return undefined /* eslint-disable-line */
  }

  getElementY(element, side) {
    let pos = 0
    const elementHeight = element.offsetHeight

    if (element) {
      pos += element.offsetTop
    }
    if (side === 'bottom') {
      pos += elementHeight
    }
    return pos
  }

  enable() {
    if (this.is('disabled')) {
      this.leave('disabled')
    }

    this.trigger(EVENTS.ENABLE)
  }

  disable() {
    if (!this.is('disabled')) {
      this.enter('disabled')
    }

    this.trigger(EVENTS.DISABLE)
  }

  destroy() {
    if (this.is('initialized')) {
      removeClass(this.classes.PINNED, this.element)
      removeClass(this.classes.UNPINNED, this.element)

      ScrollDir.off(this.update)
      this.leave('initialized')
    }

    this.trigger(EVENTS.DESTROY)
    super.destroy()
  }
}

export default Headroom
