import { query } from '@pluginjs/dom'
import ColorPicker from '@pluginjs/color-picker'

const element = query('#sample .solid-sample')
ColorPicker.of(element, {
  module: ['solid'],
  solidMode: 'sample'
})
