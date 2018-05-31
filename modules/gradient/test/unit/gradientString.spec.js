import GradientString from '../../src/gradientString'

describe('GradientString', () => {
  describe('matchString()', () => {
    it('should match gradient string', () => {
      expect(
        GradientString.matchString(
          '-webkit-linear-gradient(50deg, #2F2727, #1a82f7)'
        )
      ).to.be.equal(true)
      expect(
        GradientString.matchString(
          '-moz-linear-gradient(left, rgba(248,80,50,0.8) 1%, rgba(241,111,92,0.8) 50%, rgba(240,47,23,0.8) 71%, rgba(231,56,39,0.8) 99%)'
        )
      ).to.be.equal(true)
      expect(GradientString.matchString('yellow')).to.be.equal(false)
      expect(GradientString.matchString('#2F2727')).to.be.equal(false)
      expect(GradientString.matchString('rgba(248,80,50,0.8)')).to.be.equal(
        false
      )
      expect(GradientString.matchString('linear-gradient(50deg)')).to.be.equal(
        false
      )
      expect(GradientString.matchString('linear-gradient(to top)')).to.be.equal(
        false
      )
      expect(
        GradientString.matchString('linear-gradient(50deg, #2F2727)')
      ).to.be.equal(false)
    })
  })

  describe('parseString()', () => {
    it('should parse gradient string', () => {
      expect(
        GradientString.parseString(
          '-webkit-linear-gradient(left, #d4e4ef 0%, #86aecc 100%)'
        )
      ).to.be.eql({
        prefix: '-webkit-',
        type: 'linear',
        value: {
          angle: 'left',
          stops: [
            {
              color: '#d4e4ef',
              position: 0
            },
            {
              color: '#86aecc',
              position: 1
            }
          ]
        }
      })

      expect(
        GradientString.parseString(
          '-moz-linear-gradient(left, #d4e4ef, #86aecc)'
        )
      ).to.be.eql({
        prefix: '-moz-',
        type: 'linear',
        value: {
          angle: 'left',
          stops: [
            {
              color: '#d4e4ef',
              position: null
            },
            {
              color: '#86aecc',
              position: null
            }
          ]
        }
      })

      expect(
        GradientString.parseString(
          'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 47%, rgba(237,237,237,1) 100%)'
        )
      ).to.be.eql({
        prefix: null,
        type: 'linear',
        value: {
          angle: 'to right',
          stops: [
            {
              color: 'rgba(255,255,255,1)',
              position: 0
            },
            {
              color: 'rgba(246,246,246,1)',
              position: 0.47
            },
            {
              color: 'rgba(237,237,237,1)',
              position: 1
            }
          ]
        }
      })
    })
  })

  describe('parseParameters()', () => {
    it('should parse parameters', () => {
      expect(
        GradientString.parseParameters('left, #d4e4ef 0%, #86aecc 100%')
      ).to.be.eql({
        angle: 'left',
        stops: [
          {
            color: '#d4e4ef',
            position: 0
          },
          {
            color: '#86aecc',
            position: 1
          }
        ]
      })
    })
  })

  describe('parseStops()', () => {
    it('should parse stops', () => {
      expect(
        GradientString.parseStops('#d4e4ef 0%, rgb(255, 90, 0) 10%')
      ).to.deep.equal([
        {
          color: '#d4e4ef',
          position: 0
        },
        {
          color: 'rgb(255, 90, 0)',
          position: 0.1
        }
      ])

      expect(
        GradientString.parseStops('#d4e4ef, rgb(255, 90, 0)')
      ).to.deep.equal([
        {
          color: '#d4e4ef',
          position: null
        },
        {
          color: 'rgb(255, 90, 0)',
          position: null
        }
      ])

      expect(GradientString.parseStops('red')).to.deep.equal([
        {
          color: 'red',
          position: null
        }
      ])

      expect(GradientString.parseStops('rgba(0, 0, 0, 0) 50%')).to.deep.equal([
        {
          color: 'rgba(0, 0, 0, 0)',
          position: 0.5
        }
      ])
    })
  })

  describe('formatStops()', () => {
    it('should format stops', () => {
      expect(
        GradientString.formatStops([
          {
            color: 'white',
            position: 0
          }
        ])
      ).to.be.equal('white 0%')

      expect(
        GradientString.formatStops([
          {
            color: 'rgb(0, 0, 0)',
            position: 0
          },
          {
            color: 'rgb(255, 90, 0)',
            position: 1
          }
        ])
      ).to.be.equal('rgb(0, 0, 0) 0%, rgb(255, 90, 0) 100%')

      expect(
        GradientString.formatStops([
          {
            color: 'rgb(0, 0, 0)',
            position: 0
          },
          {
            color: 'rgba(100, 100, 100)',
            position: 0.5
          },
          {
            color: 'rgb(255, 90, 0)',
            position: 1
          }
        ])
      ).to.be.equal(
        'rgb(0, 0, 0) 0%, rgba(100, 100, 100) 50%, rgb(255, 90, 0) 100%'
      )

      expect(
        GradientString.formatStops([
          {
            color: 'rgb(0, 0, 0)',
            position: null
          },
          {
            color: 'rgb(255, 90, 0)',
            position: null
          }
        ])
      ).to.be.equal('rgb(0, 0, 0) 0%, rgb(255, 90, 0) 100%')
    })

    it('should clean clean position', () => {
      expect(
        GradientString.formatStops(
          [
            {
              color: 'rgb(0, 0, 0)',
              position: 0
            },
            {
              color: 'rgb(255, 90, 0)',
              position: 1
            }
          ],
          true
        )
      ).to.be.equal('rgb(0, 0, 0), rgb(255, 90, 0)')

      expect(
        GradientString.formatStops(
          [
            {
              color: 'rgb(0, 0, 0)',
              position: 0
            },
            {
              color: 'rgba(100, 100, 100)',
              position: 0.5
            },
            {
              color: 'rgb(255, 90, 0)',
              position: 1
            }
          ],
          true
        )
      ).to.be.equal('rgb(0, 0, 0), rgba(100, 100, 100) 50%, rgb(255, 90, 0)')

      expect(
        GradientString.formatStops(
          [
            {
              color: 'rgb(0, 0, 0)',
              position: null
            },
            {
              color: 'rgb(255, 90, 0)',
              position: null
            }
          ],
          true
        )
      ).to.be.equal('rgb(0, 0, 0), rgb(255, 90, 0)')
    })
  })

  describe('parseStop()', () => {
    it('should parse stop', () => {
      expect(GradientString.parseStop('#d4e4ef 0%')).to.be.eql({
        color: '#d4e4ef',
        position: 0
      })

      expect(GradientString.parseStop('rgb(255, 90, 0) 10%')).to.be.eql({
        color: 'rgb(255, 90, 0)',
        position: 0.1
      })

      expect(
        GradientString.parseStop('rgba(100, 100, 100, 20%) 10%')
      ).to.be.eql({
        color: 'rgba(100, 100, 100, 20%)',
        position: 0.1
      })

      expect(GradientString.parseStop('white 50%')).to.be.eql({
        color: 'white',
        position: 0.5
      })

      expect(GradientString.parseStop('hsl(0, 0%, 100%) 100%')).to.be.eql({
        color: 'hsl(0, 0%, 100%)',
        position: 1
      })

      expect(GradientString.parseStop('hsla(0, 0%, 100%, 0.8)')).to.be.eql({
        color: 'hsla(0, 0%, 100%, 0.8)',
        position: null
      })
    })
  })

  describe('parsePosition()', () => {
    it('should parse positon', () => {
      expect(GradientString.parsePosition('100%')).to.be.equal(1)
      expect(GradientString.parsePosition('1')).to.be.equal(1)

      expect(GradientString.parsePosition('50%')).to.be.equal(0.5)
      expect(GradientString.parsePosition('0.5')).to.be.equal(0.5)

      expect(GradientString.parsePosition('0.05')).to.be.equal(0.05)
    })

    it('should return null if value is undefined', () => {
      expect(GradientString.parsePosition()).to.be.equal(null)
    })
  })

  describe('formatPosition()', () => {
    it('should format positon', () => {
      expect(GradientString.formatPosition(1)).to.be.equal('100%')
      expect(GradientString.formatPosition(0.1)).to.be.equal('10%')
      expect(GradientString.formatPosition(0.5)).to.be.equal('50%')
      expect(GradientString.formatPosition(0)).to.be.equal('0%')
    })
  })

  describe('parseAngle', () => {
    it('should parse angle', () => {
      expect(GradientString.parseAngle('top')).to.be.equal(180)
      expect(GradientString.parseAngle('right')).to.be.equal(270)
      expect(GradientString.parseAngle('bottom')).to.be.equal(0)
      expect(GradientString.parseAngle('left')).to.be.equal(90)

      expect(GradientString.parseAngle('to top')).to.be.equal(0)
      expect(GradientString.parseAngle('to right')).to.be.equal(90)
      expect(GradientString.parseAngle('to bottom')).to.be.equal(180)
      expect(GradientString.parseAngle('to left')).to.be.equal(270)

      expect(GradientString.parseAngle('top right')).to.be.equal(225)
      expect(GradientString.parseAngle('right bottom')).to.be.equal(315)
      expect(GradientString.parseAngle('bottom left')).to.be.equal(45)
      expect(GradientString.parseAngle('left top')).to.be.equal(135)

      expect(GradientString.parseAngle('to top right')).to.be.equal(45)
      expect(GradientString.parseAngle('to right bottom')).to.be.equal(135)
      expect(GradientString.parseAngle('to bottom left')).to.be.equal(225)
      expect(GradientString.parseAngle('to left top')).to.be.equal(315)

      expect(GradientString.parseAngle('90deg')).to.be.equal(90)
    })

    it('should parse angle with non-standard', () => {
      expect(GradientString.parseAngle('90deg', true)).to.be.equal(0)
      expect(GradientString.parseAngle('180deg', true)).to.be.equal(270)
    })
  })

  describe('formatAngle()', () => {
    it('should format angle', () => {
      expect(GradientString.formatAngle(0)).to.be.equal('0deg')
      expect(GradientString.formatAngle(90)).to.be.equal('90deg')
      expect(GradientString.formatAngle(120)).to.be.equal('120deg')
    })

    it('should format angle with non-standard', () => {
      expect(GradientString.formatAngle(0, true)).to.be.equal('90deg')
      expect(GradientString.formatAngle(270, true)).to.be.equal('180deg')
    })
  })
})
