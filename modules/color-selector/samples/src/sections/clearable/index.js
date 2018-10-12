import { query } from '@pluginjs/dom'
import ColorSelector from '@pluginjs/color-selector'

const element = query('#clearable .clearable')
ColorSelector.of(element, {
  locale: 'zh',
  clearable: true
})
