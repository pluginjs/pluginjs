import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import ColorPicker from '@pluginjs/color-picker'

const element = query('.input', render(html, query('#initialized')))
ColorPicker.of(element, {})
