import { query } from '@pluginjs/dom'
import GradientPicker from '@pluginjs/gradient-picker'

const element = query('#disable .locale')
GradientPicker.of(element, {
  locale: 'zh',
  disabled: true
})
