import SvgPicker from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

const data = [
  {
    type: 'line',
    id: 'alarm',
    svg:
      '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><title> alarm </title><path d="M16 4c-7.732 0-14 6.268-14 14s6.268 14 14 14 14-6.268 14-14-6.268-14-14-14zM16 29.25c-6.213 0-11.25-5.037-11.25-11.25s5.037-11.25 11.25-11.25c6.213 0 11.25 5.037 11.25 11.25s-5.037 11.25-11.25 11.25zM29.212 8.974c0.501-0.877 0.788-1.892 0.788-2.974 0-3.314-2.686-6-6-6-1.932 0-3.65 0.913-4.747 2.331 4.121 0.851 7.663 3.287 9.96 6.643v0zM12.748 2.331c-1.097-1.418-2.816-2.331-4.748-2.331-3.314 0-6 2.686-6 6 0 1.082 0.287 2.098 0.788 2.974 2.297-3.356 5.838-5.792 9.96-6.643z"> </path><path d="M16 18v-8h-2v10h8v-2z"> </path></svg>'
  },
  {
    type: 'line',
    id: 'bell',
    svg:
      '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><title> bell </title><path d="M32.047 25c0-9-8-7-8-14 0-0.58-0.056-1.076-0.158-1.498-0.526-3.532-2.88-6.366-5.93-7.23 0.027-0.123 0.041-0.251 0.041-0.382 0-1.040-0.9-1.891-2-1.891s-2 0.851-2 1.891c0 0.131 0.014 0.258 0.041 0.382-3.421 0.969-5.966 4.416-6.039 8.545-0.001 0.060-0.002 0.121-0.002 0.183 0 7-8 5-8 14 0 2.382 5.331 4.375 12.468 4.878 0.673 1.263 2.002 2.122 3.532 2.122s2.86-0.86 3.532-2.122c7.137-0.503 12.468-2.495 12.468-4.878 0-0.007-0.001-0.014-0.001-0.021l0.048 0.021zM25.82 26.691c-1.695 0.452-3.692 0.777-5.837 0.958-0.178-2.044-1.893-3.648-3.984-3.648s-3.805 1.604-3.984 3.648c-2.144-0.18-4.142-0.506-5.837-0.958-2.332-0.622-3.447-1.318-3.855-1.691 0.408-0.372 1.523-1.068 3.855-1.691 2.712-0.724 6.199-1.122 9.82-1.122s7.109 0.398 9.82 1.122c2.332 0.622 3.447 1.318 3.855 1.691-0.408 0.372-1.523 1.068-3.855 1.691z"> </path></svg>'
  },
  {
    type: 'filled',
    id: 'blog',
    svg:
      '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><title> blog </title><path d="M12 0v3c2.296 0 4.522 0.449 6.616 1.335 2.024 0.856 3.842 2.082 5.405 3.644s2.788 3.381 3.645 5.405c0.886 2.094 1.335 4.32 1.335 6.616h3c0-11.046-8.954-20-20-20z"> </path><path d="M12 6v3c2.938 0 5.701 1.144 7.778 3.222s3.222 4.84 3.222 7.778h3c0-7.732-6.268-14-14-14z"> </path><path d="M15 12l-2 2-7 2-6 13 0.793 0.793 7.275-7.275c-0.044-0.165-0.068-0.339-0.068-0.518 0-1.105 0.895-2 2-2s2 0.895 2 2-0.895 2-2 2c-0.179 0-0.353-0.024-0.518-0.068l-7.275 7.275 0.793 0.793 13-6 2-7 2-2-5-5z"> </path></svg>'
  },
  {
    type: 'colored',
    id: 'bullhorn',
    svg:
      '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><title> bullhorn </title><path d="M32 13.414c0-6.279-1.837-11.373-4.109-11.413 0.009-0 0.018-0.001 0.027-0.001h-2.592c0 0-6.088 4.573-14.851 6.367-0.268 1.415-0.438 3.102-0.438 5.047s0.171 3.631 0.438 5.047c8.763 1.794 14.851 6.367 14.851 6.367h2.592c-0.009 0-0.018-0.001-0.027-0.001 2.272-0.040 4.109-5.134 4.109-11.413zM27.026 23.102c-0.293 0-0.61-0.304-0.773-0.486-0.395-0.439-0.775-1.124-1.1-1.979-0.727-1.913-1.127-4.478-1.127-7.223s0.4-5.309 1.127-7.223c0.325-0.855 0.705-1.54 1.1-1.979 0.163-0.182 0.48-0.486 0.773-0.486s0.61 0.304 0.773 0.486c0.395 0.439 0.775 1.124 1.1 1.979 0.727 1.913 1.127 4.479 1.127 7.223s-0.4 5.309-1.127 7.223c-0.325 0.855-0.705 1.54-1.1 1.979-0.163 0.181-0.48 0.486-0.773 0.486zM7.869 13.414c0-1.623 0.119-3.201 0.345-4.659-1.48 0.205-2.779 0.323-4.386 0.323-2.096 0-2.096 0-2.096 0l-1.733 2.959v2.755l1.733 2.959c0 0 0 0 2.096 0 1.606 0 2.905 0.118 4.386 0.323-0.226-1.458-0.345-3.036-0.345-4.659zM11.505 20.068l-4-0.766 2.558 10.048c0.132 0.52 0.648 0.782 1.146 0.583l3.705-1.483c0.498-0.199 0.698-0.749 0.444-1.221l-3.853-7.161zM27.026 17.148c-0.113 0-0.235-0.117-0.298-0.187-0.152-0.169-0.299-0.433-0.424-0.763-0.28-0.738-0.434-1.726-0.434-2.784s0.154-2.046 0.434-2.784c0.125-0.33 0.272-0.593 0.424-0.763 0.063-0.070 0.185-0.187 0.298-0.187s0.235 0.117 0.298 0.187c0.152 0.169 0.299 0.433 0.424 0.763 0.28 0.737 0.434 1.726 0.434 2.784s-0.154 2.046-0.434 2.784c-0.125 0.33-0.272 0.593-0.424 0.763-0.063 0.070-0.185 0.187-0.298 0.187z"> </path></svg>'
  },
  {
    type: 'line',
    id: 'calculator',
    svg:
      '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><title> calculator </title><path d="M12 2h-10c-1.1 0-2 0.9-2 2v10c0 1.1 0.9 2 2 2h10c1.1 0 2-0.9 2-2v-10c0-1.1-0.9-2-2-2zM12 10h-10v-2h10v2zM28 2h-10c-1.1 0-2 0.9-2 2v26c0 1.1 0.9 2 2 2h10c1.1 0 2-0.9 2-2v-26c0-1.1-0.9-2-2-2zM28 20h-10v-2h10v2zM28 14h-10v-2h10v2zM12 18h-10c-1.1 0-2 0.9-2 2v10c0 1.1 0.9 2 2 2h10c1.1 0 2-0.9 2-2v-10c0-1.1-0.9-2-2-2zM12 26h-4v4h-2v-4h-4v-2h4v-4h2v4h4v2z"> </path></svg>'
  },
  {
    type: 'colored',
    id: 'calendar',
    svg:
      '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><title> calendar </title><path d="M10 12h4v4h-4zM16 12h4v4h-4zM22 12h4v4h-4zM4 24h4v4h-4zM10 24h4v4h-4zM16 24h4v4h-4zM10 18h4v4h-4zM16 18h4v4h-4zM22 18h4v4h-4zM4 18h4v4h-4zM26 0v2h-4v-2h-14v2h-4v-2h-4v32h30v-32h-4zM28 30h-26v-22h26v22z"> </path></svg>'
  },
  {
    type: 'filled',
    id: 'coin-yen',
    svg:
      '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><title> coin - yen </title><path d="M15 2c-8.284 0-15 6.716-15 15s6.716 15 15 15c8.284 0 15-6.716 15-15s-6.716-15-15-15zM15 29c-6.627 0-12-5.373-12-12s5.373-12 12-12c6.627 0 12 5.373 12 12s-5.373 12-12 12z"> </path><path d="M19 18c0.552 0 1-0.448 1-1s-0.448-1-1-1h-2.131l2.963-4.445c0.306-0.46 0.182-1.080-0.277-1.387s-1.080-0.182-1.387 0.277l-3.168 4.752-3.168-4.752c-0.306-0.46-0.927-0.584-1.387-0.277s-0.584 0.927-0.277 1.387l2.964 4.445h-2.132c-0.552 0-1 0.448-1 1s0.448 1 1 1h3v2h-3c-0.552 0-1 0.448-1 1s0.448 1 1 1h3v3c0 0.552 0.448 1 1 1s1-0.448 1-1v-3h3c0.552 0 1-0.448 1-1s-0.448-1-1-1h-3v-2h3z"> </path></svg>'
  },
  {
    type: 'line',
    id: 'connection',
    svg:
      '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="40" height="32" viewBox="0 0 40 32"><title>connection</title><path d="M20 18c3.308 0 6.308 1.346 8.481 3.519l-2.827 2.827c-1.449-1.449-3.449-2.346-5.654-2.346s-4.206 0.897-5.654 2.346l-2.827-2.827c2.173-2.173 5.173-3.519 8.481-3.519zM5.858 15.858c3.777-3.777 8.8-5.858 14.142-5.858s10.365 2.080 14.142 5.858l-2.828 2.828c-3.022-3.022-7.040-4.686-11.314-4.686s-8.292 1.664-11.314 4.686l-2.828-2.828zM30.899 4.201c3.334 1.41 6.329 3.429 8.899 6v0l-2.828 2.828c-4.533-4.533-10.56-7.029-16.971-7.029s-12.438 2.496-16.971 7.029l-2.828-2.828c2.571-2.571 5.565-4.589 8.899-6 3.453-1.461 7.12-2.201 10.899-2.201s7.446 0.741 10.899 2.201zM18 28c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2s-2-0.895-2-2z"></path></svg>'
  },
  {
    type: 'line',
    id: 'copy',
    svg:
      '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><title>copy</title><path d="M20 8v-8h-14l-6 6v18h12v8h20v-24h-12zM6 2.828v3.172h-3.172l3.172-3.172zM2 22v-14h6v-6h10v6l-6 6v8h-10zM18 10.828v3.172h-3.172l3.172-3.172zM30 30h-16v-14h6v-6h10v20z"></path></svg>'
  },
  {
    type: 'line',
    id: 'credit-card',
    svg:
      '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><title>credit-card</title><path d="M29 4h-26c-1.65 0-3 1.35-3 3v18c0 1.65 1.35 3 3 3h26c1.65 0 3-1.35 3-3v-18c0-1.65-1.35-3-3-3zM3 6h26c0.542 0 1 0.458 1 1v3h-28v-3c0-0.542 0.458-1 1-1zM29 26h-26c-0.542 0-1-0.458-1-1v-9h28v9c0 0.542-0.458 1-1 1zM4 20h2v4h-2zM8 20h2v4h-2zM12 20h2v4h-2z"></path></svg>'
  },
  {
    type: 'filled',
    id: 'diamonds',
    svg:
      '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><title>diamonds</title><path d="M16 0l-10 16 10 16 10-16z"></path></svg>'
  },
  {
    type: 'filled',
    id: 'droplet',
    svg:
      '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><title>droplet</title><path d="M27.020 14.786c-2.055-5.732-6.41-10.88-11.020-14.786-4.61 3.907-8.965 9.054-11.020 14.786-1.271 3.545-1.396 7.393 0.393 10.794 2.058 3.911 6.207 6.42 10.626 6.42s8.569-2.509 10.626-6.42c1.79-3.401 1.664-7.249 0.393-10.794zM23.086 23.717c-1.369 2.602-4.15 4.283-7.086 4.283-1.723 0-3.391-0.579-4.753-1.583 0.414 0.054 0.832 0.083 1.254 0.083 3.67 0 7.146-2.1 8.856-5.351 1.402-2.665 1.281-5.433 0.746-7.636 0.455 0.88 0.841 1.756 1.151 2.623 0.706 1.971 1.251 4.886-0.168 7.581z"></path></svg>'
  },
  {
    type: 'line',
    id: 'feed',
    svg:
      '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><title>feed</title><path d="M12 16c0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4s-4-1.791-4-4zM20.761 7.204c3.12 1.692 5.239 4.997 5.239 8.796s-2.119 7.104-5.239 8.796c1.377-2.191 2.239-5.321 2.239-8.796s-0.862-6.605-2.239-8.796zM9 16c0 3.475 0.862 6.605 2.239 8.796-3.12-1.692-5.239-4.997-5.239-8.796s2.119-7.104 5.239-8.796c-1.377 2.191-2.239 5.321-2.239 8.796zM3 16c0 5.372 1.7 10.193 4.395 13.491-4.447-2.842-7.395-7.822-7.395-13.491s2.948-10.649 7.395-13.491c-2.695 3.298-4.395 8.119-4.395 13.491zM24.605 2.509c4.447 2.842 7.395 7.822 7.395 13.491s-2.948 10.649-7.395 13.491c2.695-3.298 4.395-8.119 4.395-13.491s-1.7-10.193-4.395-13.491z"></path></svg>'
  }
]

SvgPicker.setData(data)

describe('SvgPicker', () => {
  describe('SvgPicker()', () => {
    test('should have SvgPicker', () => {
      expect(SvgPicker).toBeFunction()
    })

    test('should have defaults', () => {
      expect(SvgPicker.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(SvgPicker.events).toBeObject()
    })
    test('should have classes', () => {
      expect(SvgPicker.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(SvgPicker.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const svgPicker = SvgPicker.of(generateHTMLSample())

      expect(svgPicker).toBeObject()
      expect(svgPicker.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const svgPicker = SvgPicker.of(generateHTMLSample())

      expect(svgPicker.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const $element = generateHTMLSample()
      const api = SvgPicker.of($element)

      expect(api).toEqual(api)
      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = SvgPicker.of(generateHTMLSample())
      expect($element.bind()).toBeNil()
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('svgPicker:ready', () => {
        called++
      })

      const api = SvgPicker.of($element)
      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeTrue()
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = SvgPicker.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('svgPicker:enable', () => {
        called++
      })

      api.enable()
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeFalse()
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = SvgPicker.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('svgPicker:disable', () => {
        called++
      })

      api.disable()
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeTrue()
    })
  })
})
