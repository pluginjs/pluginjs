import GalleryPicker from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('GalleryPicker', () => {
  describe('GalleryPicker()', () => {
    test('should have GalleryPicker', () => {
      expect(GalleryPicker).toBeFunction()
    })

    test('should have defaults', () => {
      expect(GalleryPicker.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(GalleryPicker.events).toBeObject()
    })
    test('should have classes', () => {
      expect(GalleryPicker.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(GalleryPicker.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const galleryPicker = GalleryPicker.of(generateHTMLSample())

      expect(galleryPicker).toBeObject()
      expect(galleryPicker.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const galleryPicker = GalleryPicker.of(generateHTMLSample())

      expect(galleryPicker.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const $element = generateHTMLSample()
      const api = GalleryPicker.of($element)

      expect(api).toEqual(api)
      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = GalleryPicker.of(generateHTMLSample())
      expect($element.bind()).toBeNil()
    })

    test('should call destroy', () => {
      // const $element = GalleryPicker.of(generateHTMLSample())
      // $element.destroy()
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

      $element.addEventListener('galleryPicker:ready', () => {
        called++
      })

      const api = GalleryPicker.of($element)
      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeTrue()
    })
  })

  // describe('destroy()', () => {
  //   let $element
  //   let api

  //   beforeEach(() => {
  //     $element = generateHTMLSample()
  //     api = GalleryPicker.of($element)
  //   })

  //   test('should trigger destroy event', () => {
  //     let called = 0

  //     $element.addEventListener('galleryPicker:destroy', () => {
  //       called++
  //     })

  //     api.destroy()

  //     expect(called).toEqual(1)
  //     expect(api.is('initialized')).toBeFalse()
  //   })
  // })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = GalleryPicker.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('galleryPicker:enable', () => {
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
      api = GalleryPicker.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('galleryPicker:disable', () => {
        called++
      })

      api.disable()
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeTrue()
    })
  })
})
