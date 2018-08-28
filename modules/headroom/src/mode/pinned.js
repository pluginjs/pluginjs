import ScrollDir from '@pluginjs/scroll-dir'
import { addClass, removeClass, hasClass } from '@pluginjs/classes'

class pinned {
  constructor(instance) {
    this.instance = instance
    this.options = instance.options.pinned
    this.tolerance = this.normalizeTolerance(this.options.tolerance)
    this.classes = {
      pinned: instance.classes.PINNED,
      unpinned: instance.classes.UNPINNED
    }
    if (typeof this.options.offset === 'number') {
      this.offset = this.options.offset
    } else if (typeof this.options.offset === 'string') {
      this.offset = this.setScrollOffset()
    } else {
      return
    }
    ScrollDir.on(this.update, this)
  }

  destroy() {
    const classes = this.classes

    for (const key in classes) {
      if ({}.hasOwnProperty.call(classes, key)) {
        removeClass(classes[key], this.instance.element)
      }
    }

    ScrollDir.off(this.update)
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
    const classes = this.classes

    if (
      hasClass(classes.pinned, this.instance.element) ||
      !hasClass(classes.unpinned, this.instance.element)
    ) {
      addClass(classes.unpinned, this.instance.element)
      removeClass(classes.pinned, this.instance.element)
      this.instance.trigger('unpinned')
    }
  }

  pin() {
    const classes = this.classes

    if (hasClass(classes.unpinned, this.instance.element)) {
      removeClass(classes.unpinned, this.instance.element)
      addClass(classes.pinned, this.instance.element)
      this.instance.trigger('pinned')
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

  setScrollOffset() {
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
}

export default pinned
