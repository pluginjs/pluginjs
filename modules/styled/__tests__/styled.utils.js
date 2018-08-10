import * as styled from '../src/main'

describe('styled', () => {
  describe('setStyle', () => {
    test('should set style property on element', () => {
      const el = document.createElement('div')

      styled.setStyle('color', '#fff', el)
      expect(el.style.color).toBe('rgb(255, 255, 255)')
    })

    test('should set dashed style property', () => {
      const el = document.createElement('div')

      const expected = '20px'
      styled.setStyle('padding-right', expected, el)

      const actual = getComputedStyle(el).paddingRight
      expect(actual).toBe(expected)
    })

    test('should set camelCased style property', () => {
      const el = document.createElement('div')
      const expected = '20px'

      styled.setStyle('paddingRight', expected, el)
      const actual = getComputedStyle(el).paddingRight
      expect(actual).toBe(expected)
    })

    test('should empty style property on element', () => {
      const el = document.createElement('div')

      el.style.marginBottom = '10px'
      styled.setStyle('marginBottom', '', el)

      expect(el.style.marginBottom).toBe('')
    })

    test('should set styles with object', () => {
      const el = document.createElement('div')

      styled.setStyle(
        {
          'padding-right': '20px',
          'font-weight': '300'
        },
        el
      )
      expect(el.style.paddingRight).toBe('20px')
      expect(el.style.fontWeight).toBe('300')
    })
  })

  describe('getStyle', () => {
    test('should get dashed style property', () => {
      const el = document.createElement('div')

      const expected = '20px'
      styled.setStyle('padding-left', expected, el)
      const actual = styled.getStyle('padding-left', el)

      expect(actual).toBe(expected)
    })

    test('should get camelCased style property', () => {
      const el = document.createElement('div')

      const expected = '20px'
      styled.setStyle('padding-left', expected, el)
      const actual = styled.getStyle('paddingLeft', el)

      expect(actual).toBe(expected)
    })
  })

  describe('css', () => {
    test('set', () => {
      const el = document.createElement('div')

      styled.css('padding-right', '20px', el)
      expect(el.style.paddingRight).toBe('20px')
    })

    test('set with object', () => {
      const el = document.createElement('div')

      styled.css(
        {
          'padding-right': '20px',
          'font-weight': '300'
        },
        el
      )
      expect(el.style.paddingRight).toBe('20px')
      expect(el.style.fontWeight).toBe('300')
    })

    test('get', () => {
      const el = document.createElement('div')
      el.style.display = 'block'
      expect(styled.css('display', el)).toBe('block')
    })
  })

  test('outerHeight', () => {
    const el = document.createElement('div')
    expect(el.offsetHeight).toBe(styled.outerHeight(el))
  })

  test('outerHeightWithMargin', () => {
    const el = document.createElement('div')
    const { marginTop, marginBottom } = window.getComputedStyle(el)
    const marginHeight = parseInt(marginTop, 10) + parseInt(marginBottom, 10)
    expect(el.offsetHeight + marginHeight).toBe(
      styled.outerHeightWithMargin(el)
    )
  })

  test('outerWidth', () => {
    const el = document.createElement('div')
    expect(el.offsetWidth).toBe(styled.outerWidth(el))
  })

  test('outerWidthWithMargin', () => {
    const el = document.createElement('div')
    const { marginLeft, marginRight } = window.getComputedStyle(el)
    const marginWidth = parseInt(marginLeft, 10) + parseInt(marginRight, 10)
    expect(el.offsetWidth + marginWidth).toBe(styled.outerWidthWithMargin(el))
  })

  test('clientHeight', () => {
    const el = document.createElement('div')
    expect(el.clientHeight).toBe(styled.clientHeight(el))
  })

  test('clientWidth', () => {
    const el = document.createElement('div')
    expect(el.clientWidth).toBe(styled.clientWidth(el))
  })

  // * jsdom unsupported full feature getComputeStyle
  //
  // test('contentWidth', () => {
  //   const el = document.createElement('div')
  //   const { paddingLeft, paddingRight, width } = window.getComputedStyle(el)
  //   const paddingWidth = parseInt(paddingLeft, 10) + parseInt(paddingRight, 10)
  //   expect(width + paddingWidth).toBe(styled.contentWidth(el))
  // })
  // test('contentHeight', () => {
  //   const el = document.createElement('div')
  //   const { paddingTop, paddingBottom, height } = window.getComputedStyle(el)
  //   const paddingHeight = parseInt(paddingTop, 10) + parseInt(paddingBottom, 10)
  //   expect(height + paddingHeight).toBe(styled.contentHeight(el))
  // })
  test('offset', () => {
    const el = document.createElement('div')
    const { top, left } = el.getBoundingClientRect()
    expect(styled.offset(el)).toEqual({
      top: top + window.pageYOffset - document.documentElement.clientTop,
      left: left + window.pageXOffset - document.documentElement.clientLeft
    })
  })

  test('hideElement', () => {
    const el = document.createElement('div')
    styled.hideElement(el)
    expect(el.style.display).toBe('none')
  })

  test('showElement', () => {
    const el = document.createElement('div')
    styled.hideElement(el)
    styled.showElement(el)
    expect(el.style.display).toBe('')
  })
})
