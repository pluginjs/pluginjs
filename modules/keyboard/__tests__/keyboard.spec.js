import keyboard from '../src/main'

describe('keyboard', () => {
  test('should have keyboard', () => {
    expect(keyboard).toBeFunction()
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
      expect(clavier.emitter.hasListeners('16down')).toBeTrue()
      expect(clavier.emitter.hasListeners('16up')).toBeTrue()
      expect(clavier.emitter.hasListeners('17down')).toBeTrue()
      expect(clavier.emitter.hasListeners('17up')).toBeTrue()
      expect(clavier.emitter.hasListeners('18down')).toBeTrue()
      expect(clavier.emitter.hasListeners('18up')).toBeTrue()
      expect(clavier.emitter.hasListeners('91down')).toBeTrue()
      expect(clavier.emitter.hasListeners('91up')).toBeTrue()
    })
  })

  describe('on()', () => {
    test('should add down listener', () => {
      const callback = () => console.log('callback')
      clavier.on('down', 'a', callback)
      expect(clavier.emitter.hasListeners('65down')).toBeTrue()
      expect(clavier.emitter.getListeners('65down')).toHaveLength(1)
    })

    test('should add up listener', () => {
      const callback = () => console.log('callback')
      clavier.on('up', 'a', callback)
      expect(clavier.emitter.hasListeners('65up')).toBeTrue()
      expect(clavier.emitter.getListeners('65up')).toHaveLength(1)
    })
  })

  describe('off()', () => {
    test('should remove down listener', () => {
      const callback = () => console.log('callback')
      clavier.on('down', 'a', callback)
      expect(clavier.emitter.hasListeners('65down')).toBeTrue()
      clavier.off('down', 'a')
      expect(clavier.emitter.hasListeners('65down')).toBeFalse()
    })

    test('should remove up listener', () => {
      const callback = () => console.log('callback')
      clavier.on('up', 'a', callback)
      expect(clavier.emitter.hasListeners('65up')).toBeTrue()
      clavier.off('up', 'a')
      expect(clavier.emitter.hasListeners('65up')).toBeFalse()
    })
  })

  describe('down()', () => {
    test('should add down listener', () => {
      const callback = () => console.log('callback')
      clavier.down('a', callback)
      expect(clavier.emitter.hasListeners('65down')).toBeTrue()
      expect(clavier.emitter.getListeners('65down')).toHaveLength(1)
    })

    test('should remove down listener', () => {
      const callback = () => console.log('callback')
      clavier.down('a', callback)
      expect(clavier.emitter.hasListeners('65down')).toBeTrue()
      clavier.down('a')
      expect(clavier.emitter.hasListeners('65down')).toBeFalse()
    })
  })

  describe('up()', () => {
    test('should add up listener', () => {
      const callback = () => console.log('callback')
      clavier.up('a', callback)
      expect(clavier.emitter.hasListeners('65up')).toBeTrue()
      expect(clavier.emitter.getListeners('65up')).toHaveLength(1)
    })

    test('should remove up listener', () => {
      const callback = () => console.log('callback')
      clavier.up('a', callback)
      expect(clavier.emitter.hasListeners('65up')).toBeTrue()
      clavier.up('a')
      expect(clavier.emitter.hasListeners('65up')).toBeFalse()
    })
  })
})
