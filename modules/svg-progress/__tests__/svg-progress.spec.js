import SvgProgress from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('SvgProgress', () => {
  describe('SvgProgress()', () => {
    test('should have SvgProgress', () => {
      expect(SvgProgress).toBeFunction()
    })

    test('should have defaults', () => {
      expect(SvgProgress.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(SvgProgress.events).toBeObject()
    })

    test('should have classes', () => {
      expect(SvgProgress.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(SvgProgress.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const svgProgress = SvgProgress.of(generateHTMLSample())

      expect(svgProgress).toBeObject()
      expect(svgProgress.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const svgProgress = SvgProgress.of(generateHTMLSample(), {
        shape: 'circle'
      })

      expect(svgProgress.options).toBeObject()
      expect(svgProgress.options.shape).toEqual('circle')
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const $element = generateHTMLSample()
      const api = SvgProgress.of($element)

      expect(api).toEqual(api)
      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should call start', () => {
      const $element = SvgProgress.of(generateHTMLSample())
      $element.start()
    })

    test('should call destroy', () => {
      const $element = SvgProgress.of(generateHTMLSample())
      $element.destroy()
    })
  })

  // describe('initialized()', () => {
  //   let $element

  //   beforeEach(() => {
  //     $element = generateHTMLSample()
  //   })

  //   test('should trigger ready event', () => {
  //     let called = 0

  //     $element.addEventListener('svgProgress:ready', () => {
  //       called++
  //     })

  //     const instance = SvgProgress.of($element)
  //     expect(called).toEqual(1)
  //     console.log(called)
  //     expect(instance.is('initialized')).toBeTrue()
  //   })
  // })

  // describe('destroy()', () => {
  //   let $element
  //   let api

  //   beforeEach(() => {
  //     $element = generateHTMLSample()
  //     api = SvgProgress.of($element)
  //   })

  //   test('should trigger destroy event', () => {
  //     let called = 0

  //     $element.addEventListener('svgProgress:destroy', () => {
  //       expect(api.is('initialized')).toBeFalse()
  //       called++
  //     })

  //     api.destroy()

  //     expect(called).toEqual(1)
  //   })
  // })

  // describe('enable()', () => {
  //   let $element
  //   let api

  //   beforeEach(() => {
  //     $element = generateHTMLSample()
  //     api = SvgProgress.of($element)
  //   })

  //   test('should enable the plugin', () => {
  //     api.disable()
  //     api.enable()

  //     expect(api.is('disabled')).toBeFalse()
  //   })

  //   test('should trigger enable event', () => {
  //     let called = 0

  //     $element.addEventListener('svgProgress:enable', () => {
  //       expect(api.is('disabled')).toBeFalse()
  //       called++
  //     })

  //     api.enable()
  //     expect(called).toEqual(1)
  //   })
  // })

  // describe('disable()', () => {
  //   let $element
  //   let api

  //   beforeEach(() => {
  //     $element = generateHTMLSample()
  //     api = SvgProgress.of($element)
  //   })

  //   test('should disable the plugin', () => {
  //     api.disable()

  //     expect(api.is('disabled')).toBeTrue()
  //   })

  //   test('should trigger disable event', () => {
  //     let called = 0

  //     $element.addEventListener('svgProgress:disable', () => {
  //       expect(api.is('disabled')).toBeTrue()
  //       called++
  //     })

  //     api.disable()
  //     expect(called).toEqual(1)
  //   })
  // })
})
