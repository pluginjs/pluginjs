import ImagePicker from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

// const data = {
//   locale: 'en',
//   select() {
//     this.set({
//       image: '../../plugins/image-picker/images/nvnv.png'
//     })
//   }
// }
const string = 'https://picsum.photos/200/300?image=1041'

describe('ImagePicker', () => {
  describe('ImagePicker()', () => {
    test('should have ImagePicker', () => {
      expect(ImagePicker).toBeFunction()
    })

    test('should have defaults', () => {
      expect(ImagePicker.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(ImagePicker.events).toBeObject()
    })

    test('should have classes', () => {
      expect(ImagePicker.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(ImagePicker.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const imagePicker = ImagePicker.of(generateHTMLSample())

      expect(imagePicker).toBeObject()
      // expect(imagePicker.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const imagePicker = ImagePicker.of(generateHTMLSample())

      expect(imagePicker.options).toBeObject()
    })
  })

  describe('jquery constructor', () => {
    test('should works with jquery fn', () => {
      const $element = generateHTMLSample()
      const api = ImagePicker.of($element)

      expect(api).toEqual(api)
      expect(api).toBeObject()
      expect(api.options).toBeObject()
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = ImagePicker.of(generateHTMLSample())
      expect($element.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const $element = ImagePicker.of(generateHTMLSample())
      $element.destroy()
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('imagePicker:ready', () => {
        called++
      })

      const api = ImagePicker.of($element)
      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = ImagePicker.of($element)
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('imagePicker:destroy', () => {
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
      $element = generateHTMLSample(string)
      api = ImagePicker.of($element, {
        onChange() {
          called = true
        }
      })
      expect(called).toBeFalse()
    })
    it('should fired when change the value', () => {
      let called = false
      $element = generateHTMLSample()
      api = ImagePicker.of($element, {
        onChange(value) {
          called = true
          expect(value).toBeString()
        }
      })
      api.val(string)
      expect(called).toBeTrue()
    })
    it('should fired when set the value', () => {
      let called = false
      $element = generateHTMLSample()
      api = ImagePicker.of($element, {
        onChange(value) {
          called = true
          expect(value).toBeString()
        }
      })
      api.set(string)
      expect(called).toBeTrue()
    })
  })

  describe('get()', () => {
    let $element
    let api

    test('should get the value', () => {
      $element = generateHTMLSample()
      api = ImagePicker.of($element)

      expect(api.get()).toBeString()
    })

    test('should get the value with string', () => {
      $element = generateHTMLSample(string)
      api = ImagePicker.of($element)
      expect(api.get()).toEqual(string)
    })
  })

  describe('set()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = ImagePicker.of($element)
    })

    test('should set the value', () => {
      expect(api.get()).toBeString()

      api.set(string)
      expect(api.get()).toEqual(string)
    })
  })

  describe('val()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = ImagePicker.of($element)
    })

    it('should get the value', () => {
      $element = generateHTMLSample(string)
      api = ImagePicker.of($element)

      expect(api.val()).toEqual(string)
    })

    it('should set the value with string', () => {
      api.val(string)

      expect(api.val()).toBe(string)
      expect(api.get()).toEqual(string)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = ImagePicker.of($element)
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('imagePicker:enable', () => {
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
      api = ImagePicker.of($element)
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('imagePicker:disable', () => {
        called++
      })

      api.disable()
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeTrue()
    })
  })

  describe('i18n', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = ImagePicker.of($element)
    })

    test('should have I18N', () => {
      expect(ImagePicker.I18N).toBeObject()
    })

    describe('getLocale()', () => {
      test('should get default locale', () => {
        // expect(api.getLocale()).toEqual(DEFAULTS.locale)
      })

      test('should get locale with options set', () => {
        // api = ImagePicker.of({
        //   locale: 'zh-cn'
        // })
        // expect(api.getLocale()).toEqual('zh-cn')
      })
    })

    describe('setLocale()', () => {
      test('should override default locale', () => {
        expect(api.getLocale()).toEqual(DEFAULTS.locale)

        api.setLocale('zh-cn')

        expect(api.getLocale()).toEqual('zh-cn')
      })
    })

    describe('addTransition', () => {
      test('should add transtion correctly', () => {
        ImagePicker.I18N.addTranslation('zh-tw', { hello: '世界妳好' })
        api.setLocale('zh-tw')
        expect(api.translate('hello')).toEqual('世界妳好')
      })
    })

    describe('fallbacks', () => {
      test('should fallbacks to less specific locale', () => {
        api.setLocale('zh-cn')
        expect(api.translate('change')).toEqual('更换图片')
      })
    })
  })
})
