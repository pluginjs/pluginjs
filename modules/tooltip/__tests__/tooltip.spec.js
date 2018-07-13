import Tooltip from '../src/main'
import generateHTMLSample from './fixtures/sample'

describe('Tooltip', () => {
  describe('Tooltip()', () => {
    test('should have Tooltip', () => {
      expect(Tooltip).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Tooltip.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Tooltip.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Tooltip.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Tooltip.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const tooltip = new Tooltip(element)

      expect(tooltip).toBeObject()
      expect(tooltip.options).toBeObject()
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const tooltip = new Tooltip(element)

      expect(tooltip.options).toBeObject()
    })

    test('should have classes', () => {
      const element = document.createElement('div')
      const tooltip = new Tooltip(element)

      expect(tooltip.classes).toBeObject()
    })
  })

  describe('classes', () => {
    test('should use classes options', () => {
      const element = document.createElement('div')
      const tooltip = new Tooltip(element, {
        classes: {
          container: '{namespace}-wrap',
          active: '{namespace}-active'
        }
      })

      expect(tooltip.classes.CONTAINER).toEqual('pj-tooltip-wrap')
      expect(tooltip.classes.ACTIVE).toEqual('pj-tooltip-active')
    })

    test('should override class namespace', () => {
      const element = document.createElement('div')
      const tooltip = new Tooltip(element, {
        classes: {
          namespace: 'tooltip',
          container: '{namespace}-wrap'
        }
      })

      expect(tooltip.classes.NAMESPACE).toEqual('tooltip')
      expect(tooltip.classes.CONTAINER).toEqual('tooltip-wrap')
    })

    describe('getClass()', () => {
      test('should get class with namespace', () => {
        const element = document.createElement('div')
        const tooltip = new Tooltip(element, {
          classes: { namespace: 'hello' }
        })

        expect(tooltip.getClass('foo')).toEqual('foo')
        expect(tooltip.getClass('{namespace}-foo')).toEqual('hello-foo')
      })

      test('should get class with arg', () => {
        const element = document.createElement('div')
        const tooltip = new Tooltip(element, {
          classes: { namespace: 'hello' }
        })

        expect(tooltip.getClass('foo', 'arg', 'value')).toEqual('foo')
        expect(tooltip.getClass('{namespace}-{arg}', 'arg', 'value')).toEqual(
          'hello-value'
        )
      })
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const tooltip = Tooltip.of(generateHTMLSample())
      expect(tooltip.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const tooltip = Tooltip.of(generateHTMLSample())
      tooltip.destroy()
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('tooltip:ready', () => {
        console.log(111)
        called++
      })
      const instance = Tooltip.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Tooltip.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('tooltip:destroy', () => {
        expect(api.is('initialized')).toBeFalse()
        called++
      })

      api.destroy()

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Tooltip.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('tooltip:enable', () => {
        expect(api.is('disabled')).toBeFalse()
        called++
      })

      api.enable()
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Tooltip.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('tooltip:disable', () => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      api.disable()
      expect(called).toEqual(1)
    })
  })
})
