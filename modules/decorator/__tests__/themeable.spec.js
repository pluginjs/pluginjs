import styleable from '../src/styleable'
import themeable from '../src/themeable'
import register from '../src/register'
import Component from '@pluginjs/component'

const CLASSES = {
  NAMESPACE: 'pj-sample',
  THEME: '{namespace}--{theme}'
}

@themeable()
@styleable(CLASSES)
@register('sample')
class Sample extends Component {
  constructor(element, options) {
    super(element)
    this.options = options
    this.setupClasses()
  }
}

describe('themeable()', () => {
  describe('getThemeClass()', () => {
    it('should return theme class when options setted', () => {
      const el = document.createElement('div')
      const api = Sample.of(el, {
        theme: 'foo'
      })

      expect(api.getThemeClass()).toBe('pj-sample--foo')
    })

    it('should return empty when options not setted', () => {
      const el = document.createElement('div')
      const api = Sample.of(el)

      expect(api.getThemeClass()).toBe('')
    })

    it('should works with multi theme', () => {
      const el = document.createElement('div')
      const api = Sample.of(el, {
        theme: 'foo bar'
      })

      expect(api.getThemeClass()).toBe('pj-sample--foo pj-sample--bar')
    })
  })
})
