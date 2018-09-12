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

  describe('api call', () => {
    test('should call start', () => {
      const $element = SvgProgress.of(generateHTMLSample())
      setTimeout(() => {
        expect($element.start()).toBeNil()
      }, 0)
    })

    test('should call destroy', () => {
      const $element = SvgProgress.of(generateHTMLSample())
      setTimeout(() => {
        $element.destroy()
      }, 0)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('svgProgress:ready', () => {
        called++
      })

      const instance = SvgProgress.of($element)
      setTimeout(() => {
        expect(called).toEqual(1)
        expect(instance.is('initialized')).toBeTrue()
      }, 0)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = SvgProgress.of($element)
    })

    test('should destroy the plugin', () => {
      setTimeout(() => {
        expect(api.is('initialized')).toBeTrue()
        api.destroy()
        expect(api.is('initialized')).toBeFalse()
      }, 0)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('svgProgress:destroy', () => {
        setTimeout(() => {
          expect(api.is('initialized')).toBeFalse()
        }, 0)
        called++
      })

      setTimeout(() => {
        api.destroy()
        expect(called).toEqual(1)
      }, 0)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = SvgProgress.of($element)
    })

    test('should enable the plugin', () => {
      setTimeout(() => {
        api.disable()
        api.enable()

        expect(api.is('disabled')).toBeFalse()
      }, 0)
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('svgProgress:enable', () => {
        setTimeout(() => {
          expect(api.is('disabled')).toBeFalse()
        }, 0)
        called++
      })

      setTimeout(() => {
        api.enable()
        expect(called).toEqual(1)
      }, 0)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = SvgProgress.of($element)
    })

    test('should disable the plugin', () => {
      setTimeout(() => {
        api.disable()
        expect(api.is('disabled')).toBeTrue()
      }, 0)
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('svgProgress:disable', () => {
        setTimeout(() => {
          expect(api.is('disabled')).toBeTrue()
        }, 0)
        called++
      })

      setTimeout(() => {
        api.disable()
        expect(called).toEqual(1)
      }, 0)
    })
  })
})
