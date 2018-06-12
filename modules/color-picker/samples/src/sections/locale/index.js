import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import ColorPicker from '@pluginjs/color-picker'

const element = query('.locale', render(html, query('#locale')))
ColorPicker.of(element, {
  locale: 'zh'
})
