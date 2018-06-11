import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import BgPicker from '@pluginjs/bg-picker'

const element = query('.example-format', render(html, query('#format')))
BgPicker.of(element, {
  process() {
    return ''
  },

  parse() {
    return {}
  }
})
