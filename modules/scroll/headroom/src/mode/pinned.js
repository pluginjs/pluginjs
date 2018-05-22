import Pj from '@pluginjs/pluginjs'

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
      // console.info('Invalid offset:', this.options.offset);
      return
    }

    Pj.scrolldir.on(this.update, this)
  }

  destroy() {
    const classes = this.classes

    for (const key in classes) {
      if (classes.hasOwnProperty(key)) {
        this.instance.element.classList.remove(classes[key])
      }
    }

    Pj.scrolldir.off(this.update)
  }

  update(direction, currentScrollY, delta) {
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
      this.instance.trigger('pinned')
    }
  }

  pin() {
    const classList = this.instance.element.classList
    const classes = this.classes

    if (classList.contains(classes.unpinned)) {
      classList.remove(classes.unpinned)
      classList.add(classes.pinned)
      this.instance.trigger('unpinned')
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
      : {
          down: tolerance,
          up: tolerance
        }
  }

  setScrollOffset() {
    if (typeof this.options.offset === 'string') {
      return this.getElementY(
        document.querySelector(this.options.offset),
        this.options.offsetSide
      )
    }
    return undefined
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
