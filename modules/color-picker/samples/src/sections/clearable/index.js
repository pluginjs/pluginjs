import { query } from '@pluginjs/dom'
import ColorPicker from '@pluginjs/color-picker'

const element = query('#clearable .clearable')
ColorPicker.of(element, {
  clearable: true
})
