import { query } from '@pluginjs/dom'
import ColorSelector from '@pluginjs/color-selector'

const element = query('#no-gradient .no-gradient')
ColorSelector.of(element, {
  gradient: false
})
