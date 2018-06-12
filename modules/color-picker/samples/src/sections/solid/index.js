import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import ColorPicker from '@pluginjs/color-picker'

const element = query('.module-solid-gradient', render(html, query('#solid')))
ColorPicker.of(element, {
  module: ['solid', 'gradient']
})
