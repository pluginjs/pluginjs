import eventable from '../src/eventable'
import register from '../src/register'
import Component from '@pluginjs/component'
import { bindEvent } from '@pluginjs/events'

const EVENTS = {
  READY: 'ready',
  CHANGE: 'change'
}

@eventable(EVENTS)
@register('sample')
class Sample extends Component {
  constructor(element, options) {
    super(element)
    this.value = null
    this.options = options
  }

  get() {
    return this.value
  }

  set(value) {
    this.value = value
  }
}

describe('eventable()', () => {
  describe('eventName()', () => {
    it('should return namespace when no argument passed', () => {
      const el = document.createElement('div')
      const api = Sample.of(el)

      expect(api.eventName()).toBe('.sample')
    })

    it('should return event name with namespace', () => {
      const el = document.createElement('div')
      const api = Sample.of(el)

      expect(api.eventName('click')).toBe('click.sample')
    })

    it('should return multiply event name with namespace', () => {
      const el = document.createElement('div')
      const api = Sample.of(el)

      expect(api.eventName('click touch')).toBe('click.sample touch.sample')
      expect(api.eventName(['click', 'touch'])).toBe(
        'click.sample touch.sample'
      )
    })
  })

  describe('eventNameWithId()', () => {
    it('should return namespace with id when no argument passed', () => {
      const el = document.createElement('div')
      const api = Sample.of(el)

      expect(api.eventNameWithId()).toBe(`.sample-${api.instanceId}`)
    })

    it('should return event name with namespace and id', () => {
      const el = document.createElement('div')
      const api = Sample.of(el)

      expect(api.eventNameWithId('click')).toBe(
        `click.sample-${api.instanceId}`
      )
    })

    it('should return multiply event name with namespace and id', () => {
      const el = document.createElement('div')
      const api = Sample.of(el)

      expect(api.eventNameWithId('click touch')).toBe(
        `click.sample-${api.instanceId} touch.sample-${api.instanceId}`
      )

      expect(api.eventNameWithId(['click', 'touch'])).toBe(
        `click.sample-${api.instanceId} touch.sample-${api.instanceId}`
      )
    })
  })

  describe('selfEventName()', () => {
    it('should return event name that used in self trigger', () => {
      const el = document.createElement('div')
      const api = Sample.of(el)

      expect(api.selfEventName('ready')).toBe('sample:ready')
    })

    it('should return multiply event name', () => {
      const el = document.createElement('div')
      const api = Sample.of(el)

      expect(api.selfEventName('change update')).toBe(
        'sample:change sample:update'
      )
      expect(api.selfEventName(['change', 'update'])).toBe(
        'sample:change sample:update'
      )
    })
  })

  describe('trigger()', () => {
    it('should works with options callback', () => {
      let called = false
      const el = document.createElement('div')
      const api = Sample.of(el, {
        onChange(value) {
          called = true
          expect(this).toBe(api)
          expect(value).toBe('hello')
        }
      })
      api.trigger('change', 'hello')

      expect(called).toBeTrue()
    })

    it('should works with listen events', () => {
      let called = false
      const el = document.createElement('div')
      const api = Sample.of(el)
      bindEvent(
        'sample:change',
        (e, self, value) => {
          called = true
          expect(self).toBe(api)
          expect(value).toBe('hello')
        },
        el
      )

      api.trigger('change', 'hello')

      expect(called).toBeTrue()
    })
  })
})
