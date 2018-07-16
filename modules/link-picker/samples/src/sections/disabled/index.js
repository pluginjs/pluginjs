import { query } from '@pluginjs/dom'
import LinkPicker from '@pluginjs/link-picker'

const element = query('#disabled .link-picker-locale')

LinkPicker.of(element, {
  locale: 'zh',
  disabled: true
})
