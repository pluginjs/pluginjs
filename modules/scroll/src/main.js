import { isObject, isNumeric, isFunction, isDomNode } from '@pluginjs/is'
import easing from '@pluginjs/easing'
import Pj from '@pluginjs/factory'

/* Credit to https://github.com/iamdustan/smoothscroll MIT */
const scroll = (function() {
  /*
   * define timing method
   */
  const now =
    window.performance && window.performance.now
      ? window.performance.now.bind(window.performance)
      : Date.now

  /*
   * changes scroll position inside an element
   * @method scrollElement
   * @param {Number} x
   * @param {Number} y
   */
  function scrollElement(x, y) {
    this.scrollLeft = x
    this.scrollTop = y
  }

  /*
   * finds scrollable parent of an element
   * @method findScrollableParent
   * @param {Node} el
   * @returns {Node} el
   */
  function findScrollableParent(el) {
    let isBody
    let hasScrollableSpace
    let hasVisibleOverflow

    do {
      el = el.parentNode

      // set condition variables
      isBody = el === window.document.body
      hasScrollableSpace =
        el.clientHeight < el.scrollHeight || el.clientWidth < el.scrollWidth
      hasVisibleOverflow =
        window.getComputedStyle(el, null).overflow === 'visible'
    } while (!isBody && !(hasScrollableSpace && !hasVisibleOverflow))

    isBody = null
    hasScrollableSpace = null
    hasVisibleOverflow = null

    return el
  }

  let currentFrame = null

  /*
   * self invoked function that, given a context, steps through scrolling
   * @method step
   * @param {Object} context
   */
  function step(context) {
    // call method again on next available frame
    context.frame = window.requestAnimationFrame(step.bind(window, context))
    currentFrame = context.frame

    const time = now()
    let elapsed = (time - context.startTime) / context.duration

    // avoid elapsed times higher than one
    elapsed = elapsed > 1 ? 1 : elapsed

    // apply easing to elapsed time
    const value = context.easing(elapsed)
    const currentX = context.startX + (context.x - context.startX) * value
    const currentY = context.startY + (context.y - context.startY) * value

    context.method.call(context.scrollable, currentX, currentY)

    // return when end points have been reached
    if (currentX === context.x && currentY === context.y) {
      window.cancelAnimationFrame(context.frame)
      if (isFunction(context.complete)) {
        context.complete.call(context.scrollable, context.x, context.y)
      }
      return
    }
  }

  /*
   * scrolls window
   * @method smoothScroll
   * @param {Object|Node} el
   * @param {Number} x
   * @param {Number} y
   */
  function smoothScroll(
    el,
    x,
    y,
    easingStatus = 'ease',
    duration = 468,
    complete
  ) {
    let scrollable
    let startX
    let startY
    let method
    const startTime = now()
    let frame

    // define scroll context
    if (el === window.document.body) {
      scrollable = window
      startX = window.scrollX || window.pageXOffset
      startY = window.scrollY || window.pageYOffset
      method = window.scroll || window.scrollTo
    } else {
      scrollable = el
      startX = el.scrollLeft
      startY = el.scrollTop
      method = scrollElement
    }

    if (!isNumeric(x)) {
      x = startX
    }
    if (!isNumeric(y)) {
      y = startY
    }
    // cancel frame when a scroll event's happening
    if (currentFrame) {
      window.cancelAnimationFrame(currentFrame)
    }

    // scroll looping over a frame
    step({
      scrollable,
      method,
      startTime,
      startX,
      startY,
      x: parseInt(x, 10),
      y: parseInt(y, 10),
      easing: easing.get(easingStatus) || easing.get('ease'),
      duration: parseInt(duration, 10),
      frame,
      complete
    })
  }

  function scrollTo(x, y, easing, duration, complete) {
    if (isObject(x)) {
      if (typeof x.y !== 'undefined') {
        y = x.y
      }
      if (typeof x.easing !== 'undefined') {
        easing = x.easing
      }
      if (typeof x.duration !== 'undefined') {
        duration = x.duration
      }
      if (typeof x.complete !== 'undefined') {
        complete = x.complete
      }
      x = x.x
    }
    smoothScroll.call(
      window,
      window.document.body,
      isNumeric(x) ? parseInt(x, 10) : undefined,
      isNumeric(y) ? parseInt(y, 10) : undefined,
      easing,
      duration,
      complete
    )
  }

  function scrollToX(value, easing, duration, complete) {
    if (isObject(value)) {
      if (typeof value.easing !== 'undefined') {
        easing = value.easing
      }
      if (typeof value.duration !== 'undefined') {
        duration = value.duration
      }
      if (typeof value.complete !== 'undefined') {
        complete = value.complete
      }
      value = value.value
    }
    smoothScroll.call(
      window,
      window.document.body,
      parseInt(value, 10),
      undefined,
      easing,
      duration,
      (x, y) => {
        /* eslint no-unused-vars: 'off' */
        if (isFunction(complete)) {
          complete(x)
        }
      }
    )
  }

  function scrollToY(value, easing, duration, complete) {
    if (isObject(value)) {
      if (typeof value.easing !== 'undefined') {
        easing = value.easing
      }
      if (typeof value.duration !== 'undefined') {
        duration = value.duration
      }
      if (typeof value.complete !== 'undefined') {
        complete = value.complete
      }
      value = value.value
    }
    smoothScroll.call(
      window,
      window.document.body,
      undefined,
      parseInt(value, 10),
      easing,
      duration,
      (x, y) => {
        /* eslint no-unused-vars: 'off' */
        if (isFunction(complete)) {
          complete(y)
        }
      }
    )
  }

  function scrollBy(x, y, easing, duration, complete) {
    if (isObject(x)) {
      if (typeof x.y !== 'undefined') {
        y = x.y
      }
      if (typeof x.easing !== 'undefined') {
        easing = x.easing
      }
      if (typeof x.duration !== 'undefined') {
        duration = x.duration
      }
      if (typeof x.complete !== 'undefined') {
        complete = x.complete
      }
      x = x.x
    }

    smoothScroll.call(
      window,
      window.document.body,
      isNumeric(x)
        ? parseInt(x, 10) + (window.scrollX || window.pageXOffset)
        : undefined,
      isNumeric(y)
        ? parseInt(y, 10) + (window.scrollY || window.pageYOffset)
        : undefined,
      easing,
      duration,
      complete
    )
  }

  function scrollByX(value, easing, duration, complete) {
    if (isObject(value)) {
      if (typeof value.easing !== 'undefined') {
        easing = value.easing
      }
      if (typeof value.duration !== 'undefined') {
        duration = value.duration
      }
      if (typeof value.complete !== 'undefined') {
        complete = value.complete
      }
      value = value.value
    }

    smoothScroll.call(
      window,
      window.document.body,
      parseInt(value, 10) + (window.scrollX || window.pageXOffset),
      undefined,
      easing,
      duration,
      (x, y) => {
        if (isFunction(complete)) {
          complete(x)
        }
      }
    )
  }

  function scrollByY(value, easing, duration, complete) {
    if (isObject(value)) {
      if (typeof value.easing !== 'undefined') {
        easing = value.easing
      }
      if (typeof value.duration !== 'undefined') {
        duration = value.duration
      }
      if (typeof value.complete !== 'undefined') {
        complete = value.complete
      }
      value = value.value
    }
    smoothScroll.call(
      window,
      window.document.body,
      undefined,
      parseInt(value, 10) + (window.scrollY || window.pageYOffset),
      easing,
      duration,
      (x, y) => {
        if (isFunction(complete)) {
          complete(y)
        }
      }
    )
  }

  function scrollIntoView(element, easing, duration, offset, axis, complete) {
    if (isObject(element) && isDomNode(element.element)) {
      if (typeof element.easing !== 'undefined') {
        easing = element.easing
      }
      if (typeof element.duration !== 'undefined') {
        duration = element.duration
      }
      if (typeof element.complete !== 'undefined') {
        complete = element.complete
      }
      if (typeof element.offset !== 'undefined') {
        offset = element.offset
      }
      if (typeof element.axis !== 'undefined') {
        axis = element.axis
      }
      element = element.element
    } else {
      if (isFunction(axis)) {
        complete = axis
        axis = undefined
      }
      if (isFunction(offset)) {
        complete = offset
        offset = undefined
      }
    }

    offset = offset || {}

    offset.left = isNumeric(offset.left) ? parseInt(offset.left, 10) : 0
    offset.top = isNumeric(offset.top) ? parseInt(offset.top, 10) : 0

    axis = Object.assign(
      {
        x: true,
        y: true
      },
      axis || {}
    )

    const scrollableParent =
      element === window.document.body ? element : findScrollableParent(element)
    const parentRects = scrollableParent.getBoundingClientRect()
    const clientRects = element.getBoundingClientRect()

    if (scrollableParent !== window.document.body) {
      // reveal element inside parent
      smoothScroll.call(
        element,
        scrollableParent,
        axis.x
          ? scrollableParent.scrollLeft +
            clientRects.left -
            offset.left -
            parentRects.left
          : undefined,
        axis.y
          ? scrollableParent.scrollTop +
            clientRects.top -
            offset.top -
            parentRects.top
          : undefined,
        easing,
        duration,
        complete
      )
      // reveal parent in viewport
      scrollBy(parentRects.left, parentRects.top, easing, duration)
    } else {
      // reveal element in viewport
      scrollBy(
        clientRects.left - offset.left,
        clientRects.top - offset.top,
        easing,
        duration,
        complete
      )
    }
  }

  function scrollTop(element, easing, duration, offset, complete) {
    if (isObject(element) && isDomNode(element.element)) {
      if (typeof element.easing !== 'undefined') {
        easing = element.easing
      }
      if (typeof element.duration !== 'undefined') {
        duration = element.duration
      }
      if (typeof element.offset !== 'undefined') {
        offset = element.offset
      }
      if (typeof element.complete !== 'undefined') {
        complete = element.complete
      }
      element = element.element
    }

    return scrollIntoView(
      element,
      easing,
      duration,
      { top: offset },
      {
        x: false,
        y: true
      },
      (x, y) => {
        if (isFunction(complete)) {
          complete(y)
        }
      }
    )
  }

  return {
    to: scrollTo,
    toX: scrollToX,
    toY: scrollToY,
    by: scrollBy,
    byX: scrollByX,
    byY: scrollByY,
    intoView: scrollIntoView,
    top: scrollTop
  }
})()

export default scroll
