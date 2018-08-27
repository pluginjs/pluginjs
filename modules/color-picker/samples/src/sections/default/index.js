import { query } from '@pluginjs/dom'
import ColorPicker from '@pluginjs/color-picker'
const element = query('#default .solid-default')
ColorPicker.of(element, {
  module: ['solid'],
  solidMode: 'default'
})
