import Component from '@pluginjs/component'
import Pj from '../../src/main'
import { register, eventable, styleable } from '@pluginjs/decorator'
import { deepMerge } from '@pluginjs/utils'

describe('Pj', () => {
  test('should have Pj', () => {
    expect(Pj).toBeObject()
  })

  describe('register()', () => {
    @styleable({})
    @eventable({})
    class Test extends Component {
      constructor(element, options = {}) {
        super('test', element)

        this.options = deepMerge(options)
        this.value = null
      }

      private() {
        return 'it should not call public'
      }

      public() {}

      get() {
        return true
      }

      getArg(arg) {
        return arg
      }

      getTwoArgs(arg1, arg2) {
        return [arg1, arg2]
      }

      val(value) {
        if (typeof typeof value !== 'undefined') {
          this.value = value
        } else {
          return this.value
        }
      }
    }

    beforeEach(() => {
      Pj.reset()
    })

    test('should register the plugin', () => {
      expect(Pj.get('test')).toBeNil()

      Pj.register('test', Test)

      expect(Pj.get('test')).not.toBeNil()
    })

    test('should assign obj to plugin', () => {
      const defaults = { foo: 'bar' }
      Pj.register('test', Test, { defaults })
      const test = Pj.get('test')

      expect(test.defaults).toEqual(defaults)
    })

    describe('setDefaults()', () => {
      test('should override the defaults', () => {
        const defaults = { foo: 'bar' }
        Pj.register('test', Test, { defaults })
        const test = Pj.get('test')

        expect(test.defaults).toEqual(defaults)

        expect(Test.setDefaults).toBeFunction()

        const override = { foo: 'another' }
        Test.setDefaults(override)

        expect(Test.defaults).toEqual(override)
      })
    })

    describe('setEvents()', () => {
      test('should override the defaults', () => {
        const events = { CLICK: 'click' }
        Pj.register('test', Test, { events })
        const test = Pj.get('test')

        expect(test.events).toEqual(events)

        expect(Test.setEvents).toBeFunction()

        const override = { CLICK: 'tap' }
        Test.setEvents(override)

        expect(Test.events).toEqual(override)
      })
    })

    describe('setClasses()', () => {
      test('should override the defaults', () => {
        const classes = { CONTAINER: 'container' }
        Pj.register('test', Test, { classes })
        const test = Pj.get('test')

        expect(test.classes).toEqual(classes)

        expect(Test.setClasses).toBeFunction()

        const override = { CONTAINER: 'test-container' }
        Test.setClasses(override)

        expect(Test.classes).toEqual(override)
      })
    })
  })
})
