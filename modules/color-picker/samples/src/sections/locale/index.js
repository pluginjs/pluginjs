import { query } from '@pluginjs/dom'
import ColorPicker from '@pluginjs/color-picker'

const element = query('#locale .locale')
ColorPicker.of(element, {
  locale: 'zh'
})
