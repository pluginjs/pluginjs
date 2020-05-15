import AudioPicker from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('AudioPicker', () => {
  describe('AudioPicker()', () => {
    test('should have AudioPicker', () => {
      expect(AudioPicker).toBeFunction()
    })

    test('should have defaults', () => {
      expect(AudioPicker.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(AudioPicker.events).toBeObject()
    })

    test('should have classes', () => {
      expect(AudioPicker.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(AudioPicker.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work wtesth element', () => {
      const audioPicker = AudioPicker.of(generateHTMLSample())

      expect(audioPicker).toBeObject()
      expect(audioPicker.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const audioPicker = AudioPicker.of(generateHTMLSample())

      expect(audioPicker.options).toBeObject()
    })
  })

  describe('initialized()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0
      $element.addEventListener('audioPicker:ready', () => {
        called++
      })
      const instance = AudioPicker.of($element)
      expect(called).toEqual(1)
      expect(instance.is('initialized')).toBeTrue()
    })
  })
})
