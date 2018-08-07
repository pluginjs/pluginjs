import ColorStrings from '../src/colorStrings'

function parseString(string, match, parse) {
  const matched = match.exec(string)
  if (matched !== null) {
    return parse(matched)
  }
  return false
}

describe('ColorStrings', () => {
  describe('RGB', () => {
    test('should parse rgb', () => {
      expect(
        parseString(
          'rgb(100, 150, 200)',
          ColorStrings.RGB.match,
          ColorStrings.RGB.parse
        )
      ).toEqual({
        r: 100,
        g: 150,
        b: 200,
        a: 1
      })

      expect(
        parseString(
          'rgba(100, 150, 200, 1)',
          ColorStrings.RGB.match,
          ColorStrings.RGB.parse
        )
      ).toEqual(false)
      expect(
        parseString(
          'hsl(0, 100%, 50%)',
          ColorStrings.RGB.match,
          ColorStrings.RGB.parse
        )
      ).toEqual(false)
      expect(
        parseString(
          'hsla(0, 100%, 50%, 1)',
          ColorStrings.RGB.match,
          ColorStrings.RGB.parse
        )
      ).toEqual(false)
      expect(
        parseString(
          'transparent',
          ColorStrings.RGB.match,
          ColorStrings.RGB.parse
        )
      ).toEqual(false)
      expect(
        parseString('#ffffff', ColorStrings.RGB.match, ColorStrings.RGB.parse)
      ).toEqual(false)
      expect(
        parseString('white', ColorStrings.RGB.match, ColorStrings.RGB.parse)
      ).toEqual(false)
    })

    test('should convent to rgb', () => {
      expect(
        ColorStrings.RGB.to({
          r: 100,
          g: 150,
          b: 200,
          a: 1
        })
      ).toEqual('rgb(100, 150, 200)')
    })
  })

  describe('RGBA', () => {
    test('should parse rgba', () => {
      expect(
        parseString(
          'rgba(100, 150, 200, 0.1)',
          ColorStrings.RGBA.match,
          ColorStrings.RGBA.parse
        )
      ).toEqual({
        r: 100,
        g: 150,
        b: 200,
        a: 0.1
      })

      expect(
        parseString(
          'rgba(100, 150, 200, 10%)',
          ColorStrings.RGBA.match,
          ColorStrings.RGBA.parse
        )
      ).toEqual({
        r: 100,
        g: 150,
        b: 200,
        a: 0.1
      })

      expect(
        parseString(
          'rgb(100, 150, 200)',
          ColorStrings.RGBA.match,
          ColorStrings.RGBA.parse
        )
      ).toEqual(false)
      expect(
        parseString(
          'hsl(0, 100%, 50%)',
          ColorStrings.RGBA.match,
          ColorStrings.RGBA.parse
        )
      ).toEqual(false)
      expect(
        parseString(
          'hsla(0, 100%, 50%, 1)',
          ColorStrings.RGBA.match,
          ColorStrings.RGBA.parse
        )
      ).toEqual(false)
      expect(
        parseString(
          'transparent',
          ColorStrings.RGBA.match,
          ColorStrings.RGBA.parse
        )
      ).toEqual(false)
      expect(
        parseString('#ffffff', ColorStrings.RGBA.match, ColorStrings.RGBA.parse)
      ).toEqual(false)
      expect(
        parseString('white', ColorStrings.RGBA.match, ColorStrings.RGBA.parse)
      ).toEqual(false)
    })

    test('should convent to rgba', () => {
      expect(
        ColorStrings.RGBA.to({
          r: 100,
          g: 150,
          b: 200,
          a: 0.5
        })
      ).toEqual('rgba(100, 150, 200, 0.5)')
    })
  })

  describe('HSL', () => {
    test('should parse hsl', () => {
      expect(
        parseString(
          'hsl(0, 100%, 50%)',
          ColorStrings.HSL.match,
          ColorStrings.HSL.parse
        )
      ).toEqual({
        r: 255,
        g: 0,
        b: 0,
        a: 1
      })

      expect(
        parseString(
          'hsl(480, 1, 0.5)',
          ColorStrings.HSL.match,
          ColorStrings.HSL.parse
        )
      ).toEqual({
        r: 0,
        g: 255,
        b: 0,
        a: 1
      })

      expect(
        parseString(
          'rgb(100, 150, 200)',
          ColorStrings.HSL.match,
          ColorStrings.HSL.parse
        )
      ).toEqual(false)
      expect(
        parseString(
          'rgba(100, 150, 200, 0.1)',
          ColorStrings.HSL.match,
          ColorStrings.HSL.parse
        )
      ).toEqual(false)
      expect(
        parseString(
          'hsla(0, 100%, 50%, 1)',
          ColorStrings.HSL.match,
          ColorStrings.HSL.parse
        )
      ).toEqual(false)
      expect(
        parseString(
          'transparent',
          ColorStrings.HSL.match,
          ColorStrings.HSL.parse
        )
      ).toEqual(false)
      expect(
        parseString('#ffffff', ColorStrings.HSL.match, ColorStrings.HSL.parse)
      ).toEqual(false)
      expect(
        parseString('white', ColorStrings.HSL.match, ColorStrings.HSL.parse)
      ).toEqual(false)
    })

    test('should convent to hsl', () => {
      expect(
        ColorStrings.HSL.to({
          r: 255,
          g: 0,
          b: 0,
          a: 0.5
        })
      ).toEqual('hsl(0, 100%, 50%)')
    })
  })

  describe('HSLA', () => {
    test('should parse hsl', () => {
      expect(
        parseString(
          'hsla(0, 100%, 50%, 50%)',
          ColorStrings.HSLA.match,
          ColorStrings.HSLA.parse
        )
      ).toEqual({
        r: 255,
        g: 0,
        b: 0,
        a: 0.5
      })

      expect(
        parseString(
          'hsla(480, 1, 0.5, 0.5)',
          ColorStrings.HSLA.match,
          ColorStrings.HSLA.parse
        )
      ).toEqual({
        r: 0,
        g: 255,
        b: 0,
        a: 0.5
      })

      expect(
        parseString(
          'rgb(100, 150, 200)',
          ColorStrings.HSLA.match,
          ColorStrings.HSLA.parse
        )
      ).toEqual(false)
      expect(
        parseString(
          'rgba(100, 150, 200, 0.1)',
          ColorStrings.HSLA.match,
          ColorStrings.HSLA.parse
        )
      ).toEqual(false)
      expect(
        parseString(
          'hsl(0, 100%, 50%)',
          ColorStrings.HSLA.match,
          ColorStrings.HSLA.parse
        )
      ).toEqual(false)
      expect(
        parseString(
          'transparent',
          ColorStrings.HSLA.match,
          ColorStrings.HSLA.parse
        )
      ).toEqual(false)
      expect(
        parseString('#ffffff', ColorStrings.HSLA.match, ColorStrings.HSLA.parse)
      ).toEqual(false)
      expect(
        parseString('white', ColorStrings.HSLA.match, ColorStrings.HSLA.parse)
      ).toEqual(false)
    })

    test('should convent to hsla', () => {
      expect(
        ColorStrings.HSLA.to({
          r: 255,
          g: 0,
          b: 0,
          a: 0.5
        })
      ).toEqual('hsla(0, 100%, 50%, 0.5)')
    })
  })

  describe('HEX', () => {
    test('should parse hex', () => {
      expect(
        parseString('#ff0000', ColorStrings.HEX.match, ColorStrings.HEX.parse)
      ).toEqual({
        r: 255,
        g: 0,
        b: 0,
        a: 1
      })

      expect(
        parseString('#fff', ColorStrings.HEX.match, ColorStrings.HEX.parse)
      ).toEqual({
        r: 255,
        g: 255,
        b: 255,
        a: 1
      })

      expect(
        parseString(
          'rgb(100, 150, 200)',
          ColorStrings.HEX.match,
          ColorStrings.HEX.parse
        )
      ).toEqual(false)
      expect(
        parseString(
          'rgba(100, 150, 200, 0.1)',
          ColorStrings.HEX.match,
          ColorStrings.HEX.parse
        )
      ).toEqual(false)
      expect(
        parseString(
          'hsl(0, 100%, 50%)',
          ColorStrings.HEX.match,
          ColorStrings.HEX.parse
        )
      ).toEqual(false)
      expect(
        parseString(
          'hsla(0, 100%, 50%, 0.1)',
          ColorStrings.HEX.match,
          ColorStrings.HEX.parse
        )
      ).toEqual(false)
      expect(
        parseString(
          'transparent',
          ColorStrings.HEX.match,
          ColorStrings.HEX.parse
        )
      ).toEqual(false)
      expect(
        parseString('white', ColorStrings.HEX.match, ColorStrings.HEX.parse)
      ).toEqual(false)
    })

    test('should convent to hex', () => {
      expect(
        ColorStrings.HEX.to({
          r: 255,
          g: 0,
          b: 0,
          a: 1
        })
      ).toEqual('#ff0000')
    })
  })

  describe('TRANSPARENT', () => {
    test('should parse transparent', () => {
      expect(
        parseString(
          'transparent',
          ColorStrings.TRANSPARENT.match,
          ColorStrings.TRANSPARENT.parse
        )
      ).toEqual({
        r: 0,
        g: 0,
        b: 0,
        a: 0
      })

      expect(
        parseString(
          'TRANSPARENT',
          ColorStrings.TRANSPARENT.match,
          ColorStrings.TRANSPARENT.parse
        )
      ).toEqual({
        r: 0,
        g: 0,
        b: 0,
        a: 0
      })

      expect(
        parseString(
          'rgb(100, 150, 200)',
          ColorStrings.TRANSPARENT.match,
          ColorStrings.TRANSPARENT.parse
        )
      ).toEqual(false)
      expect(
        parseString(
          'rgba(100, 150, 200, 0.1)',
          ColorStrings.TRANSPARENT.match,
          ColorStrings.TRANSPARENT.parse
        )
      ).toEqual(false)
      expect(
        parseString(
          'hsl(0, 100%, 50%)',
          ColorStrings.TRANSPARENT.match,
          ColorStrings.TRANSPARENT.parse
        )
      ).toEqual(false)
      expect(
        parseString(
          'hsla(0, 100%, 50%, 0.1)',
          ColorStrings.TRANSPARENT.match,
          ColorStrings.TRANSPARENT.parse
        )
      ).toEqual(false)
      expect(
        parseString(
          '#ff0000',
          ColorStrings.TRANSPARENT.match,
          ColorStrings.TRANSPARENT.parse
        )
      ).toEqual(false)
      expect(
        parseString(
          'white',
          ColorStrings.TRANSPARENT.match,
          ColorStrings.TRANSPARENT.parse
        )
      ).toEqual(false)
    })

    test('should convent to transparent', () => {
      expect(
        ColorStrings.TRANSPARENT.to({
          r: 0,
          g: 0,
          b: 0,
          a: 0
        })
      ).toEqual('transparent')
    })
  })

  describe('NAME', () => {
    test('should parse color name', () => {
      expect(
        parseString('white', ColorStrings.NAME.match, ColorStrings.NAME.parse)
      ).toEqual({
        r: 255,
        g: 255,
        b: 255,
        a: 1
      })

      expect(
        parseString('yellow', ColorStrings.NAME.match, ColorStrings.NAME.parse)
      ).toEqual({
        r: 255,
        g: 255,
        b: 0,
        a: 1
      })

      expect(
        parseString(
          'rgb(100, 150, 200)',
          ColorStrings.NAME.match,
          ColorStrings.NAME.parse
        )
      ).toEqual(false)
      expect(
        parseString(
          'rgba(100, 150, 200, 0.1)',
          ColorStrings.NAME.match,
          ColorStrings.NAME.parse
        )
      ).toEqual(false)
      expect(
        parseString(
          'hsl(0, 100%, 50%)',
          ColorStrings.NAME.match,
          ColorStrings.NAME.parse
        )
      ).toEqual(false)
      expect(
        parseString(
          'hsla(0, 100%, 50%, 0.1)',
          ColorStrings.NAME.match,
          ColorStrings.NAME.parse
        )
      ).toEqual(false)
      expect(
        parseString('#ff0000', ColorStrings.NAME.match, ColorStrings.NAME.parse)
      ).toEqual(false)
    })

    test('should convent to name', () => {
      expect(
        ColorStrings.NAME.to({
          r: 255,
          g: 255,
          b: 255,
          a: 1
        })
      ).toEqual('white')
    })
  })
})
