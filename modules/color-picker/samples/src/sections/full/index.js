import { query } from '@pluginjs/dom'
import ColorPicker from '@pluginjs/color-picker'

const element = query('#full .solid-full')
ColorPicker.of(element, {
  module: ['solid'],
  solidMode: 'full'
})
