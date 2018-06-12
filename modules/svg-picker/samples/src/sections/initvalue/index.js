import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import SvgPicker from '@pluginjs/svg-picker'

const element = query('.example-input', render(html, query('#initvalue')))

SvgPicker.of(element, {})
