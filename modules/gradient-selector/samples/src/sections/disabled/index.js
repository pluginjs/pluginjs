import { query } from '@pluginjs/dom'
import GradientSelector from '@pluginjs/gradient-selector'

const element = query('#disabled .example-locale')
GradientSelector.of(element, {
  locale: 'zh',
  disabled: true
})
