import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import IconPicker from '@pluginjs/icon-picker'

const element = query('.example-empty', render(html, query('#empty')))
IconPicker.of(element, {})
