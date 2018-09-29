import match from '../src/main'

/* Credit to https://github.com/kentcdodds/match-sorter MIT */
describe('match()', () => {
  it('should returns an empty array with a string that is too long', () => {
    const result = match(['Chakotay', 'Charzard'], 'JonathanJonathan')

    expect(result).toEqual([])
  })

  it('should returns an empty array with a string that matches no items', () => {
    const result = match(['Chakotay', 'Charzard'], 'nomatch')

    expect(result).toEqual([])
  })

  it('should returns the items that match', () => {
    const result = match(['Chakotay', 'Brunt', 'Charzard'], 'Ch')

    expect(result).toEqual(['Chakotay', 'Charzard'])
  })

  it('should returns items that match in the best order', () => {
    const result = match(
      [
        'testhelloworld', // CONTAINS
        'ĥello', // IGNORE_DIACRITICS_EQUAL
        '[hello]', // IGNORE_PUNCTUATION_EQUAL
        ' hello ', // IGNORE_WHITESPACES_EQUAL
        'he llo', // NO_MATCH
        'Hello', // IGNORE_CASE_EQUAL
        'test hello world', // WORD_MATCH
        'test helloworld', // WORD_STARTS_WITH
        'hello world', // STARTS_WITH
        'hello' // STRICTEQUAL
      ],
      'hello',
      {
        sort: true
      }
    )

    expect(result).toEqual([
      'hello', // STRICTEQUAL
      'ĥello', // IGNORE_DIACRITICS_EQUAL
      '[hello]', // IGNORE_PUNCTUATION_EQUAL
      ' hello ', // IGNORE_WHITESPACES_EQUAL
      'Hello', // IGNORE_CASE_EQUAL
      'hello world', // STARTS_WITH
      'test hello world', // WORD_MATCH
      'test helloworld', // WORD_STARTS_WITH
      'testhelloworld' // CONTAINS
    ])
  })

  it('should returns items that matches without sort when sort option set to false', () => {
    const result = match(
      [
        'testhelloworld', // CONTAINS
        'ĥello', // IGNORE_DIACRITICS_EQUAL
        '[hello]', // IGNORE_PUNCTUATION_EQUAL
        ' hello ', // IGNORE_WHITESPACES_EQUAL
        'he llo', // NO_MATCH
        'Hello', // IGNORE_CASE_EQUAL
        'test hello world', // WORD_MATCH
        'test helloworld', // WORD_STARTS_WITH
        'hello world', // STARTS_WITH
        'hello' // STRICTEQUAL
      ],
      'hello',
      {
        sort: false
      }
    )

    expect(result).toEqual([
      'testhelloworld', // CONTAINS
      'ĥello', // IGNORE_DIACRITICS_EQUAL
      '[hello]', // IGNORE_PUNCTUATION_EQUAL
      ' hello ', // IGNORE_WHITESPACES_EQUAL
      'Hello', // IGNORE_CASE_EQUAL
      'test hello world', // WORD_MATCH
      'test helloworld', // WORD_STARTS_WITH
      'hello world', // STARTS_WITH
      'hello' // STRICTEQUAL
    ])
  })

  it('should sorts equally ranking items in the same order in which they appeared in the original array', () => {
    const result = match(['Foo1', 'Bar', 'Foo2'], 'foo')

    expect(result).toEqual(['Foo1', 'Foo2'])
  })

  it('should no match for single character inputs that are not equal', () => {
    const result = match(['abc'], 'd')

    expect(result).toEqual([])
  })

  it('should can handle objects when specifying a key', () => {
    const result = match(
      [{ name: 'baz' }, { name: 'bat' }, { name: 'foo' }],
      'ba',
      { keys: ['name'] }
    )

    expect(result).toEqual([{ name: 'baz' }, { name: 'bat' }])
  })

  it('should can handle multiple keys specified', () => {
    const result = match(
      [
        { name: 'baz', reverse: 'zab' },
        { name: 'bat', reverse: 'tab' },
        { name: 'foo', reverse: 'oof' },
        { name: 'bag', reverse: 'gab' }
      ],
      'ab',
      { keys: ['name', 'reverse'] }
    )

    expect(result).toEqual([
      { name: 'baz', reverse: 'zab' },
      { name: 'bat', reverse: 'tab' },
      { name: 'bag', reverse: 'gab' }
    ])
  })

  it('should with multiple keys specified, all other things being equal, it prioritizes first keys first over index', () => {
    const result = match(
      [
        { first: 'not', second: 'not', third: 'match' },
        { first: 'not', second: 'not', third: 'not', fourth: 'match' },
        { first: 'not', second: 'match' },
        { first: 'match', second: 'not' }
      ],
      'match',
      { keys: ['first', 'second', 'third', 'fourth'] }
    )

    expect(result).toEqual([
      { first: 'match', second: 'not' },
      { first: 'not', second: 'match' },
      { first: 'not', second: 'not', third: 'match' },
      { first: 'not', second: 'not', third: 'not', fourth: 'match' }
    ])
  })

  it('should can handle the number 0 as a property value', () => {
    const result = match(
      [
        { name: 'A', age: 0 },
        { name: 'B', age: 1 },
        { name: 'C', age: 2 },
        { name: 'D', age: 3 }
      ],
      '0',
      { keys: ['age'] }
    )

    expect(result).toEqual([{ name: 'A', age: 0 }])
  })

  it('should can handle objected with nested keys', () => {
    const result = match(
      [
        { name: { first: 'baz' } },
        { name: { first: 'bat' } },
        { name: { first: 'foo' } },
        { name: null },
        {},
        null
      ],
      'ba',
      { keys: ['name.first'] }
    )

    expect(result).toEqual([
      { name: { first: 'baz' } },
      { name: { first: 'bat' } }
    ])
  })

  it('should can handle property callback', () => {
    const result = match(
      [
        { name: { first: 'baz' } },
        { name: { first: 'bat' } },
        { name: { first: 'foo' } }
      ],
      'ba',
      { keys: [item => item.name.first] }
    )

    expect(result).toEqual([
      { name: { first: 'baz' } },
      { name: { first: 'bat' } }
    ])
  })

  it('should can handle keys that are an array of values', () => {
    const result = match(
      [
        { values: ['foo', 'bar'] },
        { values: ['foo', 'bar', 'qux'] },
        { values: ['foo', 'qux'] }
      ],
      'bar',
      { keys: ['values'] }
    )

    expect(result).toEqual([
      { values: ['foo', 'bar'] },
      { values: ['foo', 'bar', 'qux'] }
    ])
  })

  it('should when using arrays of values, when things are equal, the one with the higher index wins', () => {
    const result = match(
      [
        { values: ['foo', 'bar'] },
        { values: ['foo', 'bar', 'qux'] },
        { values: ['foo', 'qux'] }
      ],
      'qux',
      { keys: ['values'] }
    )

    expect(result).toEqual([
      { values: ['foo', 'qux'] },
      { values: ['foo', 'bar', 'qux'] }
    ])
  })
})
