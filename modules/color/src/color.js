import is from '@pluginjs/is'
import ColorStrings from './colorStrings'
import Converter from './converter'
import { defaults as DEFAULTS } from './constant'
import { deepMerge } from '@pluginjs/utils'

class Color {
  constructor(string, options) {
    if (is.object(string) && is.undefined(options)) {
      options = string
      string = undefined
    }
    if (is.string(options)) {
      options = { format: options }
    }
    this.options = deepMerge(DEFAULTS, options)
    this.value = {
      r: 0,
      g: 0,
      b: 0,
      h: 0,
      s: 0,
      v: 0,
      a: 1
    }
    this.privateFormat = false
    this.privateMatchFormat = 'HEX'
    this.privateValid = true

    this.init(string)
  }

  init(string) {
    this.format(this.options.format)
    this.fromString(string)
    return this
  }

  isValid() {
    return this.privateValid
  }

  val(value) {
    if (is.undefined(value)) {
      return this.toString()
    }
    this.fromString(value)
    return this
  }

  alpha(value) {
    if (is.undefined(value) || isNaN(value)) {
      return this.value.a
    }

    value = parseFloat(value)

    if (value > 1) {
      value = 1
    } else if (value < 0) {
      value = 0
    }
    this.value.a = value
    return this
  }

  matchString(string) {
    return Color.matchString(string)
  }

  fromString(string, updateFormat) {
    if (is.string(string)) {
      string = string.trim()
      let matched = null
      let rgb
      this.privateValid = false
      for (let i in ColorStrings) {
        if ((matched = ColorStrings[i].match.exec(string)) !== null) {
          rgb = ColorStrings[i].parse(matched)

          if (rgb) {
            this.set(rgb)
            if (i === 'TRANSPARENT') {
              i = 'HEX'
            }
            this.privateMatchFormat = i
            if (updateFormat === true) {
              this.format(i)
            }
            break
          }
        }
      }
    } else if (is.object(string)) {
      this.set(string)
    }
    return this
  }

  format(format) {
    if (
      is.string(format) &&
      (format = format.toUpperCase()) &&
      !is.undefined(ColorStrings[format])
    ) {
      if (format !== 'TRANSPARENT') {
        this.privateFormat = format
      } else {
        this.privateFormat = 'HEX'
      }
    } else if (format === false) {
      this.privateFormat = false
    }
    if (this.privateFormat === false) {
      return this.privateMatchFormat
    }
    return this.privateFormat
  }

  toRGBA() {
    return ColorStrings.RGBA.to(this.value, this)
  }

  toRGB() {
    return ColorStrings.RGB.to(this.value, this)
  }

  toHSLA() {
    return ColorStrings.HSLA.to(this.value, this)
  }

  toHSL() {
    return ColorStrings.HSL.to(this.value, this)
  }

  toHEX() {
    return ColorStrings.HEX.to(this.value, this)
  }

  toNAME() {
    return ColorStrings.NAME.to(this.value, this)
  }

  to(format) {
    if (
      is.string(format) &&
      (format = format.toUpperCase()) &&
      !is.undefined(ColorStrings[format])
    ) {
      return ColorStrings[format].to(this.value, this)
    }
    return this.toString()
  }

  toString() {
    let value = this.value
    if (!this.privateValid) {
      value = this.options.invalidValue

      if (is.string(value)) {
        return value
      }
    }

    if (value.a === 0 && this.options.zeroAlphaAsTransparent) {
      return ColorStrings.TRANSPARENT.to(value, this)
    }

    let format
    if (this.privateFormat === false) {
      format = this.privateMatchFormat
    } else {
      format = this.privateFormat
    }

    if (this.options.reduceAlpha && value.a === 1) {
      switch (format) {
        case 'RGBA':
          format = 'RGB'
          break
        case 'HSLA':
          format = 'HSL'
          break
        default:
          break
      }
    }

    if (
      value.a !== 1 &&
      format !== 'RGBA' &&
      format !== 'HSLA' &&
      this.options.alphaConvert
    ) {
      if (is.string(this.options.alphaConvert)) {
        format = this.options.alphaConvert
      }
      if (!is.undefined(this.options.alphaConvert[format])) {
        format = this.options.alphaConvert[format]
      }
    }
    return ColorStrings[format].to(value, this)
  }

  get() {
    return this.value
  }

  set(color) {
    this.privateValid = true
    let fromRgb = 0
    let fromHsv = 0
    let hsv
    let rgb

    for (const i in color) {
      if ('hsv'.includes(i)) {
        fromHsv++
        this.value[i] = color[i]
      } else if ('rgb'.includes(i)) {
        fromRgb++
        this.value[i] = color[i]
      } else if (i === 'a') {
        this.value.a = color.a
      }
    }
    if (fromRgb > fromHsv) {
      hsv = Converter.RGBtoHSV(this.value)
      if (this.value.r === 0 && this.value.g === 0 && this.value.b === 0) {
        // this.value.h = color.h;
      } else {
        this.value.h = hsv.h
      }

      this.value.s = hsv.s
      this.value.v = hsv.v
    } else if (fromHsv > fromRgb) {
      rgb = Converter.HSVtoRGB(this.value)
      this.value.r = rgb.r
      this.value.g = rgb.g
      this.value.b = rgb.b
    }
    return this
  }

  static matchString(string) {
    if (is.string(string)) {
      string = string.trim()
      let matched = null
      let rgb
      for (const i in ColorStrings) {
        if ((matched = ColorStrings[i].match.exec(string)) !== null) {
          rgb = ColorStrings[i].parse(matched)

          if (rgb) {
            return true
          }
        }
      }
    }
    return false
  }

  static setDefaults(options) {
    Object.assign(DEFAULTS, options)
  }
}

export default Color
