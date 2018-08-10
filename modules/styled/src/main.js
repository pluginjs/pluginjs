import { curryWith, camelize, dasherize } from '@pluginjs/utils'
import { isObject, isElement, isNumeric, isString, isWindow } from '@pluginjs/is'

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
  if(isElement(includeMargins) && typeof el === 'undefined') {
    el = includeMargins
    includeMargins = false
  }

  if(isWindow(el)) {
    return el.outerHeight
  }

  if(includeMargins) {
    const { marginTop, marginBottom } = window.getComputedStyle(el)

    return parseInt(marginTop, 10) + parseInt(marginBottom, 10) + el.offsetHeight
  }

  return el.offsetHeight
}

export const outerWidth = (includeMargins, el) => {
  if(isElement(includeMargins) && typeof el === 'undefined') {
    el = includeMargins
    includeMargins = false
  }

  if(isWindow(el)) {
    return el.outerWidth
  }

  if(includeMargins) {
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

export const offset = el => {
  const box = el.getBoundingClientRect()

  return {
    top: box.top + window.pageYOffset - document.documentElement.clientTop,
    left: box.left + window.pageXOffset - document.documentElement.clientLeft
  }
}

export const getOffset = el => {
  const box = el.getBoundingClientRect()

  return {
    top: box.top + window.pageYOffset - document.documentElement.clientTop,
    left: box.left + window.pageXOffset - document.documentElement.clientLeft
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
