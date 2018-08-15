import MediaBuilder from '../src/mediaBuilder'

describe('MediaBuilder', () => {
  it('should build the min media correctly', () => {
    expect(MediaBuilder.min(100)).toEqual('(min-width: 100px)')
    expect(MediaBuilder.min(100, 'px')).toEqual('(min-width: 100px)')
    expect(MediaBuilder.min(100, 'rem')).toEqual('(min-width: 100rem)')
  })
  it('should build the max media correctly', () => {
    expect(MediaBuilder.max(100)).toEqual('(max-width: 100px)')
    expect(MediaBuilder.max(100, 'px')).toEqual('(max-width: 100px)')
    expect(MediaBuilder.max(100, 'rem')).toEqual('(max-width: 100rem)')
  })
  it('should build the between media correctly', () => {
    expect(MediaBuilder.between(100, 200)).toEqual(
      '(min-width: 100px) and (max-width: 200px)'
    )
    expect(MediaBuilder.between(100, 200, 'px')).toEqual(
      '(min-width: 100px) and (max-width: 200px)'
    )
    expect(MediaBuilder.between(100, 200, 'rem')).toEqual(
      '(min-width: 100rem) and (max-width: 200rem)'
    )
  })
  it('should get the media correctly', () => {
    expect(MediaBuilder.get(0, 767, 'px')).toEqual('(max-width: 767px)')
    expect(MediaBuilder.get(768, 1199, 'px')).toEqual(
      '(min-width: 768px) and (max-width: 1199px)'
    )
    expect(MediaBuilder.get(1200, Infinity, 'px')).toEqual(
      '(min-width: 1200px)'
    )

    expect(MediaBuilder.get(0, 19, 'rem')).toEqual('(max-width: 19rem)')
    expect(MediaBuilder.get(20, 49, 'rem')).toEqual(
      '(min-width: 20rem) and (max-width: 49rem)'
    )
    expect(MediaBuilder.get(50, Infinity, 'rem')).toEqual('(min-width: 50rem)')
  })
  it('should use px as default unit', () => {
    expect(MediaBuilder.get(0, 767)).toEqual('(max-width: 767px)')
    expect(MediaBuilder.get(768, 1199)).toEqual(
      '(min-width: 768px) and (max-width: 1199px)'
    )
    expect(MediaBuilder.get(1200, Infinity)).toEqual('(min-width: 1200px)')
  })
})
