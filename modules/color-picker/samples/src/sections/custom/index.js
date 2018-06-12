import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import ColorPicker from '@pluginjs/color-picker'

const element = query('.solid-modules', render(html, query('#custom')))
ColorPicker.of(element, {
  module: ['solid'],
  solidModule: {
    saturation: true,
    hue: true,
    alpha: false,
    hex: false
  }
})
