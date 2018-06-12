import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import ColorPicker from '@pluginjs/color-picker'

const element = query('.solid-sample', render(html, query('#sample')))
ColorPicker.of(element, {
  module: ['solid'],
  solidMode: 'sample'
})
