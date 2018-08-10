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

  describe('outerHeight', () => {
    test('outerHeight', () => {
      const el = document.createElement('div')
      expect(styled.outerHeight(el)).toBe(el.offsetHeight)
    })

    test('outerHeight with margin', () => {
      const el = document.createElement('div')
      const { marginTop, marginBottom } = window.getComputedStyle(el)
      const marginHeight = parseInt(marginTop, 10) + parseInt(marginBottom, 10)

      expect(styled.outerHeight(true, el)).toBe(el.offsetHeight + marginHeight)
    })
  })

  describe('outerWidth', () => {
    test('outerWidth', () => {
      const el = document.createElement('div')
      expect(styled.outerWidth(el)).toBe(el.offsetWidth)
    })

    test('outerWidth with margin', () => {
      const el = document.createElement('div')
      const { marginLeft, marginRight } = window.getComputedStyle(el)
      const marginWidth = parseInt(marginLeft, 10) + parseInt(marginRight, 10)

      expect(styled.outerWidth(true, el)).toBe(el.offsetWidth + marginWidth)
    })
  })

  test('clientHeight', () => {
    const el = document.createElement('div')
    expect(styled.clientHeight(el)).toBe(el.clientHeight)
  })

  test('clientWidth', () => {
    const el = document.createElement('div')
    expect(styled.clientWidth(el)).toBe(el.clientWidth)
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

  // it didn't working due to getBoundingClientRect not working on jsdom
  // describe('offset', () => {
  //   test('offset', () => {
  //     const parent = document.createElement('div')
  //     const el = document.createElement('div')
  //     dom.append(el, parent)
  //     dom.append(parent, document.documentElement)

  //     styled.setStyle({
  //       position: 'absolute',
  //       top: '50px',
  //       left: '100px',
  //       width: '100px',
  //       height: '100px'
  //     }, el)

  //     expect(styled.offset(el)).toEqual({
  //       top: 50,
  //       left: 100
  //     })
  //   })
  // })

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
