import Choice from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

const options = {
  data: {
    on: {
      label: 'on'
    },
    off: {
      label: 'off'
    },
    default: {
      label: 'default'
    }
  },
  multiple: false
}

describe('Choice', () => {
  describe('Choice()', () => {
    test('should have Choice', () => {
      expect(Choice).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Choice.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(Choice.events).toBeObject()
    })
    test('should have classes', () => {
      expect(Choice.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(Choice.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const choice = Choice.of(generateHTMLSample(), options)

      expect(choice).toBeObject()
      expect(choice.options).toEqual({ ...DEFAULTS, ...options })
    })

    test('should have options', () => {
      const choice = Choice.of(generateHTMLSample(), options)

      expect(choice.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = Choice.of(generateHTMLSample(), options)
      expect($element.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const $element = Choice.of(generateHTMLSample(), options)
      $element.destroy()
      expect($element).toEqual($element)
    })
  })

  describe('initialize()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Choice.of($element, options)
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('choice:ready', () => {
        called++
      })

      expect(called).toEqual(0)
      expect(api.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Choice.of($element, options)
    })

    it('should destroy the plugin', () => {
      expect(api.is('initialized')).toBeTrue()

      api.destroy()
      expect(api.is('initialized')).toBeFalse()
    })

    it('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('choice:destroy', () => {
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
      $element = generateHTMLSample('on')
      api = Choice.of($element, {
        ...options,
        onChange() {
          called = true
        }
      })

      expect(called).toBeFalse()
    })

    it('should fired when change the value', () => {
      let called = false
      $element = generateHTMLSample()
      api = Choice.of($element, {
        ...options,
        onChange(value) {
          called = true

          expect(value).toBe('off')
        }
      })

      api.val('off')

      expect(called).toBeTrue()
    })

    it('should fired when set the value', () => {
      let called = false
      $element = generateHTMLSample()
      api = Choice.of($element, {
        ...options,
        onChange(value) {
          called = true

          expect(value).toBe('on')
        }
      })

      api.set('on')

      expect(called).toBeTrue()
    })
  })

  describe('get()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Choice.of($element, options)
    })

    test('should get the value', () => {
      expect(api.get()).toBeString()
    })
  })

  describe('set()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Choice.of($element, options)
    })

    test('should set the value', () => {
      expect(api.get()).toBeString()

      api.set('on')
      expect(api.get()).toBe('on')
    })
  })

  describe('val()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Choice.of($element, options)
    })

    test('should get the value', () => {
      expect(api.val()).toBeString()
    })

    test('should set the value', () => {
      api.val('off')

      expect(api.get()).toBe('off')
    })

    test('should set the value with string', () => {
      api.val(false)

      expect(api.get()).toBeFalse()

      api.val(true)

      expect(api.get()).toBeTrue()
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Choice.of($element, options)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('choice:enable', () => {
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
      api = Choice.of($element, options)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('choice:disable', () => {
        called++
      })

      api.disable()
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeTrue()
    })
  })
})
