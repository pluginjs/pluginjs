import register from '../src/register'
import Component from '@pluginjs/component'
import Pj from '@pluginjs/factory'
import { getData, parseHTML, queryAll } from '@pluginjs/dom'

const plugin = 'sample'
@register(plugin, {
  methods: ['get', 'set'],
  dependencies: []
})
class Sample extends Component {
  constructor(element) {
    super(element)
    this.value = null
  }

  get() {
    return this.value
  }

  private() {
    return 'it shouldnt access'
  }

  set(value) {
    this.value = value
  }
}

describe('register()', () => {
  it('should register to Pj', () => {
    expect(Pj.has(plugin)).toBeTrue()
  })

  test('instances', () => {
    expect(Sample.getInstances()).toHaveLength(0)

    const el = document.createElement('div')
    const api = Sample.of(el)

    expect(Sample.getInstances()).toHaveLength(1)

    expect(Sample.findInstanceByElement(el)).toBe(api)

    Sample.removeInstance(api)
    expect(Sample.getInstances()).toHaveLength(0)
  })

  test('Pj.plugin constructor', () => {
    const el = document.createElement('div')
    el.classList.add('sample')
    document.body.appendChild(el)

    const api = Pj.sample('.sample')

    expect(Sample.getInstances()).toHaveLength(1)
    expect(api.element).toBe(el)
  })

  describe('this.plugin', () => {
    it('should equal to the name when register', () => {
      const el = document.createElement('div')
      const api = Sample.of(el)

      expect(api.plugin).toBe(plugin)
    })

    it('should works with extends class', () => {
      @register('extended')
      class Extended extends Sample {}
      const el = document.createElement('div')
      const foo = Extended.of(el)

      expect(foo.plugin).toBe('extended')

      const sample = Sample.of(el)

      expect(sample.plugin).toBe(plugin)
    })
  })

  describe('instance', () => {
    it('should get instance from element', () => {
      const el = document.createElement('div')
      const instance = Sample.of(el)

      expect(getData(plugin, el)).toBe(instance)
    })

    it('should remove instance when destroy', () => {
      const el = document.createElement('div')
      const instance = Sample.of(el)
      instance.destroy()

      expect(getData(plugin, el)).toBeUndefined()
    })
  })

  describe('instance method', () => {
    it('should access instance method with factory', () => {
      const el = document.createElement('div')
      Sample.of(el)

      Pj.sample(el, 'set', 'hello world')
      expect(Pj.sample(el, 'get')).toBe('hello world')
    })

    it('should not access instance method with factory', () => {
      const el = document.createElement('div')
      Sample.of(el)

      function accessPrivate() {
        Pj.sample(el, 'private')
      }

      expect(accessPrivate).toThrowError(
        'Method "private" is not exists on "sample".'
      )
    })

    it('should return array when excute instance method on elements', () => {
      const $parent = parseHTML(
        '<div><div class="element"></div><div class="element"></div></div>'
      )

      const elements = queryAll('.element', $parent)
      Pj.sample(elements)

      expect(Pj.sample(elements, 'get')).toEqual([null, null])
      Pj.sample(elements, 'set', 'hello world')

      expect(Pj.sample(elements, 'get')).toEqual(['hello world', 'hello world'])
    })
  })
})
