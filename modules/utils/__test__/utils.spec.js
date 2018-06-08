import $ from 'jquery'
import * as util from '../src'

describe('util', () => {
  it('should have util', () => {
    expect(util).to.be.an('object')
  })

  describe('arraysEqual()', () => {
    it('should return true when two arrays equals', () => {
      expect(util.arraysEqual([], [])).to.be.true
      expect(util.arraysEqual(['a'], ['a'])).to.be.true
      expect(util.arraysEqual(['a', 'b'], ['a', 'b'])).to.be.true
      expect(util.arraysEqual([1], [1])).to.be.true
      expect(util.arraysEqual([1, 2], [1, 2])).to.be.true
      expect(util.arraysEqual([1, 2, 3], [1, 2, 3])).to.be.true
    })

    it('should return false when two arrays not equals', () => {
      expect(util.arraysEqual([], ['a'])).to.be.false
      expect(util.arraysEqual(['a'], ['a', 'b'])).to.be.false
      expect(util.arraysEqual(['a', 'b'], ['a'])).to.be.false
      expect(util.arraysEqual([1], [1, 2])).to.be.false
      expect(util.arraysEqual([1, 2, 3], [1, 2])).to.be.false
      expect(util.arraysEqual([1, 3], [1, 2, 3])).to.be.false
    })
  })

  describe('arrayDiff()', () => {
    it('should return different of two arrays', () => {
      expect(util.arrayDiff([], [])).to.be.eql([])
      expect(util.arrayDiff(['a'], ['a'])).to.be.eql([])
      expect(util.arrayDiff(['a', 'b'], ['a'])).to.be.eql(['b'])
      expect(util.arrayDiff(['a', 'b'], ['b'])).to.be.eql(['a'])
      expect(util.arrayDiff(['a', 'b', 'c'], ['a', 'b'])).to.be.eql(['c'])
      expect(util.arrayDiff(['a', 'b', 'c', 'e'], ['b', 'c', 'd'])).to.be.eql([
        'a',
        'e'
      ])
      expect(util.arrayDiff([1], [1])).to.be.eql([])
      expect(util.arrayDiff([2, 3], [1, 2, 4])).to.be.eql([3])
    })
  })

  describe('arrayIntersect()', () => {
    it('should return intersect of two arrays', () => {
      expect(util.arrayIntersect([], [])).to.be.eql([])
      expect(util.arrayIntersect(['a'], ['a'])).to.be.eql(['a'])
      expect(util.arrayIntersect(['a', 'b'], ['a'])).to.be.eql(['a'])
      expect(util.arrayIntersect(['a', 'b'], ['b'])).to.be.eql(['b'])
      expect(util.arrayIntersect(['a', 'b', 'c'], ['a', 'b'])).to.be.eql([
        'a',
        'b'
      ])
      expect(util.arrayIntersect(['a', 'b', 'c'], ['b', 'c'])).to.be.eql([
        'b',
        'c'
      ])
      expect(util.arrayIntersect([1], [1])).to.be.eql([1])
      expect(util.arrayIntersect([2, 3], [1, 2, 4])).to.be.eql([2])
    })
  })

  describe('convertPercentageToFloat()', () => {
    it('should convert percentage to float', () => {
      expect(util.convertPercentageToFloat('0%')).to.be.equal(0)
      expect(util.convertPercentageToFloat('100%')).to.be.equal(1)
      expect(util.convertPercentageToFloat('50%')).to.be.equal(0.5)
      expect(util.convertPercentageToFloat('-50%')).to.be.equal(-0.5)
      expect(util.convertPercentageToFloat('5%')).to.be.equal(0.05)
      expect(util.convertPercentageToFloat('-5%')).to.be.equal(-0.05)
      expect(util.convertPercentageToFloat('200%')).to.be.equal(2)
      expect(util.convertPercentageToFloat('-200%')).to.be.equal(-2)
    })
  })

  describe('convertFloatToPercentage()', () => {
    it('should convert float to percentage', () => {
      expect(util.convertFloatToPercentage(0)).to.be.equal('0%')
      expect(util.convertFloatToPercentage(1)).to.be.equal('100%')
      expect(util.convertFloatToPercentage(0.5)).to.be.equal('50%')
      expect(util.convertFloatToPercentage(-0.5)).to.be.equal('0%')
      expect(util.convertFloatToPercentage(0.05)).to.be.equal('5%')
      expect(util.convertFloatToPercentage(-0.05)).to.be.equal('0%')
      expect(util.convertFloatToPercentage(2)).to.be.equal('100%')
      expect(util.convertFloatToPercentage(-2)).to.be.equal('0%')
    })
  })

  describe('convertMatrixToArray()', () => {
    it('should convert matrix to array', () => {
      expect(util.convertMatrixToArray('matrix(1, 0, 0, 1, 30, 30)')).to.be.eql(
        ['1', '0', '0', '1', '30', '30']
      )
      expect(util.convertMatrixToArray('matrix(0, 0, 0, 0, 0, 0)')).to.be.eql([
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
    it('should camelize the word', () => {
      expect(util.camelize('abc-edc')).to.be.equal('AbcEdc')
      expect(util.camelize('abc.edc')).to.be.equal('AbcEdc')
      expect(util.camelize('abc_edc')).to.be.equal('AbcEdc')
      expect(util.camelize('abc edc')).to.be.equal('AbcEdc')

      expect(util.camelize('abc-edc', false)).to.be.equal('abcEdc')
      expect(util.camelize('abc.edc', false)).to.be.equal('abcEdc')
      expect(util.camelize('abc_edc', false)).to.be.equal('abcEdc')
      expect(util.camelize('abc edc', false)).to.be.equal('abcEdc')
    })
  })

  describe('getValueByPath()', () => {
    it('should get value by path', () => {
      const obj = {
        a: { b: { c: { d: 'foo' } } },
        e: [{ f: 'g' }]
      }
      expect(util.getValueByPath(obj, 'a.b.c')).to.be.eql({ d: 'foo' })

      expect(util.getValueByPath(obj, 'a.b.c.d')).to.be.equal('foo')
      expect(util.getValueByPath(obj, 'e.0.f')).to.be.equal('g')

      expect(
        util.getValueByPath({ 'foo/bar.md': { b: 'c' } }, 'foo/bar\\.md')
      ).to.be.eql({ b: 'c' })
    })

    it('should return invalid args', () => {
      expect(util.getValueByPath(null)).to.be.equal(null)
      expect(util.getValueByPath('foo')).to.be.equal('foo')
      expect(util.getValueByPath(['a'])).to.be.eql(['a'])
    })

    it('should get a value', () => {
      expect(
        util.getValueByPath(
          {
            a: 'a',
            b: { c: 'd' }
          },
          'a'
        )
      ).to.be.equal('a')
      expect(
        util.getValueByPath(
          {
            a: 'a',
            b: { c: 'd' }
          },
          'b.c'
        )
      ).to.be.equal('d')
    })

    it('should get a property that has dots in the key', () => {
      expect(util.getValueByPath({ 'a.b': 'c' }, 'a.b')).to.be.equal('c')
    })

    it('should support using dot notation to get nested values', () => {
      const fixture = {
        a: { locals: { name: { first: 'Brian' } } },
        b: { locals: { name: { last: 'Woodward' } } },
        c: { locals: { paths: ['a.txt', 'b.js', 'c.hbs'] } }
      }
      expect(util.getValueByPath(fixture, 'a.locals.name')).to.be.eql({
        first: 'Brian'
      })
      expect(util.getValueByPath(fixture, 'b.locals.name')).to.be.eql({
        last: 'Woodward'
      })
      expect(util.getValueByPath(fixture, 'b.locals.name.last')).to.be.equal(
        'Woodward'
      )
      expect(util.getValueByPath(fixture, 'c.locals.paths.0')).to.be.equal(
        'a.txt'
      )
      expect(util.getValueByPath(fixture, 'c.locals.paths.1')).to.be.equal(
        'b.js'
      )
      expect(util.getValueByPath(fixture, 'c.locals.paths.2')).to.be.equal(
        'c.hbs'
      )
    })

    it('should get specified position from an array', () => {
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
      expect(util.getValueByPath(fixture, 'a.paths.0')).to.be.equal('a.txt')
      expect(util.getValueByPath(fixture, 'a.paths.1')).to.be.equal('a.js')
      expect(util.getValueByPath(fixture, 'a.paths.2')).to.be.equal('a.hbs')

      expect(util.getValueByPath(fixture, 'b.paths.0')).to.be.equal('b.txt')
      expect(util.getValueByPath(fixture, 'b.paths.1')).to.be.equal('b.js')
      expect(util.getValueByPath(fixture, 'b.paths.2')).to.be.equal('b.hbs')
      expect(util.getValueByPath(fixture, 'b.paths.3')).to.be.equal('b3.hbs')
    })

    it('should return `undefined` if the path is not found', () => {
      const fixture = {}
      expect(util.getValueByPath(fixture, 'a.locals.name')).to.be.equal(
        undefined
      )
      expect(util.getValueByPath(fixture, 'b.locals.name')).to.be.equal(
        undefined
      )
    })

    it('should get the specified property', () => {
      expect(
        util.getValueByPath(
          {
            a: 'aaa',
            b: 'b'
          },
          'a'
        )
      ).to.be.equal('aaa')
      expect(
        util.getValueByPath(
          {
            first: 'Jon',
            last: 'Schlinkert'
          },
          'first'
        )
      ).to.be.equal('Jon')
      expect(
        util.getValueByPath(
          {
            locals: { a: 'a' },
            options: { b: 'b' }
          },
          'locals'
        )
      ).to.be.eql({ a: 'a' })
    })

    it('should ignore dots in escaped keys', () => {
      expect(
        util.getValueByPath(
          {
            'a.b': 'a',
            b: { c: 'd' }
          },
          'a\\.b'
        )
      ).to.be.equal('a')
      expect(
        util.getValueByPath({ 'a.b': { b: { c: 'd' } } }, 'a\\.b.b.c')
      ).to.be.equal('d')
    })

    it('should get the value of a deeply nested property', () => {
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
      ).to.be.equal('i')
    })

    it('should return the entire object if no property is passed', () => {
      expect(
        util.getValueByPath({
          a: 'a',
          b: { c: 'd' }
        })
      ).to.be.eql({
        a: 'a',
        b: { c: 'd' }
      })
    })
  })

  describe('transition end support', () => {
    let instance
    let $element

    it('should works with transitionEnd', function(done) {
      this.timeout(1200)

      const element = document.createElement('div')

      $element = $(element)

      let called = false

      const callback = function() {
        called = true
      }

      $element.one(util.asTransitionEnd, callback).asTransitionEnd(1000)

      setTimeout(() => {
        expect(called).to.be.equal(true)

        done()
      }, 1100)
    })

    it('should works without transition event support', function(done) {
      this.timeout(1200)

      const element = document.createElement('div')
      const backup = $.event.special[util.asTransitionEnd]

      $element = $(element)

      let called = false

      const callback = function() {
        called = true
      }
      $element.one(util.asTransitionEnd, callback).asTransitionEnd(1000)

      setTimeout(() => {
        expect(called).to.be.equal(true)

        $.event.special[util.asTransitionEnd] = backup
        done()
      }, 1100)
    })
  })

  // describe('throttle and debounce', function() {
  //   this.retries(2);

  //   function test(method, duration, callback) {
  //     let timer = setInterval(method, 10);

  //     setTimeout(() => {
  //       clearInterval(timer);
  //       callback();
  //     }, duration);
  //   }

  //   describe('throttle()', () => {
  //     it('should call every delay', done => {
  //       let count = 0;
  //       const throttle = util.throttle(() => {
  //         count++;
  //       }, 100);

  //       expect(count).to.be.equal(0);

  //       test(throttle, 1.8 * 100, () => {
  //         expect(count).to.be.equal(2);
  //         setTimeout(() => {
  //           expect(count).to.be.equal(2);
  //           done();
  //         }, 100);
  //       });
  //     });

  //     it('should call every fps (1000/60) if no delay specified', done => {
  //       let count = 0;
  //       const throttle = util.throttle(() => {
  //         count++;
  //       });

  //       expect(count).to.be.equal(0);

  //       test(throttle, 1000, () => {
  //         let end = count;
  //         expect(count).to.be.within(50, 70);

  //         setTimeout(() => {
  //           expect(count).to.be.within(end, end + 1);
  //           done();
  //         }, 100);
  //       });
  //     });
  //   });

  //   describe('debounce()', () => {
  //     it('should work properly with specify delay', done => {
  //       let count = 0;
  //       const debounce = util.debounce(() => {
  //         count++;
  //       }, 100);

  //       expect(count).to.be.equal(0);

  //       test(debounce, 1.8 * 100, () => {
  //         expect(count).to.be.equal(0);

  //         setTimeout(() => {
  //           expect(count).to.be.equal(1);
  //           done();
  //         }, 1.5 * 100);
  //       });
  //     });

  //     it('should work with default delay', done => {
  //       let count = 0;
  //       const debounce = util.debounce(() => {
  //         count++;
  //       });

  //       expect(count).to.be.equal(0);

  //       test(debounce, 80, () => {
  //         expect(count).to.be.equal(0);

  //         setTimeout(() => {
  //           expect(count).to.be.equal(1);
  //           done();
  //         }, 1.5 * 100);
  //       });
  //     });
  //   });

  //   describe('arguments', () => {
  //     let count;
  //     let a;
  //     let b;

  //     function counter(x, y) {
  //       a = a+x;
  //       b = b+y;
  //       count++;
  //     }

  //     function test(method, duration, callback) {
  //       count = 0;
  //       a = 0;
  //       b = 0;

  //       let timer = setInterval(() => {
  //         var rand = Math.random();
  //         method(rand, rand*-1);
  //       }, 10);

  //       setTimeout(() => {
  //         clearInterval(timer);
  //         callback();
  //       }, duration);
  //     }

  //     describe('throttle()', () => {
  //       it('should handles arguments correctly with delay', done => {
  //         const throttle = util.throttle(counter, 100);

  //         test(throttle, 1.8 * 100, () => {
  //           expect(count).to.be.equal(2);
  //           expect(a+b).to.be.equal(0);
  //           done();
  //         });
  //       });

  //       it('should handles arguments correctly with requestAnimationFrame', done => {
  //         const throttle = util.throttle(counter);

  //         test(throttle, 1000, () => {
  //           let end = count;
  //           expect(count).to.be.within(50, 70);
  //           expect(a+b).to.be.equal(0);

  //           done();
  //         });
  //       });
  //     });

  //     describe('debounce()', () => {
  //       it('should handles arguments correctly', done => {
  //         const debounce = util.debounce(counter, 100);

  //         test(debounce,  80, () => {
  //           expect(count).to.be.equal(0);

  //           setTimeout(() => {
  //             expect(count).to.be.equal(1);
  //             done();
  //           }, 1.5 * 100);
  //         });
  //       });
  //     });
  //   });
  // });
})
