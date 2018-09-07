import List from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

const data = [
  {
    label: 'Interfaces',
    value: 'interface'
  },
  {
    label: 'UI Design',
    value: 'ui-design'
  },
  {
    label: 'Web Design',
    value: 'web-design'
  },
  {
    label: 'Typography',
    value: 'typography'
  },
  {
    label: 'Landing',
    value: 'landing'
  }
]

const string =
  '[{"label":"Interfaces","value":"interface"},{"label":"Typography","value":"typography"}]'
const array = [
  { label: 'Interfaces', value: 'interface' },
  { label: 'Typography', value: 'typography' }
]
describe('List', () => {
  describe('List()', () => {
    test('should have List', () => {
      expect(List).toBeFunction()
    })

    test('should have defaults', () => {
      expect(List.defaults).toBeObject()
    })
    test('should have events', () => {
      expect(List.events).toBeObject()
    })
    test('should have classes', () => {
      expect(List.classes).toBeObject()
    })
    test('should have methods', () => {
      expect(List.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const list = List.of(generateHTMLSample(), { data })

      expect(list).toBeObject()
      expect(list.options).toEqual({
        ...DEFAULTS,
        data
      })
    })

    test('should have options', () => {
      const list = List.of(generateHTMLSample(), { data })

      expect(list.options).toBeObject()
    })

    test('should have classes', () => {
      const list = List.of(generateHTMLSample(), { data })

      expect(list.classes).toBeObject()
    })
  })

  describe('classes', () => {
    test('should use classes options', () => {
      const element = generateHTMLSample()
      const list = List.of(element, {
        data,
        classes: {
          container: '{namespace}-wrap',
          active: '{namespace}-active'
        } // ,
        // data
      })

      expect(list.classes.CONTAINER).toEqual('pj-list-wrap')
      expect(list.classes.ACTIVE).toEqual('pj-list-active')
    })

    test('should override class namespace', () => {
      const element = generateHTMLSample()
      const list = List.of(element, {
        data,
        classes: {
          namespace: 'list',
          container: '{namespace}-wrap'
        } // ,
        // data
      })

      expect(list.classes.NAMESPACE).toEqual('list')
      expect(list.classes.CONTAINER).toEqual('list-wrap')
    })

    describe('getClass()', () => {
      test('should get class with namespace', () => {
        const element = generateHTMLSample()
        const list = List.of(element, {
          data,
          classes: { namespace: 'hello' }
        })

        expect(list.getClass('foo')).toEqual('foo')
        expect(list.getClass('{namespace}-foo')).toEqual('hello-foo')
      })

      test('should get class with arg', () => {
        const element = generateHTMLSample()
        const list = List.of(element, {
          data,
          classes: { namespace: 'hello' }
        })

        expect(list.getClass('foo', 'arg', 'value')).toEqual('foo')
        expect(list.getClass('{namespace}-{arg}', 'arg', 'value')).toEqual(
          'hello-value'
        )
      })
    })
  })

  describe('theme', () => {
    describe('getThemeClass()', () => {
      test('should get theme classes with default namespace', () => {
        const element = generateHTMLSample()
        const list = List.of(element, {
          data,
          theme: null,
          classes: { theme: '{namespace}--{theme}' }
        })

        expect(list.getThemeClass()).toEqual('')
        expect(list.getThemeClass('bar')).toEqual('pj-list--bar')
        expect(list.getThemeClass('foo bar')).toEqual(
          'pj-list--foo pj-list--bar'
        )
      })

      test('should get theme classes with namespace override', () => {
        const element = generateHTMLSample()
        const list = List.of(element, {
          data,
          theme: null,
          classes: {
            namespace: 'hello',
            theme: '{namespace}--{theme}'
          } // ,
          // data
        })

        expect(list.getThemeClass()).toEqual('')
        expect(list.getThemeClass('bar')).toEqual('hello--bar')
        expect(list.getThemeClass('foo bar')).toEqual('hello--foo hello--bar')
      })

      test('should get theme classes correctly when no classes.THEME defined', () => {
        const element = generateHTMLSample()
        const list = List.of(element, {
          data,
          theme: '{namespace}--foo'
        })

        // set to null for test
        list.classes.THEME = null

        expect(list.getThemeClass()).toEqual('pj-list--foo')
        expect(list.getThemeClass('bar')).toEqual('bar')
        expect(list.getThemeClass('{namespace}--bar')).toEqual('pj-list--bar')
        expect(list.getThemeClass('foo bar')).toEqual('foo bar')
        expect(list.getThemeClass('{namespace}--foo {namespace}--bar')).toEqual(
          'pj-list--foo pj-list--bar'
        )
      })
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = List.of(generateHTMLSample(), { data })
      expect($element.bind()).toBeNil()
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('list:ready', () => {
        called++
      })

      const api = List.of($element, { data })
      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeTrue()
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = List.of($element, { data })
    })

    test('should trigger destroy event', () => {
      let called = 0

      $element.addEventListener('list:destroy', () => {
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
      api = List.of($element, {
        onChange() {
          called = true
        }
      })

      expect(called).toBeFalse()
    })

    it('should fired when change the value', () => {
      let called = false
      $element = generateHTMLSample()
      api = List.of($element, {
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
      api = List.of($element, {
        onChange(value) {
          called = true

          expect(value).toBe(string)
        }
      })

      api.set(array)

      expect(called).toBeTrue()
    })
  })

  describe('get()', () => {
    let $element
    let api

    it('should get the value', () => {
      $element = generateHTMLSample()
      api = List.of($element)

      expect(api.get()).toBeArray()
    })

    it('should get the value with string', () => {
      $element = generateHTMLSample(string)
      api = List.of($element)

      expect(api.get()).toEqual(array)
    })
  })

  describe('set()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = List.of($element)
    })

    it('should set the value', () => {
      expect(api.get()).toBeArray()

      api.set(array)
      expect(api.get()).toEqual(array)
    })
  })

  describe('val()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = List.of($element, { data })
    })

    test('should get the value', () => {
      $element = generateHTMLSample(string)
      api = List.of($element)

      expect(api.val()).toEqual(string)
    })

    test('should set the value with string', () => {
      api.val(string)

      expect(api.val()).toBe(string)
      expect(api.get()).toEqual(array)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = List.of($element, { data })
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('list:enable', () => {
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
      api = List.of($element, { data })
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('list:disable', () => {
        called++
      })

      api.disable()
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeTrue()
    })
  })
})
