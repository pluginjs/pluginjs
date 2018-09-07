import BgPicker from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

// const inputValue = `{
//   'repeat':'repeat-x',
//   'position':'center center',
//   'attachment':'inherit',
//   'image': 'http://via.placeholder.com/350x150'
// }`
describe('BgPicker', () => {
  describe('BgPicker()', () => {
    test('should have BgPicker', () => {
      expect(BgPicker).toBeFunction()
    })

    test('should have defaults', () => {
      expect(BgPicker.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(BgPicker.events).toBeObject()
    })
    test('should have classes', () => {
      expect(BgPicker.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(BgPicker.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const bgPicker = BgPicker.of(generateHTMLSample())

      expect(bgPicker).toBeObject()
      expect(bgPicker.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const bgPicker = BgPicker.of(generateHTMLSample())

      expect(bgPicker.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = BgPicker.of(generateHTMLSample())
      expect($element.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const $element = BgPicker.of(generateHTMLSample())
      $element.destroy()
      // expect().toEqual($element);
      // expect($element).toEqual($element);
    })
  })

  describe('initialize()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('bgPicker:ready', () => {
        called++
      })

      api = BgPicker.of($element)
      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = BgPicker.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('bgPicker:destroy', () => {
        called++
      })

      api.destroy()

      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeFalse()
    })
  })
  describe('change', () => {
    let $element
    let api

    it('should not fired when initialize', () => {
      let called = false
      $element = generateHTMLSample()
      api = BgPicker.of($element, {
        onChange() {
          called = true
        }
      })

      expect(called).toBeFalse()
    })

    it('should fired when change the value', () => {
      let called = false
      $element = generateHTMLSample()
      api = BgPicker.of($element, {
        onChange(value) {
          called = true

          expect(value).toBe(
            '{"repeat":"repeat-x","position":"center center","attachment":"inherit","size":"auto","image":"https://picsum.photos/200/300?image=1068","thumbnail":"http://via.placeholder.com/350x150"}'
          )
        }
      })

      api.val(
        '{"repeat":"repeat-x","position":"center center","attachment":"inherit","size":"auto","image":"https://picsum.photos/200/300?image=1068","thumbnail":"http://via.placeholder.com/350x150"}'
      )

      expect(called).toBeTrue()
    })

    it('should fired when set the value', () => {
      let called = false
      $element = generateHTMLSample()
      api = BgPicker.of($element, {
        onChange(value) {
          called = true

          expect(value).toBe(
            '{"repeat":"repeat-x","position":"center center","attachment":"inherit","size":"auto","image":"https://picsum.photos/200/300?image=1068","thumbnail":"http://via.placeholder.com/350x150"}'
          )
        }
      })

      api.set({
        repeat: 'repeat-x',
        position: 'center center',
        attachment: 'inherit',
        size: 'auto',
        image: 'https://picsum.photos/200/300?image=1068',
        thumbnail: 'http://via.placeholder.com/350x150'
      })

      expect(called).toBeTrue()
    })
  })

  describe('get()', () => {
    let $element
    let api

    test('should get the value', () => {
      $element = generateHTMLSample()
      api = BgPicker.of($element)
      expect(api.get()).toBeObject()
    })
    test('should get the value with all', () => {
      $element = generateHTMLSample(
        '{"repeat":"repeat-x","position":"center center","attachment":"inherit","size":"auto","image":"https://picsum.photos/200/300?image=1068","thumbnail":"http://via.placeholder.com/350x150"}'
      )
      api = BgPicker.of($element)

      expect(api.get()).toEqual({
        repeat: 'repeat-x',
        position: 'center center',
        attachment: 'inherit',
        size: 'auto',
        image: 'https://picsum.photos/200/300?image=1068',
        thumbnail: 'http://via.placeholder.com/350x150'
      })
    })
  })

  describe('set()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = BgPicker.of($element)
    })

    test('should set the value', () => {
      expect(api.get()).toBeObject()

      api.set({
        repeat: 'repeat-x',
        position: 'center center',
        attachment: 'inherit',
        size: 'auto',
        image: 'https://picsum.photos/200/300?image=1068',
        thumbnail: 'http://via.placeholder.com/350x150'
      })
      expect(api.get()).toBeObject({
        repeat: 'repeat-x',
        position: 'center center',
        attachment: 'inherit',
        size: 'auto',
        image: 'https://picsum.photos/200/300?image=1068',
        thumbnail: 'http://via.placeholder.com/350x150'
      })
    })
  })

  describe('val()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = BgPicker.of($element)
    })

    it('should get the value', () => {
      $element = generateHTMLSample(
        '{"repeat":"repeat-x","position":"center center","attachment":"inherit","size":"auto","image":"https://picsum.photos/200/300?image=1068","thumbnail":"http://via.placeholder.com/350x150"}'
      )
      api = BgPicker.of($element)

      expect(api.val()).toBeString(
        '{"repeat":"repeat-x","position":"center center","attachment":"inherit","size":"auto","image":"https://picsum.photos/200/300?image=1068","thumbnail":"http://via.placeholder.com/350x150"}'
      )
    })

    test('should set the value', () => {
      api.val(
        '{"repeat":"repeat-x","position":"center center","attachment":"inherit","size":"auto","image":"https://picsum.photos/200/300?image=1068","thumbnail":"http://via.placeholder.com/350x150"}'
      )

      expect(api.val()).toBe(
        '{"repeat":"repeat-x","position":"center center","attachment":"inherit","size":"auto","image":"https://picsum.photos/200/300?image=1068","thumbnail":"http://via.placeholder.com/350x150"}'
      )
      expect(api.get()).toEqual({
        repeat: 'repeat-x',
        position: 'center center',
        attachment: 'inherit',
        size: 'auto',
        image: 'https://picsum.photos/200/300?image=1068',
        thumbnail: 'http://via.placeholder.com/350x150'
      })
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = BgPicker.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('bgPicker:enable', () => {
        called++
      })

      api.enable()
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeFalse()
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = BgPicker.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('bgPicker:disable', () => {
        called++
      })

      api.disable()
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeTrue()
    })
  })
})
