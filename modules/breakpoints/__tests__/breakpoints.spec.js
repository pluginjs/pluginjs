import Breakpoints from '../src/main'
import defaults from '../src/defaults'
import { Size, Viewport } from '../src/viewport'

describe('Breakpoints', () => {
  beforeEach(() => {
    Breakpoints()
  })

  describe('Breakpoints()', () => {
    test('should have Breakpoints', () => {
      expect(Breakpoints).toBeDefined()
    })
  })

  describe('Breakpoints.defaults', () => {
    test('should equal defaults', () => {
      expect(Breakpoints.defaults).toEqual(defaults)
    })
  })

  describe('Breakpoints.all()', () => {
    test('should return all names', () => {
      expect(Breakpoints.all()).toEqual(['xs', 'sm', 'md', 'lg', 'xl'])
    })
  })

  describe('Breakpoints.get()', () => {
    test('should return an instance of Size', () => {
      const size = Breakpoints.get('sm')

      expect(size).toBeInstanceOf(Size)
      expect(size.name).toEqual('sm')
    })

    test('should get base size', () => {
      const size = Breakpoints.get('sm')

      expect(size).toBeInstanceOf(Size)
      expect(size.name).toEqual('sm')
    })

    test('should get from viewport', () => {
      const size = Breakpoints.get('sm+')

      expect(size).toBeInstanceOf(Viewport)
      expect(size.name).toEqual('sm+')
    })
  })

  describe('Breakpoints.getMin()', () => {
    test('should get min of viewport', () => {
      expect(Breakpoints.getMin('sm')).toEqual(defaults.sm.min)
      expect(Breakpoints.getMin('sm+')).toEqual(defaults.sm.min)
      expect(Breakpoints.getMin('sm-')).toEqual(0)
      expect(Breakpoints.getMin('sm-md')).toEqual(defaults.sm.min)
    })
  })

  describe('Breakpoints.getMax()', () => {
    test('should get max of viewport', () => {
      expect(Breakpoints.getMax('sm')).toEqual(defaults.sm.max)
      expect(Breakpoints.getMax('sm+')).toEqual(Infinity)
      expect(Breakpoints.getMax('sm-')).toEqual(defaults.sm.max)
      expect(Breakpoints.getMax('sm-md')).toEqual(defaults.md.max)
    })
  })

  describe('Breakpoints.getMedia()', () => {
    test('should get media of viewport', () => {
      expect(Breakpoints.getMedia('xs')).toEqual('(max-width: 575px)')
    })
  })

  describe('Breakpoints.at()', () => {
    test('should attach event handler function for the screen at a specific size', () => {
      Breakpoints.at('md', 'enter', () => {
        return true
      })
      const viewport = Breakpoints.get('md')
      expect(viewport).toBeDefined()
      expect(viewport.callbacks.enter).toHaveLength(1)

      Breakpoints.at('md', 'leave', () => {
        return true
      })
      expect(viewport.callbacks.enter).toHaveLength(1)

      Breakpoints.at('md', {
        enter() {
          console.info(`enter ${this.name}`)
        },
        leave() {
          console.info(`leave ${this.name}`)
        }
      })
      expect(viewport.callbacks.enter).toHaveLength(2)
      expect(viewport.callbacks.enter).toHaveLength(2)

      Breakpoints.off('md')
      expect(viewport.callbacks.enter).toHaveLength(0)
      expect(viewport.callbacks.enter).toHaveLength(0)
    })
  })

  describe('Breakpoints.from()', () => {
    test('should attach event handler function for the screen width is inside a specific size or larger', () => {
      Breakpoints.from('md', 'enter', () => {
        return true
      })
      const viewport = Breakpoints.get('md+')
      expect(viewport).toBeDefined()
      expect(viewport.callbacks.enter).toHaveLength(1)

      Breakpoints.from('md', 'leave', () => {
        return true
      })
      expect(viewport.callbacks.enter).toHaveLength(1)

      Breakpoints.from('md', {
        enter() {
          console.info(`enter ${this.name}`)
        },
        leave() {
          console.info(`leave ${this.name}`)
        }
      })
      expect(viewport.callbacks.enter).toHaveLength(2)
      expect(viewport.callbacks.enter).toHaveLength(2)

      Breakpoints.off('md+')
      expect(viewport.callbacks.enter).toHaveLength(0)
      expect(viewport.callbacks.enter).toHaveLength(0)
    })
  })

  describe('Breakpoints.to()', () => {
    test('should attach event handler function for the screen width is inside a specific size or smaller', () => {
      Breakpoints.to('md', 'enter', () => {
        return true
      })
      const viewport = Breakpoints.get('md-')
      expect(viewport).toBeDefined()
      expect(viewport.callbacks.enter).toHaveLength(1)

      Breakpoints.to('md', 'leave', () => {
        return true
      })
      expect(viewport.callbacks.enter).toHaveLength(1)

      Breakpoints.to('md', {
        enter() {
          console.info(`enter ${this.name}`)
        },
        leave() {
          console.info(`leave ${this.name}`)
        }
      })
      expect(viewport.callbacks.enter).toHaveLength(2)
      expect(viewport.callbacks.enter).toHaveLength(2)

      Breakpoints.off('md-')
      expect(viewport.callbacks.enter).toHaveLength(0)
      expect(viewport.callbacks.enter).toHaveLength(0)
    })
  })

  describe('Breakpoints.between()', () => {
    test('should attach event handler function for the screen width is inside two specific size', () => {
      Breakpoints.between('md', 'lg', 'enter', () => {
        return true
      })
      const viewport = Breakpoints.get('md-lg')
      expect(viewport).toBeDefined()
      expect(viewport.callbacks.enter).toHaveLength(1)

      Breakpoints.between('md', 'lg', 'leave', () => {
        return true
      })
      expect(viewport.callbacks.enter).toHaveLength(1)

      Breakpoints.between('md', 'lg', {
        enter() {
          console.info(`enter ${this.name}`)
        },
        leave() {
          console.info(`leave ${this.name}`)
        }
      })
      expect(viewport.callbacks.enter).toHaveLength(2)
      expect(viewport.callbacks.enter).toHaveLength(2)

      Breakpoints.off('md-lg')
      expect(viewport.callbacks.enter).toHaveLength(0)
      expect(viewport.callbacks.enter).toHaveLength(0)
    })
  })
})
