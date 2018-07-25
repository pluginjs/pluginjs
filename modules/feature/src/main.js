/* eslint no-undef: "off" */

/* Credit to http://featurejs.com MIT */
/**
 * Test if it's an old device that we want to filter out
 */
const old = () =>
  Boolean(/(Android\s(1.|2.))|(Silk\/1.)/i.test(navigator.userAgent))

/**
 * Function that takes a standard CSS property name as a parameter and
 * returns it's prefixed version valid for current browser it runs in
 */
const pfx = (function() {
  const prefixes = ['Webkit', 'Moz', 'O', 'ms']
  const memory = {}
  const style = document.createElement('dummy').style
  return function(prop) {
    if (typeof memory[prop] === 'undefined') {
      const ucProp = prop.charAt(0).toUpperCase() + prop.substr(1)
      const props = `${prop} ${prefixes.join(`${ucProp} `)}${ucProp}`.split(' ')
      memory[prop] = null

      for (const i in props) {
        if (typeof style[props[i]] !== 'undefined') {
          memory[prop] = props[i]
          break
        }
      }
    }
    return memory[prop]
  }
})()

export function prefixedProperty(property) {
  return pfx(property)
}

export const transitionProperty = () => pfx('transition')

export const transformProperty = () => pfx('transform')

export const animationProperty = () => pfx('animation')

export const transitionEndEvent = () => {
  const eventNames = {
    transition: 'transitionend',
    OTransition: 'oTransitionEnd',
    MozTransition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd'
  }
  const style = document.createElement('dummy').style
  for (const i in eventNames) {
    if (Object.prototype.hasOwnProperty.call(eventNames, i)) {
      if (typeof style[i] !== 'undefined') {
        return eventNames[i]
      }
    }
  }
  return false
}

export const animationEndEvent = () => {
  const eventNames = {
    animation: 'animationend',
    OAnimation: 'oanimationend',
    msAnimation: 'MSAnimationEnd',
    MozAnimation: 'animationend',
    WebkitAnimation: 'webkitAnimationEnd'
  }
  // const style = document.body.style
  const style = {}
  for (const i in eventNames) {
    if (Object.prototype.hasOwnProperty.call(eventNames, i)) {
      if (typeof style[i] !== 'undefined') {
        return eventNames[i]
      }
    }
  }
  return false
}

// Test if CSS 3D transforms are supported
export const transform3D = () => {
  const test = !old() && pfx('perspective') !== null
  return Boolean(test)
}

// Test if CSS transforms are supported
export const transform = () => {
  const test = !old() && pfx('transformOrigin') !== null
  return Boolean(test)
}

// Test if CSS transitions are supported
export const transition = () => {
  const test = pfx('transition') !== null
  return Boolean(test)
}

// Test if CSS sticky  are supported

export const canSticky = () => {
  let _canSticky = false
  const documentFragment = document.documentElement
  const testElement = document.createElement('div')
  documentFragment.appendChild(testElement)
  const prefixedSticky = ['sticky', '-webkit-sticky']

  for (let i = 0; i < prefixedSticky.length; i++) {
    testElement.style.position = prefixedSticky[i]
    _canSticky = Boolean(
      window.getComputedStyle(testElement).position.match('sticky')
    )
    if (_canSticky) {
      break
    }
  }
  documentFragment.removeChild(testElement)

  return _canSticky
}

// Test if SVG is supported
export const isSupportedSvg = () =>
  Boolean(document.createElementNS) &&
  Boolean(
    document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect
  )

// Tests if touch events are supported, but doesn't necessarily reflect a touchscreen device
export const touch = Boolean(
  'ontouchstart' in window ||
    (window.navigator &&
      window.navigator.msPointerEnabled &&
      window.MSGesture) ||
    (window.DocumentTouch && document instanceof DocumentTouch)
)

export const pointer =
  window.PointerEvent || window.MSPointerEvent ? true : false // eslint-disable-line no-unneeded-ternary

export function pointerEvent(pointerEvent) {
  return window.MSPointerEvent
    ? `MSPointer${pointerEvent.charAt(9).toUpperCase()}${pointerEvent.substr(
        10
      )}`
    : pointerEvent
}
