import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import ColorPicker from '@pluginjs/color-picker'

const element = query('.solid-full', render(html, query('#full')))
ColorPicker.of(element, {
  module: ['solid'],
  solidMode: 'full'
})
