import ScrollTop from '../src/main'

describe('ScrollTop', () => {
  describe('ScrollTop()', () => {
    test('should have ScrollTop', () => {
      expect(ScrollTop).toBeFunction()
    })

    test('should have defaults', () => {
      expect(ScrollTop.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(ScrollTop.events).toBeObject()
    })

    test('should have classes', () => {
      expect(ScrollTop.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(ScrollTop.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const scrollTop = new ScrollTop(element)
      expect(scrollTop).toBeObject()
      expect(scrollTop.options.theme).toEqual('default')
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const scrollTop = new ScrollTop(element)

      expect(scrollTop.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const element = document.createElement('div')
      const instance = ScrollTop.of(element)
      expect(instance.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const element = document.createElement('div')
      const instance = ScrollTop.of(element)
      expect(instance.destroy()).toBeNil()
    })
  })

  describe('initialize()', () => {
    let element
    let api

    beforeEach(() => {
      element = document.createElement('div')
    })

    test('should trigger ready event', () => {
      let called = 0

      element.addEventListener('scrollTop:ready', () => {
        called++
      })

      api = ScrollTop.of(element)
      expect(api.is('initialized')).toBeTrue()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let element
    let api

    beforeEach(() => {
      element = document.createElement('div')
      api = ScrollTop.of(element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      element.addEventListener('scrollTop:destroy', () => {
        called++
      })

      api.destroy()
      expect(api.is('initialized')).toBeFalse()

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let element
    let api

    beforeEach(() => {
      element = document.createElement('div')
      api = ScrollTop.of(element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      element.addEventListener('scrollTop:enable', () => {
        called++
      })

      api.enable()
      expect(api.is('disabled')).toBeFalse()
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let element
    let api

    beforeEach(() => {
      element = document.createElement('div')
      api = ScrollTop.of(element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      element.addEventListener('scrollTop:disable', () => {
        called++
      })

      api.disable()
      expect(api.is('disabled')).toBeTrue()
      expect(called).toEqual(1)
    })
  })
})
