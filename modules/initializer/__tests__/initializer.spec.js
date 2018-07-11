import Initializer from '../src/main'
import { queryAll, parseHTML } from '@pluginjs/dom'
import Sample from './fixtures/sample'

describe('Initializer', () => {
  describe('Initializer()', () => {
    test('should have Initializer', () => {
      expect(Initializer).toBeObject()
    })
  })

  describe('of()', () => {
    Initializer.register('example', (element, options) => {
      element.setAttribute('hello', options.value)
    }, {
      value: 'world'
    })

    test('should work with element', () => {
      const $example = parseHTML`<div data-plugin="example"><div>`
      Initializer.of($example)
      expect($example.getAttribute('hello')).toEqual('world')
    })

    test('should work with elements', () => {
      const $doc = parseHTML`<div class="example" data-plugin="example"><div><div class="example" data-plugin="example"><div>`
      const $examples = queryAll('.example');
      Initializer.of($examples)

      $examples.forEach($example => {
        expect($example.getAttribute('hello')).toEqual('world')
      })
    })
  })

  describe('register()', () => {
    test('should have register() method', () => {
      expect(Initializer.register).toBeFunction()
    })

    test('should register a new plugin', () => {
      Initializer.register('test-plugin', (element, options) => {
        element.setAttribute('hello', options.value)
      })
      expect(Initializer.has('test-plugin')).toBeTrue()
    })

    test('should set defaults with the 3rd param', () => {
      const defaults = {foo:'bar'}
      Initializer.register('test-plugin', (element, options) => {

      }, defaults)
      expect(Initializer.defaults('test-plugin')).toEqual(defaults)
    })
  })

  describe('defaults()', () => {
    const defaults = {foo:'bar'}

    test('should have defaults() method', () => {
      expect(Initializer.defaults).toBeFunction()
    })

    test('should set defaults ', () => {
      Initializer.defaults('test-defaults', defaults)
      expect(Initializer.defaults('test-defaults')).toEqual(defaults)
    })
  })

  describe('get()', () => {
    test('should have get() method', () => {
      expect(Initializer.get).toBeFunction()
    })

    test('should return null if plugin not registered', () => {
      expect(Initializer.get('non-exists')).toEqual(null)
    })

    test('should return plugin initialize function', () => {
      Initializer.register('example', (element, options) => {
        element.setAttribute('hello', options.value)
      })
      const Plugin = Initializer.get('example')

      expect(Plugin).toBeFunction()

      const $example = parseHTML`<div data-plugin="example"><div>`
      Plugin($example, {
        value: 'world'
      })

      expect($example.getAttribute('hello')).toEqual('world')
    })

    test('should work with Pj plugin', () => {
      const Plugin = Initializer.get('sample')

      expect(Plugin).toBeFunction()

      const $sample = parseHTML`<div data-plugin="sample"><div>`
      Plugin($sample, {
        value: 'another'
      })

      expect($sample.getAttribute('hello')).toEqual('another')
    })
  })

  describe('has()', () => {
    test('should have has() method', () => {
      expect(Initializer.has).toBeFunction()
    })

    test('should return false if plugin not registered', () => {
      expect(Initializer.has('non-exists')).toBeFalse()
    })

    test('should return true if plugin is Pj plugin', () => {
      expect(Initializer.has('sample')).toBeTrue()
    })
  })

  describe('initialize()', () => {
    Initializer.register('example', (element, options) => {
      element.setAttribute('hello', options.value)
    }, {
      value: 'world'
    })

    test('should have initialize() method', () => {
      expect(Initializer.initialize).toBeFunction()
    })

    test('should initialize the element with registed plugin', () => {
      const $example = parseHTML`<div data-plugin="example"><div>`

      expect($example.hasAttribute('hello')).toBeFalse()
      Initializer.initialize('example', $example)
      expect($example.hasAttribute('hello')).toBeTrue()
      expect($example.getAttribute('hello')).toEqual('world')
    })

    test('should initialize the element with options', () => {
      const $example = parseHTML`<div data-plugin="example"><div>`

      expect($example.hasAttribute('hello')).toBeFalse()
      Initializer.initialize('example', $example, {
        value: 'another'
      })

      expect($example.hasAttribute('hello')).toBeTrue()
      expect($example.getAttribute('hello')).toEqual('another')
    })

    test('should initialize the element with pj plugin', () => {
      const $sample = parseHTML`<div data-plugin="sample"><div>`

      expect($sample.hasAttribute('hello')).toBeFalse()
      Initializer.initialize('sample', $sample)
      expect($sample.hasAttribute('hello')).toBeTrue()
      expect($sample.getAttribute('hello')).toEqual('world')
    })
  })

  // describe('constructor()', () => {
  //   test('should work wtesth element', () => {
  //     const initializer = Initializer.of(generateHTMLSample())

  //     expect(initializer).toBeObject()
  //     expect(initializer.options).toEqual(DEFAULTS)
  //   })

  //   test('should have options', () => {
  //     const initializer = Initializer.of(generateHTMLSample())

  //     expect(initializer.options).toBeObject()
  //   })
  // })

  // describe('initialized()', () => {
  //   let $element

  //   beforeEach(() => {
  //     $element = generateHTMLSample()
  //   })

  //   test('should trigger ready event', () => {
  //     let called = 0
  //     $element.addEventListener('initializer:ready', () => {
  //       called++
  //     })
  //     const instance = Initializer.of($element)
  //     expect(called).toEqual(1)
  //     expect(instance.is('initialized')).toBeTrue()
  //   })
  // })
})
