import optionable from '../src/optionable'
import register from '../src/register'
import Component from '@pluginjs/component'
import { parseHTML } from '@pluginjs/dom'

const DEFAULTS = {
  foo: false,
  bar: false
}
@optionable(DEFAULTS)
@register('sample')
class Sample extends Component {
  constructor(element, options) {
    super(element)
    this.setupOptions(options)
  }
}

describe('optionable()', () => {
  describe('setupOptions()', () => {
    it('should setup options with defaults', () => {
      const el = document.createElement('div')
      const api = Sample.of(el)

      expect(api.options.foo).toBe(false)
      expect(api.options.bar).toBe(false)
    })

    it('should override defaults with options passed in', () => {
      const el = document.createElement('div')
      const api = Sample.of(el, {
        foo: true
      })

      expect(api.options.foo).toBe(true)
    })
  })

  describe('setDefaults()', () => {
    it('should override global defaults', () => {
      Sample.setDefaults({
        foo: true
      })

      let api = Sample.of(document.createElement('div'))

      expect(api.options.foo).toBe(true)
      expect(api.options.bar).toBe(false)

      api = Sample.of(document.createElement('div'), {
        foo: false
      })

      expect(api.options.foo).toBe(false)
    })
  })

  describe('enableDataOption', () => {
    const DEFAULTS = {
      foo: false,
      bar: false
    }
    @optionable(DEFAULTS, true)
    @register('sample')
    class Sample extends Component {
      constructor(element, options) {
        super(element)
        this.setupOptions(options)
      }
    }

    it('should get options from data attr', () => {
      const el = parseHTML('<div data-foo="true"></div>')

      const api = Sample.of(el)

      expect(api.options.foo).toBe(true)
      expect(api.options.bar).toBe(false)
    })

    it('should works with json', () => {
      const el = parseHTML('<div data-foo=\'{"hello":"world"}\'></div>')

      const api = Sample.of(el)

      expect(api.options.foo).toEqual({
        hello: 'world'
      })
    })
  })
})
