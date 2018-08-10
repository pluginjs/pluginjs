import { curryWith, camelize, dasherize } from '@pluginjs/utils'
import {
  isObject,
  isElement,
  isNumeric,
  isString,
  isWindow
} from '@pluginjs/is'
import { offsetParent } from '@pluginjs/dom'

const sum = arr => arr.reduce((a, b) => a + b)

export const setStyle = (key, value, el) => {
  if (isString(key) && isElement(el)) {
    if (value || value === 0) {
      el.style[camelize(key, false)] = value
    } else {
      el.style.removeProperty(dasherize(key))
    }
  } else if (isObject(key)) {
    if (isElement(value) && typeof el === 'undefined') {
      el = value
      value = undefined
    }
    let prop

    for (prop in key) {
      setStyle(prop, key[prop], el)
    }
  }

  return el
}

export const getStyle = (key, el) => {
  const val = el.style[camelize(key, false)]

  return isNumeric(val) ? parseFloat(val) : val
}

export const css = curryWith((key, value, el) => {
  if (isElement(value) && typeof el === 'undefined') {
    el = value
    value = undefined
  }

  if (typeof key === 'string' && typeof value === 'undefined') {
    return getStyle(key, el)
  }
  return setStyle(key, value, el)
}, isElement)

// ----------
// Dimensions
// ----------
export const outerHeight = (includeMargins, el) => {
  if (isElement(includeMargins) && typeof el === 'undefined') {
    el = includeMargins
    includeMargins = false
  }

  if (isWindow(el)) {
    return el.outerHeight
  }

  if (includeMargins) {
    const { marginTop, marginBottom } = window.getComputedStyle(el)

    return (
      parseInt(marginTop, 10) + parseInt(marginBottom, 10) + el.offsetHeight
    )
  }

  return el.offsetHeight
}

export const outerWidth = (includeMargins, el) => {
  if (isElement(includeMargins) && typeof el === 'undefined') {
    el = includeMargins
    includeMargins = false
  }

  if (isWindow(el)) {
    return el.outerWidth
  }

  if (includeMargins) {
    const { marginLeft, marginRight } = window.getComputedStyle(el)

    return parseInt(marginLeft, 10) + parseInt(marginRight, 10) + el.offsetWidth
  }

  return el.offsetWidth
}

export const clientHeight = el => el.clientHeight

export const clientWidth = el => el.clientWidth

export const contentWidth = el => {
  const { paddingLeft, paddingRight, width } = window.getComputedStyle(el)
  return (
    parseInt(width, 10) -
    sum([paddingLeft, paddingRight].map(i => parseInt(i, 10)))
  )
}

export const contentHeight = el => {
  const { paddingTop, paddingBottom, height } = window.getComputedStyle(el)
  return (
    parseInt(height, 10) -
    sum([paddingTop, paddingBottom].map(i => parseInt(i, 10)))
  )
}

export const offset = (coordinates, el) => {
  if (isElement(coordinates) && typeof el === 'undefined') {
    el = coordinates
    coordinates = undefined
  }

  if(coordinates) {
    let props = {}, parentOffset = offset(offsetParent(el))

    if(coordinates.top != null) {
      props.top = coordinates.top  - parentOffset.top
    }
    if(coordinates.left != null) {
      props.left = coords.left - parentOffset.left
    }

    if (getStyle('position', el) == 'static') {
      props['position'] = 'relative'
    }

    return setStyle(props, el)
  }

  const box = el.getBoundingClientRect()
  const win = el.ownerDocument.defaultView

  return {
    top: box.top + win.pageYOffset,
    left: box.left + win.pageXOffset
  }
}

export const position = el => {
  let parentOffset = { top: 0, left: 0 }
  let coords

  if (getStyle('position', el) == 'fixed') {
    coords = el.getBoundingClientRect()
  } else {
    coords = offset(el)
    let offsetParent = offsetParent(el)
    if ( offsetParent && offsetParent !== el && offsetParent.nodeType === 1 ) {
      parentOffset = offset(offsetParent)
      parentOffset.top += parseFloat(offsetParent.style['borderTopWidth']) || 0
      parentOffset.left += parseFloat(offsetParent.style['borderLeftWidth']) || 0
    }
  }

  coords.top  -= parseFloat(el.style['marginTop']) || 0
  coords.left -= parseFloat(el.style['marginLeft']) || 0

  return {
    top:  coords.top  - parentOffset.top,
    left: coords.left - parentOffset.left
  }
}

export const hideElement = el => {
  if (el.style.display === 'none') {
    return el
  }

  if (el.style.display) {
    el.__originDisplay = el.style.display
  }

  el.style.display = 'none'
  return el
}

export const showElement = el => {
  if (el.__originDisplay) {
    el.style.display = el.__originDisplay
    delete el.__originDisplay
    return el
  }
  el.style.display = ''
  return el
}
