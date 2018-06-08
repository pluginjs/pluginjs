import Converter from '../../src/converter'

describe('Converter', () => {
  describe('HSLtoRGB()', () => {
    test('should convert hsl to rgb', () => {
      expect(
        Converter.HSLtoRGB({
          h: 0,
          s: 1,
          l: 0.5
        })
      ).toEqual({
        r: 255,
        g: 0,
        b: 0
      })

      expect(
        Converter.HSLtoRGB({
          h: 120,
          s: 1,
          l: 0.5
        })
      ).toEqual({
        r: 0,
        g: 255,
        b: 0
      })

      expect(
        Converter.HSLtoRGB({
          h: 240,
          s: 1,
          l: 0.5
        })
      ).toEqual({
        r: 0,
        g: 0,
        b: 255
      })

      expect(
        Converter.HSLtoRGB({
          h: 60,
          s: 1,
          l: 0.5
        })
      ).toEqual({
        r: 255,
        g: 255,
        b: 0
      })

      expect(
        Converter.HSLtoRGB({
          h: 180,
          s: 1,
          l: 0.5
        })
      ).toEqual({
        r: 0,
        g: 255,
        b: 255
      })

      expect(
        Converter.HSLtoRGB({
          h: 300,
          s: 1,
          l: 0.5
        })
      ).toEqual({
        r: 255,
        g: 0,
        b: 255
      })
    })

    test('should have h when l equal 0', () => {
      expect(
        Converter.HSLtoRGB({
          h: 0,
          s: 0,
          l: 0
        })
      ).toEqual({
        r: 0,
        g: 0,
        b: 0,
        h: 0
      })
    })

    test('should have h when l equal 1', () => {
      expect(
        Converter.HSLtoRGB({
          h: 230,
          s: 1,
          l: 1
        })
      ).toEqual({
        r: 255,
        g: 255,
        b: 255,
        h: 230
      })
    })
  })

  describe('RGBtoHSL()', () => {
    test('should convert rgb to hsl', () => {
      expect(
        Converter.RGBtoHSL({
          r: 0,
          g: 0,
          b: 0
        })
      ).toEqual({
        h: 0,
        s: 0,
        l: 0
      })

      expect(
        Converter.RGBtoHSL({
          r: 255,
          g: 255,
          b: 255
        })
      ).toEqual({
        h: 0,
        s: 0,
        l: 1
      })

      expect(
        Converter.RGBtoHSL({
          r: 255,
          g: 0,
          b: 0
        })
      ).toEqual({
        h: 0,
        s: 1,
        l: 0.5
      })

      expect(
        Converter.RGBtoHSL({
          r: 0,
          g: 255,
          b: 0
        })
      ).toEqual({
        h: 120,
        s: 1,
        l: 0.5
      })

      expect(
        Converter.RGBtoHSL({
          r: 0,
          g: 0,
          b: 255
        })
      ).toEqual({
        h: 240,
        s: 1,
        l: 0.5
      })

      expect(
        Converter.RGBtoHSL({
          r: 255,
          g: 255,
          b: 0
        })
      ).toEqual({
        h: 60,
        s: 1,
        l: 0.5
      })

      expect(
        Converter.RGBtoHSL({
          r: 0,
          g: 255,
          b: 255
        })
      ).toEqual({
        h: 180,
        s: 1,
        l: 0.5
      })

      expect(
        Converter.RGBtoHSL({
          r: 255,
          g: 0,
          b: 255
        })
      ).toEqual({
        h: 300,
        s: 1,
        l: 0.5
      })
    })
  })

  describe('RGBtoHEX()', () => {
    test('should convert rgb to hex', () => {
      expect(
        Converter.RGBtoHEX({
          r: 0,
          g: 0,
          b: 0
        })
      ).toEqual('#000000')

      expect(
        Converter.RGBtoHEX({
          r: 255,
          g: 255,
          b: 255
        })
      ).toEqual('#ffffff')

      expect(
        Converter.RGBtoHEX({
          r: 255,
          g: 0,
          b: 0
        })
      ).toEqual('#ff0000')

      expect(
        Converter.RGBtoHEX({
          r: 0,
          g: 255,
          b: 0
        })
      ).toEqual('#00ff00')

      expect(
        Converter.RGBtoHEX({
          r: 0,
          g: 0,
          b: 255
        })
      ).toEqual('#0000ff')

      expect(
        Converter.RGBtoHEX({
          r: 119,
          g: 136,
          b: 153
        })
      ).toEqual('#778899')
    })
  })

  describe('HSLtoHEX()', () => {
    test('should convert hsl to hex', () => {
      expect(
        Converter.HSLtoHEX({
          h: 0,
          s: 1,
          l: 0.5
        })
      ).toEqual('#ff0000')

      expect(
        Converter.HSLtoHEX({
          h: 120,
          s: 1,
          l: 0.5
        })
      ).toEqual('#00ff00')

      expect(
        Converter.HSLtoHEX({
          h: 240,
          s: 1,
          l: 0.5
        })
      ).toEqual('#0000ff')

      expect(
        Converter.HSLtoHEX({
          h: 60,
          s: 1,
          l: 0.5
        })
      ).toEqual('#ffff00')

      expect(
        Converter.HSLtoHEX({
          h: 180,
          s: 1,
          l: 0.5
        })
      ).toEqual('#00ffff')

      expect(
        Converter.HSLtoHEX({
          h: 300,
          s: 1,
          l: 0.5
        })
      ).toEqual('#ff00ff')
    })
  })

  describe('HSVtoHEX()', () => {
    test('should convert hsv to hex', () => {
      expect(
        Converter.HSVtoHEX({
          h: 0,
          s: 1,
          v: 1
        })
      ).toEqual('#ff0000')

      expect(
        Converter.HSVtoHEX({
          h: 120,
          s: 1,
          v: 1
        })
      ).toEqual('#00ff00')

      expect(
        Converter.HSVtoHEX({
          h: 240,
          s: 1,
          v: 1
        })
      ).toEqual('#0000ff')

      expect(
        Converter.HSVtoHEX({
          h: 60,
          s: 1,
          v: 1
        })
      ).toEqual('#ffff00')

      expect(
        Converter.HSVtoHEX({
          h: 180,
          s: 1,
          v: 1
        })
      ).toEqual('#00ffff')

      expect(
        Converter.HSVtoHEX({
          h: 300,
          s: 1,
          v: 1
        })
      ).toEqual('#ff00ff')
    })
  })

  describe('RGBtoHSV()', () => {
    test('should convert rgb to hsv', () => {
      expect(
        Converter.RGBtoHSV({
          r: 0,
          g: 0,
          b: 0
        })
      ).toEqual({
        h: 0,
        s: 0,
        v: 0
      })

      expect(
        Converter.RGBtoHSV({
          r: 255,
          g: 255,
          b: 255
        })
      ).toEqual({
        h: 0,
        s: 0,
        v: 1
      })

      expect(
        Converter.RGBtoHSV({
          r: 255,
          g: 0,
          b: 0
        })
      ).toEqual({
        h: 0,
        s: 1,
        v: 1
      })

      expect(
        Converter.RGBtoHSV({
          r: 0,
          g: 255,
          b: 0
        })
      ).toEqual({
        h: 120,
        s: 1,
        v: 1
      })

      expect(
        Converter.RGBtoHSV({
          r: 0,
          g: 0,
          b: 255
        })
      ).toEqual({
        h: 240,
        s: 1,
        v: 1
      })

      expect(
        Converter.RGBtoHSV({
          r: 255,
          g: 255,
          b: 0
        })
      ).toEqual({
        h: 60,
        s: 1,
        v: 1
      })

      expect(
        Converter.RGBtoHSV({
          r: 0,
          g: 255,
          b: 255
        })
      ).toEqual({
        h: 180,
        s: 1,
        v: 1
      })

      expect(
        Converter.RGBtoHSV({
          r: 255,
          g: 0,
          b: 255
        })
      ).toEqual({
        h: 300,
        s: 1,
        v: 1
      })
    })

    describe('HSVtoRGB()', () => {
      test('should convert hsv to rgb', () => {
        expect(
          Converter.HSVtoRGB({
            h: 0,
            s: 1,
            v: 1
          })
        ).toEqual({
          r: 255,
          g: 0,
          b: 0
        })

        expect(
          Converter.HSVtoRGB({
            h: 120,
            s: 1,
            v: 1
          })
        ).toEqual({
          r: 0,
          g: 255,
          b: 0
        })

        expect(
          Converter.HSVtoRGB({
            h: 240,
            s: 1,
            v: 1
          })
        ).toEqual({
          r: 0,
          g: 0,
          b: 255
        })

        expect(
          Converter.HSVtoRGB({
            h: 60,
            s: 1,
            v: 1
          })
        ).toEqual({
          r: 255,
          g: 255,
          b: 0
        })

        expect(
          Converter.HSVtoRGB({
            h: 180,
            s: 1,
            v: 1
          })
        ).toEqual({
          r: 0,
          g: 255,
          b: 255
        })

        expect(
          Converter.HSVtoRGB({
            h: 300,
            s: 1,
            v: 1
          })
        ).toEqual({
          r: 255,
          g: 0,
          b: 255
        })
      })

      test('should have h when v equal 0', () => {
        expect(
          Converter.HSVtoRGB({
            h: 0,
            s: 0,
            v: 0
          })
        ).toEqual({
          r: 0,
          g: 0,
          b: 0,
          h: 0
        })
      })

      test('should have h when v equal 1 and s equal 0', () => {
        expect(
          Converter.HSVtoRGB({
            h: 230,
            s: 0,
            v: 1
          })
        ).toEqual({
          r: 255,
          g: 255,
          b: 255,
          h: 230
        })
      })
    })

    describe('HEXtoRGB()', () => {
      test('should convent hex to rgb', () => {
        expect(Converter.HEXtoRGB('#000000')).toEqual({
          r: 0,
          g: 0,
          b: 0
        })

        expect(Converter.HEXtoRGB('#ffffff')).toEqual({
          r: 255,
          g: 255,
          b: 255
        })

        expect(Converter.HEXtoRGB('#ff0000')).toEqual({
          r: 255,
          g: 0,
          b: 0
        })

        expect(Converter.HEXtoRGB('#00ff00')).toEqual({
          r: 0,
          g: 255,
          b: 0
        })

        expect(Converter.HEXtoRGB('#0000ff')).toEqual({
          r: 0,
          g: 0,
          b: 255
        })

        expect(Converter.HEXtoRGB('#778899')).toEqual({
          r: 119,
          g: 136,
          b: 153
        })

        expect(Converter.HEXtoRGB('#789')).toEqual({
          r: 119,
          g: 136,
          b: 153
        })
      })
    })

    describe('isNAME()', () => {
      test('should renturn true if is color name', () => {
        expect(Converter.isNAME('yellow')).toEqual(true)
        expect(Converter.isNAME('white')).toEqual(true)
        expect(Converter.isNAME('blue')).toEqual(true)
        expect(Converter.isNAME('green')).toEqual(true)
        expect(Converter.isNAME('red')).toEqual(true)
      })
      test('should renturn false if is not a color name', () => {
        expect(Converter.isNAME('ffffff')).toEqual(false)
        expect(Converter.isNAME('')).toEqual(false)
        expect(Converter.isNAME('rgba(255,0,0,1)')).toEqual(false)
        expect(Converter.isNAME('#00ff00')).toEqual(false)
        expect(Converter.isNAME('hello')).toEqual(false)
      })
    })

    describe('NAMEtoHEX()', () => {
      test('should return hex value if a color name given', () => {
        expect(Converter.NAMEtoHEX('white')).toEqual('#fff')
        expect(Converter.NAMEtoHEX('skyblue')).toEqual('#87ceeb')
      })
    })

    describe('NAMEtoRGB()', () => {
      test('should return rgb if a color name given', () => {
        expect(Converter.NAMEtoRGB('white')).toEqual({
          r: 255,
          g: 255,
          b: 255
        })
      })
    })

    describe('hasNAME()', () => {
      test('should return name if a rgb has a name', () => {
        expect(
          Converter.hasNAME({
            r: 255,
            g: 255,
            b: 255
          })
        ).toEqual('white')
      })

      test('should return false if a rgb dont have a name', () => {
        expect(
          Converter.hasNAME({
            r: 255,
            g: 255,
            b: 254
          })
        ).toEqual(false)
      })
    })

    describe('RGBtoNAME()', () => {
      test('should return name if a rgb has a name', () => {
        expect(
          Converter.RGBtoNAME({
            r: 255,
            g: 255,
            b: 255
          })
        ).toEqual('white')
      })
    })
  })
})
