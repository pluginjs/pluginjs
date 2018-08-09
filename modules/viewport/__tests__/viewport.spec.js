import viewport from '../src/main'
import 'intersection-observer'

const element = document.createElement('div')
const observer = viewport(element)
const handler = () => console.log('handle')

describe('viewport', () => {
  test('initialization', () => {
    expect(observer.observer instanceof IntersectionObserver).toBeTrue()
  })
  test('on', () => {
    observer.on('enter', handler)
    expect(observer.enterMiddleware.some(fn => fn === handler)).toBeTrue()
  })
  test('off', () => {
    observer.off('enter', handler)
    expect(observer.enterMiddleware.some(fn => fn === handler)).toBeFalse()
  })
  test('isVisible', () => {
    expect(observer.isVisible()).toBe(observer.isIntersecting)
  })
  test('destroy', () => {
    observer.destroy()
    expect(observer.enterMiddleware).toHaveLength(0)
    expect(observer.isIntersecting).toBeFalse()
    expect(observer.enterMiddleware).toHaveLength(0)
    expect(observer.exitMiddleware).toHaveLength(0)
  })
})
