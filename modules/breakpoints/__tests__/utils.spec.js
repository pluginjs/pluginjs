import { resolveName, getName } from '../src/utils'

describe('resolveName', () => {
  test('should resolve name at', () => {
    expect(resolveName('sm')).toEqual({
      at: 'sm'
    })
  })

  test('should resolve name from', () => {
    expect(resolveName('sm+')).toEqual({
      from: 'sm'
    })
  })

  test('should resolve name to', () => {
    expect(resolveName('sm-')).toEqual({
      to: 'sm'
    })
  })

  test('should resolve name between', () => {
    expect(resolveName('sm-md')).toEqual({
      from: 'sm',
      to: 'md'
    })
  })
})

describe('getName', () => {
  test('should get name at', () => {
    expect(
      getName({
        at: 'sm'
      })
    ).toEqual('sm')
  })

  test('should get name from', () => {
    expect(
      getName({
        from: 'sm'
      })
    ).toEqual('sm+')
  })

  test('should get name to', () => {
    expect(
      getName({
        to: 'sm'
      })
    ).toEqual('sm-')
  })

  test('should get name between', () => {
    expect(
      getName({
        from: 'sm',
        to: 'md'
      })
    ).toEqual('sm-md')
  })
})
