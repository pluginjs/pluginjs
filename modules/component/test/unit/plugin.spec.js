import $ from 'jquery'
import Plugin from '../../src'
import Pj from '@pluginjs/pluginjs'

describe('Plugin', () => {
  describe('Plugin()', () => {
    it('should have Plugin', () => {
      expect(Plugin).to.be.an('function')
    })

    it('should construct with element', () => {
      const element = document.createElement('div')
      const instance = new Plugin('plugin', element)

      expect(instance.element).to.be.equal(element)
      expect(instance.plugin).to.be.equal('plugin')
    })
  })

  describe('destroy()', () => {
    it('should call destroy', () => {
      const element = document.createElement('div')
      const instance = new Plugin('plugin', element)

      if (Pj.instances.plugin) {
        instance.destroy()
        expect($(element).data('plugin')).to.be.equal(null)
        expect(Pj.instance[instance.plugin].length).to.be.equal(0)
      }
    })
  })
})
