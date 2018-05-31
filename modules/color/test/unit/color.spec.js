import Color from '../../src/color'

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
    it('should match hex', () => {
      expect(Color.matchString('')).to.be.equal(false)
      expect(Color.matchString('#')).to.be.equal(false)
      expect(Color.matchString('#3')).to.be.equal(false)
      expect(Color.matchString('#33')).to.be.equal(false)
      expect(Color.matchString('#333')).to.be.equal(true)
      expect(Color.matchString('#3333')).to.be.equal(false)
      expect(Color.matchString('#33333')).to.be.equal(false)
      expect(Color.matchString('#333333')).to.be.equal(true)
      expect(Color.matchString('#333333 ')).to.be.equal(true)
      expect(Color.matchString('#3333333')).to.be.equal(false)
    })

    it('should match rgb', () => {
      expect(Color.matchString('R')).to.be.equal(false)
      expect(Color.matchString('RG')).to.be.equal(false)
      expect(Color.matchString('RGB')).to.be.equal(false)
      expect(Color.matchString('RGB(')).to.be.equal(false)
      expect(Color.matchString('RGB(6')).to.be.equal(false)
      expect(Color.matchString('RGB(60,')).to.be.equal(false)
      expect(Color.matchString('RGB(60,6')).to.be.equal(false)
      expect(Color.matchString('RGB(60,60,')).to.be.equal(false)
      expect(Color.matchString('RGB(60,60,6')).to.be.equal(false)
      expect(Color.matchString('RGB(60,60,60')).to.be.equal(false)
      expect(Color.matchString('RGB(60,60,60)')).to.be.equal(true)
      expect(Color.matchString('RGB(60,60,60) ')).to.be.equal(true)
      expect(Color.matchString('RGB(60,60,60),')).to.be.equal(false)
    })

    it('should match rgba', () => {
      expect(Color.matchString('R')).to.be.equal(false)
      expect(Color.matchString('RG')).to.be.equal(false)
      expect(Color.matchString('RGB')).to.be.equal(false)
      expect(Color.matchString('RGBA(')).to.be.equal(false)
      expect(Color.matchString('RGBA(6')).to.be.equal(false)
      expect(Color.matchString('RGBA(60,')).to.be.equal(false)
      expect(Color.matchString('RGBA(60,6')).to.be.equal(false)
      expect(Color.matchString('RGBA(60,60,')).to.be.equal(false)
      expect(Color.matchString('RGBA(60,60,6')).to.be.equal(false)
      expect(Color.matchString('RGBA(60,60,60')).to.be.equal(false)
      expect(Color.matchString('RGBA(60,60,60,')).to.be.equal(false)
      expect(Color.matchString('RGBA(60,60,60,1')).to.be.equal(false)
      expect(Color.matchString('RGBA(60,60,60,1)')).to.be.equal(true)
      expect(Color.matchString('RGBA(60,60,60,1) ')).to.be.equal(true)
      expect(Color.matchString('RGBA(60,60,60,1),')).to.be.equal(false)
    })

    it('should match hsl', () => {
      expect(Color.matchString('H')).to.be.equal(false)
      expect(Color.matchString('HS')).to.be.equal(false)
      expect(Color.matchString('HSL')).to.be.equal(false)
      expect(Color.matchString('HSL(')).to.be.equal(false)
      expect(Color.matchString('HSL(0')).to.be.equal(false)
      expect(Color.matchString('HSL(0,')).to.be.equal(false)
      expect(Color.matchString('HSL(0,10')).to.be.equal(false)
      expect(Color.matchString('HSL(0,100')).to.be.equal(false)
      expect(Color.matchString('HSL(0,100%,')).to.be.equal(false)
      expect(Color.matchString('HSL(0,100%,50')).to.be.equal(false)
      expect(Color.matchString('HSL(0,100%,50%')).to.be.equal(false)
      expect(Color.matchString('HSL(0,100%,50%)')).to.be.equal(true)
      expect(Color.matchString('HSL(0,100%,50%) ')).to.be.equal(true)
      expect(Color.matchString('HSL(0,100%,50%),')).to.be.equal(false)
    })

    it('should match rgba', () => {
      expect(Color.matchString('H')).to.be.equal(false)
      expect(Color.matchString('HS')).to.be.equal(false)
      expect(Color.matchString('HSL')).to.be.equal(false)
      expect(Color.matchString('HSLA(')).to.be.equal(false)
      expect(Color.matchString('HSLA(0')).to.be.equal(false)
      expect(Color.matchString('HSLA(0,')).to.be.equal(false)
      expect(Color.matchString('HSLA(0,1')).to.be.equal(false)
      expect(Color.matchString('HSLA(0,10')).to.be.equal(false)
      expect(Color.matchString('HSLA(0,100')).to.be.equal(false)
      expect(Color.matchString('HSLA(0,100%')).to.be.equal(false)
      expect(Color.matchString('HSLA(0,100%,')).to.be.equal(false)
      expect(Color.matchString('HSLA(0,100%,5')).to.be.equal(false)
      expect(Color.matchString('HSLA(0,100%,50')).to.be.equal(false)
      expect(Color.matchString('HSLA(0,100%,50%')).to.be.equal(false)
      expect(Color.matchString('HSLA(0,100%,50%,')).to.be.equal(false)
      expect(Color.matchString('HSLA(0,100%,50%,1')).to.be.equal(false)
      expect(Color.matchString('HSLA(0,100%,50%,1)')).to.be.equal(true)
      expect(Color.matchString('HSLA(0,100%,50%,1) ')).to.be.equal(true)
      expect(Color.matchString('HSLA(0,100%,50%,1),')).to.be.equal(false)
    })

    it('should match transparent', () => {
      expect(Color.matchString('trans')).to.be.equal(false)
      expect(Color.matchString('transparent')).to.be.equal(true)
    })

    it('should match name', () => {
      expect(Color.matchString('w')).to.be.equal(false)
      expect(Color.matchString('wh')).to.be.equal(false)
      expect(Color.matchString('whi')).to.be.equal(false)
      expect(Color.matchString('whit')).to.be.equal(false)
      expect(Color.matchString('white')).to.be.equal(true)
      expect(Color.matchString('whitea')).to.be.equal(false)

      expect(Color.matchString('r')).to.be.equal(false)
      expect(Color.matchString('re')).to.be.equal(false)
      expect(Color.matchString('red')).to.be.equal(true)
      expect(Color.matchString('reda')).to.be.equal(false)
    })

    it('should call with instance', () => {
      const color = new Color('', 'HEX')

      expect(color.matchString('red')).to.be.equal(true)
    })
  })

  describe('toString()', () => {
    it('should to string correctly', () => {
      const color = new Color({
        format: false,
        alphaConvert: false
      })

      color.val('#123456')
      expect(color.toString()).to.be.equal('#123456')
      color.val('rgb(255,255,255)')
      expect(color.toString()).to.be.equal('rgb(255, 255, 255)')
      color.val('rgba(255,255,255,0.8)')
      expect(color.toString()).to.be.equal('rgba(255, 255, 255, 0.8)')
      color.val('hsl(0,0%,50%)')
      expect(color.toString()).to.be.equal('hsl(0, 0%, 50%)')
      color.val('hsla(0,0%,50%,0.8)')
      expect(color.toString()).to.be.equal('hsla(0, 0%, 50%, 0.8)')
      color.val('white')
      expect(color.toString()).to.be.equal('white')

      color.format('rgba')
      color.val('#123456')
      expect(color.toString()).to.be.equal('rgba(18, 52, 86, 1)')

      color.val('white')
      expect(color.toString()).to.be.equal('rgba(255, 255, 255, 1)')

      color.format('rgb')
      color.val('rgba(255,255,255,0.8)')
      expect(color.toString()).to.be.equal('rgb(255, 255, 255)')
    })

    it('should convent to alphaConvert if alpha is defined', () => {
      let color = new Color({
        format: false,
        alphaConvert: false
      })

      color.format('rgb')
      color.val('rgba(255,255,255,0.8)')
      expect(color.toString()).to.be.equal('rgb(255, 255, 255)')

      color = new Color({
        format: false,
        alphaConvert: 'RGBA'
      })

      color.format('rgb')
      color.val('rgba(255,255,255,0.8)')
      expect(color.toString()).to.be.equal('rgba(255, 255, 255, 0.8)')

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
      expect(color.toString()).to.be.equal('rgba(255, 255, 255, 0.8)')

      color.val('white')
      expect(color.toString()).to.be.equal('rgb(255, 255, 255)')
      color.alpha(0.8)
      expect(color.toString()).to.be.equal('rgba(255, 255, 255, 0.8)')

      color.val('#fff')
      expect(color.toString()).to.be.equal('rgb(255, 255, 255)')
      color.alpha(0.8)
      expect(color.toString()).to.be.equal('rgba(255, 255, 255, 0.8)')
    })

    it('should work with upper strings', () => {
      const color = new Color('#000000', 'HEX')

      expect(color.val('RGB(60,60,60)').toString()).to.be.equal('#3c3c3c')

      expect(color.val('RGBA(60,60,60,1)').toString()).to.be.equal('#3c3c3c')

      expect(color.val('HSL(0, 0%, 24%)').toString()).to.be.equal(
        '#3d3d3d'
      ) /* ! */

      expect(color.val('HSLA(0, 0%, 24%, 1)').toString()).to.be.equal(
        '#3d3d3d'
      ) /* ! */

      expect(color.val('TRANSPARENT').toString()).to.be.equal('transparent')
    })
  })

  it('should return #000000 if no value defined', () => {
    const color = new Color()

    expect(color.val()).to.be.equal('#000000')
    expect(color.get()).to.be.eql({
      r: 0,
      g: 0,
      b: 0,
      h: 0,
      s: 0,
      v: 0,
      a: 1
    })
    expect(color.format()).to.be.equal('HEX')
    expect(color.toString()).to.be.equal('#000000')
  })

  describe('options', () => {
    describe('nameDegradation', () => {
      it('should degradation to the format with options.nameDegradation if color dont have a name', () => {
        let color = new Color('#126782', { format: 'name' })

        expect(color.format()).to.be.equal('NAME')
        expect(color.toString()).to.be.equal('#126782')

        color = new Color('#126782', {
          format: 'name',
          nameDegradation: 'rgb'
        })

        expect(color.format()).to.be.equal('NAME')
        expect(color.toString()).to.be.equal('rgb(18, 103, 130)')
      })
    })

    describe('hexUseName', () => {
      it('should use name when from hex color', () => {
        let color = new Color('#8fbc8f', { hexUseName: false })
        expect(color.format()).to.be.equal('HEX')
        expect(color.toString()).to.be.equal('#8fbc8f')

        color = new Color('#8fbc8f', { hexUseName: true })
        expect(color.format()).to.be.equal('HEX')
        expect(color.toString()).to.be.equal('darkseagreen')
      })
    })

    describe('shortenHex', () => {
      it('should use short hex', () => {
        let color = new Color('#fff')
        expect(color.toString()).to.be.equal('#ffffff')

        color = new Color('#fff', { shortenHex: true })

        expect(color.format()).to.be.equal('HEX')
        expect(color.toString()).to.be.equal('#fff')
      })
    })

    describe('invalidValue', () => {
      it('should return the color when invalid', () => {
        let color = new Color('hello world', { invalidValue: '' })
        expect(color.toString()).to.be.equal('')

        color = new Color('hello world', {
          invalidValue: {
            r: 0,
            g: 0,
            b: 0,
            a: 1
          }
        })
        expect(color.toString()).to.be.equal('#000000')
      })
    })

    describe('reduceAlpha', () => {
      it('should reduce alpha', () => {
        let color = new Color('rgba(255,255,255,1)', { reduceAlpha: false })
        expect(color.toString()).to.be.equal('rgba(255, 255, 255, 1)')

        color = new Color('rgba(255,255,255,1)', { reduceAlpha: true })
        expect(color.toString()).to.be.equal('rgb(255, 255, 255)')

        color = new Color('hsla(0,0%,50%,1)', { reduceAlpha: false })
        expect(color.toString()).to.be.equal('hsla(0, 0%, 50%, 1)')

        color = new Color('hsla(0,0%,50%,1)', { reduceAlpha: true })
        expect(color.toString()).to.be.equal('hsl(0, 0%, 50%)')
      })
    })

    describe('zeroAlphaAsTransparent', () => {
      it('should use transparent when alpha equal zero', () => {
        let color = new Color('rgba(255,255,255,0)', {
          zeroAlphaAsTransparent: false
        })

        expect(color.toString()).to.be.equal('rgba(255, 255, 255, 0)')

        color = new Color('rgba(255,255,255,0)', {
          zeroAlphaAsTransparent: true
        })

        expect(color.toString()).to.be.equal('transparent')
      })
    })

    describe('instance', () => {
      it('val()', () => {
        const color = new Color('#000000', 'HEX')

        expect(color.val()).to.be.equal('#000000')

        expect(color.val('rgb(66, 50, 50)').toString()).to.be.equal('#423232')

        expect(color.val('rgba(66, 50, 50, 1)').toString()).to.be.equal(
          '#423232'
        )

        expect(color.val('hsl(0, 14%, 23%)').toString()).to.be.equal(
          '#433232'
        ) /* ! */

        expect(color.val('hsla(0, 14%, 23%, 1)').toString()).to.be.equal(
          '#433232'
        ) /* ! */

        expect(color.val('transparent').toString()).to.be.equal('transparent')
      })

      it('isValid()', () => {
        const color = new Color()
        color.val('#fff')

        expect(color.isValid()).to.be.equal(true)

        color.val('fff')

        expect(color.isValid()).to.be.equal(false)

        color.val('its not valid')

        expect(color.isValid()).to.be.equal(false)
      })

      it('format()', () => {
        let color = new Color()
        expect(color.format()).to.be.equal('HEX')

        color = new Color('#000000')
        expect(color.format()).to.be.equal('HEX')

        color = new Color('rgb(0, 0, 0)')
        expect(color.format()).to.be.equal('RGB')

        color = new Color('rgba(0, 0, 0, 1)')
        expect(color.format()).to.be.equal('RGBA')

        color = new Color('hsl(59, 100%, 50%)')
        expect(color.format()).to.be.equal('HSL')

        color = new Color('hsla(59, 100%, 50%, 1)')
        expect(color.format()).to.be.equal('HSLA')

        color = new Color('#000000', 'rgba')
        expect(color.format()).to.be.equal('RGBA')

        color.format('rgb')
        expect(color.format()).to.be.equal('RGB')

        color.format('rgba')
        expect(color.format()).to.be.equal('RGBA')

        color.format('hsl')
        expect(color.format()).to.be.equal('HSL')

        color.format('hsla')
        expect(color.format()).to.be.equal('HSLA')

        color.format('hex')
        expect(color.format()).to.be.equal('HEX')
      })

      it('set()', () => {
        const color = new Color()
        color.set({
          r: 255,
          g: 255,
          b: 255
        })
        expect(color.toHEX()).to.be.equal('#ffffff')

        color.set({
          r: 255,
          g: 255,
          b: 255,
          a: 0.5
        })
        expect(color.toRGB()).to.be.equal('rgb(255, 255, 255)')
        expect(color.toRGBA()).to.be.equal('rgba(255, 255, 255, 0.5)')
        expect(color.toHSLA()).to.be.equal('hsla(0, 0%, 100%, 0.5)')

        color.set({
          h: 0,
          s: 0,
          v: 1,
          a: 0.5
        })
        expect(color.toRGBA()).to.be.equal('rgba(255, 255, 255, 0.5)')
        expect(color.toHSLA()).to.be.equal('hsla(0, 0%, 100%, 0.5)')

        color.set({
          h: 1,
          s: 0,
          v: 1,
          a: 0.5
        })
        expect(color.toRGBA()).to.be.equal('rgba(255, 255, 255, 0.5)')
        expect(color.toHSLA()).to.be.equal('hsla(0, 0%, 100%, 0.5)')
      })

      it('get()', () => {
        const color = new Color('rgba(0, 0, 0, 1)')
        expect(color.get()).to.be.eql({
          r: 0,
          g: 0,
          b: 0,
          h: 0,
          s: 0,
          v: 0,
          a: 1
        })

        color.val('hsla(0, 0%, 100%, 0.5)')
        expect(color.get()).to.be.eql({
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
        expect(color.get()).to.be.eql({
          r: 255,
          g: 246,
          b: 0,
          h: 58,
          s: 1,
          v: 1,
          a: 1
        })
      })

      it('alpha()', () => {
        const color = new Color('#8c9cdf', 'rgba')

        expect(color.alpha()).to.be.equal(1)
        expect(color.toRGBA()).to.be.equal('rgba(140, 156, 223, 1)')
        expect(color.toHSLA()).to.be.equal('hsla(228, 56%, 71%, 1)')

        color.alpha(0.5)
        expect(color.alpha()).to.be.equal(0.5)
        expect(color.toRGBA()).to.be.equal('rgba(140, 156, 223, 0.5)')
        expect(color.toHSLA()).to.be.equal('hsla(228, 56%, 71%, 0.5)')

        color.alpha(5)
        expect(color.alpha()).to.be.equal(1)

        color.alpha(-5)
        expect(color.alpha()).to.be.equal(0)

        color.alpha('1')
        expect(color.alpha()).to.be.equal(1)

        color.alpha('abc')
        expect(color.alpha()).to.be.equal(1)
      })

      it('to()', () => {
        const color = new Color('rgba(255, 128, 36, 0.5)')

        expect(color.toRGBA()).to.be.equal('rgba(255, 128, 36, 0.5)')
        expect(color.to('rgba')).to.be.equal('rgba(255, 128, 36, 0.5)')

        expect(color.toRGB()).to.be.equal('rgb(255, 128, 36)')
        expect(color.to('rgb')).to.be.equal('rgb(255, 128, 36)')

        expect(color.toHSLA()).to.be.equal('hsla(25, 100%, 57%, 0.5)')
        expect(color.to('hsla')).to.be.equal('hsla(25, 100%, 57%, 0.5)')

        expect(color.toHEX()).to.be.equal('#ff8024')
        expect(color.to('hex')).to.be.equal('#ff8024')

        expect(color.to('name')).to.be.equal('#ff8024')

        color.val('#fff')
        expect(color.to('name')).to.be.equal('white')
      })

      it('from rgb', () => {
        const color = new Color(colorForm.rgb)
        expect(color.toRGBA()).to.be.equal('rgba(0, 0, 0, 1)')
        expect(color.toRGB()).to.be.equal('rgb(0, 0, 0)')
        expect(color.toHSLA()).to.be.equal('hsla(0, 0%, 0%, 1)')
        expect(color.toHEX()).to.be.equal('#000000')
        expect(color.toString()).to.be.equal('rgb(0, 0, 0)')
      })

      it('from name', () => {
        const color = new Color('red')

        expect(color.isValid()).to.be.equal(true)
        expect(color.toHEX()).to.be.equal('#ff0000')
        expect(color.format()).to.be.equal('NAME')
        expect(color.toString()).to.be.equal('red')
      })

      it('from transparent', () => {
        const color = new Color('transparent')

        expect(color.format()).to.be.equal('HEX')
        expect(color.toRGB()).to.be.equal('rgb(0, 0, 0)')
        expect(color.toRGBA()).to.be.equal('rgba(0, 0, 0, 0)')
        expect(color.toHSL()).to.be.equal('hsl(0, 0%, 0%)')
        expect(color.toHSLA()).to.be.equal('hsla(0, 0%, 0%, 0)')
        expect(color.toHEX()).to.be.equal('#000000')
        expect(color.toString()).to.be.equal('transparent')
      })

      it('from hex', () => {
        const color = new Color('#000000')

        expect(color.toRGBA()).to.be.equal('rgba(0, 0, 0, 1)')
        expect(color.toRGB()).to.be.equal('rgb(0, 0, 0)')
        expect(color.toHSLA()).to.be.equal('hsla(0, 0%, 0%, 1)')
        expect(color.toHEX()).to.be.equal('#000000')
        expect(color.toString()).to.be.equal('#000000')

        color.val('#fff')
        expect(color.toHEX()).to.be.equal('#ffffff')

        color.val('#323')
        expect(color.toHEX()).to.be.equal('#332233')
      })

      it('from hsl', () => {
        const color = new Color()

        color.val('#bada55')
        expect(color.toHSL()).to.be.equal('hsl(74, 64%, 59%)')

        color.val('#bad954')
        expect(color.toHSL()).to.be.equal('hsl(74, 64%, 59%)')

        color.val('hsl(74, 64%, 59%)')
        expect(color.toHEX()).to.be.equal('#bad954')

        color.val('#3d3d3d')
        expect(color.toHSL()).to.be.equal('hsl(0, 0%, 24%)')

        color.val('#3c3c3c')
        expect(color.toHSL()).to.be.equal('hsl(0, 0%, 24%)')

        color.val('#3d3d3d')
        expect(color.toHSL()).to.be.equal('hsl(0, 0%, 24%)')

        color.val('hsl(0, 0%, 24%)')
        expect(color.toHEX()).to.be.equal('#3d3d3d')

        color.val('rgb(75, 96, 6)')
        expect(color.toHSL()).to.be.equal('hsl(74, 88%, 20%)')

        color.val('hsl(74, 88%, 20%)')
        expect(color.toRGB()).to.be.equal('rgb(75, 96, 6)')

        color.val('rgba(117, 149, 9, 0.65)')
        expect(color.toHSLA()).to.be.equal('hsla(74, 89%, 31%, 0.65)')

        color.val('hsla(74, 89%, 31%, 0.65)')
        expect(color.toRGBA()).to.be.equal('rgba(117, 149, 9, 0.65)')

        color.val('rgb(35, 22, 204)')
        expect(color.toHSL()).to.be.equal('hsl(244, 81%, 44%)')

        color.val('rgb(33, 21, 203)')
        expect(color.toHSL()).to.be.equal('hsl(244, 81%, 44%)')

        color.val('hsl(244, 81%, 44%)')
        expect(color.toRGB()).to.be.equal('rgb(33, 21, 203)')
      })

      it('from #4fb9ee', () => {
        const color = new Color('#4fb9ee')

        expect(color.toRGB()).to.be.equal('rgb(79, 185, 238)')
        expect(color.toRGBA()).to.be.equal('rgba(79, 185, 238, 1)')
        expect(color.toHSL()).to.be.equal('hsl(200, 82%, 62%)')
        expect(color.toHSLA()).to.be.equal('hsla(200, 82%, 62%, 1)')
        expect(color.toHEX()).to.be.equal('#4fb9ee')
        expect(color.toString()).to.be.equal('#4fb9ee')
      })

      it('color #000000', () => {
        const color = new Color('#000000')

        expect(color.toRGB()).to.be.equal('rgb(0, 0, 0)')
        expect(color.toRGBA()).to.be.equal('rgba(0, 0, 0, 1)')
        expect(color.toHSL()).to.be.equal('hsl(0, 0%, 0%)')
        expect(color.toHSLA()).to.be.equal('hsla(0, 0%, 0%, 1)')
        expect(color.toHEX()).to.be.equal('#000000')
        expect(color.toString()).to.be.equal('#000000')
      })

      it('color #ffffff', () => {
        const color = new Color('#ffffff')

        expect(color.toRGB()).to.be.equal('rgb(255, 255, 255)')
        expect(color.toRGBA()).to.be.equal('rgba(255, 255, 255, 1)')
        expect(color.toHSL()).to.be.equal('hsl(0, 0%, 100%)')
        expect(color.toHSLA()).to.be.equal('hsla(0, 0%, 100%, 1)')
        expect(color.toHEX()).to.be.equal('#ffffff')
        expect(color.toString()).to.be.equal('#ffffff')
      })

      it('color rgb(255, 0, 6)', () => {
        const color = new Color('rgb(255, 0, 6)')

        expect(color.toRGB()).to.be.equal('rgb(255, 0, 6)')
        expect(color.toRGBA()).to.be.equal('rgba(255, 0, 6, 1)')
        expect(color.toHSL()).to.be.equal('hsl(359, 100%, 50%)')
        expect(color.toHSLA()).to.be.equal('hsla(359, 100%, 50%, 1)')
        expect(color.toHEX()).to.be.equal('#ff0006')
        expect(color.toString()).to.be.equal('rgb(255, 0, 6)')
      })

      it('color rgb(238, 79, 185)', () => {
        const color = new Color('rgb(238, 79, 185)')

        expect(color.toRGB()).to.be.equal('rgb(238, 79, 185)')
        expect(color.toRGBA()).to.be.equal('rgba(238, 79, 185, 1)')
        expect(color.toHSL()).to.be.equal('hsl(320, 82%, 62%)')
        expect(color.toHSLA()).to.be.equal('hsla(320, 82%, 62%, 1)')
        expect(color.toHEX()).to.be.equal('#ee4fb9')
        expect(color.toString()).to.be.equal('rgb(238, 79, 185)')
      })

      it('color hsl(244, 81%, 44%)', () => {
        const color = new Color('hsl(244, 81%, 44%)')

        expect(color.toRGB()).to.be.equal('rgb(33, 21, 203)')
        expect(color.toRGBA()).to.be.equal('rgba(33, 21, 203, 1)')
        expect(color.toHSL()).to.be.equal('hsl(244, 81%, 44%)')
        expect(color.toHSLA()).to.be.equal('hsla(244, 81%, 44%, 1)')
        expect(color.toHEX()).to.be.equal('#2115cb')
        expect(color.toString()).to.be.equal('hsl(244, 81%, 44%)')
      })
    })
  })
})
