import is from '../src/main.js'

/* Credit to http://is.js.org */
describe('is', () => {
  test('should have is', () => {
    expect(is).toBeObject()
  })

  describe('type checks', () => {
    describe('is.arguments', () => {
      test('should return true if passed parameter type is arguments', () => {
        const getArguments = function() {
          return arguments
        }
        const args = getArguments('test')
        expect(is.arguments(args)).toBeTrue()
      })

      test('should return false if passed parameter type is not arguments', () => {
        const notArgs = ['test']
        expect(is.arguments(notArgs)).toBeFalse()
      })
    })

    describe('is.array', () => {
      test('should return true if passed parameter type is array', () => {
        const array = ['test']
        expect(is.array(array)).toBeTrue()
      })

      test('should return false if passed parameter type is not array', () => {
        const notArray = 'test'
        expect(is.array(notArray)).toBeFalse()
      })
    })

    describe('is.boolean', () => {
      test('should return true if passed parameter type is boolean', () => {
        const bool = true
        expect(is.boolean(bool)).toBeTrue()
      })

      test('should return false if passed parameter type is not boolean', () => {
        const notBool = 'test'
        expect(is.boolean(notBool)).toBeFalse()
      })
    })

    describe('is.date', () => {
      test('should return true if passed parameter type is date', () => {
        const date = new Date()
        expect(is.date(date)).toBeTrue()
      })

      test('should return false if passed parameter type is not date', () => {
        const notDate = 'test'
        expect(is.date(notDate)).toBeFalse()
      })
    })

    describe('is.domNode', () => {
      test('should return true if passed parameter type is domNode', () => {
        const domNode = document.createElement('div')
        expect(is.domNode(domNode)).toBeTrue()
      })

      test('should return false if passed parameter type is not domNode', () => {
        const notDomNode = 'test'
        expect(is.domNode(notDomNode)).toBeFalse()
      })
    })

    describe('is.error', () => {
      test('should return true if passed parameter type is error', () => {
        const error = new Error()
        expect(is.error(error)).toBeTrue()
      })

      test('should return false if passed parameter type is not error', () => {
        const notError = 'test'
        expect(is.error(notError)).toBeFalse()
      })
    })

    describe('is.function', () => {
      test('should return true if passed parameter type is function', () => {
        expect(is.function(is.function)).toBeTrue()
      })

      test('should return false if passed parameter type is not function', () => {
        const notFunction = 'test'
        expect(is.function(notFunction)).toBeFalse()
      })
    })

    describe('is.nan', () => {
      test('should return true if passed parameter type is NaN', () => {
        expect(is.nan(NaN)).toBeTrue()
      })

      test('should return false if passed parameter type is not NaN', () => {
        const notNaN = 'test'
        expect(is.nan(notNaN)).toBeFalse()
      })
    })

    describe('is.null', () => {
      test('should return true if passed parameter type is null', () => {
        expect(is.null(null)).toBeTrue()
      })

      test('should return false if passed parameter type is not null', () => {
        const notNull = 'test'
        expect(is.null(notNull)).toBeFalse()
      })
    })

    describe('is.number', () => {
      test('should return true if passed parameter type is number', () => {
        expect(is.number(1)).toBeTrue()
      })

      test('should return false if passed parameter type is not number', () => {
        const notNumber = 'test'
        expect(is.number(notNumber)).toBeFalse()
      })

      test('should return false if passed parameter is NaN', () => {
        expect(is.number(NaN)).toBeFalse()
      })
    })

    describe('is.object', () => {
      test('should return true if passed parameter type isObject', () => {
        expect(is.object({})).toBeTrue()
      })

      test('should return false if passed parameter type is not object', () => {
        const notObject = 'test'
        expect(is.object(notObject)).toBeFalse()
      })
    })

    describe('is.plainObject', () => {
      test('should return true if passed parameter type is plain object', () => {
        expect(is.plainObject({})).toBeTrue()
      })

      test('should return false if passed parameter type is not plain object', () => {
        expect(is.plainObject('test')).toBeFalse()

        expect(is.plainObject(['foo', 'bar'])).toBeFalse()

        expect(is.plainObject(() => {})).toBeFalse()
      })
    })

    describe('is.emptyObject', () => {
      test('should return true if passed parameter type is empty object', () => {
        expect(is.emptyObject({})).toBeTrue()
      })

      test('should return false if passed parameter type is not empty object', () => {
        const notObject = 'test'
        expect(is.emptyObject(notObject)).toBeFalse()
        expect(is.emptyObject({ hello: true })).toBeFalse()
      })
    })

    describe('is.json', () => {
      test('should return true if passed parameter type is a json object', () => {
        expect(is.json({})).toBeTrue()
      })

      test('should return false if passed parameter type is not a json object', () => {
        const notObject = 'test'
        expect(is.json(notObject)).toBeFalse()
      })
    })

    describe('is.regexp', () => {
      test('should return true if passed parameter type is regexp', () => {
        const regexp = new RegExp()
        expect(is.regexp(regexp)).toBeTrue()
      })

      test('should return false if passed parameter type is not regexp', () => {
        const notRegexp = 'test'
        expect(is.regexp(notRegexp)).toBeFalse()
      })
    })

    describe('is.char', () => {
      test('should return true if passed parameter type is char', () => {
        expect(is.char('t')).toBeTrue()
      })

      test('should return false if passed parameter type is not a char', () => {
        expect(is.char('test')).toBeFalse()
      })
    })

    describe('is.string', () => {
      test('should return true if passed parameter type is string', () => {
        expect(is.string('test')).toBeTrue()
      })

      test('should return false if passed parameter type is not string', () => {
        expect(is.string(1)).toBeFalse()
      })
    })

    describe('is.undefined', () => {
      test('should return true if passed parameter type is undefined', () => {
        expect(is.undefined(undefined)).toBeTrue()
      })

      test('should return false if passed parameter type is not undefined', () => {
        expect(is.undefined(null)).toBeFalse()
        expect(is.undefined('test')).toBeFalse()
      })
    })
  })

  describe('arithmetic checks', () => {
    describe('is.numeric', () => {
      test('should return true if passed parameter type is numeric', () => {
        expect(is.numeric('1')).toBeTrue()
        expect(is.numeric(1)).toBeTrue()
      })

      test('should return false if passed parameter type is not numeric', () => {
        const notNumber = 'test'
        expect(is.numeric(notNumber)).toBeFalse()
      })
    })

    describe('is.percentage', () => {
      test('should return true if given string is percentage', () => {
        expect(is.percentage('0%')).toBeTrue()
        expect(is.percentage('100%')).toBeTrue()
        expect(is.percentage('-100%')).toBeTrue()
      })
      test('should return false if given string is not percentage', () => {
        expect(is.percentage('0')).toBeFalse()
        expect(is.percentage('-100')).toBeFalse()
        expect(is.percentage('100')).toBeFalse()
        expect(is.percentage(0)).toBeFalse()
        expect(is.percentage(-100)).toBeFalse()
        expect(is.percentage(100)).toBeFalse()
      })
    })

    describe('is.positive', () => {
      test('should return true if given number is positive', () => {
        expect(is.positive(3)).toBeTrue()
      })
      test('should return false if given number is not positive', () => {
        expect(is.positive(-2)).toBeFalse()
      })
    })

    describe('is.negative', () => {
      test('should return true if given number is negative', () => {
        expect(is.negative(-3)).toBeTrue()
      })
      test('should return false if given number is not negative', () => {
        expect(is.negative(2)).toBeFalse()
      })
    })

    describe('is.decimal', () => {
      test('should return true if given number is decimal', () => {
        expect(is.decimal(4.2)).toBeTrue()
      })
      test('should return false if given number is not decimal', () => {
        expect(is.decimal(2)).toBeFalse()
      })
    })

    describe('is.integer', () => {
      test('should return true if given number is integer', () => {
        expect(is.integer(4)).toBeTrue()
      })
      test('should return false if given number is not integer', () => {
        expect(is.integer(2.2)).toBeFalse()
      })
    })

    describe('is.finite', () => {
      test('should return true if given number is finite', () => {
        expect(is.finite(4)).toBeTrue()
      })
      test('should return false if given number is not finite', () => {
        expect(is.finite(Infinity)).toBeFalse()
      })
    })

    describe('is.infinite', () => {
      test('should return true if given number is infinite', () => {
        expect(is.infinite(Infinity)).toBeTrue()
      })
      test('should return false if given number is not infinite', () => {
        expect(is.infinite(1)).toBeFalse()
        expect(is.infinite(NaN)).toBeFalse()
      })
    })
  })
})
