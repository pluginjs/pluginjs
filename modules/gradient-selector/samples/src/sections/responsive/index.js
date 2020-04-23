import { query } from '@pluginjs/dom'
import GradientSelector from '@pluginjs/gradient-selector'

const element = query('#responsive .example-responsive')
GradientSelector.of(element, {
  responsiveDropdownFull: true
})
