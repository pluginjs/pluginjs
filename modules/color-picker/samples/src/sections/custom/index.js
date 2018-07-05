import { query } from '@pluginjs/dom'
import ColorPicker from '@pluginjs/color-picker'

const element = query('#custom .solid-modules')
ColorPicker.of(element, {
  module: ['solid'],
  solidModule: {
    saturation: true,
    hue: true,
    alpha: false,
    hex: false
  }
})
