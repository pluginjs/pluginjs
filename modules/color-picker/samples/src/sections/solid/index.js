import { query } from '@pluginjs/dom'
import ColorPicker from '@pluginjs/color-picker'

const element = query('#solid .module-solid-gradient')
ColorPicker.of(element, {
  module: ['solid', 'gradient']
})
