import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import ColorPicker from '@pluginjs/color-picker'

const element = query('.module-collection', render(html, query('#collection')))
ColorPicker.of(element, {
  module: ['collection']
})
