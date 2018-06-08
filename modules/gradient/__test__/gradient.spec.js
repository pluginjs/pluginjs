import Gradient from '../../src/gradient'
import '@pluginjs/color'

describe('Gradient', () => {
  let gradient

  beforeEach(() => {
    gradient = new Gradient({
      forceStandard: true,
      angleUseKeyword: true,
      emptyString: '',
      cleanPosition: true,
      color: {
        // format: 'rgba',
        reduceAlpha: true,
        shortenHex: true,
        zeroAlphaAsTransparent: false,
        invalidValue: {
          r: 0,
          g: 0,
          b: 0,
          a: 1
        }
      }
    })
  })

  afterEach(() => {
    gradient.empty()
  })

  it('should init correctly', () => {
    expect(gradient.length).to.be.equal(0) // test length first

    gradient.append('#fff')
    expect(gradient.length).to.be.equal(1) // test length after append

    expect(gradient.get().color.toString()).to.be.equal('#fff') // get the first stop

    gradient.append('rgba(255, 255, 255, 0.7)')
    expect(gradient.length).to.be.equal(2) // test length after the second append

    expect(gradient.get(1).color.toString()).to.be.equal(
      'rgba(255, 255, 255, 0.7)'
    ) // get the second stop

    gradient.remove(1)
    expect(gradient.length).to.be.equal(1) // test length after remove
  })

  it('should work with non-position gradient string', () => {
    const gradient = new Gradient('linear-gradient(to bottom, yellow, blue)', {
      cleanPosition: false
    })
    expect(gradient.toString()).to.be.equal(
      'linear-gradient(to bottom, yellow 0%, blue 100%)'
    ) // test position

    gradient.fromString('linear-gradient(to bottom, yellow, red, blue)')
    expect(gradient.toString()).to.be.equal(
      'linear-gradient(to bottom, yellow 0%, red 50%, blue 100%)'
    ) // test three color position

    gradient.fromString('linear-gradient(to bottom, yellow, red, white, blue)')
    expect(gradient.toString()).to.be.equal(
      'linear-gradient(to bottom, yellow 0%, red 33%, white 66%, blue 100%)'
    ) // test four color position
  })

  describe('setPosition()', () => {
    it('should set position for color stop', () => {
      gradient.empty()
      gradient.append('#fff', 0)
      gradient.append('#333', '50%')
      gradient.append('#000', 1)

      expect(gradient.toString()).to.be.equal(
        'linear-gradient(to top, #fff, #333 50%, #000)'
      ) // insert 3 color stops

      gradient.get(2).setPosition(0.4)
      expect(gradient.toString()).to.be.equal(
        'linear-gradient(to top, #fff, #000 40%, #333 50%)'
      ) // insert 3 color stops
    })
  })

  describe('reorder()', () => {
    it('should reorder color stop', () => {
      gradient.empty()
      gradient.append('#fff', 0)
      gradient.append('#333', '50%')
      gradient.append('#000', 1)
      gradient.reorder()

      expect(gradient.toString()).to.be.equal(
        'linear-gradient(to top, #fff, #333 50%, #000)'
      ) // insert 3 color stops

      gradient.append('#ddd', 0.8)
      gradient.reorder()
      expect(gradient.toString()).to.be.equal(
        'linear-gradient(to top, #fff, #333 50%, #ddd 80%, #000)'
      ) // insert 4 color stops
      gradient.append('#aaa', 0.1)

      expect(gradient.toString()).to.be.equal(
        'linear-gradient(to top, #fff, #333 50%, #ddd 80%, #000 100%, #aaa 10%)'
      ) // insert 5 color stops
      gradient.reorder()
      expect(gradient.toString()).to.be.equal(
        'linear-gradient(to top, #fff, #aaa 10%, #333 50%, #ddd 80%, #000)'
      ) // insert 5 color stops
    })
  })

  describe('get()', () => {
    it('should get color stop by id correctly', () => {
      gradient.empty()
      gradient.append('#fff', 0)
      gradient.append('#333', '50%')
      gradient.append('#000', 1)

      expect(gradient.get(0).id).to.be.equal(1) // the first stop id is 1
      expect(gradient.get(1).id).to.be.equal(2) // the second stop id is 2
      expect(gradient.get(2).id).to.be.equal(3) // the third stop id is 3

      gradient.get(2).setPosition(0.4) // move the third to second
      expect(gradient.get(0).id).to.be.equal(1) // the first stop id is 1
      expect(gradient.get(1).id).to.be.equal(3) // the second stop id is 3
      expect(gradient.get(2).id).to.be.equal(2) // the third stop id is 2
    })
  })

  describe('removeById()', () => {
    it('should remove color stop by id', () => {
      gradient.fromString(
        '-webkit-linear-gradient(top, #123456, #ffffff, #654321)'
      )

      gradient.removeById(2)

      expect(gradient.toString()).to.be.equal(
        'linear-gradient(to bottom, #123456, #654321)'
      )
    })
  })

  it('should get current correctly', () => {
    gradient.empty()

    gradient.insert('#fff')
    expect(gradient.current).to.be.equal(0) // current should be set to 0 after first insert
    expect(gradient.get().color.toString()).to.be.equal('#fff') // get the first stop

    gradient.insert('#000', undefined, 1)
    expect(gradient.current).to.be.equal(1) // current should be set to 1 after second insert
    expect(gradient.get().color.toString()).to.be.equal('#000') // get the second stop

    gradient.remove()
    expect(gradient.current).to.be.equal(0) // current should be set to 0 after remove
    expect(gradient.get().color.toString()).to.be.equal('#fff') // get the first stop
  })

  describe('getCurrent()', () => {
    it('should get current color stop correctly', () => {
      const gradient = new Gradient()
      gradient.append('#fff', 0)
      gradient.append('#333', '50%')
      gradient.append('#000', 1)

      gradient.setCurrentById(2)
      const current = gradient.getCurrent()

      expect(current.id).to.be.equal(2)
    })
  })

  describe('toString()', () => {
    it('should to string with standare format', () => {
      gradient.fromString('-webkit-linear-gradient(top, #2F2727, #1a82f7)')
      expect(gradient.toString()).to.be.equal(
        'linear-gradient(to bottom, #2f2727, #1a82f7)'
      ) // test toString standare

      gradient.fromString(
        '-moz-linear-gradient(top, rgba(248,80,50,1) 0%, rgba(246,41,12,1) 51%, rgba(240,47,23,1) 71%, rgba(231,56,39,1) 100%)'
      )
      expect(gradient.toString()).to.be.equal(
        'linear-gradient(to bottom, rgb(248, 80, 50), rgb(246, 41, 12) 51%, rgb(240, 47, 23) 71%, rgb(231, 56, 39))'
      ) // test toString 2
    })

    it('should prefix the string', () => {
      gradient.fromString('-webkit-linear-gradient(top, #2F2727, #1a82f7)')
      expect(gradient.toString('-webkit-')).to.be.equal(
        '-webkit-linear-gradient(top, #2f2727, #1a82f7)'
      ) // test toString webkit
      expect(gradient.toString('-moz-')).to.be.equal(
        '-moz-linear-gradient(top, #2f2727, #1a82f7)'
      ) // test toString moz
      expect(gradient.toString('-o-')).to.be.equal(
        '-o-linear-gradient(top, #2f2727, #1a82f7)'
      ) // test toString o
      expect(gradient.toString('-ms-')).to.be.equal(
        '-ms-linear-gradient(top, #2f2727, #1a82f7)'
      ) // test toString ms
      expect(gradient.toString('-undefined-')).to.be.equal(
        'linear-gradient(to bottom, #2f2727, #1a82f7)'
      ) // test toString undefined prefix
    })

    it('should to string with angle', () => {
      gradient.fromString('-webkit-linear-gradient(top, #2F2727, #1a82f7)')
      expect(gradient.toStringWithAngle('to right', '-webkit-')).to.be.equal(
        '-webkit-linear-gradient(left, #2f2727, #1a82f7)'
      ) // test toStringWithAngle
      expect(gradient.toStringWithAngle('to right')).to.be.equal(
        'linear-gradient(to right, #2f2727, #1a82f7)'
      ) // test toStringWithAngle standare

      expect(gradient.toString()).to.be.equal(
        'linear-gradient(to bottom, #2f2727, #1a82f7)'
      ) // test toString standare
    })
  })

  describe('getPrefixedStrings()', () => {
    it('should get prefixed strings correctly', () => {
      const gradient = new Gradient(
        'linear-gradient(to right, #d4e4ef 0%, #86aecc 100%)',
        {
          prefixes: ['-moz-', '-webkit-', '-o-', '-ms-'],
          cleanPosition: false
        }
      )

      expect(gradient.getPrefixedStrings()).to.deep.equal([
        '-moz-linear-gradient(left, #d4e4ef 0%, #86aecc 100%)',
        '-webkit-linear-gradient(left, #d4e4ef 0%, #86aecc 100%)',
        '-o-linear-gradient(left, #d4e4ef 0%, #86aecc 100%)',
        '-ms-linear-gradient(left, #d4e4ef 0%, #86aecc 100%)'
      ])
    })
  })

  describe('empty()', () => {
    it('should empty color stops', () => {
      gradient.empty()
      expect(gradient.length).to.be.equal(0) // test gradient size after empty

      gradient.append('#fff')
      gradient.append('#ccc')

      expect(gradient.length).to.be.equal(2) // test gradient size after add
      gradient.empty()
      expect(gradient.length).to.be.equal(0) // test gradient size after empty
    })
  })

  describe('insert()', () => {
    it('should insert color stop', () => {
      gradient.empty()

      gradient.insert('#fff', undefined, 0)
      expect(gradient.length).to.be.equal(1) // gradient size should be 1 after insert
      expect(gradient.current).to.be.equal(0) // current should be set to 0 after first insert
      expect(gradient.value.stops.length).to.be.equal(1) // gradient stops size should be 1 after insert
      expect(gradient.get(0).color.toString()).to.be.equal('#fff') // first color should be the same with the insert

      gradient.insert('#aaa', undefined, 1)
      expect(gradient.length).to.be.equal(2) // gradient size should be 2 after second insert
      expect(gradient.current).to.be.equal(1) // current should be set to 1 after second insert
      expect(gradient.value.stops.length).to.be.equal(2) // gradient stops size should be 2 after  secondinsert
      expect(gradient.get(0).color.toString()).to.be.equal('#fff') // first color should be the same with the first insert
      expect(gradient.get(1).color.toString()).to.be.equal('#aaa') // second color should be the same with the second insert

      gradient.insert('#ccc', undefined, 2)
      expect(gradient.length).to.be.equal(3) // gradient size should be 3 after second insert
      expect(gradient.current).to.be.equal(2) // current should be set to 2 after second insert
      expect(gradient.value.stops.length).to.be.equal(3) // gradient stops size should be 3 after  secondinsert
      expect(gradient.get(0).color.toString()).to.be.equal('#fff') // first color should be the same with the first insert
      expect(gradient.get(1).color.toString()).to.be.equal('#aaa') // second color should be the same with the second insert
      expect(gradient.get(2).color.toString()).to.be.equal('#ccc') // third color should be the same with the third insert

      gradient.insert('#000', undefined, 2)
      expect(gradient.length).to.be.equal(4) // gradient size should be 4 after fouth insert
      expect(gradient.current).to.be.equal(2) // current should be set to 2 after fouth insert
      expect(gradient.value.stops.length).to.be.equal(4) // gradient stops size should be 4 after fouth insert
      expect(gradient.get(0).color.toString()).to.be.equal('#fff') // check the first color
      expect(gradient.get(1).color.toString()).to.be.equal('#aaa') // check the second color
      expect(gradient.get(2).color.toString()).to.be.equal('#000') // check the third color
      expect(gradient.get(3).color.toString()).to.be.equal('#ccc') // check the fourth color
    })
  })

  describe('angle()', () => {
    it('should work with number', () => {
      gradient.reset()

      expect(gradient.angle()).to.be.equal(0) // test angle after reset

      gradient.angle(360)
      expect(gradient.angle()).to.be.equal(360) // test angle after set 360

      gradient.angle(0)
      expect(gradient.angle()).to.be.equal(0) // test angle after set 0

      gradient.angle('25')
      expect(gradient.angle()).to.be.equal(25) // test angle after set "25"

      gradient.angle(361)
      expect(gradient.angle()).to.be.equal(1) // test angle after set "361"

      gradient.angle(-1)
      expect(gradient.angle()).to.be.equal(359) // test angle after set -1

      gradient.angle(-360)
      expect(gradient.angle()).to.be.equal(0) // test angle after set -360

      gradient.angle(-361)
      expect(gradient.angle()).to.be.equal(359) // test angle after set -361
    })

    it('should work with keyword', () => {
      gradient.reset()

      gradient.angle('to top')
      expect(gradient.angle()).to.be.equal(0) // test angle to top

      gradient.angle('to right')
      expect(gradient.angle()).to.be.equal(90) // test angle to right

      gradient.angle('to bottom')
      expect(gradient.angle()).to.be.equal(180) // test angle to bottom

      gradient.angle('to left')
      expect(gradient.angle()).to.be.equal(270) // test angle to left

      gradient.angle('to top right')
      expect(gradient.angle()).to.be.equal(45) // test angle to top right

      gradient.angle('to right top')
      expect(gradient.angle()).to.be.equal(45) // test angle to right top

      gradient.angle('to right bottom')
      expect(gradient.angle()).to.be.equal(135) // test angle to right bottom

      gradient.angle('to bottom right')
      expect(gradient.angle()).to.be.equal(135) // test angle to bottom right

      gradient.angle('to bottom left')
      expect(gradient.angle()).to.be.equal(225) // test angle to bottom left

      gradient.angle('to left bottom')
      expect(gradient.angle()).to.be.equal(225) // test angle to left bottom

      gradient.angle('to left top')
      expect(gradient.angle()).to.be.equal(315) // test angle to left top

      gradient.angle('to top left')
      expect(gradient.angle()).to.be.equal(315) // test angle to top left

      gradient.angle('top')
      expect(gradient.angle()).to.be.equal(180) // test angle top

      gradient.angle('right')
      expect(gradient.angle()).to.be.equal(270) // test angle right

      gradient.angle('bottom')
      expect(gradient.angle()).to.be.equal(0) // test angle bottom

      gradient.angle('left')
      expect(gradient.angle()).to.be.equal(90) // test angle left

      gradient.angle('top right')
      expect(gradient.angle()).to.be.equal(225) // test angle top right

      gradient.angle('right top')
      expect(gradient.angle()).to.be.equal(225) // test angle right top

      gradient.angle('right bottom')
      expect(gradient.angle()).to.be.equal(315) // test angle right bottom

      gradient.angle('bottom right')
      expect(gradient.angle()).to.be.equal(315) // test angle bottom right

      gradient.angle('bottom left')
      expect(gradient.angle()).to.be.equal(45) // test angle bottom left

      gradient.angle('left bottom')
      expect(gradient.angle()).to.be.equal(45) // test angle left bottom

      gradient.angle('left top')
      expect(gradient.angle()).to.be.equal(135) // test angle left top

      gradient.angle('top left')
      expect(gradient.angle()).to.be.equal(135) // test angle top left
    })
  })

  describe('fromString()', () => {
    it('should parse from string', () => {
      gradient = new Gradient({ forceStandard: false })
      gradient.fromString('-webkit-linear-gradient(50deg, #2F2727, #1a82f7)')
      expect(gradient.privatePrefix).to.be.equal('-webkit-') // test webkit prefix
      expect(gradient.privateType).to.be.equal('LINEAR') // test linear type
      expect(gradient.angle()).to.be.equal(40) // test angle
      expect(gradient.get(0).color.toString()).to.be.equal('#2f2727') // test first color stop
      expect(gradient.get(1).color.toString()).to.be.equal('#1a82f7') // test second color stop
      expect(gradient.get(0).position).to.be.equal(null) // test first color stop position
      expect(gradient.get(1).position).to.be.equal(null) // test second color stop position
      expect(gradient.length).to.be.equal(2) // test color stop count
      expect(gradient.toString()).to.be.equal(
        '-webkit-linear-gradient(50deg, #2f2727, #1a82f7)'
      ) // test toString()

      gradient.fromString(
        '-moz-linear-gradient(left, rgba(248,80,50,0.8) 1%, rgba(241,111,92,0.8) 50%, rgba(240,47,23,0.8) 71%, rgba(231,56,39,0.8) 99%)'
      )
      expect(gradient.privatePrefix).to.be.equal('-moz-') // test moz prefix
      expect(gradient.privateType).to.be.equal('LINEAR') // test linear type
      expect(gradient.angle()).to.be.equal(90) // test angle
      expect(gradient.get(0).color.toString()).to.be.equal(
        'rgba(248, 80, 50, 0.8)'
      ) // test first color stop
      expect(gradient.get(1).color.toString()).to.be.equal(
        'rgba(241, 111, 92, 0.8)'
      ) // test second color stop
      expect(gradient.get(2).color.toString()).to.be.equal(
        'rgba(240, 47, 23, 0.8)'
      ) // test third color stop
      expect(gradient.get(3).color.toString()).to.be.equal(
        'rgba(231, 56, 39, 0.8)'
      ) // test fourth color stop
      expect(gradient.get(0).position).to.be.equal(0.01) // test first color stop position
      expect(gradient.get(1).position).to.be.equal(0.5) // test second color stop position
      expect(gradient.get(2).position).to.be.equal(0.71) // test third color stop position
      expect(gradient.get(3).position).to.be.equal(0.99) // test fourth color stop position
      expect(gradient.length).to.be.equal(4) // test color stop count
      expect(gradient.toString()).to.be.equal(
        '-moz-linear-gradient(left, rgba(248, 80, 50, 0.8) 1%, rgba(241, 111, 92, 0.8) 50%, rgba(240, 47, 23, 0.8) 71%, rgba(231, 56, 39, 0.8) 99%)'
      ) // test toString()

      gradient.fromString(
        'linear-gradient(to bottom, hsla(0,0%, 100%,0.8), hsla( 0,0%,96%,0.8) 47%, hsla(0,0%,93%,0.8))'
      )
      expect(gradient.privatePrefix).to.be.equal(null) // test standare prefix
      expect(gradient.privateType).to.be.equal('LINEAR') // test linear type
      expect(gradient.angle()).to.be.equal(180) // test angle
      expect(gradient.get(0).color.toString()).to.be.equal(
        'hsla(0, 0%, 100%, 0.8)'
      ) // test first color stop
      expect(gradient.get(1).color.toString()).to.be.equal(
        'hsla(0, 0%, 96%, 0.8)'
      ) // test second color stop
      expect(gradient.get(2).color.toString()).to.be.equal(
        'hsla(0, 0%, 93%, 0.8)'
      ) // test third color stop
      expect(gradient.get(0).position).to.be.equal(null) // test first color stop position
      expect(gradient.get(1).position).to.be.equal(0.47) // test second color stop position
      expect(gradient.get(2).position).to.be.equal(null) // test third color stop position
      expect(gradient.length).to.be.equal(3) // test color stop count
      expect(gradient.toString()).to.be.equal(
        'linear-gradient(to bottom, hsla(0, 0%, 100%, 0.8), hsla(0, 0%, 96%, 0.8) 47%, hsla(0, 0%, 93%, 0.8))'
      ) // test toString()
    })

    it('should get angle correctly from gradient string', () => {
      gradient.fromString('-webkit-linear-gradient(top, #000000, #ffffff)')
      expect(gradient.angle()).to.be.equal(180) // test old top

      gradient.fromString('-webkit-linear-gradient(right, #000000, #ffffff)')
      expect(gradient.angle()).to.be.equal(270) // test old right

      gradient.fromString('-webkit-linear-gradient(bottom, #000000, #ffffff)')
      expect(gradient.angle()).to.be.equal(0) // test old bottom

      gradient.fromString('-webkit-linear-gradient(left, #000000, #ffffff)')
      expect(gradient.angle()).to.be.equal(90) // test old left

      gradient.fromString('linear-gradient(to top, #000000, #ffffff)')
      expect(gradient.angle()).to.be.equal(0) // test standare to top

      gradient.fromString('linear-gradient(to right, #000000, #ffffff)')
      expect(gradient.angle()).to.be.equal(90) // test standare to right

      gradient.fromString('linear-gradient(to bottom, #000000, #ffffff)')
      expect(gradient.angle()).to.be.equal(180) // test standare to bottom

      gradient.fromString('linear-gradient(to left, #000000, #ffffff)')
      expect(gradient.angle()).to.be.equal(270) // test standare to left

      // if not standare angle
      gradient.fromString('linear-gradient(top, #000000, #ffffff)')
      expect(gradient.angle()).to.be.equal(180) // test standare top

      gradient.fromString('linear-gradient(right, #000000, #ffffff)')
      expect(gradient.angle()).to.be.equal(270) // test standare right

      gradient.fromString('linear-gradient(bottom, #000000, #ffffff)')
      expect(gradient.angle()).to.be.equal(0) // test standare bottom

      gradient.fromString('linear-gradient(left, #000000, #ffffff)')
      expect(gradient.angle()).to.be.equal(90) // test standare left

      gradient.fromString('linear-gradient(to top right, #000000, #ffffff)')
      expect(gradient.angle()).to.be.equal(45) // test standare to top right

      gradient.fromString('linear-gradient(to right bottom, #000000, #ffffff)')
      expect(gradient.angle()).to.be.equal(135) // test standare to right bottom

      gradient.fromString('linear-gradient(to bottom left, #000000, #ffffff)')
      expect(gradient.angle()).to.be.equal(225) // test standare to bottom left

      gradient.fromString('linear-gradient(to left top, #000000, #ffffff)')
      expect(gradient.angle()).to.be.equal(315) // test standare to left top

      gradient.fromString(
        '-webkit-linear-gradient(top right, #000000, #ffffff)'
      )
      expect(gradient.angle()).to.be.equal(225) // test old top right

      gradient.fromString(
        '-webkit-linear-gradient(right bottom, #000000, #ffffff)'
      )
      expect(gradient.angle()).to.be.equal(315) // test old right bottom

      gradient.fromString(
        '-webkit-linear-gradient(bottom left, #000000, #ffffff)'
      )
      expect(gradient.angle()).to.be.equal(45) // test old bottom left

      gradient.fromString('-webkit-linear-gradient(left top, #000000, #ffffff)')
      expect(gradient.angle()).to.be.equal(135) // test old left top

      gradient.fromString('-webkit-linear-gradient(90deg, #000000, #ffffff)')
      expect(gradient.angle()).to.be.equal(0) // test old 90deg

      gradient.fromString('linear-gradient(90deg, #000000, #ffffff)')
      expect(gradient.angle()).to.be.equal(90) // test 90deg
    })
  })

  describe('option', () => {
    it('angleUseKeyword', () => {
      let gradient = new Gradient('linear-gradient(135deg, yellow, blue)', {
        angleUseKeyword: false,
        cleanPosition: true
      })
      expect(gradient.toString()).to.be.equal(
        'linear-gradient(135deg, yellow, blue)'
      ) // test angleUseKeyword false 135deg

      gradient = new Gradient('linear-gradient(0deg, yellow, blue)', {
        angleUseKeyword: false,
        cleanPosition: true
      })
      expect(gradient.toString()).to.be.equal(
        'linear-gradient(0deg, yellow, blue)'
      ) // test angleUseKeyword false 0deg

      gradient = new Gradient('linear-gradient(0deg, yellow, blue)', {
        angleUseKeyword: true,
        cleanPosition: true
      })
      expect(gradient.toString()).to.be.equal(
        'linear-gradient(to top, yellow, blue)'
      ) // test angleUseKeyword true 0deg

      gradient = new Gradient('linear-gradient(45deg, yellow, blue)', {
        angleUseKeyword: true,
        cleanPosition: true
      })
      expect(gradient.toString()).to.be.equal(
        'linear-gradient(to top right, yellow, blue)'
      ) // test angleUseKeyword true 45deg

      gradient = new Gradient('linear-gradient(90deg, yellow, blue)', {
        angleUseKeyword: true,
        cleanPosition: true
      })
      expect(gradient.toString()).to.be.equal(
        'linear-gradient(to right, yellow, blue)'
      ) // test angleUseKeyword true 90deg

      gradient = new Gradient('linear-gradient(135deg, yellow, blue)', {
        angleUseKeyword: true,
        cleanPosition: true
      })
      expect(gradient.toString()).to.be.equal(
        'linear-gradient(to right bottom, yellow, blue)'
      ) // test angleUseKeyword true 135deg

      gradient = new Gradient('linear-gradient(180deg, yellow, blue)', {
        angleUseKeyword: true,
        cleanPosition: true
      })
      expect(gradient.toString()).to.be.equal(
        'linear-gradient(to bottom, yellow, blue)'
      ) // test angleUseKeyword true 180deg

      gradient = new Gradient('linear-gradient(225deg, yellow, blue)', {
        angleUseKeyword: true,
        cleanPosition: true
      })
      expect(gradient.toString()).to.be.equal(
        'linear-gradient(to bottom left, yellow, blue)'
      ) // test angleUseKeyword true 225deg

      gradient = new Gradient('linear-gradient(270deg, yellow, blue)', {
        angleUseKeyword: true,
        cleanPosition: true
      })
      expect(gradient.toString()).to.be.equal(
        'linear-gradient(to left, yellow, blue)'
      ) // test angleUseKeyword true 270deg

      gradient = new Gradient('linear-gradient(315deg, yellow, blue)', {
        angleUseKeyword: true,
        cleanPosition: true
      })
      expect(gradient.toString()).to.be.equal(
        'linear-gradient(to left top, yellow, blue)'
      ) // test angleUseKeyword true 315deg
    })

    it('forceStandard', () => {
      let gradient = new Gradient(
        '-webkit-linear-gradient(left, #2F2727, #1a82f7)',
        { forceStandard: false }
      )
      expect(gradient.toString()).to.be.equal(
        '-webkit-linear-gradient(left, #2f2727, #1a82f7)'
      ) // test forceStandard false

      gradient = new Gradient(
        '-webkit-linear-gradient(right, #2F2727, #1a82f7)',
        { forceStandard: true }
      )
      expect(gradient.toString()).to.be.equal(
        'linear-gradient(to left, #2f2727, #1a82f7)'
      ) // test forceStandard true
    })

    it('cleanPosition', () => {
      let gradient = new Gradient(
        'linear-gradient(to bottom, yellow 0%, blue 100%)',
        { cleanPosition: false }
      )
      expect(gradient.toString()).to.be.equal(
        'linear-gradient(to bottom, yellow 0%, blue 100%)'
      ) // test cleanPosition false

      gradient = new Gradient(
        'linear-gradient(to bottom, yellow 0%, blue 100%)',
        { cleanPosition: true }
      )
      expect(gradient.toString()).to.be.equal(
        'linear-gradient(to bottom, yellow, blue)'
      ) // test cleanPosition true
    })

    it('forceColorFormat', () => {
      let gradient = new Gradient(
        'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 47%, rgba(237,237,237,1) 100%)',
        {
          color: { format: false },
          cleanPosition: false
        }
      )
      expect(gradient.toString()).to.be.equal(
        'linear-gradient(to right, rgb(255, 255, 255) 0%, rgb(246, 246, 246) 47%, rgb(237, 237, 237) 100%)'
      ) // test forceColorFormat false

      gradient = new Gradient(
        'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 47%, rgba(237,237,237,1) 100%)',
        {
          color: { format: 'hex' },
          cleanPosition: false
        }
      )
      expect(gradient.toString()).to.be.equal(
        'linear-gradient(to right, #fff 0%, #f6f6f6 47%, #ededed 100%)'
      ) // test forceColorFormat true
    })

    it('degradationFormat', () => {
      let gradient = new Gradient({ degradationFormat: 'rgb' })
      gradient.append('#fff')
      expect(gradient.toString()).to.be.equal('rgb(255, 255, 255)') // test degradationFormat rgb

      gradient = new Gradient({ degradationFormat: 'hex' })
      gradient.append('#fff')
      expect(gradient.toString()).to.be.equal('#fff') // test degradationFormat hex

      gradient = new Gradient({ degradationFormat: false })
      gradient.append('#aa2312')
      expect(gradient.toString()).to.be.equal('#aa2312') // test degradationFormat false
    })

    it('emptyString', () => {
      let gradient = new Gradient({ emptyString: '' })
      expect(gradient.toString()).to.be.equal('') // test emptyString

      gradient = new Gradient({ emptyString: 'There is no gradient' })
      expect(gradient.toString()).to.be.equal('There is no gradient') // test custom emptyString
    })
  })
})
