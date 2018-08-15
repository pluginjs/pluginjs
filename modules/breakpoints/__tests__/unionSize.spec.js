import UnionSize from '../src/unionSize'

describe('UnionSize', () => {
  const names = 'sm md'

  const size = new UnionSize(names)

  describe('new UnionSize()', () => {
    it('should exists', () => {
      expect(size).toBeDefined()
      expect(size.name).toEqual(names)
    })

    it('should initialized after constructor', () => {
      expect(size.callbacks).toBeDefined()
    })
  })
})
