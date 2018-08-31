import { query } from '@pluginjs/dom'
import LinkPicker from '@pluginjs/link-picker'

const element = query('#locale .link-picker-locale')
LinkPicker.of(element, {
  locale: 'zh'
})
