import Tree from '../src/main'
import { defaults as DEFAULTS } from '../src/constant'
import generateHTMLSample from './fixtures/sample'

describe('Tree', () => {
  describe('Tree()', () => {
    test('should have Tree', () => {
      expect(Tree).toBeFunction()
    })

    test('should have defaults', () => {
      expect(Tree.defaults).toBeObject()
    })

    test('should have events', () => {
      expect(Tree.events).toBeObject()
    })

    test('should have classes', () => {
      expect(Tree.classes).toBeObject()
    })

    test('should have methods', () => {
      expect(Tree.methods).toBeArray()
    })
  })

  describe('constructor()', () => {
    test('should work with element', () => {
      setTimeout(() => {
        const element = generateHTMLSample()
        const tree = Tree.of(element)

        expect(tree).toBeObject()
        expect(tree.options).toEqual(DEFAULTS)
      }, 0)
    })

    test('should have options', () => {
      setTimeout(() => {
        const tree = Tree.of(generateHTMLSample())

        expect(tree.options).toBeObject()
      }, 0)
    })
  })

  describe('api call', () => {
    test('should not call bind', () => {
      setTimeout(() => {
        const $element = generateHTMLSample()
        const tree = Tree.of($element)
        expect(tree.bind()).toBeNil()
      }, 0)
    })

    test('should call destroy', () => {
      setTimeout(() => {
        const $element = generateHTMLSample()
        const tree = Tree.of($element)
        tree.destroy()
      }, 0)
    })
  })

  describe('initialize()', () => {
    let $element

    beforeEach(() => {
      $element = generateHTMLSample()
    })

    test('should trigger ready event', () => {
      let called = 0

      $element.addEventListener('tree:ready', () => {
        called++
      })

      setTimeout(() => {
        const instance = Tree.of($element)
        expect(called).toEqual(1)
        expect(instance.is('initialized')).toBeTrue()
      }, 0)
    })
  })

  describe('destroy()', () => {
    let $element
    let api

    beforeEach(() => {
      setTimeout(() => {
        $element = generateHTMLSample()
        api = Tree.of($element)
      }, 0)
    })

    test('should trigger destroy event', () => {
      setTimeout(() => {
        let called = 0

        $element.addEventListener('tree:destroy', () => {
          expect(api.is('initialized')).toBeFalse()
          called++
        })
        api.destroy()

        expect(called).toEqual(1)
      }, 0)
    })
  })

  describe('enable()', () => {
    let $element
    let api

    beforeEach(() => {
      setTimeout(() => {
        $element = generateHTMLSample()
        api = Tree.of($element)
      }, 0)
    })

    test('should enable the plugin', () => {
      setTimeout(() => {
        api.destroy()
        api.enable()

        expect(api.is('disabled')).toBeFalse()
      }, 0)
    })

    test('should trigger enable event', () => {
      setTimeout(() => {
        let called = 0

        $element.addEventListener('tree:enable', () => {
          expect(api.is('disabled')).toBeFalse()
          called++
        })

        api.enable()
        expect(called).toEqual(1)
      }, 0)
    })
  })

  describe('disable()', () => {
    let $element
    let api

    beforeEach(() => {
      setTimeout(() => {
        $element = generateHTMLSample()
        api = Tree.of($element)
      }, 0)
    })

    test('should disable the plugin', () => {
      setTimeout(() => {
        api.disabled()

        expect(api.is('disabled')).toBeTrue()
      }, 0)
    })

    test('should trigger disable event', () => {
      setTimeout(() => {
        let called = 0

        $element.addEventListener('tree:disable', () => {
          expect(api.is('disabled')).toBeTrue()
          called++
        })

        api.disable()
        expect(called).toEqual(1)
      }, 0)
    })
  })
})
