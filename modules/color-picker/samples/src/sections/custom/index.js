import { query } from '@pluginjs/dom'
import ColorPicker from '@pluginjs/color-picker'

const element = query('#custom .custom')
ColorPicker.of(element, {
  module: {
    saturation: true,
    hue: true,
    alpha: false,
    hex: true,
    history: false
  }
})
