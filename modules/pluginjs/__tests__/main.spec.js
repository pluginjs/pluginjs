import $ from 'jquery'
import { deepMerge } from '@pluginjs/utils'
import Component from '@pluginjs/component'
import Pj, { register, eventable, styleable } from '../../src/main'

describe('As', () => {
  test('should have As', () => {
    expect(As).toBeObject()
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
        if (typeof value !== undefined) {
          this.value = value
        } else {
          return this.value
        }
      }
    }

    beforeEach(() => {
      Pj.plugins = {}
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

    test('should assign info to plugin', () => {
      const info = { version: '0.0.1' }
      Pj.register('test', Test, {}, info)
      const test = Pj.get('test')

      expect(test.version).toEqual(info.version)
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

    describe('jquery constructor', () => {
      let $element

      beforeEach(() => {
        Pj.register('test', Test, {
          methods: ['get', 'getArg', 'getTwoArgs', 'value', 'public', 'destroy']
        })

        $element = $(document.createElement('div'))
      })

      describe('instanceId', () => {
        test('should have instanceId', () => {
          $element.asTest()
          const api = $element.data('test')

          expect(api.instanceId).toBeNumber()
          expect(Pj.instances.test).toHaveLength(1)
        })

        test('should have different instanceId', () => {
          $element.asTest()
          const api = $element.data('test')
          expect(api.instanceId).toBeNumber()

          const $another = $(document.createElement('div')).asTest()
          const another = $another.data('test')
          expect(another.instanceId).toBeNumber()

          expect(api.instanceId).not.toEqual(another.instanceId)
        })
      })

      describe('instances', () => {
        test('should be empty if no instance exists', () => {
          expect(Pj.instances.test).toHaveLength(0)
        })
        test('should cache instances', () => {
          $element.asTest()
          expect(Pj.instances.test).toHaveLength(1)

          $(document.createElement('div')).asTest()
          expect(Pj.instances.test).toHaveLength(2)
        })

        test('should remove instance after destroy', () => {
          const $another = $(document.createElement('div')).asTest()
          $element.asTest()
          expect(Pj.instances.test).toHaveLength(2)

          $element.asTest('destroy')
          expect(Pj.instances.test).toHaveLength(1)

          $another.asTest('destroy')
          expect(Pj.instances.test).toHaveLength(0)
        })
      })

      describe('eventNameWithId()', () => {
        let api

        beforeEach(() => {
          $element.asTest()
          api = $element.data('test')
        })

        test('should return .namespace when no args filled', () => {
          expect(api.eventNameWithId()).toEqual('.test-1')
        })

        test('should return event name with namespace', () => {
          expect(api.eventNameWithId('click')).toEqual('click.test-1')
        })

        test('should work with multi events', () => {
          expect(api.eventNameWithId('click touch')).toEqual(
            'click.test-1 touch.test-1'
          )
        })
      })

      test('should works with jquery fn', () => {
        expect($element.asTest()).toEqual($element)

        const api = $element.data('test')

        expect(api).toBeObject()
        expect(api.options).toBeObject()
      })

      describe('api call', () => {
        beforeEach(() => {
          $element.asTest()
        })

        test('should not call methods that not defined in obj', () => {
          expect($element.asTest('private')).toBeNil()
        })

        test('should call methods that defined in obj', () => {
          expect($element.asTest('public')).toEqual($element)
        })

        test('should return the result if methods name contains get string', () => {
          const api = $element.data('test')
          expect($element.asTest('get')).toEqual(api.get())
        })

        test('should return the result correctly with args', () => {
          const api = $element.data('test')
          expect($element.asTest('getArg', 'test')).toEqual(api.getArg('test'))
          expect($element.asTest('getTwoArgs', 1, 2)).toEqual(
            api.getTwoArgs(1, 2)
          )
        })
      })
    })
  })
})
