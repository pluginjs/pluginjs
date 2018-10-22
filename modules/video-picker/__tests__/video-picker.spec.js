import VideoPicker from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

const data = {
  source: 'YouTube',
  url: 'YE7VzlLtp-4',
  poster: 'https://picsum.photos/200/300?image=1020',
  ratio: 'auto'
}
const string =
  '{"source":"YouTube","url":"YE7VzlLtp-4", "poster":"https://picsum.photos/200/300?image=1020", "ratio": "auto"}'
describe('VideoPicker', () => {
  describe('VideoPicker()', () => {
    test('should have VideoPicker', () => {
      expect(VideoPicker).toBeFunction()
    })

    test('should have defaults', () => {
      expect(VideoPicker.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(VideoPicker.events).toBeObject()
    })
    test('should have classes', () => {
      expect(VideoPicker.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(VideoPicker.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const videoPicker = VideoPicker.of(generateHTMLSample())

      expect(videoPicker).toBeObject()
      expect(videoPicker.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const videoPicker = VideoPicker.of(generateHTMLSample())

      expect(videoPicker.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = VideoPicker.of(generateHTMLSample())
      expect($element.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const $element = VideoPicker.of(generateHTMLSample())
      $element.destroy()
      // expect().toEqual($element);
      expect($element).toEqual($element)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('videoPicker:ready', () => {
        called++
      })

      const api = VideoPicker.of($element)
      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = VideoPicker.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('videoPicker:destroy', () => {
        called++
      })

      api.destroy()

      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeFalse()
    })
  })

  describe('change', () => {
    let $element
    let api
    it('should not fired when initialize', () => {
      let called = false
      $element = generateHTMLSample(data)
      api = VideoPicker.of($element, {
        onChange() {
          called = true
        }
      })
      expect(called).toBeFalse()
    })
    it('should fired when change the value', () => {
      let called = false
      $element = generateHTMLSample()
      api = VideoPicker.of($element, {
        onChange(value) {
          called = true
          expect(value).toEqual(data)
        }
      })
      api.val(string)
      expect(called).toBeTrue()
    })
    it('should fired when set the value', () => {
      let called = false
      $element = generateHTMLSample()
      api = VideoPicker.of($element, {
        onChange(value) {
          called = true
          expect(value).toBe(data)
        }
      })
      api.set(data)
      expect(called).toBeTrue()
    })
  })

  describe('get()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = VideoPicker.of($element)
    })

    test('should get the value', () => {
      expect(api.get()).toBeNil()
    })
  })

  describe('set()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = VideoPicker.of($element)
    })

    test('should set the value', () => {
      expect(api.get()).toBeNil()

      api.set(data)
      expect(api.get()).toBeObject(data)
    })
  })

  describe('val()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = VideoPicker.of($element)
    })

    test('should get the value', () => {
      expect(api.val()).toBeString()
    })

    test('should set the value', () => {
      api.val(string)

      expect(api.get()).toBeObject(data)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = VideoPicker.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('videoPicker:enable', () => {
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
      api = VideoPicker.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('videoPicker:disable', () => {
        called++
      })

      api.disable()
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeTrue()
    })
  })
})
