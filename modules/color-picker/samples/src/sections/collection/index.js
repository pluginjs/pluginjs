import { query } from '@pluginjs/dom'
import ColorPicker from '@pluginjs/color-picker'

const element = query('#collection .module-collection')
ColorPicker.of(element, {
  module: ['collection']
})
