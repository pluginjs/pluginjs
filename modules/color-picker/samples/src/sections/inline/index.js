import { query } from '@pluginjs/dom'
import ColorPicker from '@pluginjs/color-picker'

const element = query('#inline .inline')
ColorPicker.of(element, {
  inline: true
})
