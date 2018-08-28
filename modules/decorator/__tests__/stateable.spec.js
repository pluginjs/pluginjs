import stateable from '../src/stateable'
import register from '../src/register'
import Component from '@pluginjs/component'

@stateable()
@register('sample')
class Sample extends Component {
  constructor(element) {
    super(element)
    this.setupStates()
  }
}

describe('stateable()', () => {
  describe('is()', () => {
    it('should return false when not enter the state', () => {
      const el = document.createElement('div')
      const api = Sample.of(el)

      expect(api.is('ready')).toBeFalse()
    })

    it('should return true when enter the state', () => {
      const el = document.createElement('div')
      const api = Sample.of(el)
      api.enter('ready')
      expect(api.is('ready')).toBeTrue()
    })
  })

  describe('enter() and leave()', () => {
    it('should enter the state and leave the state', () => {
      const el = document.createElement('div')
      const api = Sample.of(el)

      api.enter('ready')
      expect(api.is('ready')).toBeTrue()

      api.leave('ready')
      expect(api.is('ready')).toBeFalse()
    })
  })
})
