import Converter from '../../src/converter'

describe('Converter', () => {
  describe('HSLtoRGB()', () => {
    it('should convert hsl to rgb', () => {
      expect(
        Converter.HSLtoRGB({
          h: 0,
          s: 1,
          l: 0.5
        })
      ).to.eql({
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
      ).to.eql({
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
      ).to.eql({
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
      ).to.eql({
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
      ).to.eql({
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
      ).to.eql({
        r: 255,
        g: 0,
        b: 255
      })
    })

    it('should have h when l equal 0', () => {
      expect(
        Converter.HSLtoRGB({
          h: 0,
          s: 0,
          l: 0
        })
      ).to.eql({
        r: 0,
        g: 0,
        b: 0,
        h: 0
      })
    })

    it('should have h when l equal 1', () => {
      expect(
        Converter.HSLtoRGB({
          h: 230,
          s: 1,
          l: 1
        })
      ).to.eql({
        r: 255,
        g: 255,
        b: 255,
        h: 230
      })
    })
  })

  describe('RGBtoHSL()', () => {
    it('should convert rgb to hsl', () => {
      expect(
        Converter.RGBtoHSL({
          r: 0,
          g: 0,
          b: 0
        })
      ).to.eql({
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
      ).to.eql({
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
      ).to.eql({
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
      ).to.eql({
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
      ).to.eql({
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
      ).to.eql({
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
      ).to.eql({
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
      ).to.eql({
        h: 300,
        s: 1,
        l: 0.5
      })
    })
  })

  describe('RGBtoHEX()', () => {
    it('should convert rgb to hex', () => {
      expect(
        Converter.RGBtoHEX({
          r: 0,
          g: 0,
          b: 0
        })
      ).to.equal('#000000')

      expect(
        Converter.RGBtoHEX({
          r: 255,
          g: 255,
          b: 255
        })
      ).to.equal('#ffffff')

      expect(
        Converter.RGBtoHEX({
          r: 255,
          g: 0,
          b: 0
        })
      ).to.equal('#ff0000')

      expect(
        Converter.RGBtoHEX({
          r: 0,
          g: 255,
          b: 0
        })
      ).to.equal('#00ff00')

      expect(
        Converter.RGBtoHEX({
          r: 0,
          g: 0,
          b: 255
        })
      ).to.equal('#0000ff')

      expect(
        Converter.RGBtoHEX({
          r: 119,
          g: 136,
          b: 153
        })
      ).to.equal('#778899')
    })
  })

  describe('HSLtoHEX()', () => {
    it('should convert hsl to hex', () => {
      expect(
        Converter.HSLtoHEX({
          h: 0,
          s: 1,
          l: 0.5
        })
      ).to.equal('#ff0000')

      expect(
        Converter.HSLtoHEX({
          h: 120,
          s: 1,
          l: 0.5
        })
      ).to.equal('#00ff00')

      expect(
        Converter.HSLtoHEX({
          h: 240,
          s: 1,
          l: 0.5
        })
      ).to.equal('#0000ff')

      expect(
        Converter.HSLtoHEX({
          h: 60,
          s: 1,
          l: 0.5
        })
      ).to.equal('#ffff00')

      expect(
        Converter.HSLtoHEX({
          h: 180,
          s: 1,
          l: 0.5
        })
      ).to.equal('#00ffff')

      expect(
        Converter.HSLtoHEX({
          h: 300,
          s: 1,
          l: 0.5
        })
      ).to.equal('#ff00ff')
    })
  })

  describe('HSVtoHEX()', () => {
    it('should convert hsv to hex', () => {
      expect(
        Converter.HSVtoHEX({
          h: 0,
          s: 1,
          v: 1
        })
      ).to.equal('#ff0000')

      expect(
        Converter.HSVtoHEX({
          h: 120,
          s: 1,
          v: 1
        })
      ).to.equal('#00ff00')

      expect(
        Converter.HSVtoHEX({
          h: 240,
          s: 1,
          v: 1
        })
      ).to.equal('#0000ff')

      expect(
        Converter.HSVtoHEX({
          h: 60,
          s: 1,
          v: 1
        })
      ).to.equal('#ffff00')

      expect(
        Converter.HSVtoHEX({
          h: 180,
          s: 1,
          v: 1
        })
      ).to.equal('#00ffff')

      expect(
        Converter.HSVtoHEX({
          h: 300,
          s: 1,
          v: 1
        })
      ).to.equal('#ff00ff')
    })
  })

  describe('RGBtoHSV()', () => {
    it('should convert rgb to hsv', () => {
      expect(
        Converter.RGBtoHSV({
          r: 0,
          g: 0,
          b: 0
        })
      ).to.eql({
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
      ).to.eql({
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
      ).to.eql({
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
      ).to.eql({
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
      ).to.eql({
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
      ).to.eql({
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
      ).to.eql({
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
      ).to.eql({
        h: 300,
        s: 1,
        v: 1
      })
    })

    describe('HSVtoRGB()', () => {
      it('should convert hsv to rgb', () => {
        expect(
          Converter.HSVtoRGB({
            h: 0,
            s: 1,
            v: 1
          })
        ).to.eql({
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
        ).to.eql({
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
        ).to.eql({
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
        ).to.eql({
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
        ).to.eql({
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
        ).to.eql({
          r: 255,
          g: 0,
          b: 255
        })
      })

      it('should have h when v equal 0', () => {
        expect(
          Converter.HSVtoRGB({
            h: 0,
            s: 0,
            v: 0
          })
        ).to.eql({
          r: 0,
          g: 0,
          b: 0,
          h: 0
        })
      })

      it('should have h when v equal 1 and s equal 0', () => {
        expect(
          Converter.HSVtoRGB({
            h: 230,
            s: 0,
            v: 1
          })
        ).to.eql({
          r: 255,
          g: 255,
          b: 255,
          h: 230
        })
      })
    })

    describe('HEXtoRGB()', () => {
      it('should convent hex to rgb', () => {
        expect(Converter.HEXtoRGB('#000000')).to.eql({
          r: 0,
          g: 0,
          b: 0
        })

        expect(Converter.HEXtoRGB('#ffffff')).to.eql({
          r: 255,
          g: 255,
          b: 255
        })

        expect(Converter.HEXtoRGB('#ff0000')).to.eql({
          r: 255,
          g: 0,
          b: 0
        })

        expect(Converter.HEXtoRGB('#00ff00')).to.eql({
          r: 0,
          g: 255,
          b: 0
        })

        expect(Converter.HEXtoRGB('#0000ff')).to.eql({
          r: 0,
          g: 0,
          b: 255
        })

        expect(Converter.HEXtoRGB('#778899')).to.eql({
          r: 119,
          g: 136,
          b: 153
        })

        expect(Converter.HEXtoRGB('#789')).to.eql({
          r: 119,
          g: 136,
          b: 153
        })
      })
    })

    describe('isNAME()', () => {
      it('should renturn true if is color name', () => {
        expect(Converter.isNAME('yellow')).to.equal(true)
        expect(Converter.isNAME('white')).to.equal(true)
        expect(Converter.isNAME('blue')).to.equal(true)
        expect(Converter.isNAME('green')).to.equal(true)
        expect(Converter.isNAME('red')).to.equal(true)
      })
      it('should renturn false if is not a color name', () => {
        expect(Converter.isNAME('ffffff')).to.equal(false)
        expect(Converter.isNAME('')).to.equal(false)
        expect(Converter.isNAME('rgba(255,0,0,1)')).to.equal(false)
        expect(Converter.isNAME('#00ff00')).to.equal(false)
        expect(Converter.isNAME('hello')).to.equal(false)
      })
    })

    describe('NAMEtoHEX()', () => {
      it('should return hex value if a color name given', () => {
        expect(Converter.NAMEtoHEX('white')).to.equal('#fff')
        expect(Converter.NAMEtoHEX('skyblue')).to.equal('#87ceeb')
      })
    })

    describe('NAMEtoRGB()', () => {
      it('should return rgb if a color name given', () => {
        expect(Converter.NAMEtoRGB('white')).to.eql({
          r: 255,
          g: 255,
          b: 255
        })
      })
    })

    describe('hasNAME()', () => {
      it('should return name if a rgb has a name', () => {
        expect(
          Converter.hasNAME({
            r: 255,
            g: 255,
            b: 255
          })
        ).to.equal('white')
      })

      it('should return false if a rgb dont have a name', () => {
        expect(
          Converter.hasNAME({
            r: 255,
            g: 255,
            b: 254
          })
        ).to.equal(false)
      })
    })

    describe('RGBtoNAME()', () => {
      it('should return name if a rgb has a name', () => {
        expect(
          Converter.RGBtoNAME({
            r: 255,
            g: 255,
            b: 255
          })
        ).to.equal('white')
      })
    })
  })
})
