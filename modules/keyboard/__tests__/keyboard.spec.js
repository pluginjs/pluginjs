import keyboard from '../src'

describe('keyboard', () => {
  test('should have keyboard', () => {
    expect(keyboard).toBeObject()
  })

  test('can construc with element', () => {
    const element = document.createElement('div')
    const instance = keyboard(element)

    expect(instance.element).toEqual(element)
  })

  test('can construc without element', () => {
    const instance = keyboard()

    expect(instance.element).toEqual(window.document)
  })

  test('should have emitter', () => {
    const instance = keyboard()
    expect(instance.emitter).toBeObject()
  })

  let clavier

  beforeEach(() => {
    clavier = keyboard()
  })

  describe('initialize()', () => {
    test('should have status', () => {
      expect(clavier.status).toBeObject()
    })

    test('should have MODIFIERS event', () => {
      expect(clavier.emitter.hasListeners('16' + 'down')).toBeTrue()
      expect(clavier.emitter.hasListeners('16' + 'up')).toBeTrue()
      expect(clavier.emitter.hasListeners('17' + 'down')).toBeTrue()
      expect(clavier.emitter.hasListeners('17' + 'up')).toBeTrue()
      expect(clavier.emitter.hasListeners('18' + 'down')).toBeTrue()
      expect(clavier.emitter.hasListeners('18' + 'up')).toBeTrue()
      expect(clavier.emitter.hasListeners('91' + 'down')).toBeTrue()
      expect(clavier.emitter.hasListeners('91' + 'up')).toBeTrue()
    })
  })

  describe('on()', () => {
    test('should add down listener', () => {
      let result = 0
      const callback = () => {
        result = 1
      }
      clavier.on('down', 'a', callback)
      expect(clavier.emitter.hasListeners('65down')).toBeTrue()
      expect(clavier.emitter.getListeners('65down')).toHaveLength(1)
    })

    test('should add up listener', () => {
      let result = 0
      const callback = () => {
        result = 1
      }
      clavier.on('up', 'a', callback)
      expect(clavier.emitter.hasListeners('65up')).toBeTrue()
      expect(clavier.emitter.getListeners('65up')).toHaveLength(1)
    })
  })

  describe('off()', () => {
    test('should remove down listener', () => {
      let result = 0
      const callback = () => {
        result = 1
      }
      clavier.on('down', 'a', callback)
      expect(clavier.emitter.hasListeners('65down')).toBeTrue()
      clavier.off('down', 'a')
      expect(clavier.emitter.hasListeners('65down')).toBeFalse()
    })

    test('should remove up listener', () => {
      let result = 0
      const callback = () => {
        result = 1
      }
      clavier.on('up', 'a', callback)
      expect(clavier.emitter.hasListeners('65up')).toBeTrue()
      clavier.off('up', 'a')
      expect(clavier.emitter.hasListeners('65up')).toBeFalse()
    })
  })

  describe('down()', () => {
    test('should add down listener', () => {
      let result = 0
      const callback = () => {
        result = 1
      }
      clavier.down('a', callback)
      expect(clavier.emitter.hasListeners('65down')).toBeTrue()
      expect(clavier.emitter.getListeners('65down')).toHaveLength(1)
    })

    test('should remove down listener', () => {
      let result = 0
      const callback = () => {
        result = 1
      }
      clavier.down('a', callback)
      expect(clavier.emitter.hasListeners('65down')).toBeTrue()
      clavier.down('a')
      expect(clavier.emitter.hasListeners('65down')).toBeFalse()
    })
  })

  describe('up()', () => {
    test('should add up listener', () => {
      let result = 0
      const callback = () => {
        result = 1
      }
      clavier.up('a', callback)
      expect(clavier.emitter.hasListeners('65up')).toBeTrue()
      expect(clavier.emitter.getListeners('65up')).toHaveLength(1)
    })

    test('should remove up listener', () => {
      let result = 0
      const callback = () => {
        result = 1
      }
      clavier.up('a', callback)
      expect(clavier.emitter.hasListeners('65up')).toBeTrue()
      clavier.up('a')
      expect(clavier.emitter.hasListeners('65up')).toBeFalse()
    })
  })
})
