import { query } from '@pluginjs/dom'
import ColorSelector from '@pluginjs/color-selector'

const element = query('#solid .module-solid-gradient')
ColorSelector.of(element, {
  module: ['collection', 'solid']
})
