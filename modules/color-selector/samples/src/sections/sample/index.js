import { query } from '@pluginjs/dom'
import ColorSelector from '@pluginjs/color-selector'

const element = query('#sample .solid-sample')
ColorSelector.of(element, {
  module: ['solid'],
  solidMode: 'sample'
})
