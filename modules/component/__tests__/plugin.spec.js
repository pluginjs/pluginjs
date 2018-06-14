import $ from 'jquery'
import Plugin from '../../src'
import Pj from '@pluginjs/pluginjs'

describe('Plugin', () => {
  describe('Plugin()', () => {
    test('should have Plugin', () => {
      expect(Plugin).toBeFunction()
    })

    test('should construct with element', () => {
      const element = document.createElement('div')
      const instance = new Plugin('plugin', element)

      expect(instance.element).toEqual(element)
      expect(instance.plugin).toEqual('plugin')
    })
  })

  describe('destroy()', () => {
    test('should call destroy', () => {
      const element = document.createElement('div')
      const instance = new Plugin('plugin', element)

      if (Pj.instances.plugin) {
        instance.destroy()
        expect($(element).data('plugin')).toEqual(null)
        expect(Pj.instance[instance.plugin]).toHaveLength(0)
      }
    })
  })
})
