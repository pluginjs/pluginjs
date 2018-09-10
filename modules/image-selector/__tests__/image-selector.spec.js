import ImageSelector from '../src/main'
// import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

const data = [
  {
    value: 'without',
    label: 'Without',
    img: '../../plugins/image-selector/images/without.png'
  },
  {
    value: 'left',
    label: 'Left',
    img: '../../plugins/image-selector/images/left.png'
  },
  {
    value: 'double-left',
    label: 'Double Left',
    img: '../../plugins/image-selector/images/double-left.png'
  },
  {
    value: 'right',
    label: 'Right',
    img: '../../plugins/image-selector/images/right.png'
  },
  {
    value: 'double-right',
    label: 'Double Right',
    img: '../../plugins/image-selector/images/double-right.png'
  },
  {
    value: 'both-sider',
    label: 'Both Sider',
    img: '../../plugins/image-selector/images/both-sider.png'
  }
]

const string =
  '[ {"value": "without","label": "Without","img": "../../plugins/image-selector/images/without.png"}]'
const array = [
  {
    value: 'without',
    label: 'Without',
    img: '../../plugins/image-selector/images/without.png'
  }
]

describe('ImageSelector', () => {
  describe('ImageSelector()', () => {
    test('should have ImageSelector', () => {
      expect(ImageSelector).toBeFunction()
    })

    test('should have defaults', () => {
      expect(ImageSelector.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(ImageSelector.events).toBeObject()
    })
    test('should have classes', () => {
      expect(ImageSelector.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(ImageSelector.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const imageSelector = ImageSelector.of(generateHTMLSample(), { data })

      expect(imageSelector).toBeObject()
      // expect(imageSelector.options).toEqual(DEFAULTS)
    })

    test('should have options', () => {
      const imageSelector = ImageSelector.of(generateHTMLSample(), { data })

      expect(imageSelector.options).toBeObject()
    })
    test('should have classes', () => {
      const imageSelector = ImageSelector.of(generateHTMLSample(), { data })
      expect(imageSelector.classes).toBeObject()
    })
  })

  describe('classes', () => {
    test('should use classes options', () => {
      const element = generateHTMLSample()
      const imageSelector = ImageSelector.of(element, {
        data,
        classes: {
          active: '{namespace}-active'
        } // ,
        // data
      })

      expect(imageSelector.classes.ACTIVE).toEqual('pj-imageSelector-active')
    })

    test('should override class namespace', () => {
      const element = generateHTMLSample()
      const imageSelector = ImageSelector.of(element, {
        data,
        classes: {
          namespace: 'imageSelector',
          container: '{namespace}-wrap'
        } // ,
        // data
      })

      expect(imageSelector.classes.NAMESPACE).toEqual('imageSelector')
      expect(imageSelector.classes.CONTAINER).toEqual('imageSelector-wrap')
    })

    describe('getClass()', () => {
      test('should get class with namespace', () => {
        const element = generateHTMLSample()
        const imageSelector = ImageSelector.of(element, {
          data,
          classes: { namespace: 'hello' }
        })

        expect(imageSelector.getClass('foo')).toEqual('foo')
        expect(imageSelector.getClass('{namespace}-foo')).toEqual('hello-foo')
      })

      test('should get class with arg', () => {
        const element = generateHTMLSample()
        const imageSelector = ImageSelector.of(element, {
          data,
          classes: { namespace: 'hello' }
        })

        expect(imageSelector.getClass('foo', 'arg', 'value')).toEqual('foo')
        expect(
          imageSelector.getClass('{namespace}-{arg}', 'arg', 'value')
        ).toEqual('hello-value')
      })
    })
  })

  describe('theme', () => {
    describe('getThemeClass()', () => {
      test('should get theme classes with default namespace', () => {
        const element = generateHTMLSample()
        const imageSelector = ImageSelector.of(element, {
          data,
          theme: null,
          classes: { theme: '{namespace}--{theme}' }
        })

        expect(imageSelector.getThemeClass()).toEqual('')
        expect(imageSelector.getThemeClass('bar')).toEqual(
          'pj-imageSelector--bar'
        )
        expect(imageSelector.getThemeClass('foo bar')).toEqual(
          'pj-imageSelector--foo pj-imageSelector--bar'
        )
      })

      test('should get theme classes with namespace override', () => {
        const element = generateHTMLSample()
        const imageSelector = ImageSelector.of(element, {
          data,
          theme: null,
          classes: {
            namespace: 'hello',
            theme: '{namespace}--{theme}'
          } // ,
          // data
        })

        expect(imageSelector.getThemeClass()).toEqual('')
        expect(imageSelector.getThemeClass('bar')).toEqual('hello--bar')
        expect(imageSelector.getThemeClass('foo bar')).toEqual(
          'hello--foo hello--bar'
        )
      })

      test('should get theme classes correctly when no classes.THEME defined', () => {
        const element = generateHTMLSample()
        const imageSelector = ImageSelector.of(element, {
          data,
          theme: '{namespace}--foo'
        })

        // set to null for test
        imageSelector.classes.THEME = null

        expect(imageSelector.getThemeClass()).toEqual('pj-imageSelector--foo')
        expect(imageSelector.getThemeClass('bar')).toEqual('bar')
        expect(imageSelector.getThemeClass('{namespace}--bar')).toEqual(
          'pj-imageSelector--bar'
        )
        expect(imageSelector.getThemeClass('foo bar')).toEqual('foo bar')
        expect(
          imageSelector.getThemeClass('{namespace}--foo {namespace}--bar')
        ).toEqual('pj-imageSelector--foo pj-imageSelector--bar')
      })
    })
  })
  describe('api call', () => {
    test('should not call bind', () => {
      const $element = ImageSelector.of(generateHTMLSample(), { data })
      expect($element.bind()).toBeNil()
    })

    test('should call destroy', () => {
      const $element = ImageSelector.of(generateHTMLSample(), { data })
      $element.destroy()
      // expect().toEqual($element);
      // expect($element).toEqual($element);
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('imageSelector:ready', () => {
        called++
      })

      const api = ImageSelector.of($element, { data })
      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = ImageSelector.of($element, { data })
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('imageSelector:destroy', () => {
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
      api = ImageSelector.of($element, {
        data,
        onChange() {
          called = true
        }
      })

      expect(called).toBeFalse()
    })

    it('should fired when change the value', () => {
      let called = false
      $element = generateHTMLSample()
      api = ImageSelector.of($element, {
        data,
        onChange(value) {
          called = true
          expect(value).toBe(string)
        }
      })

      api.val(string)

      expect(called).toBeTrue()
    })

    it('should fired when set the value', () => {
      let called = false
      $element = generateHTMLSample()
      api = ImageSelector.of($element, {
        data,
        onChange(value) {
          called = true

          expect(value).toBe(array)
        }
      })

      api.set(array)

      expect(called).toBeTrue()
    })
  })

  describe('get()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = ImageSelector.of($element, { data })
    })

    test('should get the value', () => {
      expect(api.get()).toBeString()
    })
  })

  describe('set()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = ImageSelector.of($element, { data })
    })

    test('should set the value', () => {
      expect(api.get()).toBeString()

      api.set(string)
      expect(api.get()).toBeString(string)
    })
  })

  describe('val()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = ImageSelector.of($element, { data })
    })

    test('should get the value', () => {
      expect(api.val()).toBeString()
    })

    test('should set the value', () => {
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
      api = ImageSelector.of($element, { data })
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('imageSelector:enable', () => {
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
      api = ImageSelector.of($element, { data })
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('imageSelector:disable', () => {
        called++
      })

      api.disable()
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeTrue()
    })
  })
})
