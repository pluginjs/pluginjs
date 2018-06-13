import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import MapPicker from '@pluginjs/spinner'

const element = query('.example-input-value', render(html, query('#initvalue')))

MapPicker.of(element, {})
