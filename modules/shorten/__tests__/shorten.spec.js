import Shorten from '../src/main.js'

describe('Shorten', () => {
  describe('Shorten()', () => {
    test('should have Shorten', () => {
      expect(Shorten).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Shorten.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Shorten.events).toBeObject()
    })

    test('should have methods', () => {
      expect(Shorten.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const element = document.createElement('div')
      const shorten = new Shorten(element)

      expect(shorten).toBeObject()
    })

    test('should have options', () => {
      const element = document.createElement('div')
      const shorten = new Shorten(element, {
        chars: 200,
        ellipses: '***'
      })

      expect(shorten.options).toBeObject()
      expect(shorten.options.chars).toEqual(200)
      expect(shorten.options.ellipses).toEqual('***')
      expect(shorten.options.chars).toBeNumber()
    })
  })

  describe('api call', () => {
    test('should call destroy', () => {
      const element = document.createElement('div')
      const instance = Shorten.of(element)
      expect(instance.destroy()).toBeNil()
    })
  })

  describe('initialize()', () => {
    test('should trigger ready event', () => {
      let called = 0
      const element = document.createElement('div')

      element.textContent =
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium' +
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium' +
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium' +
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium' +
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium'

      element.addEventListener('shorten:ready', () => {
        called++
      })

      const api = Shorten.of(element)
      expect(api.is('initialized')).toBeTrue()
      expect(called).toEqual(1)
    })
  })

  describe('destroy()', () => {
    let element
    let api

    beforeEach(() => {
      element = document.createElement('div')
      element.textContent =
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium' +
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium' +
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium' +
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium' +
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium'
      api = Shorten.of(element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      element.addEventListener('shorten:destroy', () => {
        called++
      })

      api.destroy()
      expect(api.is('initialized')).toBeFalse()
      expect(called).toEqual(1)
    })
  })
})
