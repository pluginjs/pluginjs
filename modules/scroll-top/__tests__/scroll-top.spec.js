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
      const scrollTop = new ScrollTop({})
      expect(scrollTop).toBeObject()
      expect(scrollTop.options.theme).toEqual('default')
    })

    test('should have options', () => {
      const scrollTop = new ScrollTop({})

      expect(scrollTop.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const instance = ScrollTop.of({})
      expect(instance.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const instance = ScrollTop.of({})
      expect(instance.destroy()).toBeNil()
    })
  })

  describe('initialize()', () => {
    let api

    test('should trigger ready event', () => {
      let called = 0

      api = ScrollTop.of({
        onReady() {
          called++
        }
      })
      expect(api.is('initialized')).toBeTrue()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let api

    test('should trigger destroy event', () => {
      let called = 0

      api = ScrollTop.of({
        onDestroy() {
          called++
        }
      })

      api.destroy()
      expect(api.is('initialized')).toBeFalse()

      expect(called).toEqual(1)
    })
  })

  describe('enable()', () => {
    let api

    test('should enable the plugin', () => {
      api = ScrollTop.of()

      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      api = ScrollTop.of({
        onEnable() {
          called++
        }
      })

      api.enable()
      expect(api.is('disabled')).toBeFalse()
      expect(called).toEqual(1)
    })
  })

  describe('disable()', () => {
    let api

    test('should disable the plugin', () => {
      api = ScrollTop.of({})

      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      api = ScrollTop.of({
        onDisable() {
          called++
        }
      })

      api.disable()
      expect(api.is('disabled')).toBeTrue()
      expect(called).toEqual(1)
    })
  })
})
