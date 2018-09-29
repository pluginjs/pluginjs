import punctuationize from '../src/punctuationize'

describe('punctuationize()', () => {
  it('should remove punctuation', () => {
    expect(punctuationize('hello, world')).toBe('hello world')
    expect(punctuationize('hello-world')).toBe('helloworld')
    expect(punctuationize('hello.world')).toBe('helloworld')
    expect(punctuationize('ĥello.world')).toBe('ĥelloworld')
  })
})
