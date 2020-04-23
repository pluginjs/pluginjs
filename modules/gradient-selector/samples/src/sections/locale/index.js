import { query } from '@pluginjs/dom'
import GradientSelector from '@pluginjs/gradient-selector'

const element = query('#locale .example-locale')
GradientSelector.of(element, {
  locale: 'zh'
})
