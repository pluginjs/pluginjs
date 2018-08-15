import Size from '../src/size'

describe('Size', () => {
  const name = 'sm'
  const min = 0
  const max = 767

  const size = new Size(name, min, max)

  describe('new Size()', () => {
    it('should exists', () => {
      expect(size).toBeDefined()
      expect(size.name).toEqual(name)
      expect(size.min).toEqual(min)
      expect(size.max).toEqual(max)
    })

    it('should initialized after constructor', () => {
      expect(size.callbacks).toBeDefined()
    })
  })
})
