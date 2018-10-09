import { query } from '@pluginjs/dom'
import ColorSelector from '@pluginjs/color-selector'
const element = query('#inline .inline')
ColorSelector.of(element, {
  displayMode: 'inline'
})
