import $ from 'jquery'
import GlobalComponent from '../../src'
import Pj from '@pluginjs/pluginjs'

describe('GlobalComponent', () => {
  describe('GlobalComponent()', () => {
    it('should have GlobalComponent', () => {
      expect(GlobalComponent).to.be.an('function')
    })

    it('should construct correctly', () => {
      const instance = new GlobalComponent('plugin')

      expect(instance).to.be.exist
      expect(instance.plugin).to.be.equal('plugin')
    })
  })

  describe('destroy()', () => {
    it('should call destroy', () => {
      if (Pj.instances.plugin) {
        const instance = new GlobalComponent('plugin')
        instance.destroy()
        expect(Pj.instance[instance.plugin].length).to.be.equal(0)
      }
    })
  })
})
