import { query } from '@pluginjs/dom'
import BgPicker from '@pluginjs/bg-picker'

const element = query('#locale .example-locale')
BgPicker.of(element, {
  locale: 'zh'
})
