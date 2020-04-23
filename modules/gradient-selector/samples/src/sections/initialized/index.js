import { query } from '@pluginjs/dom'
import GradientSelector from '@pluginjs/gradient-selector'

const element = query('#initialized .example-input')
GradientSelector.of(element, {})
