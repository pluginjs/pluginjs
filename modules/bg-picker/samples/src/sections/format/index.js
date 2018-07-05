import { query } from '@pluginjs/dom'
import BgPicker from '@pluginjs/bg-picker'

const element = query('#format .example-format')
BgPicker.of(element, {
  process() {
    return ''
  },

  parse() {
    return {}
  }
})
