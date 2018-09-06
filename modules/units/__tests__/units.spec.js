import Units from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

const data = ['px', '%']
describe('Units', () => {
  describe('Units()', () => {
    test('should have Units', () => {
      expect(Units).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Units.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Units.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Units.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Units.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      const units = Units.of(generateHTMLSample(), { data })

      expect(units).toBeObject()
      expect(units.options).toEqual({
        ...DEFAULTS,
        data
      })
    })

    test('should have options', () => {
      const units = Units.of(generateHTMLSample(), { data })

      expect(units.options).toBeObject()
    })

    test('should have classes', () => {
      const units = Units.of(generateHTMLSample(), { data })

      expect(units.classes).toBeObject()
    })
  })

  describe('classes', () => {
    test('should use classes options', () => {
      const element = generateHTMLSample()
      const units = Units.of(element, {
        data,
        classes: {
          container: '{namespace}-wrap',
          active: '{namespace}-active'
        } // ,
        // data
      })

      expect(units.classes.CONTAINER).toEqual('pj-units-wrap')
      expect(units.classes.ACTIVE).toEqual('pj-units-active')
    })

    test('should override class namespace', () => {
      const element = generateHTMLSample()
      const units = Units.of(element, {
        data,
        classes: {
          namespace: 'units',
          container: '{namespace}-wrap'
        } // ,
        // data
      })

      expect(units.classes.NAMESPACE).toEqual('units')
      expect(units.classes.CONTAINER).toEqual('units-wrap')
    })

    describe('getClass()', () => {
      test('should get class with namespace', () => {
        const element = generateHTMLSample()
        const units = Units.of(element, {
          data,
          classes: { namespace: 'hello' }
        })

        expect(units.getClass('foo')).toEqual('foo')
        expect(units.getClass('{namespace}-foo')).toEqual('hello-foo')
      })

      test('should get class with arg', () => {
        const element = generateHTMLSample()
        const units = Units.of(element, {
          data,
          classes: { namespace: 'hello' }
        })

        expect(units.getClass('foo', 'arg', 'value')).toEqual('foo')
        expect(units.getClass('{namespace}-{arg}', 'arg', 'value')).toEqual(
          'hello-value'
        )
      })
    })
  })

  describe('theme', () => {
    describe('getThemeClass()', () => {
      test('should get theme classes with default namespace', () => {
        const element = generateHTMLSample()
        const units = Units.of(element, {
          data,
          theme: null,
          classes: { theme: '{namespace}--{theme}' }
        })

        expect(units.getThemeClass()).toEqual('')
        expect(units.getThemeClass('bar')).toEqual('pj-units--bar')
        expect(units.getThemeClass('foo bar')).toEqual(
          'pj-units--foo pj-units--bar'
        )
      })

      test('should get theme classes with namespace override', () => {
        const element = generateHTMLSample()
        const units = Units.of(element, {
          data,
          theme: null,
          classes: {
            namespace: 'hello',
            theme: '{namespace}--{theme}'
          } // ,
          // data
        })

        expect(units.getThemeClass()).toEqual('')
        expect(units.getThemeClass('bar')).toEqual('hello--bar')
        expect(units.getThemeClass('foo bar')).toEqual('hello--foo hello--bar')
      })

      test('should get theme classes correctly when no classes.THEME defined', () => {
        const element = generateHTMLSample()
        const units = Units.of(element, {
          data,
          theme: '{namespace}--foo'
        })

        // set to null for test
        units.classes.THEME = null

        expect(units.getThemeClass()).toEqual('pj-units--foo')
        expect(units.getThemeClass('bar')).toEqual('bar')
        expect(units.getThemeClass('{namespace}--bar')).toEqual('pj-units--bar')
        expect(units.getThemeClass('foo bar')).toEqual('foo bar')
        expect(
          units.getThemeClass('{namespace}--foo {namespace}--bar')
        ).toEqual('pj-units--foo pj-units--bar')
      })
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      const $element = Units.of(generateHTMLSample(), { data })
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

      $element.addEventListener('units:ready', () => {
        called++
      })

      const api = Units.of($element, { data })
      expect(called).toEqual(1)
      expect(api.is('initialized')).toBeTrue()
    })
  })

  describe('change', () => {
    let $element
    let api

    it('should not fired when initialize', () => {
      let called = false
      $element = generateHTMLSample('10px')
      api = Units.of($element, {
        onChange() {
          called = true
        }
      })

      expect(called).toBeFalse()
    })

    it('should fired when change the value', () => {
      let called = false
      $element = generateHTMLSample()
      api = Units.of($element, {
        onChange(value) {
          called = true

          expect(value).toBe('10px')
        }
      })

      api.val('10px')

      expect(called).toBeTrue()
    })

    it('should fired when set the value', () => {
      let called = false
      $element = generateHTMLSample()
      api = Units.of($element, {
        onChange(value) {
          called = true

          expect(value).toBe('10px')
        }
      })

      api.set({
        input: 10,
        unit: 'px'
      })

      expect(called).toBeTrue()
    })
  })

  describe('get()', () => {
    let $element
    let api

    it('should get the value', () => {
      $element = generateHTMLSample()
      api = Units.of($element)

      expect(api.get()).toBeObject()
    })

    it('should get the value with units', () => {
      $element = generateHTMLSample('10em')
      api = Units.of($element)

      expect(api.get()).toEqual({
        input: 10,
        unit: 'em'
      })
    })

    it('should get the value with number', () => {
      $element = generateHTMLSample('10')
      api = Units.of($element)

      expect(api.get()).toEqual({
        input: 10,
        unit: 'px'
      })
    })
  })

  describe('set()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Units.of($element)
    })

    it('should set the value without unit', () => {
      expect(api.get()).toBeObject()

      api.set({
        input: 10
      })
      expect(api.get()).toBeObject({
        input: 10,
        unit: 'px'
      })
    })

    it('should set the value with unit', () => {
      expect(api.get()).toBeObject()

      api.set({
        input: 10,
        unit: 'px'
      })
      expect(api.get()).toBeObject({
        input: 10,
        unit: 'px'
      })
    })
  })

  describe('val()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Units.of($element)
    })

    it('should get the value', () => {
      $element = generateHTMLSample('10px')
      api = Units.of($element)

      expect(api.val()).toBeString('10px')
    })

    it('should set the value with string', () => {
      api.val('10px')

      expect(api.val()).toBe('10px')
      expect(api.get()).toEqual({
        input: 10,
        unit: 'px'
      })
    })

    it('should set the value with number', () => {
      api.val(10)

      expect(api.val()).toBe('10px')
      expect(api.get()).toEqual({
        input: 10,
        unit: 'px'
      })
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      $element = generateHTMLSample()
      api = Units.of($element, { data })
    })

    test('should enable the plugin', () => {
      api.disable()
      api.enable()

      expect(api.is('disabled')).toBeFalse()
    })

    test('should trigger enable event', () => {
      let called = 0

      $element.addEventListener('units:enable', () => {
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
      api = Units.of($element, { data })
    })

    test('should disable the plugin', () => {
      api.disable()

      expect(api.is('disabled')).toBeTrue()
    })

    test('should trigger disable event', () => {
      let called = 0

      $element.addEventListener('units:disable', () => {
        called++
      })

      api.disable()
      expect(called).toEqual(1)
      expect(api.is('disabled')).toBeTrue()
    })
  })
})
