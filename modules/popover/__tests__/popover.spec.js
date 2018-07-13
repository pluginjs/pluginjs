import Popover from '../src/main'
import generateHTMLSample from './fixtures/sample'

describe('Popover', () => {
  describe('Popover()', () => {
    test('should have Popover', () => {
      expect(Popover).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Popover.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Popover.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Popover.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Popover.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const popover = new Popover(element)

      expect(popover).toBeObject()
      expect(popover.options).toBeObject()
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const popover = new Popover(element)

      expect(popover.options).toBeObject()
    })

    test('should have classes', () => {
      const element = document.createElement('div')
      const popover = new Popover(element)

      expect(popover.classes).toBeObject()
    })
  })

  describe('classes', () => {
    test('should use classes options', () => {
      const element = document.createElement('div')
      const popover = new Popover(element, {
        classes: {
          container: '{namespace}-wrap',
          active: '{namespace}-active'
        }
      })

      expect(popover.classes.CONTAINER).toEqual('pj-popover-wrap')
      expect(popover.classes.ACTIVE).toEqual('pj-popover-active')
    })

    test('should override class namespace', () => {
      const element = document.createElement('div')
      const popover = new Popover(element, {
        classes: {
          namespace: 'popover',
          container: '{namespace}-wrap'
        }
      })

      expect(popover.classes.NAMESPACE).toEqual('popover')
      expect(popover.classes.CONTAINER).toEqual('popover-wrap')
    })

    describe('getClass()', () => {
      test('should get class with namespace', () => {
        const element = document.createElement('div')
        const popover = new Popover(element, {
          classes: { namespace: 'hello' }
        })

        expect(popover.getClass('foo')).toEqual('foo')
        expect(popover.getClass('{namespace}-foo')).toEqual('hello-foo')
      })

      test('should get class with arg', () => {
        const element = document.createElement('div')
        const popover = new Popover(element, {
          classes: { namespace: 'hello' }
        })

        expect(popover.getClass('foo', 'arg', 'value')).toEqual('foo')
        expect(popover.getClass('{namespace}-{arg}', 'arg', 'value')).toEqual(
          'hello-value'
        )
      })
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const popover = Popover.of(generateHTMLSample())
      expect(popover.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const popover = Popover.of(generateHTMLSample())
      popover.destroy()
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('popover:ready', () => {
        called++
      })
      const instance = Popover.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Popover.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('popover:destroy', () => {
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
      api = Popover.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('popover:enable', () => {
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
      api = Popover.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('popover:disable', () => {
        expect(api.is('disabled')).toBeTrue()
        called++
      })

      api.disable()
      expect(called).toEqual(1)
    })
  })
})
