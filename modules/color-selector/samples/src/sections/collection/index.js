import { query } from '@pluginjs/dom'
import ColorSelector from '@pluginjs/color-selector'

const element = query('#collection .module-collection')
ColorSelector.of(element, {
  module: ['collection']
})
