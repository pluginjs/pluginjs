import { query } from '@pluginjs/dom'
import ColorSelector from '@pluginjs/color-selector'

const element = query('#custom .solid-modules')
ColorSelector.of(element, {
  module: ['solid'],
  solidModule: {
    saturation: true,
    hue: true,
    alpha: false,
    hex: true
  }
})
