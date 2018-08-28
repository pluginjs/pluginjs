import ScrollDir from '@pluginjs/scroll-dir'

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
        this.instance.element.classList.remove(classes[key])
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
    const classList = this.instance.element.classList
    const classes = this.classes

    if (
      classList.contains(classes.pinned) ||
      !classList.contains(classes.unpinned)
    ) {
      classList.add(classes.unpinned)
      classList.remove(classes.pinned)
      this.instance.trigger('unpinned')
    }
  }

  pin() {
    const classList = this.instance.element.classList
    const classes = this.classes

    if (classList.contains(classes.unpinned)) {
      classList.remove(classes.unpinned)
      classList.add(classes.pinned)
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
