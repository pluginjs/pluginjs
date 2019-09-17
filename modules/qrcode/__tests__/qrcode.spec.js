import Qrcode from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('Qrcode', () => {
  describe('Qrcode()', () => {
    test('should have Qrcode', () => {
      expect(Qrcode).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Qrcode.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Qrcode.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Qrcode.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Qrcode.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work wtesth element', () => {
      const qrcode = Qrcode.of(generateHTMLSample())

      expect(qrcode).toBeObject()
      expect(qrcode.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const qrcode = Qrcode.of(generateHTMLSample())

      expect(qrcode.options).toBeObject()
    })
  })

  describe('initialized()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0
      $element.addEventListener('qrcode:ready', () => {
        called++
      })
      const instance = Qrcode.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })
})
