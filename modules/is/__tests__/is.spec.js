/* eslint-disable */
import * as is from '../src/main.js'

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
        expect(is.isArguments(args)).toBeTrue()
      })

      test('should return false if passed parameter type is not arguments', () => {
        const notArgs = ['test']
        expect(is.isArguments(notArgs)).toBeFalse()
      })
    })

    describe('is.array', () => {
      test('should return true if passed parameter type is array', () => {
        const array = ['test']
        expect(is.isArray(array)).toBeTrue()
      })

      test('should return false if passed parameter type is not array', () => {
        const notArray = 'test'
        expect(is.isArray(notArray)).toBeFalse()
      })
    })

    describe('is.boolean', () => {
      test('should return true if passed parameter type is boolean', () => {
        const bool = true
        expect(is.isBoolean(bool)).toBeTrue()
      })

      test('should return false if passed parameter type is not boolean', () => {
        const notBool = 'test'
        expect(is.isBoolean(notBool)).toBeFalse()
      })
    })

    describe('is.date', () => {
      test('should return true if passed parameter type is date', () => {
        const date = new Date()
        expect(is.isDate(date)).toBeTrue()
      })

      test('should return false if passed parameter type is not date', () => {
        const notDate = 'test'
        expect(is.isDate(notDate)).toBeFalse()
      })
    })

    describe('is.domNode', () => {
      test('should return true if passed parameter type is domNode', () => {
        const domNode = document.createElement('div')
        expect(is.isDomNode(domNode)).toBeTrue()
      })

      test('should return false if passed parameter type is not domNode', () => {
        const notDomNode = 'test'
        expect(is.isDomNode(notDomNode)).toBeFalse()
      })
    })

    describe('is.window', function() {
      test('should return true if given object is window object', function() {
        expect(is.isWindow(window)).toBe(!!window);
      })
      test('should return false if given object is not window object', function() {
        expect(is.isWindow({})).toBeFalse();
      })
    });

    describe('is.document', function() {
      test('should return true if given object is document object', function() {
        expect(is.isDocument(document)).toBe(!!document);
      })
      test('should return false if given object is not document object', function() {
        expect(is.isDocument({})).toBeFalse();
      })
    });

    describe('is.element', () => {
      test('should return true if passed parameter type is element', () => {
        const element = document.createElement('div')
        expect(is.isElement(element)).toBeTrue()
      })

      test('should return false if passed parameter type is not element', () => {
        const notElement = 'test'
        expect(is.isElement(notElement)).toBeFalse()
      })
    })

    describe('is.error', () => {
      test('should return true if passed parameter type is error', () => {
        const error = new Error()
        expect(is.isError(error)).toBeTrue()
      })

      test('should return false if passed parameter type is not error', () => {
        const notError = 'test'
        expect(is.isError(notError)).toBeFalse()
      })
    })

    describe('is.function', () => {
      test('should return true if passed parameter type is function', () => {
        expect(is.isFunction(is.isFunction)).toBeTrue()
      })

      test('should return false if passed parameter type is not function', () => {
        const notFunction = 'test'
        expect(is.isFunction(notFunction)).toBeFalse()
      })
    })

    describe('is.nan', () => {
      test('should return true if passed parameter type is NaN', () => {
        expect(is.isNan(NaN)).toBeTrue()
      })

      test('should return false if passed parameter type is not NaN', () => {
        const notNaN = 'test'
        expect(is.isNan(notNaN)).toBeFalse()
      })
    })

    describe('is.null', () => {
      test('should return true if passed parameter type is null', () => {
        expect(is.isNull(null)).toBeTrue()
      })

      test('should return false if passed parameter type is not null', () => {
        const notNull = 'test'
        expect(is.isNull(notNull)).toBeFalse()
      })
    })

    describe('is.number', () => {
      test('should return true if passed parameter type is number', () => {
        expect(is.isNumber(1)).toBeTrue()
      })

      test('should return false if passed parameter type is not number', () => {
        const notNumber = 'test'
        expect(is.isNumber(notNumber)).toBeFalse()
      })

      test('should return false if passed parameter is NaN', () => {
        expect(is.isNumber(NaN)).toBeFalse()
      })
    })

    describe('is.object', () => {
      test('should return true if passed parameter type isObject', () => {
        expect(is.isObject({})).toBeTrue()
      })

      test('should return false if passed parameter type is not object', () => {
        const notObject = 'test'
        expect(is.isObject(notObject)).toBeFalse()
      })
    })

    describe('is.plainObject', () => {
      test('should return true if passed parameter type is plain object', () => {
        expect(is.isPlainObject({})).toBeTrue()
      })

      test('should return false if passed parameter type is not plain object', () => {
        expect(is.isPlainObject('test')).toBeFalse()

        expect(is.isPlainObject(['foo', 'bar'])).toBeFalse()

        expect(is.isPlainObject(() => {})).toBeFalse()
      })
    })

    describe('is.emptyObject', () => {
      test('should return true if passed parameter type is empty object', () => {
        expect(is.isEmptyObject({})).toBeTrue()
      })

      test('should return false if passed parameter type is not empty object', () => {
        const notObject = 'test'
        expect(is.isEmptyObject(notObject)).toBeFalse()
        expect(is.isEmptyObject({ hello: true })).toBeFalse()
      })
    })

    describe('is.json', () => {
      test('should return true if passed parameter type is a json object', () => {
        expect(is.isJson({})).toBeTrue()
      })

      test('should return false if passed parameter type is not a json object', () => {
        const notObject = 'test'
        expect(is.isJson(notObject)).toBeFalse()
      })
    })

    describe('is.regexp', () => {
      test('should return true if passed parameter type is regexp', () => {
        const regexp = new RegExp()
        expect(is.isRegexp(regexp)).toBeTrue()
      })

      test('should return false if passed parameter type is not regexp', () => {
        const notRegexp = 'test'
        expect(is.isRegexp(notRegexp)).toBeFalse()
      })
    })

    describe('is.char', () => {
      test('should return true if passed parameter type is char', () => {
        expect(is.isChar('t')).toBeTrue()
      })

      test('should return false if passed parameter type is not a char', () => {
        expect(is.isChar('test')).toBeFalse()
      })
    })

    describe('is.string', () => {
      test('should return true if passed parameter type is string', () => {
        expect(is.isString('test')).toBeTrue()
      })

      test('should return false if passed parameter type is not string', () => {
        expect(is.isString(1)).toBeFalse()
      })
    })

    describe('is.undefined', () => {
      test('should return true if passed parameter type is undefined', () => {
        expect(is.isUndefined(undefined)).toBeTrue()
      })

      test('should return false if passed parameter type is not undefined', () => {
        expect(is.isUndefined(null)).toBeFalse()
        expect(is.isUndefined('test')).toBeFalse()
      })
    })
  })

  describe('arithmetic checks', () => {
    describe('is.numeric', () => {
      test('should return true if passed parameter type is numeric', () => {
        expect(is.isNumeric('1')).toBeTrue()
        expect(is.isNumeric(1)).toBeTrue()
      })

      test('should return false if passed parameter type is not numeric', () => {
        const notNumber = 'test'
        expect(is.isNumeric(notNumber)).toBeFalse()
      })
    })

    describe('is.percentage', () => {
      test('should return true if given string is percentage', () => {
        expect(is.isPercentage('0%')).toBeTrue()
        expect(is.isPercentage('100%')).toBeTrue()
        expect(is.isPercentage('-100%')).toBeTrue()
      })
      test('should return false if given string is not percentage', () => {
        expect(is.isPercentage('0')).toBeFalse()
        expect(is.isPercentage('-100')).toBeFalse()
        expect(is.isPercentage('100')).toBeFalse()
        expect(is.isPercentage(0)).toBeFalse()
        expect(is.isPercentage(-100)).toBeFalse()
        expect(is.isPercentage(100)).toBeFalse()
      })
    })

    describe('is.positive', () => {
      test('should return true if given number is positive', () => {
        expect(is.isPositive(3)).toBeTrue()
      })
      test('should return false if given number is not positive', () => {
        expect(is.isPositive(-2)).toBeFalse()
      })
    })

    describe('is.negative', () => {
      test('should return true if given number is negative', () => {
        expect(is.isNegative(-3)).toBeTrue()
      })
      test('should return false if given number is not negative', () => {
        expect(is.isNegative(2)).toBeFalse()
      })
    })

    describe('is.decimal', () => {
      test('should return true if given number is decimal', () => {
        expect(is.isDecimal(4.2)).toBeTrue()
      })
      test('should return false if given number is not decimal', () => {
        expect(is.isDecimal(2)).toBeFalse()
      })
    })

    describe('is.integer', () => {
      test('should return true if given number is integer', () => {
        expect(is.isInteger(4)).toBeTrue()
      })
      test('should return false if given number is not integer', () => {
        expect(is.isInteger(2.2)).toBeFalse()
      })
    })

    describe('is.finite', () => {
      test('should return true if given number is finite', () => {
        expect(is.isFinite(4)).toBeTrue()
      })
      test('should return false if given number is not finite', () => {
        expect(is.isFinite(Infinity)).toBeFalse()
      })
    })

    describe('is.infinite', () => {
      test('should return true if given number is infinite', () => {
        expect(is.isInfinite(Infinity)).toBeTrue()
      })
      test('should return false if given number is not infinite', () => {
        expect(is.isInfinite(1)).toBeFalse()
        expect(is.isInfinite(NaN)).toBeFalse()
      })
    })
  })
})
