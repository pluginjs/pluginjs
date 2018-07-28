import GlobalComponent from '../../src'
import Pj from '@pluginjs/factory'

describe('GlobalComponent', () => {
  describe('GlobalComponent()', () => {
    test('should have GlobalComponent', () => {
      expect(GlobalComponent).toBeFunction()
    })

    test('should construct correctly', () => {
      const instance = new GlobalComponent('plugin')

      expect(instance).not.toBeNil()
      expect(instance.plugin).toEqual('plugin')
    })
  })

  describe('destroy()', () => {
    test('should call destroy', () => {
      if (Pj.instances.plugin) {
        const instance = new GlobalComponent('plugin')
        instance.destroy()
        expect(Pj.instance[instance.plugin]).toHaveLength(0)
      }
    })
  })
})
