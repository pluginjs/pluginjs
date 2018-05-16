import $ from 'jquery'
import keyboard from '../src'

describe('keyboard', () => {
  it('should have keyboard', () => {
    expect(keyboard).to.be.an('object')
  })

  it('can construc with element', () => {
    const element = document.createElement('div')
    const instance = keyboard.init(element)

    expect(instance.element).to.be.equal(element)
  })

  it('can construc without element', () => {
    const instance = keyboard.init()

    expect(instance.element).to.be.equal(window.document)
  })

  it('should have emitter', () => {
    const instance = keyboard.init()
    expect(instance.emitter).to.be.an('object')
  })

  let clavier

  beforeEach(() => {
    clavier = keyboard.init()
  })

  describe('initialize()', () => {
    it('should have status', () => {
      expect(clavier.status).to.be.an('object')
    })

    it('should have MODIFIERS event', () => {
      expect(clavier.emitter.hasListeners('16' + 'down')).to.be.true
      expect(clavier.emitter.hasListeners('16' + 'up')).to.be.true
      expect(clavier.emitter.hasListeners('17' + 'down')).to.be.true
      expect(clavier.emitter.hasListeners('17' + 'up')).to.be.true
      expect(clavier.emitter.hasListeners('18' + 'down')).to.be.true
      expect(clavier.emitter.hasListeners('18' + 'up')).to.be.true
      expect(clavier.emitter.hasListeners('91' + 'down')).to.be.true
      expect(clavier.emitter.hasListeners('91' + 'up')).to.be.true
    })
  })

  describe('on()', () => {
    it('should add down listener', () => {
      let result = 0
      const callback = () => {
        result = 1
      }
      clavier.on('down', 'a', callback)
      expect(clavier.emitter.hasListeners('65down')).to.be.true
      expect(clavier.emitter.getListeners('65down').length).to.be.equal(1)
    })

    it('should add up listener', () => {
      let result = 0
      const callback = () => {
        result = 1
      }
      clavier.on('up', 'a', callback)
      expect(clavier.emitter.hasListeners('65up')).to.be.true
      expect(clavier.emitter.getListeners('65up').length).to.be.equal(1)
    })
  })

  describe('off()', () => {
    it('should remove down listener', () => {
      let result = 0
      const callback = () => {
        result = 1
      }
      clavier.on('down', 'a', callback)
      expect(clavier.emitter.hasListeners('65down')).to.be.true
      clavier.off('down', 'a')
      expect(clavier.emitter.hasListeners('65down')).to.be.false
    })

    it('should remove up listener', () => {
      let result = 0
      const callback = () => {
        result = 1
      }
      clavier.on('up', 'a', callback)
      expect(clavier.emitter.hasListeners('65up')).to.be.true
      clavier.off('up', 'a')
      expect(clavier.emitter.hasListeners('65up')).to.be.false
    })
  })

  describe('down()', () => {
    it('should add down listener', () => {
      let result = 0
      const callback = () => {
        result = 1
      }
      clavier.down('a', callback)
      expect(clavier.emitter.hasListeners('65down')).to.be.true
      expect(clavier.emitter.getListeners('65down').length).to.be.equal(1)
    })

    it('should remove down listener', () => {
      let result = 0
      const callback = () => {
        result = 1
      }
      clavier.down('a', callback)
      expect(clavier.emitter.hasListeners('65down')).to.be.true
      clavier.down('a')
      expect(clavier.emitter.hasListeners('65down')).to.be.false
    })
  })

  describe('up()', () => {
    it('should add up listener', () => {
      let result = 0
      const callback = () => {
        result = 1
      }
      clavier.up('a', callback)
      expect(clavier.emitter.hasListeners('65up')).to.be.true
      expect(clavier.emitter.getListeners('65up').length).to.be.equal(1)
    })

    it('should remove up listener', () => {
      let result = 0
      const callback = () => {
        result = 1
      }
      clavier.up('a', callback)
      expect(clavier.emitter.hasListeners('65up')).to.be.true
      clavier.up('a')
      expect(clavier.emitter.hasListeners('65up')).to.be.false
    })
  })
})
