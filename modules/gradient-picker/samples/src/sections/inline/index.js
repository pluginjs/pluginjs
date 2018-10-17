import { query } from '@pluginjs/dom'
import GradientPicker from '@pluginjs/gradient-picker'

const element = query('#inline .inline')
GradientPicker.of(element, {
  inline: true
})
