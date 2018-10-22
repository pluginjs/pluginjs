import GradientSelector from '../src/main'
// import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

const data = {
  'warm-flame':
    'linear-gradient(45deg, rgba(233,23,233,0.5) 0%, rgba(23,23,233,0.6) 99%, #fad0c4 100%)',
  'night-fade': 'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)',
  'spring-warnth':
    'linear-gradient(to top, #fad0c4 0%, #fad0c4 1%, #ffd1ff 100%)',
  'juicy-peach': 'linear-gradient(to right, #ffecd2 0%, #fcb69f 100%)',
  'young-passion':
    'linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)',
  'lady-lips': 'linear-gradient(to top, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)',
  'sunny-morning': 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
  'rainy-ashville': 'linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)'
}
GradientSelector.setData(data)

const value =
  '{"name":"sunny-morning","color":"linear-gradient(120deg, #f6d365, rgb(253, 160, 133))"}'
const valueObj = {
  name: 'sunny-morning',
  color: 'linear-gradient(120deg, #f6d365, rgb(253, 160, 133))'
}

describe('GradientSelector', () => {
  describe('GradientSelector()', () => {
    test('should have GradientSelector', () => {
      expect(GradientSelector).toBeFunction()
    })

    test('should have defaults', () => {
      expect(GradientSelector.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(GradientSelector.events).toBeObject()
    })
    test('should have classes', () => {
      expect(GradientSelector.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(GradientSelector.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const gradientSelector = GradientSelector.of(generateHTMLSample())

      expect(gradientSelector).toBeObject()
      // expect(gradientSelector.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const gradientSelector = GradientSelector.of(generateHTMLSample())

      expect(gradientSelector.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const $element = generateHTMLSample()
      const api = GradientSelector.of($element)

      expect(api).toEqual(api)
      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = GradientSelector.of(generateHTMLSample())
      expect($element.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const $element = GradientSelector.of(generateHTMLSample())
      $element.destroy()
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

      $element.addEventListener('gradientSelector:ready', () => {
        called++
      })

      const api = GradientSelector.of($element)
      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = GradientSelector.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('gradientSelector:destroy', () => {
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
      $element = generateHTMLSample()
      api = GradientSelector.of($element, {
        onChange() {
          called = true
        }
      })

      expect(called).toBeFalse()
    })

    it('should fired when change the value', () => {
      let called = false
      $element = generateHTMLSample()
      api = GradientSelector.of($element, {
        onChange(value) {
          called = true

          expect(value).toBeObject()
        }
      })

      api.val(value)

      expect(called).toBeTrue()
    })

    it('should fired when set the value', () => {
      let called = false
      $element = generateHTMLSample()
      api = GradientSelector.of($element, {
        onChange(value) {
          called = true

          expect(value).toBeObject()
        }
      })

      api.set({
        name: 'sunny-morning',
        color: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
        opacity: NaN,
        opacityColor:
          'linear-gradient(120deg, rgba(246, 211, 101, NaN) 0%, rgba(253, 160, 133, NaN) 100%)'
      })
      expect(called).toBeTrue()
    })
  })

  describe('get()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = GradientSelector.of($element)
    })

    test('should get the value', () => {
      $element = generateHTMLSample()
      api = GradientSelector.of($element)

      expect(api.get()).toBeObject()
    })
    test('should get the value with value', () => {
      $element = generateHTMLSample(value)
      api = GradientSelector.of($element)

      expect(api.get()).toEqual(valueObj)
    })
  })

  describe('set()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample(value)
      api = GradientSelector.of($element)
    })

    it('should set the value ', () => {
      expect(api.get()).toBeObject()

      api.set(valueObj)

      expect(api.get()).toEqual(valueObj)
    })
  })

  describe('val()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample(value)
      api = GradientSelector.of($element)
    })

    test('should get the value', () => {
      $element = generateHTMLSample(value)
      api = GradientSelector.of($element)
      expect(api.val()).toBeString()
    })

    test('should set the value', () => {
      expect(api.get()).toBeObject()

      api.set(valueObj)

      expect(api.get()).toEqual(valueObj)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = GradientSelector.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('gradientSelector:enable', () => {
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
      api = GradientSelector.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('gradientSelector:disable', () => {
        called++
      })

      api.disable()
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeTrue()
    })
  })
})
