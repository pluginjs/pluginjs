const measurements = [
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginBottom',
  'borderLeftWidth',
  'borderRightWidth',
  'borderTopWidth',
  'borderBottomWidth'
]

const measurementsLength = measurements.length

const getStyleSize = value => {
  const num = parseFloat(value)
  const isValid = value.indexOf('%') === -1 && !isNaN(num)
  return isValid && num
}

function getZeroSize() {
  const size = {
    width: 0,
    height: 0,
    innerWidth: 0,
    innerHeight: 0,
    outerWidth: 0,
    outerHeight: 0
  }

  for (let i = 0; i < measurementsLength; i++) {
    const measurement = measurements[i]
    size[measurement] = 0
  }

  return size
}

const getStyle = ele => {
  const style = getComputedStyle(ele)
  return style
}

let isSetup = false

let isBoxSizeOuter

const setup = () => {
  if (isSetup) {
    return
  }
  isSetup = true

  const div = document.createElement('div')
  div.style.width = '200px'
  div.style.padding = '1px 2px 3px 4px'
  div.style.borderStyle = 'solid'
  div.style.borderWidth = '1px 2px 3px 4px'
  div.style.boxSizing = 'border-box'

  const body = document.body || document.documentElement
  body.appendChild(div)
  const style = getStyle(div)
  isBoxSizeOuter = Math.round(getStyleSize(style.width)) === 200
  getSize.isBoxSizeOuter = isBoxSizeOuter
  body.removeChild(div)
}

function getSize(elem) {
  setup()

  if (typeof elem === 'string') {
    elem = document.querySelector(elem)
  }

  if (!elem || typeof elem !== 'object' || !elem.nodeType) {
    return null
  }

  const style = getStyle(elem)

  if (style.display === 'none') {
    return getZeroSize()
  }

  const size = {}
  size.width = elem.offsetWidth
  size.height = elem.offsetHeight
  size.isBorderBox = style.boxSizing === 'border-box'
  const isBorderBox = size.isBorderBox

  for (let i = 0; i < measurementsLength; i++) {
    const measurement = measurements[i]
    const value = style[measurement]
    const num = parseFloat(value)
    size[measurement] = !isNaN(num) ? num : 0
  }

  const paddingWidth = size.paddingLeft + size.paddingRight
  const paddingHeight = size.paddingTop + size.paddingBottom
  const marginWidth = size.marginLeft + size.marginRight
  const marginHeight = size.marginTop + size.marginBottom
  const borderWidth = size.borderLeftWidth + size.borderRightWidth
  const borderHeight = size.borderTopWidth + size.borderBottomWidth

  const isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter

  const styleWidth = getStyleSize(style.width)
  if (styleWidth !== false) {
    size.width =
      styleWidth + (isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth)
  }

  const styleHeight = getStyleSize(style.height)
  if (styleHeight !== false) {
    size.height =
      styleHeight + (isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight)
  }

  size.innerWidth = size.width - (paddingWidth + borderWidth)
  size.innerHeight = size.height - (paddingHeight + borderHeight)

  size.outerWidth = size.width + marginWidth
  size.outerHeight = size.height + marginHeight

  return size
}

export default getSize
