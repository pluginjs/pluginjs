import { isPercentage } from '@pluginjs/is'
import { convertPercentageToFloat } from '@pluginjs/utils'
import * as util from './util'
import Converter from './converter'

const CSS_INTEGER = '[-\\+]?\\d+%?'
const CSS_NUMBER = '[-\\+]?\\d*\\.\\d+%?'
const CSS_UNIT = `(?:${CSS_NUMBER})|(?:${CSS_INTEGER})`

const PERMISSIVE_MATCH3 = `[\\s|\\(]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})\\s*\\)`
const PERMISSIVE_MATCH4 = `[\\s|\\(]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})\\s*\\)`

const ColorStrings = {
  RGB: {
    match: new RegExp(`^rgb${PERMISSIVE_MATCH3}$`, 'i'),
    parse(result) {
      return {
        r: isPercentage(result[1])
          ? util.conventPercentageToRgb(result[1])
          : parseInt(result[1], 10),
        g: isPercentage(result[2])
          ? util.conventPercentageToRgb(result[2])
          : parseInt(result[2], 10),
        b: isPercentage(result[3])
          ? util.conventPercentageToRgb(result[3])
          : parseInt(result[3], 10),
        a: 1
      }
    },
    to(color) {
      return `rgb(${color.r}, ${color.g}, ${color.b})`
    }
  },
  RGBA: {
    match: new RegExp(`^rgba${PERMISSIVE_MATCH4}$`, 'i'),
    parse(result) {
      return {
        r: isPercentage(result[1])
          ? util.conventPercentageToRgb(result[1])
          : parseInt(result[1], 10),
        g: isPercentage(result[2])
          ? util.conventPercentageToRgb(result[2])
          : parseInt(result[2], 10),
        b: isPercentage(result[3])
          ? util.conventPercentageToRgb(result[3])
          : parseInt(result[3], 10),
        a: isPercentage(result[4])
          ? convertPercentageToFloat(result[4])
          : parseFloat(result[4], 10)
      }
    },
    to(color) {
      return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
    }
  },
  HSL: {
    match: new RegExp(`^hsl${PERMISSIVE_MATCH3}$`, 'i'),
    parse(result) {
      const hsl = {
        h: ((result[1] % 360) + 360) % 360,
        s: isPercentage(result[2])
          ? convertPercentageToFloat(result[2])
          : parseFloat(result[2], 10),
        l: isPercentage(result[3])
          ? convertPercentageToFloat(result[3])
          : parseFloat(result[3], 10),
        a: 1
      }

      return Converter.HSLtoRGB(hsl)
    },
    to(color) {
      const hsl = Converter.RGBtoHSL(color)
      return `hsl(${parseInt(hsl.h, 10)}, ${Math.round(
        hsl.s * 100
      )}%, ${Math.round(hsl.l * 100)}%)`
    }
  },
  HSLA: {
    match: new RegExp(`^hsla${PERMISSIVE_MATCH4}$`, 'i'),
    parse(result) {
      const hsla = {
        h: ((result[1] % 360) + 360) % 360,
        s: isPercentage(result[2])
          ? convertPercentageToFloat(result[2])
          : parseFloat(result[2], 10),
        l: isPercentage(result[3])
          ? convertPercentageToFloat(result[3])
          : parseFloat(result[3], 10),
        a: isPercentage(result[4])
          ? convertPercentageToFloat(result[4])
          : parseFloat(result[4], 10)
      }

      return Converter.HSLtoRGB(hsla)
    },
    to(color) {
      const hsl = Converter.RGBtoHSL(color)
      return `hsla(${parseInt(hsl.h, 10)}, ${Math.round(
        hsl.s * 100
      )}%, ${Math.round(hsl.l * 100)}%, ${color.a})`
    }
  },
  HEXA: {
    match: /^#([a-f0-9]{8})$/i,
    parse(result) {
      const hex = result[0]
      const rgb = Converter.HEXtoRGB(hex)

      return {
        r: rgb.r,
        g: rgb.g,
        b: rgb.b,
        a: rgb.a
      }
    },
    to(color, instance) {
      let hex = Converter.RGBtoHEXA(color)

      if (instance) {
        if (instance.options.hexUseName) {
          const hasName = Converter.hasNAME(color)
          if (hasName) {
            return hasName
          }
        }
        if (instance.options.shortenHex) {
          hex = util.shrinkHex(hex)
        }
      }
      return `${hex}`
    }
  },
  HEX: {
    match: /^#([a-f0-9]{6}|[a-f0-9]{3})$/i,
    parse(result) {
      const hex = result[0]
      const rgb = Converter.HEXtoRGB(hex)
      return {
        r: rgb.r,
        g: rgb.g,
        b: rgb.b,
        a: rgb.a
      }
    },
    to(color, instance) {
      let hex = Converter.RGBtoHEX(color)

      if (instance) {
        if (instance.options.hexUseName) {
          const hasName = Converter.hasNAME(color)
          if (hasName) {
            return hasName
          }
        }
        if (instance.options.shortenHex) {
          hex = util.shrinkHex(hex)
        }
      }
      return `${hex}`
    }
  },
  TRANSPARENT: {
    match: /^transparent$/i,
    parse() {
      return {
        r: 0,
        g: 0,
        b: 0,
        a: 0
      }
    },
    to() {
      return 'transparent'
    }
  },
  NAME: {
    match: /^\w+$/i,
    parse(result) {
      const rgb = Converter.NAMEtoRGB(result[0])
      if (rgb) {
        return {
          r: rgb.r,
          g: rgb.g,
          b: rgb.b,
          a: 1
        }
      }

      return null
    },
    to(color, instance) {
      const name = Converter.RGBtoNAME(color)

      if (name) {
        return name
      }

      const type = instance.options.nameDegradation.toUpperCase()
      return ColorStrings[color.a === 1 ? type : `${type}A`].to(color)
    }
  }
}

export default ColorStrings
