import Fullscreen from '../../src/main'

describe('Fullscreen', () => {
  it('should have Fullscreen', () => {
    expect(Fullscreen).to.be.an('function')
  })

  describe('constructor()', () => {
    it('should use documentElement when no args', () => {
      const fs = new Fullscreen()
      expect(fs.element).to.be.equal(document.documentElement)
    })

    it('should pass first arg as element', () => {
      const element = document.createElement('div')
      const fs = new Fullscreen(element)

      expect(fs.element).to.be.equal(element)
    })
  })

  describe('enabled()', () => {
    it('should return boolean', () => {
      expect(Fullscreen.enabled()).to.be.an('boolean')
    })
  })

  describe('isFullscreen()', () => {
    it('should return boolean', () => {
      expect(Fullscreen.isFullscreen()).to.be.an('boolean')
    })
  })
})
