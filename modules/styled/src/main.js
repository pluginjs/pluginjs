import { curryWith, camelize, dasherize } from '@pluginjs/utils'
import {
  isObject,
  isElement,
  isNumeric,
  isString,
  isWindow,
  isArray,
  isDocument
} from '@pluginjs/is'
import { offsetParent } from '@pluginjs/dom'

export const getDefaultView = el => {
  let view = el.ownerDocument.defaultView

  if (!view || !view.opener) {
    view = window
  }

  return view
}

const isCssNumber = name => {
  return ![
    'animationIterationCount',
    'columnCount',
    'fillOpacity',
    'flexGrow',
    'flexShrink',
    'fontWeight',
    'lineHeight',
    'opacity',
    'order',
    'orphans',
    'widows',
    'zIndex',
    'zoom'
  ].includes(name)
}

export const isCSSVariable = name => {
  return /^--/.test(name)
}

export const setStyle = (key, value, el) => {
  if (isString(key) && isElement(el)) {
    if (value || value === 0) {
      if (isCSSVariable(key)) {
        el.style.setProperty(key, value)
      } else {
        key = camelize(key, false)
        if (isNumeric(value) && isCssNumber(key)) {
          value += 'px'
        }
        el.style[key] = value
      }
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
      if (Object.prototype.hasOwnProperty.call(key, prop)) {
        setStyle(prop, key[prop], el)
      }
    }
  }

  return el
}

export const getStyle = (key, el) => {
  let value

  if (isArray(key)) {
    value = {}

    key.forEach(k => {
      value[k] = getStyle(k, el)
    })

    return value
  }

  if (!isCSSVariable(key)) {
    key = dasherize(key)
  }

  value = getDefaultView(el)
    .getComputedStyle(el, '')
    .getPropertyValue(key)
  return isNumeric(value) ? parseFloat(value) : value
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
    const { marginTop, marginBottom } = getStyle(
      ['marginTop', 'marginBottom'],
      el
    )

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
    const { marginLeft, marginRight } = getStyle(
      ['marginLeft', 'marginRight'],
      el
    )

    return parseInt(marginLeft, 10) + parseInt(marginRight, 10) + el.offsetWidth
  }

  return el.offsetWidth
}

export const innerWidth = el => {
  if (isWindow(el)) {
    return el.innerWidth
  }

  return el.clientWidth
}

export const innerHeight = el => {
  if (isWindow(el)) {
    return el.innerHeight
  }

  return el.clientHeight
}

export const getWidth = el => {
  if (isWindow(el)) {
    return el.innerWidth
  }

  if (isDocument(el)) {
    const doc = el.documentElement

    return Math.max(
      el.body.scrollWidth,
      doc.scrollWidth,
      el.body.offsetWidth,
      doc.offsetWidth,
      doc.clientWidth
    )
  }

  let { width } = el.getBoundingClientRect()
  const { paddingLeft, paddingRight } = getStyle(
    ['paddingLeft', 'paddingRight'],
    el
  )

  width = width - parseInt(paddingLeft, 10) - parseInt(paddingRight, 10)

  if (getStyle('boxSizing', el) === 'border-box') {
    const { borderLeftWidth, borderRightWidth } = getStyle(
      ['borderLeftWidth', 'borderRightWidth'],
      el
    )
    width =
      width - parseInt(borderLeftWidth, 10) - parseInt(borderRightWidth, 10)
  }

  return width
}

export const setWidth = (value, el) => {
  if (el.nodeType !== 1) {
    return el
  }

  if (getStyle('boxSizing', el) === 'border-box') {
    const {
      paddingLeft,
      paddingRight,
      borderLeftWidth,
      borderRightWidth
    } = getStyle(
      ['paddingLeft', 'paddingRight', 'borderLeftWidth', 'borderRightWidth'],
      el
    )
    value += paddingLeft + paddingRight + borderLeftWidth + borderRightWidth
  }

  return setStyle('width', value, el)
}

export const width = (value, el) => {
  if (isElement(value) && typeof el === 'undefined') {
    el = value
    value = undefined
  }

  if (typeof value === 'undefined') {
    return getWidth(el)
  }
  return setWidth(value, el)
}

export const getHeight = el => {
  if (isWindow(el)) {
    return el.innerHeight
  }

  if (isDocument(el)) {
    const doc = el.documentElement

    return Math.max(
      el.body.scrollHeight,
      doc.scrollHeight,
      el.body.offsetHeight,
      doc.offsetHeight,
      doc.clientHeight
    )
  }

  let { height } = el.getBoundingClientRect()
  const { paddingTop, paddingBottom } = getStyle(
    ['paddingTop', 'paddingBottom'],
    el
  )

  height = height - parseInt(paddingTop, 10) - parseInt(paddingBottom, 10)

  if (getStyle('boxSizing', el) === 'border-box') {
    const borderStyles = getStyle(['borderTopHeight', 'borderBottomHeight'], el)
    const borderTopHeight = borderStyles.borderTopHeight || 0
    const borderBottomHeight = borderStyles.borderBottomHeight || 0
    height =
      height - parseInt(borderTopHeight, 10) - parseInt(borderBottomHeight, 10)
  }

  return height
}

export const setHeight = (value, el) => {
  if (el.nodeType !== 1) {
    return el
  }

  if (getStyle('boxSizing', el) === 'border-box') {
    const {
      paddingTop,
      paddingBottom,
      borderTopHeight,
      borderBottomHeight
    } = getStyle(
      ['paddingTop', 'paddingBottom', 'borderTopHeight', 'borderBottomHeight'],
      el
    )
    value += paddingTop + paddingBottom + borderTopHeight + borderBottomHeight
  }

  return setStyle('height', value, el)
}

export const height = (value, el) => {
  if (isElement(value) && typeof el === 'undefined') {
    el = value
    value = undefined
  }

  if (typeof value === 'undefined') {
    return getHeight(el)
  }
  return setHeight(value, el)
}

// ----------
// Offset
// ----------
export const getOffset = el => {
  const box = el.getBoundingClientRect()
  const win = getDefaultView(el)

  return {
    top: box.top + win.pageYOffset,
    left: box.left + win.pageXOffset
  }
}

export const setOffset = (coordinates, el) => {
  const props = {}
  const parentOffset = offset(offsetParent(el))

  if (typeof coordinates.top !== 'undefined') {
    props.top = coordinates.top - parentOffset.top
  }
  if (typeof coordinates.left !== 'undefined') {
    props.left = coordinates.left - parentOffset.left
  }

  if (getStyle('position', el) === 'static') {
    props.position = 'relative'
  }

  return setStyle(props, el)
}

export const offset = (coordinates, el) => {
  if (isElement(coordinates) && typeof el === 'undefined') {
    el = coordinates
    coordinates = undefined
  }

  if (coordinates) {
    return setOffset(coordinates, el)
  }

  return getOffset(el)
}

export const position = el => {
  let parentOffset = { top: 0, left: 0 }
  let coords

  if (getStyle('position', el) === 'fixed') {
    coords = el.getBoundingClientRect()
  } else {
    coords = offset(el)
    const offsetParent = offsetParent(el)
    if (offsetParent && offsetParent !== el && offsetParent.nodeType === 1) {
      parentOffset = offset(offsetParent)
      parentOffset.top += parseFloat(offsetParent.style.borderTopWidth) || 0
      parentOffset.left += parseFloat(offsetParent.style.borderLeftWidth) || 0
    }
  }

  coords.top -= parseFloat(el.style.marginTop) || 0
  coords.left -= parseFloat(el.style.marginLeft) || 0

  return {
    top: coords.top - parentOffset.top,
    left: coords.left - parentOffset.left
  }
}

// -------------
// Show and Hide
// -------------
const defaultDisplayMap = {}
const getDefaultDisplay = nodeName => {
  let display
  let element
  if (!defaultDisplayMap[nodeName]) {
    element = document.createElement(nodeName)
    document.body.appendChild(element)
    display = getComputedStyle(element, '').getPropertyValue('display')
    element.parentNode.removeChild(element)
    if (display === 'none') {
      display = 'block'
    }
    defaultDisplayMap[nodeName] = display
  }
  return defaultDisplayMap[nodeName]
}

export const hideElement = el => {
  if (el.style.display !== 'none') {
    el.style.display = 'none'
  }

  return el
}

export const showElement = el => {
  if (el.style.display === 'none') {
    el.style.display = ''
  }

  if (getComputedStyle(el, '').getPropertyValue('display') === 'none') {
    // is hidden within tree
    el.style.display = getDefaultDisplay(el.nodeName)
  }

  return el
}
