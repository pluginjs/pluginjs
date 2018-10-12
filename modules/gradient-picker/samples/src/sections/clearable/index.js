import { query } from '@pluginjs/dom'
import GradientPicker from '@pluginjs/gradient-picker'

const element = query('#clearable .clearable')
GradientPicker.of(element, {
  clearable: true
})
