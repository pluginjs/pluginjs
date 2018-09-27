import { query } from '@pluginjs/dom'
import ColorSelector from '@pluginjs/color-selector'
const element = query('#default .solid-default')
ColorSelector.of(element, {
  module: ['solid'],
  solidMode: 'default'
})
