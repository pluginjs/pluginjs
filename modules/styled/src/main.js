import { curry } from '@pluginjs/utils'
import is from '@pluginjs/is'
import { sum } from './data.list'

/**
 * setStyle({
 *  fontSize: '16px',
 *  display: 'flex'
 * }, element)
 */
export const setStyle = curry((style, el) => {
  Object.entries(style).forEach(([k, v]) => {
    if (typeof v === 'number') {
      v = `${v.toString()}px`
    }
    el.style[k] = v
  })
  return el
})

export const outerHeight = el => el.offsetHeight

export const outerHeightWithMargin = el => {
  const height = outerHeight(el)
  const { marginTop, marginBottom } = window.getComputedStyle(el)
  return sum([marginTop, marginBottom].map(i => parseInt(i, 10)).concat(height))
}

export const outerWidth = el => el.offsetWidth

export const outerWidthWithMargin = el => {
  const width = outerWidth(el)
  const { marginLeft, marginRight } = window.getComputedStyle(el)
  return sum([marginLeft, marginRight].map(i => parseInt(i, 10)).concat(width))
}

export const getStyle = curry(
  (attr, el) =>
    // let value = ''
    // const style = el.style

    // if (style) {
    //   value = style[attr]

    //   if (value === '') {
    //     // fix value is 'auto'
    //     const win = el.ownerDocument.defaultView
    //     value = win.getComputedStyle(el, null)[attr]
    //   }
    // }

    window.getComputedStyle(el)[attr]
)

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

export const css = (el, attr, value = null) => {
  if (value) {
    const mergedStyleObj = {}
    mergedStyleObj[attr] = value

    return setStyle(mergedStyleObj, el)
  } else if (is.object(attr)) {
    return setStyle(attr, el)
  }
  return getStyle(attr, el)
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
