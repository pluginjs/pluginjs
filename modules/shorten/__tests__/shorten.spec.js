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
    let element
    let api

    beforeEach(() => {
      element = document.createElement('div')
      element.textContent =
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam'
    })

    test('should trigger ready event', () => {
      let called = 0

      element.addEventListener('shorten:ready', () => {
        called++
      })

      api = Shorten.of(element)
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
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos At vero eos At vero eos At vero eos At vero eos'
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
