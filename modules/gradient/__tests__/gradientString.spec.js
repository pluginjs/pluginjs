import GradientString from '../src/gradientString'

describe('GradientString', () => {
  describe('matchString()', () => {
    test('should match gradient linear string', () => {
      expect(
        GradientString.matchString(
          '-webkit-linear-gradient(50deg, #2F2727, #1a82f7)'
        )
      ).toEqual(true)
      expect(
        GradientString.matchString(
          '-moz-linear-gradient(left, rgba(248,80,50,0.8) 1%, rgba(241,111,92,0.8) 50%, rgba(240,47,23,0.8) 71%, rgba(231,56,39,0.8) 99%)'
        )
      ).toEqual(true)
      expect(GradientString.matchString('yellow')).toEqual(false)
      expect(GradientString.matchString('#2F2727')).toEqual(false)
      expect(GradientString.matchString('rgba(248,80,50,0.8)')).toEqual(false)
      expect(GradientString.matchString('linear-gradient(50deg)')).toEqual(
        false
      )
      expect(GradientString.matchString('linear-gradient(to top)')).toEqual(
        false
      )
      expect(
        GradientString.matchString('linear-gradient(50deg, #2F2727)')
      ).toEqual(false)
    })

    test('should match gradient radial string', () => {
      expect(
        GradientString.matchString(
          '-webkit-radial-gradient(circle, #2F2727, #1a82f7)'
        )
      ).toEqual(true)
      expect(
        GradientString.matchString(
          '-moz-radial-gradient(circle, rgba(248,80,50,0.8) 1%, rgba(241,111,92,0.8) 50%, rgba(240,47,23,0.8) 71%, rgba(231,56,39,0.8) 99%)'
        )
      ).toEqual(true)
      expect(GradientString.matchString('yellow')).toEqual(false)
      expect(GradientString.matchString('#2F2727')).toEqual(false)
      expect(GradientString.matchString('rgba(248,80,50,0.8)')).toEqual(false)
      expect(GradientString.matchString('radial-gradient(circle)')).toEqual(
        false
      )
      expect(
        GradientString.matchString('radial-gradient(circle, #2F2727)')
      ).toEqual(false)
    })
  })

  describe('parseString()', () => {
    test('should parse gradient string', () => {
      expect(
        GradientString.parseString(
          '-webkit-linear-gradient(left, #d4e4ef 0%, #86aecc 100%)'
        )
      ).toEqual({
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
      ).toEqual({
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
      ).toEqual({
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

    test('should parse gradient radial string', () => {
      expect(
        GradientString.parseString(
          '-webkit-radial-gradient(circle, #d4e4ef 0%, #86aecc 100%)'
        )
      ).toEqual({
        prefix: '-webkit-',
        type: 'radial',
        value: {
          shape: 'circle',
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
          '-moz-radial-gradient(circle, #d4e4ef, #86aecc)'
        )
      ).toEqual({
        prefix: '-moz-',
        type: 'radial',
        value: {
          shape: 'circle',
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
          'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 47%, rgba(237,237,237,1) 100%)'
        )
      ).toEqual({
        prefix: null,
        type: 'radial',
        value: {
          shape: 'circle',
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
    test('should parse linear parameters', () => {
      expect(
        GradientString.parseParameters('left, #d4e4ef 0%, #86aecc 100%')
      ).toEqual({
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

    test('should parse radial parameters', () => {
      expect(
        GradientString.parseParameters('circle, #d4e4ef 0%, #86aecc 100%')
      ).toEqual({
        shape: 'circle',
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
    test('should parse stops', () => {
      expect(
        GradientString.parseStops('#d4e4ef 0%, rgb(255, 90, 0) 10%')
      ).toEqual([
        {
          color: '#d4e4ef',
          position: 0
        },
        {
          color: 'rgb(255, 90, 0)',
          position: 0.1
        }
      ])

      expect(GradientString.parseStops('#d4e4ef, rgb(255, 90, 0)')).toEqual([
        {
          color: '#d4e4ef',
          position: null
        },
        {
          color: 'rgb(255, 90, 0)',
          position: null
        }
      ])

      expect(GradientString.parseStops('red')).toEqual([
        {
          color: 'red',
          position: null
        }
      ])

      expect(GradientString.parseStops('rgba(0, 0, 0, 0) 50%')).toEqual([
        {
          color: 'rgba(0, 0, 0, 0)',
          position: 0.5
        }
      ])
    })
  })

  describe('formatStops()', () => {
    test('should format stops', () => {
      expect(
        GradientString.formatStops([
          {
            color: 'white',
            position: 0
          }
        ])
      ).toEqual('white 0%')

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
      ).toEqual('rgb(0, 0, 0) 0%, rgb(255, 90, 0) 100%')

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
      ).toEqual(
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
      ).toEqual('rgb(0, 0, 0) 0%, rgb(255, 90, 0) 100%')
    })

    test('should clean clean position', () => {
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
      ).toEqual('rgb(0, 0, 0), rgb(255, 90, 0)')

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
      ).toEqual('rgb(0, 0, 0), rgba(100, 100, 100) 50%, rgb(255, 90, 0)')

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
      ).toEqual('rgb(0, 0, 0), rgb(255, 90, 0)')
    })
  })

  describe('parseStop()', () => {
    test('should parse stop', () => {
      expect(GradientString.parseStop('#d4e4ef 0%')).toEqual({
        color: '#d4e4ef',
        position: 0
      })

      expect(GradientString.parseStop('rgb(255, 90, 0) 10%')).toEqual({
        color: 'rgb(255, 90, 0)',
        position: 0.1
      })

      expect(GradientString.parseStop('rgba(100, 100, 100, 20%) 10%')).toEqual({
        color: 'rgba(100, 100, 100, 20%)',
        position: 0.1
      })

      expect(GradientString.parseStop('white 50%')).toEqual({
        color: 'white',
        position: 0.5
      })

      expect(GradientString.parseStop('hsl(0, 0%, 100%) 100%')).toEqual({
        color: 'hsl(0, 0%, 100%)',
        position: 1
      })

      expect(GradientString.parseStop('hsla(0, 0%, 100%, 0.8)')).toEqual({
        color: 'hsla(0, 0%, 100%, 0.8)',
        position: null
      })
    })
  })

  describe('parsePosition()', () => {
    test('should parse positon', () => {
      expect(GradientString.parsePosition('100%')).toEqual(1)
      expect(GradientString.parsePosition('1')).toEqual(1)

      expect(GradientString.parsePosition('50%')).toEqual(0.5)
      expect(GradientString.parsePosition('0.5')).toEqual(0.5)

      expect(GradientString.parsePosition('0.05')).toEqual(0.05)
    })

    test('should return null if value is undefined', () => {
      expect(GradientString.parsePosition()).toEqual(null)
    })
  })

  describe('formatPosition()', () => {
    test('should format positon', () => {
      expect(GradientString.formatPosition(1)).toEqual('100%')
      expect(GradientString.formatPosition(0.1)).toEqual('10%')
      expect(GradientString.formatPosition(0.5)).toEqual('50%')
      expect(GradientString.formatPosition(0)).toEqual('0%')
    })
  })

  describe('parseAngle', () => {
    test('should parse angle', () => {
      expect(GradientString.parseAngle('top')).toEqual(180)
      expect(GradientString.parseAngle('right')).toEqual(270)
      expect(GradientString.parseAngle('bottom')).toEqual(0)
      expect(GradientString.parseAngle('left')).toEqual(90)

      expect(GradientString.parseAngle('to top')).toEqual(0)
      expect(GradientString.parseAngle('to right')).toEqual(90)
      expect(GradientString.parseAngle('to bottom')).toEqual(180)
      expect(GradientString.parseAngle('to left')).toEqual(270)

      expect(GradientString.parseAngle('top right')).toEqual(225)
      expect(GradientString.parseAngle('right bottom')).toEqual(315)
      expect(GradientString.parseAngle('bottom left')).toEqual(45)
      expect(GradientString.parseAngle('left top')).toEqual(135)

      expect(GradientString.parseAngle('to top right')).toEqual(45)
      expect(GradientString.parseAngle('to right bottom')).toEqual(135)
      expect(GradientString.parseAngle('to bottom left')).toEqual(225)
      expect(GradientString.parseAngle('to left top')).toEqual(315)

      expect(GradientString.parseAngle('90deg')).toEqual(90)
    })

    test('should parse angle with non-standard', () => {
      expect(GradientString.parseAngle('90deg', true)).toEqual(0)
      expect(GradientString.parseAngle('180deg', true)).toEqual(270)
    })
  })

  describe('formatAngle()', () => {
    test('should format angle', () => {
      expect(GradientString.formatAngle(0)).toEqual('0deg')
      expect(GradientString.formatAngle(90)).toEqual('90deg')
      expect(GradientString.formatAngle(120)).toEqual('120deg')
    })

    test('should format angle with non-standard', () => {
      expect(GradientString.formatAngle(0, true)).toEqual('90deg')
      expect(GradientString.formatAngle(270, true)).toEqual('180deg')
    })
  })
})
