import { query } from '@pluginjs/dom'
import ColorSelector from '@pluginjs/color-selector'

const element = query('#disabled .locale')
ColorSelector.of(element, {
  locale: 'zh',
  disabled: true
})
