import Viewport from '../src/main'
import 'intersection-observer'

const element = document.createElement('div')
const observer = Viewport.of(element)

describe('Viewport', () => {
  describe('Viewport()', () => {
    test('should have Viewport', () => {
      expect(Viewport).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Viewport.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Viewport.events).toBeObject()
    })

    test('should have methods', () => {
      expect(Viewport.methods).toBeArray()
    })
  })

  describe('Initialization', () => {
    test('should instanceof IntersectionObserver', () => {
      expect(observer.observer instanceof IntersectionObserver).toBeTrue()
    })
  })

  describe('GetOffset()', () => {
    test('should getOffset', () => {
      expect(observer.getOffset(0)).toEqual('0px')
      expect(observer.getOffset('10px 10px 10px 10px')).toEqual(
        '10px 10px 10px 10px'
      )
      expect(observer.getOffset('10')).toEqual('0px')
    })
  })

  describe('Destroy()', () => {
    test('should destroy', () => {
      observer.destroy()
      expect(observer.isIntersecting).toBeFalse()
    })
  })
})
