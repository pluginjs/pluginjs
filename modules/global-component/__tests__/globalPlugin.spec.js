import GlobalComponent from '../src/main'
import { register } from '@pluginjs/decorator'

describe('GlobalComponent', () => {
  describe('GlobalComponent()', () => {
    test('should have GlobalComponent', () => {
      expect(GlobalComponent).toBeFunction()
    })

    test('should construct correctly', () => {
      const registerComponent = register('plugin')(GlobalComponent)
      const instance = registerComponent.of('plugin')

      expect(instance).not.toBeNil()
      expect(instance.plugin).toEqual('plugin')
    })
  })
})
