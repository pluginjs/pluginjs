import $ from 'jquery'
import { deepMerge } from '@pluginjs/utils'
import Component from '@pluginjs/component'
import Pj, { register, eventable, styleable } from '../../src/main'

describe('As', () => {
  it('should have As', () => {
    expect(As).to.be.an('object')
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

    it('should register the plugin', () => {
      expect(Pj.get('test')).to.be.null

      Pj.register('test', Test)

      expect(Pj.get('test')).to.not.be.null
    })

    it('should assign obj to plugin', () => {
      const defaults = { foo: 'bar' }
      Pj.register('test', Test, { defaults })
      const test = Pj.get('test')

      expect(test.defaults).to.be.eql(defaults)
    })

    it('should assign info to plugin', () => {
      const info = { version: '0.0.1' }
      Pj.register('test', Test, {}, info)
      const test = Pj.get('test')

      expect(test.version).to.be.equal(info.version)
    })

    describe('setDefaults()', () => {
      it('should override the defaults', () => {
        const defaults = { foo: 'bar' }
        Pj.register('test', Test, { defaults })
        const test = Pj.get('test')

        expect(test.defaults).to.be.eql(defaults)

        expect(Test.setDefaults).to.be.an('function')

        const override = { foo: 'another' }
        Test.setDefaults(override)

        expect(Test.defaults).to.be.eql(override)
      })
    })

    describe('setEvents()', () => {
      it('should override the defaults', () => {
        const events = { CLICK: 'click' }
        Pj.register('test', Test, { events })
        const test = Pj.get('test')

        expect(test.events).to.be.eql(events)

        expect(Test.setEvents).to.be.an('function')

        const override = { CLICK: 'tap' }
        Test.setEvents(override)

        expect(Test.events).to.be.eql(override)
      })
    })

    describe('setClasses()', () => {
      it('should override the defaults', () => {
        const classes = { CONTAINER: 'container' }
        Pj.register('test', Test, { classes })
        const test = Pj.get('test')

        expect(test.classes).to.be.eql(classes)

        expect(Test.setClasses).to.be.an('function')

        const override = { CONTAINER: 'test-container' }
        Test.setClasses(override)

        expect(Test.classes).to.be.eql(override)
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
        it('should have instanceId', () => {
          $element.asTest()
          const api = $element.data('test')

          expect(api.instanceId).to.be.an('number')
          expect(Pj.instances.test.length).to.be.equal(1)
        })

        it('should have different instanceId', () => {
          $element.asTest()
          const api = $element.data('test')
          expect(api.instanceId).to.be.an('number')

          const $another = $(document.createElement('div')).asTest()
          const another = $another.data('test')
          expect(another.instanceId).to.be.an('number')

          expect(api.instanceId).to.not.equal(another.instanceId)
        })
      })

      describe('instances', () => {
        it('should be empty if no instance exists', () => {
          expect(Pj.instances.test.length).to.be.equal(0)
        })
        it('should cache instances', () => {
          $element.asTest()
          expect(Pj.instances.test.length).to.be.equal(1)

          $(document.createElement('div')).asTest()
          expect(Pj.instances.test.length).to.be.equal(2)
        })

        it('should remove instance after destroy', () => {
          const $another = $(document.createElement('div')).asTest()
          $element.asTest()
          expect(Pj.instances.test.length).to.be.equal(2)

          $element.asTest('destroy')
          expect(Pj.instances.test.length).to.be.equal(1)

          $another.asTest('destroy')
          expect(Pj.instances.test.length).to.be.equal(0)
        })
      })

      describe('eventNameWithId()', () => {
        let api

        beforeEach(() => {
          $element.asTest()
          api = $element.data('test')
        })

        it('should return .namespace when no args filled', () => {
          expect(api.eventNameWithId()).to.be.equal('.test-1')
        })

        it('should return event name with namespace', () => {
          expect(api.eventNameWithId('click')).to.be.equal('click.test-1')
        })

        it('should work with multi events', () => {
          expect(api.eventNameWithId('click touch')).to.be.equal(
            'click.test-1 touch.test-1'
          )
        })
      })

      it('should works with jquery fn', () => {
        expect($element.asTest()).to.be.equal($element)

        const api = $element.data('test')

        expect(api).to.be.an('object')
        expect(api.options).to.be.an('object')
      })

      describe('api call', () => {
        beforeEach(() => {
          $element.asTest()
        })

        it('should not call methods that not defined in obj', () => {
          expect($element.asTest('private')).to.be.undefined
        })

        it('should call methods that defined in obj', () => {
          expect($element.asTest('public')).to.be.equal($element)
        })

        it('should return the result if methods name contains get string', () => {
          const api = $element.data('test')
          expect($element.asTest('get')).to.be.equal(api.get())
        })

        it('should return the result correctly with args', () => {
          const api = $element.data('test')
          expect($element.asTest('getArg', 'test')).to.be.equal(
            api.getArg('test')
          )
          expect($element.asTest('getTwoArgs', 1, 2)).to.be.eql(
            api.getTwoArgs(1, 2)
          )
        })
      })
    })
  })
})
