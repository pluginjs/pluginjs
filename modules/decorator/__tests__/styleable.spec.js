import styleable from '../src/styleable'
import register from '../src/register'
import Component from '@pluginjs/component'

const CLASSES = {
  NAMESPACE: 'pj-sample',
  THEME: '{namespace}--{theme}',
  TYPE: '{namespace}-{type}',
  DISABLED: '{namespace}-disabled'
}

@styleable(CLASSES)
@register('sample')
class Sample extends Component {
  constructor(element, options) {
    super(element)
    this.options = options
  }
}

describe('styleable()', () => {
  describe('getClass()', () => {
    it('should return class name with namespace', () => {
      const el = document.createElement('div')
      const api = Sample.of(el)
      api.setupClasses()

      expect(api.getClass('{namespace}-foo')).toBe('pj-sample-foo')
    })

    it('should return class name with specify arg and namespace', () => {
      const el = document.createElement('div')
      const api = Sample.of(el)
      api.setupClasses()

      expect(api.getClass('{namespace}-{type}', 'type', 'foo')).toBe(
        'pj-sample-foo'
      )
    })
  })

  describe('getClasses()', () => {
    it('should return multi class name', () => {
      const el = document.createElement('div')
      const api = Sample.of(el)
      api.setupClasses()

      expect(api.getClasses('{namespace}-{type}', 'type', 'foo bar')).toBe(
        'pj-sample-foo pj-sample-bar'
      )
    })
  })

  describe('setupClasses()', () => {
    it('should add classes to this after setupClasses', () => {
      const el = document.createElement('div')
      const api = Sample.of(el)
      expect(api.classes).toBeUndefined()

      api.setupClasses()

      expect(api.classes).toBeObject()

      expect(api.classes).toEqual({
        NAMESPACE: 'pj-sample',
        THEME: 'pj-sample--{theme}',
        TYPE: 'pj-sample-{type}',
        DISABLED: 'pj-sample-disabled'
      })
    })

    it('should override defaults classes with options', () => {
      const el = document.createElement('div')
      const api = Sample.of(el, {
        classes: {
          NAMESPACE: 'sample'
        }
      })
      api.setupClasses()

      expect(api.classes).toEqual({
        NAMESPACE: 'sample',
        THEME: 'sample--{theme}',
        TYPE: 'sample-{type}',
        DISABLED: 'sample-disabled'
      })
    })
  })
})
