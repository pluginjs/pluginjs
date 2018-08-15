import Component from '../src/main'
import { register } from '@pluginjs/decorator'

describe('Component', () => {
  describe('Component()', () => {
    test('should have Component', () => {
      expect(Component).toBeFunction()
    })

    test('should construct with element', () => {
      const element = document.createElement('div')
      const registerComponent = register('plugin')(Component)
      const instance = registerComponent.of('plugin', element)

      expect(instance.element).toEqual(element)
      expect(instance.plugin).toEqual('plugin')
    })
  })

  describe('destroy()', () => {
    test('should call destroy', () => {
      const element = document.createElement('div')
      const registerComponent = register('plugin')(Component)
      const instance = registerComponent.of('plugin', element)

      instance.destroy()
      expect(instance.element).toBeNull()
      expect(instance.plugin).toBeNull()
    })
  })
})
