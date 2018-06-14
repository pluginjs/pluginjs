import Easing from '../src'

describe('Easing', () => {
  test('should have Easing.bezier', () => {
    expect(Easing).toBeObject()
  })

  describe('get()', () => {
    test('should return predefined easings', () => {
      const easing = Easing.get('linear')

      expect(easing).toBeFunction()
      expect(easing(0.5)).toEqual(0.5)
    })

    test('should return the css string with name', () => {
      const easing = Easing.get('easeIn')
      expect(easing.css()).toEqual('ease-in')
    })

    test('should return the css bezier string if name is not set', () => {
      const easing = Easing.get('easeInQuad')
      expect(easing.css()).toEqual('cubic-bezier(0.55, 0.085, 0.68, 0.53)')
    })
  })

  describe('register()', () => {
    test('should register easing', () => {
      let easing = Easing.get('custom')
      expect(easing).toBeNil()

      Easing.register('custom', 0, 0, 1, 1)
      easing = Easing.get('custom')
      expect(easing).toBeFunction()
    })

    test('should throw an Error', () => {
      expect(() => {
        Easing.register('custom', 0.5, 0.5, -5, 0.5)
      }).toThrow(Error)
    })
  })

  describe('bezier()', () => {
    /* Credit to http://github.com/gre/Easing.bezier-easing MIT */
    const identity = function(x) {
      return x
    }

    function assertClose(a, b, precision = 0.000001) {
      expect(Math.abs(a - b)).toBeLessThan(precision)
    }

    function makeAssertCloseWithPrecision(precision) {
      return function(a, b) {
        assertClose(a, b, precision)
      }
    }

    function allEquals(be1, be2, samples, assertion = assertClose) {
      for (let i = 0; i <= samples; ++i) {
        const x = i / samples

        assertion(be1(x), be2(x))
      }
    }

    function repeat(n) {
      return function(f) {
        for (let i = 0; i < n; ++i) {
          f(i)
        }
      }
    }

    test('should have bezier', () => {
      expect(Easing.bezier).toBeFunction()
    })

    test('should creates an function', () => {
      expect(Easing.bezier(0, 0, 1, 1)).toBeFunction()
    })

    test('should fail with wrong arguments', () => {
      expect(() => {
        Easing.bezier(0.5, 0.5, -5, 0.5)
      }).toThrow(Error)

      expect(() => {
        Easing.bezier(0.5, 0.5, 5, 0.5)
      }).toThrow(Error)

      expect(() => {
        Easing.bezier(-2, 0.5, 0.5, 0.5)
      }).toThrow(Error)

      expect(() => {
        Easing.bezier(2, 0.5, 0.5, 0.5)
      }).toThrow(Error)
    })

    describe('css()', () => {
      test('should return Easing.bezier css string', () => {
        const easing = Easing.bezier(0.39, 0.575, 0.565, 1)

        expect(easing.css()).toEqual('cubic-bezier(0.39, 0.575, 0.565, 1)')
      })

      test('should return linear if mX1 === mY1 && mX2 === mY2', () => {
        const easing = Easing.bezier(0.5, 0.5, 1, 1)

        expect(easing.css()).toEqual('linear')
      })
    })

    describe('linear curves', () => {
      test('should be linear', () => {
        allEquals(Easing.bezier(0, 0, 1, 1), Easing.bezier(1, 1, 0, 0), 100)
        allEquals(Easing.bezier(0, 0, 1, 1), identity, 100)
      })
    })

    describe('common properties', () => {
      test('should be the right value at extremes', () => {
        repeat(100)(() => {
          let a = Math.random(),
            b = 2 * Math.random() - 0.5,
            c = Math.random(),
            d = 2 * Math.random() - 0.5
          const easing = Easing.bezier(a, b, c, d)

          expect(easing(0)).toEqual(0)
          expect(easing(1)).toEqual(1)
        })
      })

      test('should approach the projected value of its x=y projected curve', () => {
        repeat(100)(() => {
          let a = Math.random(),
            b = Math.random(),
            c = Math.random(),
            d = Math.random()
          const easing = Easing.bezier(a, b, c, d)
          const projected = Easing.bezier(b, a, d, c)
          const composed = function(x) {
            return projected(easing(x))
          }
          allEquals(identity, composed, 100, makeAssertCloseWithPrecision(0.05))
        })
      })
    })

    describe('two same instances', () => {
      test('should be strictly equals', () => {
        repeat(100)(() => {
          let a = Math.random(),
            b = 2 * Math.random() - 0.5,
            c = Math.random(),
            d = 2 * Math.random() - 0.5
          allEquals(Easing.bezier(a, b, c, d), Easing.bezier(a, b, c, d), 100)
        })
      })
    })

    describe('symetric curves', () => {
      test('should have a central value y~=0.5 at x=0.5', () => {
        repeat(100)(() => {
          let a = Math.random(),
            b = 2 * Math.random() - 0.5,
            c = 1 - a,
            d = 1 - b
          const easing = Easing.bezier(a, b, c, d)
          assertClose(easing(0.5), 0.5)
        })
      })

      test('should be symetrical', () => {
        repeat(100)(() => {
          let a = Math.random(),
            b = 2 * Math.random() - 0.5,
            c = 1 - a,
            d = 1 - b
          const easing = Easing.bezier(a, b, c, d)
          const sym = function(x) {
            return 1 - easing(1 - x)
          }
          allEquals(easing, sym, 100)
        })
      })
    })
  })
})
