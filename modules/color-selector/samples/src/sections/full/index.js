import { query } from '@pluginjs/dom'
import ColorSelector from '@pluginjs/color-selector'

const element = query('#full .solid-full')
ColorSelector.of(element, {
  module: ['solid'],
  solidMode: 'full'
})
