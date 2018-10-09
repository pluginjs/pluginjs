import { query } from '@pluginjs/dom'
import ColorSelector from '@pluginjs/color-selector'

const element = query('#custom .solid-modules')
ColorSelector.of(element, {
  colorPicker: {
    module: {
      saturation: true,
      hue: true,
      alpha: false,
      hex: true,
      history: true
    }
  },
  gradientPicker: {
    colorPicker: {
      module: {
        saturation: true,
        hue: true,
        alpha: true,
        hex: false,
        history: true
      }
    }
  }
})
