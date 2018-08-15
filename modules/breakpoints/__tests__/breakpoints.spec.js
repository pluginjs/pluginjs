import Breakpoints from '../src/main'
import defaults from '../src/defaults'
import Size from '../src/size'

describe('Breakpoints', () => {
  Breakpoints()

  describe('Breakpoints()', () => {
    it('should have Breakpoints', () => {
      expect(Breakpoints).toBeDefined()
    })
  })

  describe('Breakpoints.defaults', () => {
    it('should equal defaults', () => {
      expect(Breakpoints.defaults).toEqual(defaults)
    })
  })

  describe('Breakpoints.all()', () => {
    it('should return all names', () => {
      expect(Breakpoints.all()).toEqual(['xs', 'sm', 'md', 'lg'])
    })
  })

  describe('Breakpoints.get()', () => {
    it('should return an instance of Size', () => {
      const size = Breakpoints.get('sm')

      expect(size).toBeInstanceOf(Size)
      expect(size.name).toEqual('sm')
    })
  })

  describe('Breakpoints.set()', () => {
    it('should set correctly', () => {
      const name = 'sm'
      const min = 0
      const max = 1000
      const unit = 'px'

      Breakpoints.set(name, min, max, unit)

      const size = Breakpoints.get(name)

      expect(size.name).toEqual(name)
      expect(size.min).toEqual(min)
      expect(size.max).toEqual(max)
      expect(size.unit).toEqual(unit)
    })
  })

  it('should get param correctly', () => {
    const name = 'sm'
    const min = 0
    const max = 1000

    Breakpoints.set(name, min, max)

    expect(Breakpoints.getMin(name)).toEqual(min)
    expect(Breakpoints.getMax(name)).toEqual(max)
    expect(Breakpoints.getMedia(name)).toEqual('(max-width: 1000px)')
  })
})
