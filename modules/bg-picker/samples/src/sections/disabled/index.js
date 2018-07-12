import { query } from '@pluginjs/dom'
import BgPicker from '@pluginjs/bg-picker'

const element = query('#disabled   .example-disabled')
BgPicker.of(element, {
  process() {
    return ''
  },

  parse() {
    return {}
  },
  disabled: true
})
