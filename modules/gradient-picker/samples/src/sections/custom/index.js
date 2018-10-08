import { query } from '@pluginjs/dom'
import GradientPicker from '@pluginjs/gradient-picker'

const element = query('#custom .custom')
GradientPicker.of(element, {
  colorPicker: {
    module: {
      saturation: true,
      hue: true,
      alpha: false,
      hex: true,
      history: false
    }
  }
})
