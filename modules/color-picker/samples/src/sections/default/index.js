import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import ColorPicker from '@pluginjs/color-picker'

const element = query('.solid-default', render(html, query('#default')))
ColorPicker.of(element, {
  module: ['solid'],
  solidMode: 'default'
})
