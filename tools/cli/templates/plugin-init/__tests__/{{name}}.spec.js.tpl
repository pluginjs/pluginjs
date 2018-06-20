import {{Name}} from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('{{Name}}', () => {
  describe('{{Name}}()', () => {
    test('should have {{Name}}', () => {
      expect({{Name}}).toBeFunction()
    })

    test('should have defaults', () => {
      expect({{Name}}.defaults).toBeObject()
    })

    test('should have events', () => {
      expect({{Name}}.events).toBeObject()
    })

    test('should have classes', () => {
      expect({{Name}}.classes).toBeObject()
    })

    test('should have methods', () => {
      expect({{Name}}.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work wtesth element', () => {
      const {{name}} = {{Name}}.of(generateHTMLSample())

      expect({{name}}).toBeObject()
      expect({{name}}.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const {{name}} = {{Name}}.of(generateHTMLSample())

      expect({{name}}.options).toBeObject()
    })
  })

  describe('initialized()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0
      $element.addEventListener('{{name}}:ready', () => {
        called++
      })
      const instance = {{Name}}.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })
})
