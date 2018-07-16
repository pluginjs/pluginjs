import { query } from '@pluginjs/dom'
import ColorPicker from '@pluginjs/color-picker'

const element = query('#disabled .locale')
ColorPicker.of(element, {
  locale: 'zh',
  disabled: true
})
