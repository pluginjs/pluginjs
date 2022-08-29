import Color from '../src/color'

describe('Color', () => {
  const colorForm = {
    rgb: 'rgb(0, 0, 0)',
    rgba: 'rgba(0, 0, 0, 1)',
    hex: '#000',
    hsl: 'hsl(0, 100%, 50%)',
    hsla: 'hsla(0, 100%, 50%, 1)',
    transparent: 'transparent'
  }

  describe('matchString()', () => {
    test('should match hex', () => {
      expect(Color.matchString('')).toEqual(false)
      expect(Color.matchString('#')).toEqual(false)
      expect(Color.matchString('#3')).toEqual(false)
      expect(Color.matchString('#33')).toEqual(false)
      expect(Color.matchString('#333')).toEqual(true)
      expect(Color.matchString('#3333')).toEqual(false)
      expect(Color.matchString('#33333')).toEqual(false)
      expect(Color.matchString('#333333')).toEqual(true)
      expect(Color.matchString('#333333 ')).toEqual(true)
      expect(Color.matchString('#3333333')).toEqual(false)
    })

    test('should match rgb', () => {
      expect(Color.matchString('R')).toEqual(false)
      expect(Color.matchString('RG')).toEqual(false)
      expect(Color.matchString('RGB')).toEqual(false)
      expect(Color.matchString('RGB(')).toEqual(false)
      expect(Color.matchString('RGB(6')).toEqual(false)
      expect(Color.matchString('RGB(60,')).toEqual(false)
      expect(Color.matchString('RGB(60,6')).toEqual(false)
      expect(Color.matchString('RGB(60,60,')).toEqual(false)
      expect(Color.matchString('RGB(60,60,6')).toEqual(false)
      expect(Color.matchString('RGB(60,60,60')).toEqual(false)
      expect(Color.matchString('RGB(60,60,60)')).toEqual(true)
      expect(Color.matchString('RGB(60,60,60) ')).toEqual(true)
      expect(Color.matchString('RGB(60,60,60),')).toEqual(false)
    })

    test('should match rgba', () => {
      expect(Color.matchString('R')).toEqual(false)
      expect(Color.matchString('RG')).toEqual(false)
      expect(Color.matchString('RGB')).toEqual(false)
      expect(Color.matchString('RGBA(')).toEqual(false)
      expect(Color.matchString('RGBA(6')).toEqual(false)
      expect(Color.matchString('RGBA(60,')).toEqual(false)
      expect(Color.matchString('RGBA(60,6')).toEqual(false)
      expect(Color.matchString('RGBA(60,60,')).toEqual(false)
      expect(Color.matchString('RGBA(60,60,6')).toEqual(false)
      expect(Color.matchString('RGBA(60,60,60')).toEqual(false)
      expect(Color.matchString('RGBA(60,60,60,')).toEqual(false)
      expect(Color.matchString('RGBA(60,60,60,1')).toEqual(false)
      expect(Color.matchString('RGBA(60,60,60,1)')).toEqual(true)
      expect(Color.matchString('RGBA(60,60,60,1) ')).toEqual(true)
      expect(Color.matchString('RGBA(60,60,60,1),')).toEqual(false)
    })

    test('should match hsl', () => {
      expect(Color.matchString('H')).toEqual(false)
      expect(Color.matchString('HS')).toEqual(false)
      expect(Color.matchString('HSL')).toEqual(false)
      expect(Color.matchString('HSL(')).toEqual(false)
      expect(Color.matchString('HSL(0')).toEqual(false)
      expect(Color.matchString('HSL(0,')).toEqual(false)
      expect(Color.matchString('HSL(0,10')).toEqual(false)
      expect(Color.matchString('HSL(0,100')).toEqual(false)
      expect(Color.matchString('HSL(0,100%,')).toEqual(false)
      expect(Color.matchString('HSL(0,100%,50')).toEqual(false)
      expect(Color.matchString('HSL(0,100%,50%')).toEqual(false)
      expect(Color.matchString('HSL(0,100%,50%)')).toEqual(true)
      expect(Color.matchString('HSL(0,100%,50%) ')).toEqual(true)
      expect(Color.matchString('HSL(0,100%,50%),')).toEqual(false)
    })

    test('should match hsla', () => {
      expect(Color.matchString('H')).toEqual(false)
      expect(Color.matchString('HS')).toEqual(false)
      expect(Color.matchString('HSL')).toEqual(false)
      expect(Color.matchString('HSLA(')).toEqual(false)
      expect(Color.matchString('HSLA(0')).toEqual(false)
      expect(Color.matchString('HSLA(0,')).toEqual(false)
      expect(Color.matchString('HSLA(0,1')).toEqual(false)
      expect(Color.matchString('HSLA(0,10')).toEqual(false)
      expect(Color.matchString('HSLA(0,100')).toEqual(false)
      expect(Color.matchString('HSLA(0,100%')).toEqual(false)
      expect(Color.matchString('HSLA(0,100%,')).toEqual(false)
      expect(Color.matchString('HSLA(0,100%,5')).toEqual(false)
      expect(Color.matchString('HSLA(0,100%,50')).toEqual(false)
      expect(Color.matchString('HSLA(0,100%,50%')).toEqual(false)
      expect(Color.matchString('HSLA(0,100%,50%,')).toEqual(false)
      expect(Color.matchString('HSLA(0,100%,50%,1')).toEqual(false)
      expect(Color.matchString('HSLA(0,100%,50%,1)')).toEqual(true)
      expect(Color.matchString('HSLA(0,100%,50%,1) ')).toEqual(true)
      expect(Color.matchString('HSLA(0,100%,50%,1),')).toEqual(false)
    })

    test('should match transparent', () => {
      expect(Color.matchString('trans')).toEqual(false)
      expect(Color.matchString('transparent')).toEqual(true)
    })

    test('should match name', () => {
      expect(Color.matchString('w')).toEqual(false)
      expect(Color.matchString('wh')).toEqual(false)
      expect(Color.matchString('whi')).toEqual(false)
      expect(Color.matchString('whit')).toEqual(false)
      expect(Color.matchString('white')).toEqual(true)
      expect(Color.matchString('whitea')).toEqual(false)

      expect(Color.matchString('r')).toEqual(false)
      expect(Color.matchString('re')).toEqual(false)
      expect(Color.matchString('red')).toEqual(true)
      expect(Color.matchString('reda')).toEqual(false)
    })

    test('should call with instance', () => {
      const color = new Color('', 'HEX')

      expect(color.matchString('red')).toEqual(true)
    })
  })

  describe('toString()', () => {
    test('should to string correctly', () => {
      const color = new Color({
        format: false,
        alphaConvert: false
      })

      color.val('#123456')
      expect(color.toString()).toEqual('#123456')
      color.val('rgb(255,255,255)')
      expect(color.toString()).toEqual('rgb(255, 255, 255)')
      color.val('rgba(255,255,255,0.8)')
      expect(color.toString()).toEqual('rgba(255, 255, 255, 0.8)')
      color.val('hsl(0,0%,50%)')
      expect(color.toString()).toEqual('hsl(0, 0%, 50%)')
      color.val('hsla(0,0%,50%,0.8)')
      expect(color.toString()).toEqual('hsla(0, 0%, 50%, 0.8)')
      color.val('white')
      expect(color.toString()).toEqual('white')

      color.format('rgba')
      color.val('#123456')
      expect(color.toString()).toEqual('rgba(18, 52, 86, 1)')

      color.val('white')
      expect(color.toString()).toEqual('rgba(255, 255, 255, 1)')

      color.format('rgb')
      color.val('rgba(255,255,255,0.8)')
      expect(color.toString()).toEqual('rgb(255, 255, 255)')
    })

    test('should convent to alphaConvert if alpha is defined', () => {
      let color = new Color({
        format: false,
        alphaConvert: false
      })

      color.format('rgb')
      color.val('rgba(255,255,255,0.8)')
      expect(color.toString()).toEqual('rgb(255, 255, 255)')

      color = new Color({
        format: false,
        alphaConvert: 'RGBA'
      })

      color.format('rgb')
      color.val('rgba(255,255,255,0.8)')
      expect(color.toString()).toEqual('rgba(255, 255, 255, 0.8)')

      color = new Color({
        format: false,
        alphaConvert: {
          RGB: 'RGBA',
          HSL: 'HSLA',
          HEX: 'RGBA',
          NAME: 'RGBA'
        }
      })

      color.format('rgb')
      color.val('rgba(255,255,255,0.8)')
      expect(color.toString()).toEqual('rgba(255, 255, 255, 0.8)')

      color.val('white')
      expect(color.toString()).toEqual('rgb(255, 255, 255)')
      color.alpha(0.8)
      expect(color.toString()).toEqual('rgba(255, 255, 255, 0.8)')

      color.val('#fff')
      expect(color.toString()).toEqual('rgb(255, 255, 255)')
      color.alpha(0.8)
      expect(color.toString()).toEqual('rgba(255, 255, 255, 0.8)')
    })

    test('should work with upper strings', () => {
      const color = new Color('#000000', 'HEX')

      expect(color.val('RGB(60,60,60)').toString()).toEqual('#3c3c3c')

      expect(color.val('RGBA(60,60,60,1)').toString()).toEqual('#3c3c3c')

      expect(color.val('HSL(0, 0%, 24%)').toString()).toEqual('#3d3d3d') /* ! */

      expect(color.val('HSLA(0, 0%, 24%, 1)').toString()).toEqual(
        '#3d3d3d'
      ) /* ! */

      expect(color.val('TRANSPARENT').toString()).toEqual('transparent')
    })
  })

  test('should return #000000 if no value defined', () => {
    const color = new Color()

    expect(color.val()).toEqual('#000000')
    expect(color.get()).toEqual({
      r: 0,
      g: 0,
      b: 0,
      h: 0,
      s: 0,
      v: 0,
      a: 1
    })
    expect(color.format()).toEqual('HEX')
    expect(color.toString()).toEqual('#000000')
  })

  describe('options', () => {
    test('alphaConvert with self', () => {
      const color = new Color('rgba(255, 255, 255, 0.5)', {
        alphaConvert: {
          RGB: 'RGB',
          HSL: 'HSL',
          HEX: 'HEX',
          NAME: 'NAME'
        },
      })
      color.format('rgba')
      expect(color.toRGBA()).toEqual('rgba(255, 255, 255, 0.5)')
      expect(color.to()).toEqual('rgba(255, 255, 255, 0.5)')

      color.format('rgb')
      expect(color.toRGB()).toEqual('rgb(255, 255, 255)')
      expect(color.to()).toEqual('rgb(255, 255, 255)')

      color.format('hsla')
      expect(color.toHSLA()).toEqual('hsla(0, 0%, 100%, 0.5)')
      expect(color.to()).toEqual('hsla(0, 0%, 100%, 0.5)')

      color.format('hsl')
      expect(color.toHSL()).toEqual('hsl(0, 0%, 100%)')
      expect(color.to()).toEqual('hsl(0, 0%, 100%)')

      color.format('hexa')
      expect(color.toHEXA()).toEqual('#ffffff80')
      expect(color.to()).toEqual('#ffffff80')

      color.format('hex')
      expect(color.toHEX()).toEqual('#ffffff')
      expect(color.to()).toEqual('#ffffff')

      color.format('name')
      expect(color.to()).toEqual('white')
    })

    test('alphaConvert with convent', () => {
      const color = new Color('rgba(255, 255, 255, 0.5)', {
        alphaConvert: {
          RGB: 'RGBA',
          HSL: 'RGBA',
          HEX: 'RGBA',
          NAME: 'RGBA'
        },
      })
      color.format('rgba')
      expect(color.toRGBA()).toEqual('rgba(255, 255, 255, 0.5)')
      expect(color.to()).toEqual('rgba(255, 255, 255, 0.5)')

      color.format('rgb')
      expect(color.toRGB()).toEqual('rgb(255, 255, 255)')
      expect(color.to()).toEqual('rgba(255, 255, 255, 0.5)')

      color.format('hsla')
      expect(color.toHSLA()).toEqual('hsla(0, 0%, 100%, 0.5)')
      expect(color.to()).toEqual('hsla(0, 0%, 100%, 0.5)')

      color.format('hsl')
      expect(color.toHSL()).toEqual('hsl(0, 0%, 100%)')
      expect(color.to()).toEqual('rgba(255, 255, 255, 0.5)')

      color.format('hexa')
      expect(color.toHEXA()).toEqual('#ffffff80')
      expect(color.to()).toEqual('#ffffff80')

      color.format('hex')
      expect(color.toHEX()).toEqual('#ffffff')
      expect(color.to()).toEqual('rgba(255, 255, 255, 0.5)')

      color.format('name')
      expect(color.to()).toEqual('rgba(255, 255, 255, 0.5)')
    })

    test('alphaConvert with alpha', () => {
      const color = new Color('rgba(255, 255, 255, 0.5)', {
        alphaConvert: {
          RGB: 'RGBA',
          HSL: 'HSLA',
          HEX: 'HEXA',
          NAME: 'RGBA'
        },
      })
      color.format('rgba')
      expect(color.toRGBA()).toEqual('rgba(255, 255, 255, 0.5)')
      expect(color.to()).toEqual('rgba(255, 255, 255, 0.5)')

      color.format('rgb')
      expect(color.toRGB()).toEqual('rgb(255, 255, 255)')
      expect(color.to()).toEqual('rgba(255, 255, 255, 0.5)')

      color.format('hsla')
      expect(color.toHSLA()).toEqual('hsla(0, 0%, 100%, 0.5)')
      expect(color.to()).toEqual('hsla(0, 0%, 100%, 0.5)')

      color.format('hsl')
      expect(color.toHSL()).toEqual('hsl(0, 0%, 100%)')
      expect(color.to()).toEqual('hsla(0, 0%, 100%, 0.5)')

      color.format('hexa')
      expect(color.toHEXA()).toEqual('#ffffff80')
      expect(color.to()).toEqual('#ffffff80')

      color.format('hex')
      expect(color.toHEX()).toEqual('#ffffff')
      expect(color.to()).toEqual('#ffffff80')

      color.format('name')
      expect(color.to()).toEqual('rgba(255, 255, 255, 0.5)')
    })

    describe('nameDegradation', () => {
      test('should degradation to the format with options.nameDegradation if color dont have a name', () => {
        let color = new Color('#126782', { format: 'name' })

        expect(color.format()).toEqual('NAME')
        expect(color.toString()).toEqual('#126782')

        color = new Color('#126782', {
          format: 'name',
          nameDegradation: 'rgb'
        })

        expect(color.format()).toEqual('NAME')
        expect(color.toString()).toEqual('rgb(18, 103, 130)')
      })
    })

    describe('hexUseName', () => {
      test('should use name when from hex color', () => {
        let color = new Color('#8fbc8f', { hexUseName: false })
        expect(color.format()).toEqual('HEX')
        expect(color.toString()).toEqual('#8fbc8f')

        color = new Color('#8fbc8f', { hexUseName: true })
        expect(color.format()).toEqual('HEX')
        expect(color.toString()).toEqual('darkseagreen')
      })
    })

    describe('shortenHex', () => {
      test('should use short hex', () => {
        let color = new Color('#fff')
        expect(color.toString()).toEqual('#ffffff')

        color = new Color('#fff', { shortenHex: true })

        expect(color.format()).toEqual('HEX')
        expect(color.toString()).toEqual('#fff')
      })
    })

    describe('invalidValue', () => {
      test('should return the color when invalid', () => {
        let color = new Color('hello world', { invalidValue: '' })
        expect(color.toString()).toEqual('')

        color = new Color('hello world', {
          invalidValue: {
            r: 0,
            g: 0,
            b: 0,
            a: 1
          }
        })
        expect(color.toString()).toEqual('#000000')
      })
    })

    describe('reduceAlpha', () => {
      test('should reduce alpha', () => {
        let color = new Color('rgba(255,255,255,1)', { reduceAlpha: false })
        expect(color.toString()).toEqual('rgba(255, 255, 255, 1)')

        color = new Color('rgba(255,255,255,1)', { reduceAlpha: true })
        expect(color.toString()).toEqual('rgb(255, 255, 255)')

        color = new Color('hsla(0,0%,50%,1)', { reduceAlpha: false })
        expect(color.toString()).toEqual('hsla(0, 0%, 50%, 1)')

        color = new Color('hsla(0,0%,50%,1)', { reduceAlpha: true })
        expect(color.toString()).toEqual('hsl(0, 0%, 50%)')
      })
    })

    describe('zeroAlphaAsTransparent', () => {
      test('should use transparent when alpha equal zero', () => {
        let color = new Color('rgba(255,255,255,0)', {
          zeroAlphaAsTransparent: false
        })

        expect(color.toString()).toEqual('rgba(255, 255, 255, 0)')

        color = new Color('rgba(255,255,255,0)', {
          zeroAlphaAsTransparent: true
        })

        expect(color.toString()).toEqual('transparent')
      })
    })

    describe('instance', () => {
      test('val()', () => {
        const color = new Color('#000000', 'HEX')

        expect(color.val()).toEqual('#000000')

        expect(color.val('rgb(66, 50, 50)').toString()).toEqual('#423232')

        expect(color.val('rgba(66, 50, 50, 1)').toString()).toEqual('#423232')

        expect(color.val('hsl(0, 14%, 23%)').toString()).toEqual(
          '#433232'
        ) /* ! */

        expect(color.val('hsla(0, 14%, 23%, 1)').toString()).toEqual(
          '#433232'
        ) /* ! */

        expect(color.val('transparent').toString()).toEqual('transparent')
      })

      test('isValid()', () => {
        const color = new Color()
        color.val('#fff')

        expect(color.isValid()).toEqual(true)

        color.val('fff')

        expect(color.isValid()).toEqual(false)

        color.val('its not valid')

        expect(color.isValid()).toEqual(false)
      })

      test('format()', () => {
        let color = new Color()
        expect(color.format()).toEqual('HEX')

        color = new Color('#000000')
        expect(color.format()).toEqual('HEX')

        color = new Color('rgb(0, 0, 0)')
        expect(color.format()).toEqual('RGB')

        color = new Color('rgba(0, 0, 0, 1)')
        expect(color.format()).toEqual('RGBA')

        color = new Color('hsl(59, 100%, 50%)')
        expect(color.format()).toEqual('HSL')

        color = new Color('hsla(59, 100%, 50%, 1)')
        expect(color.format()).toEqual('HSLA')

        color = new Color('#000000', 'rgba')
        expect(color.format()).toEqual('RGBA')

        color.format('rgb')
        expect(color.format()).toEqual('RGB')

        color.format('rgba')
        expect(color.format()).toEqual('RGBA')

        color.format('hsl')
        expect(color.format()).toEqual('HSL')

        color.format('hsla')
        expect(color.format()).toEqual('HSLA')

        color.format('hex')
        expect(color.format()).toEqual('HEX')
      })

      test('set()', () => {
        const color = new Color()
        color.set({
          r: 255,
          g: 255,
          b: 255
        })
        expect(color.toHEX()).toEqual('#ffffff')

        color.set({
          r: 255,
          g: 255,
          b: 255,
          a: 0.5
        })
        expect(color.toRGB()).toEqual('rgb(255, 255, 255)')
        expect(color.toRGBA()).toEqual('rgba(255, 255, 255, 0.5)')
        expect(color.toHSLA()).toEqual('hsla(0, 0%, 100%, 0.5)')

        color.set({
          h: 0,
          s: 0,
          v: 1,
          a: 0.5
        })
        expect(color.toRGBA()).toEqual('rgba(255, 255, 255, 0.5)')
        expect(color.toHSLA()).toEqual('hsla(0, 0%, 100%, 0.5)')

        color.set({
          h: 1,
          s: 0,
          v: 1,
          a: 0.5
        })
        expect(color.toRGBA()).toEqual('rgba(255, 255, 255, 0.5)')
        expect(color.toHSLA()).toEqual('hsla(0, 0%, 100%, 0.5)')
      })

      test('get()', () => {
        const color = new Color('rgba(0, 0, 0, 1)')
        expect(color.get()).toEqual({
          r: 0,
          g: 0,
          b: 0,
          h: 0,
          s: 0,
          v: 0,
          a: 1
        })

        color.val('hsla(0, 0%, 100%, 0.5)')
        expect(color.get()).toEqual({
          r: 255,
          g: 255,
          b: 255,
          h: 0,
          s: 0,
          v: 1,
          a: 0.5
        })

        color.val('#fff600')
        color.alpha(1)
        expect(color.get()).toEqual({
          r: 255,
          g: 246,
          b: 0,
          h: 58,
          s: 1,
          v: 1,
          a: 1
        })
      })

      test('alpha()', () => {
        const color = new Color('#8c9cdf', 'rgba')

        expect(color.alpha()).toEqual(1)
        expect(color.toRGBA()).toEqual('rgba(140, 156, 223, 1)')
        expect(color.toHSLA()).toEqual('hsla(228, 56%, 71%, 1)')

        color.alpha(0.5)
        expect(color.alpha()).toEqual(0.5)
        expect(color.toRGBA()).toEqual('rgba(140, 156, 223, 0.5)')
        expect(color.toHSLA()).toEqual('hsla(228, 56%, 71%, 0.5)')

        color.alpha(5)
        expect(color.alpha()).toEqual(1)

        color.alpha(-5)
        expect(color.alpha()).toEqual(0)

        color.alpha('1')
        expect(color.alpha()).toEqual(1)

        color.alpha('abc')
        expect(color.alpha()).toEqual(1)
      })

      test('to()', () => {
        const color = new Color('rgba(255, 128, 36, 0.5)')

        expect(color.toRGBA()).toEqual('rgba(255, 128, 36, 0.5)')
        expect(color.to('rgba')).toEqual('rgba(255, 128, 36, 0.5)')

        expect(color.toRGB()).toEqual('rgb(255, 128, 36)')
        expect(color.to('rgb')).toEqual('rgb(255, 128, 36)')

        expect(color.toHSLA()).toEqual('hsla(25, 100%, 57%, 0.5)')
        expect(color.to('hsla')).toEqual('hsla(25, 100%, 57%, 0.5)')

        expect(color.toHEX()).toEqual('#ff8024')
        expect(color.to('hex')).toEqual('#ff8024')

        expect(color.to('name')).toEqual('#ff802480')

        color.val('#fff')
        expect(color.to('name')).toEqual('white')
      })

      test('from rgb', () => {
        const color = new Color(colorForm.rgb)
        expect(color.toRGBA()).toEqual('rgba(0, 0, 0, 1)')
        expect(color.toRGB()).toEqual('rgb(0, 0, 0)')
        expect(color.toHSLA()).toEqual('hsla(0, 0%, 0%, 1)')
        expect(color.toHEX()).toEqual('#000000')
        expect(color.toString()).toEqual('rgb(0, 0, 0)')
      })

      test('from name', () => {
        const color = new Color('red')

        expect(color.isValid()).toEqual(true)
        expect(color.toHEX()).toEqual('#ff0000')
        expect(color.format()).toEqual('NAME')
        expect(color.toString()).toEqual('red')
      })

      test('from transparent', () => {
        const color = new Color('transparent')

        expect(color.format()).toEqual('HEX')
        expect(color.toRGB()).toEqual('rgb(0, 0, 0)')
        expect(color.toRGBA()).toEqual('rgba(0, 0, 0, 0)')
        expect(color.toHSL()).toEqual('hsl(0, 0%, 0%)')
        expect(color.toHSLA()).toEqual('hsla(0, 0%, 0%, 0)')
        expect(color.toHEX()).toEqual('#000000')
        expect(color.toString()).toEqual('transparent')
      })

      test('from hex', () => {
        const color = new Color('#000000')

        expect(color.toRGBA()).toEqual('rgba(0, 0, 0, 1)')
        expect(color.toRGB()).toEqual('rgb(0, 0, 0)')
        expect(color.toHSLA()).toEqual('hsla(0, 0%, 0%, 1)')
        expect(color.toHEX()).toEqual('#000000')
        expect(color.toString()).toEqual('#000000')

        color.val('#fff')
        expect(color.toHEX()).toEqual('#ffffff')

        color.val('#323')
        expect(color.toHEX()).toEqual('#332233')
      })

      test('from hsl', () => {
        const color = new Color()

        color.val('#bada55')
        expect(color.toHSL()).toEqual('hsl(74, 64%, 59%)')

        color.val('#bad954')
        expect(color.toHSL()).toEqual('hsl(74, 64%, 59%)')

        color.val('hsl(74, 64%, 59%)')
        expect(color.toHEX()).toEqual('#bad954')

        color.val('#3d3d3d')
        expect(color.toHSL()).toEqual('hsl(0, 0%, 24%)')

        color.val('#3c3c3c')
        expect(color.toHSL()).toEqual('hsl(0, 0%, 24%)')

        color.val('#3d3d3d')
        expect(color.toHSL()).toEqual('hsl(0, 0%, 24%)')

        color.val('hsl(0, 0%, 24%)')
        expect(color.toHEX()).toEqual('#3d3d3d')

        color.val('rgb(75, 96, 6)')
        expect(color.toHSL()).toEqual('hsl(74, 88%, 20%)')

        color.val('hsl(74, 88%, 20%)')
        expect(color.toRGB()).toEqual('rgb(75, 96, 6)')

        color.val('rgba(117, 149, 9, 0.65)')
        expect(color.toHSLA()).toEqual('hsla(74, 89%, 31%, 0.65)')

        color.val('hsla(74, 89%, 31%, 0.65)')
        expect(color.toRGBA()).toEqual('rgba(117, 149, 9, 0.65)')

        color.val('rgb(35, 22, 204)')
        expect(color.toHSL()).toEqual('hsl(244, 81%, 44%)')

        color.val('rgb(33, 21, 203)')
        expect(color.toHSL()).toEqual('hsl(244, 81%, 44%)')

        color.val('hsl(244, 81%, 44%)')
        expect(color.toRGB()).toEqual('rgb(33, 21, 203)')
      })

      test('from #4fb9ee', () => {
        const color = new Color('#4fb9ee')

        expect(color.toRGB()).toEqual('rgb(79, 185, 238)')
        expect(color.toRGBA()).toEqual('rgba(79, 185, 238, 1)')
        expect(color.toHSL()).toEqual('hsl(200, 82%, 62%)')
        expect(color.toHSLA()).toEqual('hsla(200, 82%, 62%, 1)')
        expect(color.toHEX()).toEqual('#4fb9ee')
        expect(color.toString()).toEqual('#4fb9ee')
      })

      test('color #000000', () => {
        const color = new Color('#000000')

        expect(color.toRGB()).toEqual('rgb(0, 0, 0)')
        expect(color.toRGBA()).toEqual('rgba(0, 0, 0, 1)')
        expect(color.toHSL()).toEqual('hsl(0, 0%, 0%)')
        expect(color.toHSLA()).toEqual('hsla(0, 0%, 0%, 1)')
        expect(color.toHEX()).toEqual('#000000')
        expect(color.toString()).toEqual('#000000')
      })

      test('color #ffffff', () => {
        const color = new Color('#ffffff')

        expect(color.toRGB()).toEqual('rgb(255, 255, 255)')
        expect(color.toRGBA()).toEqual('rgba(255, 255, 255, 1)')
        expect(color.toHSL()).toEqual('hsl(0, 0%, 100%)')
        expect(color.toHSLA()).toEqual('hsla(0, 0%, 100%, 1)')
        expect(color.toHEX()).toEqual('#ffffff')
        expect(color.toString()).toEqual('#ffffff')
      })

      test('color rgb(255, 0, 6)', () => {
        const color = new Color('rgb(255, 0, 6)')

        expect(color.toRGB()).toEqual('rgb(255, 0, 6)')
        expect(color.toRGBA()).toEqual('rgba(255, 0, 6, 1)')
        expect(color.toHSL()).toEqual('hsl(359, 100%, 50%)')
        expect(color.toHSLA()).toEqual('hsla(359, 100%, 50%, 1)')
        expect(color.toHEX()).toEqual('#ff0006')
        expect(color.toString()).toEqual('rgb(255, 0, 6)')
      })

      test('color rgb(238, 79, 185)', () => {
        const color = new Color('rgb(238, 79, 185)')

        expect(color.toRGB()).toEqual('rgb(238, 79, 185)')
        expect(color.toRGBA()).toEqual('rgba(238, 79, 185, 1)')
        expect(color.toHSL()).toEqual('hsl(320, 82%, 62%)')
        expect(color.toHSLA()).toEqual('hsla(320, 82%, 62%, 1)')
        expect(color.toHEX()).toEqual('#ee4fb9')
        expect(color.toString()).toEqual('rgb(238, 79, 185)')
      })

      test('color hsl(244, 81%, 44%)', () => {
        const color = new Color('hsl(244, 81%, 44%)')

        expect(color.toRGB()).toEqual('rgb(33, 21, 203)')
        expect(color.toRGBA()).toEqual('rgba(33, 21, 203, 1)')
        expect(color.toHSL()).toEqual('hsl(244, 81%, 44%)')
        expect(color.toHSLA()).toEqual('hsla(244, 81%, 44%, 1)')
        expect(color.toHEX()).toEqual('#2115cb')
        expect(color.toString()).toEqual('hsl(244, 81%, 44%)')
      })
    })
  })
})
