import { query } from '@pluginjs/dom'
import ColorSelector from '@pluginjs/color-selector'

const element = query('#locale .locale')
ColorSelector.of(element, {
  locale: 'zh'
})
