import { query } from '@pluginjs/dom'
import ColorPicker from '@pluginjs/color-picker'
console.log(1)
const element = query('#default .solid-default')
console.log(1)
ColorPicker.of(element, {
  module: ['solid'],
  solidMode: 'default'
})
console.log(1)
