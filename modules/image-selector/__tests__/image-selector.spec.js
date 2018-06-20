import ImageSelector from '../../src/main'
import { defaults as DEFAULTS } from '../../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('ImageSelector', () => {
  describe('ImageSelector()', () => {
    test('should have ImageSelector', () => {
      expect(ImageSelector).toBeFunction()
    })

    test('should have defaults', () => {
      expect(ImageSelector.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(ImageSelector.events).toBeObject()
    })
    test('should have classes', () => {
      expect(ImageSelector.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(ImageSelector.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const imageSelector = ImageSelector.of(generateHTMLSample())

      expect(imageSelector).toBeObject()
      expect(imageSelector.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const imageSelector = new ImageSelector(element)

      expect(imageSelector.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const $element = generateHTMLSample()

      expect($element.asImageSelector()).toEqual($element)

      const api = $element.data('imageSelector')

      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = generateHTMLSample().asImageSelector()
      expect($element.asImageSelector('bind')).toBeNil()
    })

    test('should call destroy', () => {
      const $element = generateHTMLSample().asImageSelector()
      $element.asImageSelector('destroy')
      // expect().toEqual($element);
      // expect($element).toEqual($element);
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.on('imageSelector:ready', (event, api) => {
        expect(api.is('initialized')).toBeTrue()
        called++
      })

      $element.asImageSelector()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let $element
    // let api

    beforeEach(() => {
      $element = generateHTMLSample().asImageSelector()
      // api =
      $element.data('imageSelector')
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.on('imageSelector:destroy', (event, api) => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      $element.asImageSelector('destroy')

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample().asImageSelector()
      api = $element.data('imageSelector')
    })

    test('should enable the plugin', () => {
      $element.asImageSelector('disable')
      $element.asImageSelector('enable')

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.on('imageSelector:enable', (event, api) => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      $element.asImageSelector('enable')
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample().asImageSelector()
      api = $element.data('imageSelector')
    })

    test('should disable the plugin', () => {
      $element.asImageSelector('disable')

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.on('imageSelector:disable', (event, api) => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      $element.asImageSelector('disable')
      expect(called).toEqual(1)
    })
  })
})
