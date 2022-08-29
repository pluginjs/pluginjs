export const namespace = 'color'

export const defaults = {
  format: false,
  shortenHex: false,
  hexUseName: false,
  reduceAlpha: false,
  alphaConvert: {
    // or false will disable convert
    RGB: 'RGBA',
    HSL: 'HSLA',
    HEX: 'RGBA',
    NAME: 'RGBA'
  },
  nameDegradation: 'HEX',
  invalidValue: '',
  zeroAlphaAsTransparent: true
}
