import * as util from '../src/main'

describe('util', () => {
  test('should have util', () => {
    expect(util).toBeObject()
  })

  describe('arraysEqual()', () => {
    test('should return true when two arrays equals', () => {
      expect(util.arraysEqual([], [])).toBeTrue()
      expect(util.arraysEqual(['a'], ['a'])).toBeTrue()
      expect(util.arraysEqual(['a', 'b'], ['a', 'b'])).toBeTrue()
      expect(util.arraysEqual([1], [1])).toBeTrue()
      expect(util.arraysEqual([1, 2], [1, 2])).toBeTrue()
      expect(util.arraysEqual([1, 2, 3], [1, 2, 3])).toBeTrue()
    })

    test('should return false when two arrays not equals', () => {
      expect(util.arraysEqual([], ['a'])).toBeFalse()
      expect(util.arraysEqual(['a'], ['a', 'b'])).toBeFalse()
      expect(util.arraysEqual(['a', 'b'], ['a'])).toBeFalse()
      expect(util.arraysEqual([1], [1, 2])).toBeFalse()
      expect(util.arraysEqual([1, 2, 3], [1, 2])).toBeFalse()
      expect(util.arraysEqual([1, 3], [1, 2, 3])).toBeFalse()
    })
  })

  describe('arrayDiff()', () => {
    test('should return different of two arrays', () => {
      expect(util.arrayDiff([], [])).toEqual([])
      expect(util.arrayDiff(['a'], ['a'])).toEqual([])
      expect(util.arrayDiff(['a', 'b'], ['a'])).toEqual(['b'])
      expect(util.arrayDiff(['a', 'b'], ['b'])).toEqual(['a'])
      expect(util.arrayDiff(['a', 'b', 'c'], ['a', 'b'])).toEqual(['c'])
      expect(util.arrayDiff(['a', 'b', 'c', 'e'], ['b', 'c', 'd'])).toEqual([
        'a',
        'e'
      ])
      expect(util.arrayDiff([1], [1])).toEqual([])
      expect(util.arrayDiff([2, 3], [1, 2, 4])).toEqual([3])
    })
  })

  describe('arrayIntersect()', () => {
    test('should return intersect of two arrays', () => {
      expect(util.arrayIntersect([], [])).toEqual([])
      expect(util.arrayIntersect(['a'], ['a'])).toEqual(['a'])
      expect(util.arrayIntersect(['a', 'b'], ['a'])).toEqual(['a'])
      expect(util.arrayIntersect(['a', 'b'], ['b'])).toEqual(['b'])
      expect(util.arrayIntersect(['a', 'b', 'c'], ['a', 'b'])).toEqual([
        'a',
        'b'
      ])
      expect(util.arrayIntersect(['a', 'b', 'c'], ['b', 'c'])).toEqual([
        'b',
        'c'
      ])
      expect(util.arrayIntersect([1], [1])).toEqual([1])
      expect(util.arrayIntersect([2, 3], [1, 2, 4])).toEqual([2])
    })
  })

  describe('convertPercentageToFloat()', () => {
    test('should convert percentage to float', () => {
      expect(util.convertPercentageToFloat('0%')).toEqual(0)
      expect(util.convertPercentageToFloat('100%')).toEqual(1)
      expect(util.convertPercentageToFloat('50%')).toEqual(0.5)
      expect(util.convertPercentageToFloat('-50%')).toEqual(-0.5)
      expect(util.convertPercentageToFloat('5%')).toEqual(0.05)
      expect(util.convertPercentageToFloat('-5%')).toEqual(-0.05)
      expect(util.convertPercentageToFloat('200%')).toEqual(2)
      expect(util.convertPercentageToFloat('-200%')).toEqual(-2)
    })
  })

  describe('convertFloatToPercentage()', () => {
    test('should convert float to percentage', () => {
      expect(util.convertFloatToPercentage(0)).toEqual('0%')
      expect(util.convertFloatToPercentage(1)).toEqual('100%')
      expect(util.convertFloatToPercentage(0.5)).toEqual('50%')
      expect(util.convertFloatToPercentage(-0.5)).toEqual('0%')
      expect(util.convertFloatToPercentage(0.05)).toEqual('5%')
      expect(util.convertFloatToPercentage(-0.05)).toEqual('0%')
      expect(util.convertFloatToPercentage(2)).toEqual('100%')
      expect(util.convertFloatToPercentage(-2)).toEqual('0%')
    })
  })

  describe('convertMatrixToArray()', () => {
    test('should convert matrix to array', () => {
      expect(util.convertMatrixToArray('matrix(1, 0, 0, 1, 30, 30)')).toEqual([
        '1',
        '0',
        '0',
        '1',
        '30',
        '30'
      ])
      expect(util.convertMatrixToArray('matrix(0, 0, 0, 0, 0, 0)')).toEqual([
        '0',
        '0',
        '0',
        '0',
        '0',
        '0'
      ])
    })
  })

  describe('camelize()', () => {
    test('should camelize the word', () => {
      expect(util.camelize('abc-edc')).toEqual('AbcEdc')
      expect(util.camelize('abc.edc')).toEqual('AbcEdc')
      expect(util.camelize('abc_edc')).toEqual('AbcEdc')
      expect(util.camelize('abc edc')).toEqual('AbcEdc')

      expect(util.camelize('abc-edc', false)).toEqual('abcEdc')
      expect(util.camelize('abc.edc', false)).toEqual('abcEdc')
      expect(util.camelize('abc_edc', false)).toEqual('abcEdc')
      expect(util.camelize('abc edc', false)).toEqual('abcEdc')
    })
  })

  describe('getValueByPath()', () => {
    test('should get value by path', () => {
      const obj = {
        a: { b: { c: { d: 'foo' } } },
        e: [{ f: 'g' }]
      }
      expect(util.getValueByPath(obj, 'a.b.c')).toEqual({ d: 'foo' })

      expect(util.getValueByPath(obj, 'a.b.c.d')).toEqual('foo')
      expect(util.getValueByPath(obj, 'e.0.f')).toEqual('g')

      expect(
        util.getValueByPath({ 'foo/bar.md': { b: 'c' } }, 'foo/bar\\.md')
      ).toEqual({ b: 'c' })
    })

    test('should return invalid args', () => {
      expect(util.getValueByPath(null)).toEqual(null)
      expect(util.getValueByPath('foo')).toEqual('foo')
      expect(util.getValueByPath(['a'])).toEqual(['a'])
    })

    test('should get a value', () => {
      expect(
        util.getValueByPath(
          {
            a: 'a',
            b: { c: 'd' }
          },
          'a'
        )
      ).toEqual('a')
      expect(
        util.getValueByPath(
          {
            a: 'a',
            b: { c: 'd' }
          },
          'b.c'
        )
      ).toEqual('d')
    })

    test('should get a property that has dots in the key', () => {
      expect(util.getValueByPath({ 'a.b': 'c' }, 'a.b')).toEqual('c')
    })

    test('should support using dot notation to get nested values', () => {
      const fixture = {
        a: { locals: { name: { first: 'Brian' } } },
        b: { locals: { name: { last: 'Woodward' } } },
        c: { locals: { paths: ['a.txt', 'b.js', 'c.hbs'] } }
      }
      expect(util.getValueByPath(fixture, 'a.locals.name')).toEqual({
        first: 'Brian'
      })
      expect(util.getValueByPath(fixture, 'b.locals.name')).toEqual({
        last: 'Woodward'
      })
      expect(util.getValueByPath(fixture, 'b.locals.name.last')).toEqual(
        'Woodward'
      )
      expect(util.getValueByPath(fixture, 'c.locals.paths.0')).toEqual('a.txt')
      expect(util.getValueByPath(fixture, 'c.locals.paths.1')).toEqual('b.js')
      expect(util.getValueByPath(fixture, 'c.locals.paths.2')).toEqual('c.hbs')
    })

    test('should get specified position from an array', () => {
      const fixture = {
        a: { paths: ['a.txt', 'a.js', 'a.hbs'] },
        b: {
          paths: {
            0: 'b.txt',
            1: 'b.js',
            2: 'b.hbs',
            3: 'b3.hbs'
          }
        }
      }
      expect(util.getValueByPath(fixture, 'a.paths.0')).toEqual('a.txt')
      expect(util.getValueByPath(fixture, 'a.paths.1')).toEqual('a.js')
      expect(util.getValueByPath(fixture, 'a.paths.2')).toEqual('a.hbs')

      expect(util.getValueByPath(fixture, 'b.paths.0')).toEqual('b.txt')
      expect(util.getValueByPath(fixture, 'b.paths.1')).toEqual('b.js')
      expect(util.getValueByPath(fixture, 'b.paths.2')).toEqual('b.hbs')
      expect(util.getValueByPath(fixture, 'b.paths.3')).toEqual('b3.hbs')
    })

    test('should return `undefined` if the path is not found', () => {
      const fixture = {}
      expect(util.getValueByPath(fixture, 'a.locals.name')).toEqual(undefined)
      expect(util.getValueByPath(fixture, 'b.locals.name')).toEqual(undefined)
    })

    test('should get the specified property', () => {
      expect(
        util.getValueByPath(
          {
            a: 'aaa',
            b: 'b'
          },
          'a'
        )
      ).toEqual('aaa')
      expect(
        util.getValueByPath(
          {
            first: 'Jon',
            last: 'Schlinkert'
          },
          'first'
        )
      ).toEqual('Jon')
      expect(
        util.getValueByPath(
          {
            locals: { a: 'a' },
            options: { b: 'b' }
          },
          'locals'
        )
      ).toEqual({ a: 'a' })
    })

    test('should ignore dots in escaped keys', () => {
      expect(
        util.getValueByPath(
          {
            'a.b': 'a',
            b: { c: 'd' }
          },
          'a\\.b'
        )
      ).toEqual('a')
      expect(
        util.getValueByPath({ 'a.b': { b: { c: 'd' } } }, 'a\\.b.b.c')
      ).toEqual('d')
    })

    test('should get the value of a deeply nested property', () => {
      expect(
        util.getValueByPath(
          {
            a: {
              b: 'c',
              c: {
                d: 'e',
                e: 'f',
                g: { h: 'i' }
              }
            }
          },
          'a.c.g.h'
        )
      ).toEqual('i')
    })

    test('should return the entire object if no property is passed', () => {
      expect(
        util.getValueByPath({
          a: 'a',
          b: { c: 'd' }
        })
      ).toEqual({
        a: 'a',
        b: { c: 'd' }
      })
    })
  })

  describe('throttle and debounce', () => {
    // this.retries(2)

    function test(method, duration, callback) {
      const timer = setInterval(method, 10)

      setTimeout(() => {
        clearInterval(timer)
        callback()
      }, duration)
    }

    describe('throttle()', () => {
      test('should call every delay', done => {
        let count = 0
        const throttle = util.throttle(() => {
          count++
        }, 100)

        expect(count).toEqual(0)

        test(throttle, 1.8 * 100, () => {
          expect(count).toEqual(2)
          setTimeout(() => {
            expect(count).toEqual(2)
            done()
          }, 100)
        })
      })

      test('should call every fps (1000/60) if no delay specified', done => {
        let count = 0
        const throttle = util.throttle(() => {
          count++
        })

        expect(count).toEqual(0)

        test(throttle, 1000, () => {
          const end = count
          expect(count).toBeWithin(50, 70)

          setTimeout(() => {
            expect(count).toBeWithin(end, end + 1)
            done()
          }, 100)
        })
      })
    })

    describe('debounce()', () => {
      test('should work properly with specify delay', done => {
        let count = 0
        const debounce = util.debounce(() => {
          count++
        }, 100)

        expect(count).toEqual(0)

        test(debounce, 1.8 * 100, () => {
          expect(count).toEqual(0)

          setTimeout(() => {
            expect(count).toEqual(1)
            done()
          }, 1.5 * 100)
        })
      })

      test('should work with default delay', done => {
        let count = 0
        const debounce = util.debounce(() => {
          count++
        })

        expect(count).toEqual(0)

        test(debounce, 80, () => {
          expect(count).toEqual(0)

          setTimeout(() => {
            expect(count).toEqual(1)
            done()
          }, 1.5 * 100)
        })
      })
    })

    describe('arguments', () => {
      let count
      let a
      let b

      function counter(x, y) {
        a += x
        b += y
        count++
      }

      function test(method, duration, callback) {
        count = 0
        a = 0
        b = 0

        const timer = setInterval(() => {
          const rand = Math.random()
          method(rand, rand * -1)
        }, 10)

        setTimeout(() => {
          clearInterval(timer)
          callback()
        }, duration)
      }

      describe('throttle()', () => {
        test('should handles arguments correctly with delay', done => {
          const throttle = util.throttle(counter, 100)

          test(throttle, 1.8 * 100, () => {
            expect(count).toEqual(2)
            expect(a + b).toEqual(0)
            done()
          })
        })

        test('should handles arguments correctly with requestAnimationFrame', done => {
          const throttle = util.throttle(counter)

          test(throttle, 1000, () => {
            expect(count).toBeWithin(50, 70)
            expect(a + b).toEqual(0)

            done()
          })
        })
      })

      describe('debounce()', () => {
        test('should handles arguments correctly', done => {
          const debounce = util.debounce(counter, 100)

          test(debounce, 80, () => {
            expect(count).toEqual(0)

            setTimeout(() => {
              expect(count).toEqual(1)
              done()
            }, 1.5 * 100)
          })
        })
      })
    })
  })
})
