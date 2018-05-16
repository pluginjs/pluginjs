import $ from 'jquery'
import is from '../src'

/* Credit to http://is.js.org */
describe('is', () => {
  it('should have is', () => {
    expect(is).to.be.an('object')
  })

  describe('type checks', () => {
    describe('is.arguments', () => {
      it('should return true if passed parameter type is arguments', () => {
        const getArguments = function() {
          return arguments
        }
        const args = getArguments('test')
        expect(is.arguments(args)).to.be.true
      })

      it('should return false if passed parameter type is not arguments', () => {
        const notArgs = ['test']
        expect(is.arguments(notArgs)).to.be.false
      })
    })

    describe('is.array', () => {
      it('should return true if passed parameter type is array', () => {
        const array = ['test']
        expect(is.array(array)).to.be.true
      })

      it('should return false if passed parameter type is not array', () => {
        const notArray = 'test'
        expect(is.array(notArray)).to.be.false
      })
    })

    describe('is.boolean', () => {
      it('should return true if passed parameter type is boolean', () => {
        const bool = true
        expect(is.boolean(bool)).to.be.true
      })

      it('should return false if passed parameter type is not boolean', () => {
        const notBool = 'test'
        expect(is.boolean(notBool)).to.be.false
      })
    })

    describe('is.date', () => {
      it('should return true if passed parameter type is date', () => {
        const date = new Date()
        expect(is.date(date)).to.be.true
      })

      it('should return false if passed parameter type is not date', () => {
        const notDate = 'test'
        expect(is.date(notDate)).to.be.false
      })
    })

    describe('is.domNode', () => {
      it('should return true if passed parameter type is domNode', () => {
        const domNode = document.createElement('div')
        expect(is.domNode(domNode)).to.be.true
      })

      it('should return false if passed parameter type is not domNode', () => {
        const notDomNode = 'test'
        expect(is.domNode(notDomNode)).to.be.false
      })
    })

    describe('is.error', () => {
      it('should return true if passed parameter type is error', () => {
        const error = new Error()
        expect(is.error(error)).to.be.true
      })

      it('should return false if passed parameter type is not error', () => {
        const notError = 'test'
        expect(is.error(notError)).to.be.false
      })
    })

    describe('is.function', () => {
      it('should return true if passed parameter type is function', () => {
        expect(is.function(is.function)).to.be.true
      })

      it('should return false if passed parameter type is not function', () => {
        const notFunction = 'test'
        expect(is.function(notFunction)).to.be.false
      })
    })

    describe('is.nan', () => {
      it('should return true if passed parameter type is NaN', () => {
        expect(is.nan(NaN)).to.be.true
      })

      it('should return false if passed parameter type is not NaN', () => {
        const notNaN = 'test'
        expect(is.nan(notNaN)).to.be.false
      })
    })

    describe('is.null', () => {
      it('should return true if passed parameter type is null', () => {
        expect(is.null(null)).to.be.true
      })

      it('should return false if passed parameter type is not null', () => {
        const notNull = 'test'
        expect(is.null(notNull)).to.be.false
      })
    })

    describe('is.number', () => {
      it('should return true if passed parameter type is number', () => {
        expect(is.number(1)).to.be.true
      })

      it('should return false if passed parameter type is not number', () => {
        const notNumber = 'test'
        expect(is.number(notNumber)).to.be.false
      })

      it('should return false if passed parameter is NaN', () => {
        expect(is.number(NaN)).to.be.false
      })
    })

    describe('is.object', () => {
      it('should return true if passed parameter type is object', () => {
        expect(is.object({})).to.be.true
      })

      it('should return false if passed parameter type is not object', () => {
        const notObject = 'test'
        expect(is.object(notObject)).to.be.false
      })
    })

    describe('is.emptyObject', () => {
      it('should return true if passed parameter type is empty object', () => {
        expect(is.emptyObject({})).to.be.true
      })

      it('should return false if passed parameter type is not empty object', () => {
        const notObject = 'test'
        expect(is.emptyObject(notObject)).to.be.false
        expect(is.emptyObject({ hello: true })).to.be.false
      })
    })

    describe('is.json', () => {
      it('should return true if passed parameter type is a json object', () => {
        expect(is.json({})).to.be.true
      })

      it('should return false if passed parameter type is not a json object', () => {
        const notObject = 'test'
        expect(is.json(notObject)).to.be.false
      })
    })

    describe('is.regexp', () => {
      it('should return true if passed parameter type is regexp', () => {
        const regexp = new RegExp()
        expect(is.regexp(regexp)).to.be.true
      })

      it('should return false if passed parameter type is not regexp', () => {
        const notRegexp = 'test'
        expect(is.regexp(notRegexp)).to.be.false
      })
    })

    describe('is.char', () => {
      it('should return true if passed parameter type is char', () => {
        expect(is.char('t')).to.be.true
      })

      it('should return false if passed parameter type is not a char', () => {
        expect(is.char('test')).to.be.false
      })
    })

    describe('is.string', () => {
      it('should return true if passed parameter type is string', () => {
        expect(is.string('test')).to.be.true
      })

      it('should return false if passed parameter type is not string', () => {
        expect(is.string(1)).to.be.false
      })
    })

    describe('is.undefined', () => {
      it('should return true if passed parameter type is undefined', () => {
        expect(is.undefined(undefined)).to.be.true
      })

      it('should return false if passed parameter type is not undefined', () => {
        expect(is.undefined(null)).to.be.false
        expect(is.undefined('test')).to.be.false
      })
    })
  })

  describe('arithmetic checks', () => {
    describe('is.numeric', () => {
      it('should return true if passed parameter type is numeric', () => {
        expect(is.numeric('1')).to.be.true
        expect(is.numeric(1)).to.be.true
      })

      it('should return false if passed parameter type is not numeric', () => {
        const notNumber = 'test'
        expect(is.numeric(notNumber)).to.be.false
      })
    })

    describe('is.percentage', () => {
      it('should return true if given string is percentage', () => {
        expect(is.percentage('0%')).to.be.true
        expect(is.percentage('100%')).to.be.true
        expect(is.percentage('-100%')).to.be.true
      })
      it('should return false if given string is not percentage', () => {
        expect(is.percentage('0')).to.be.false
        expect(is.percentage('-100')).to.be.false
        expect(is.percentage('100')).to.be.false
        expect(is.percentage(0)).to.be.false
        expect(is.percentage(-100)).to.be.false
        expect(is.percentage(100)).to.be.false
      })
    })

    describe('is.positive', () => {
      it('should return true if given number is positive', () => {
        expect(is.positive(3)).to.be.true
      })
      it('should return false if given number is not positive', () => {
        expect(is.positive(-2)).to.be.false
      })
    })

    describe('is.negative', () => {
      it('should return true if given number is negative', () => {
        expect(is.negative(-3)).to.be.true
      })
      it('should return false if given number is not negative', () => {
        expect(is.negative(2)).to.be.false
      })
    })

    describe('is.decimal', () => {
      it('should return true if given number is decimal', () => {
        expect(is.decimal(4.2)).to.be.true
      })
      it('should return false if given number is not decimal', () => {
        expect(is.decimal(2)).to.be.false
      })
    })

    describe('is.integer', () => {
      it('should return true if given number is integer', () => {
        expect(is.integer(4)).to.be.true
      })
      it('should return false if given number is not integer', () => {
        expect(is.integer(2.2)).to.be.false
      })
    })

    describe('is.finite', () => {
      it('should return true if given number is finite', () => {
        expect(is.finite(4)).to.be.true
      })
      it('should return false if given number is not finite', () => {
        expect(is.finite(Infinity)).to.be.false
      })
    })

    describe('is.infinite', () => {
      it('should return true if given number is infinite', () => {
        expect(is.infinite(Infinity)).to.be.true
      })
      it('should return false if given number is not infinite', () => {
        expect(is.infinite(1)).to.be.false
        expect(is.infinite(NaN)).to.be.false
      })
    })
  })
})
