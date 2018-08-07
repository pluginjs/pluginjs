import * as styleHelper from '../src/main'

describe('styled', () => {
  test('setStyle', () => {
    const el = document.createElement('div')
    styleHelper.setStyle({ display: 'block' }, el)
    expect(el.style.display).toBe('block')
  })
  test('outerHeight', () => {
    const el = document.createElement('div')
    expect(el.offsetHeight).toBe(styleHelper.outerHeight(el))
  })
  test('outerHeightWithMargin', () => {
    const el = document.createElement('div')
    const { marginTop, marginBottom } = window.getComputedStyle(el)
    const marginHeight = parseInt(marginTop, 10) + parseInt(marginBottom, 10)
    expect(el.offsetHeight + marginHeight).toBe(
      styleHelper.outerHeightWithMargin(el)
    )
  })
  test('outerWidth', () => {
    const el = document.createElement('div')
    expect(el.offsetWidth).toBe(styleHelper.outerWidth(el))
  })
  test('outerWidthWithMargin', () => {
    const el = document.createElement('div')
    const { marginLeft, marginRight } = window.getComputedStyle(el)
    const marginWidth = parseInt(marginLeft, 10) + parseInt(marginRight, 10)
    expect(el.offsetWidth + marginWidth).toBe(
      styleHelper.outerWidthWithMargin(el)
    )
  })
  test('getStyle', () => {
    const el = document.createElement('div')
    el.style.display = 'block'
    expect(styleHelper.getStyle('display', el)).toBe('block')
  })
  test('clientHeight', () => {
    const el = document.createElement('div')
    expect(el.clientHeight).toBe(styleHelper.clientHeight(el))
  })
  test('clientWidth', () => {
    const el = document.createElement('div')
    expect(el.clientWidth).toBe(styleHelper.clientWidth(el))
  })
  // * jsdom unsupported full feature getComputeStyle
  //
  // test('contentWidth', () => {
  //   const el = document.createElement('div')
  //   const { paddingLeft, paddingRight, width } = window.getComputedStyle(el)
  //   const paddingWidth = parseInt(paddingLeft, 10) + parseInt(paddingRight, 10)
  //   expect(width + paddingWidth).toBe(styleHelper.contentWidth(el))
  // })
  // test('contentHeight', () => {
  //   const el = document.createElement('div')
  //   const { paddingTop, paddingBottom, height } = window.getComputedStyle(el)
  //   const paddingHeight = parseInt(paddingTop, 10) + parseInt(paddingBottom, 10)
  //   expect(height + paddingHeight).toBe(styleHelper.contentHeight(el))
  // })
  test('offset', () => {
    const el = document.createElement('div')
    const { top, left } = el.getBoundingClientRect()
    expect(styleHelper.offset(el)).toEqual({
      top: top + window.pageYOffset - document.documentElement.clientTop,
      left: left + window.pageXOffset - document.documentElement.clientLeft
    })
  })
  test('hideElement', () => {
    const el = document.createElement('div')
    styleHelper.hideElement(el)
    expect(el.style.display).toBe('none')
  })
  test('showElement', () => {
    const el = document.createElement('div')
    styleHelper.hideElement(el)
    styleHelper.showElement(el)
    expect(el.style.display).toBe('')
  })
})
