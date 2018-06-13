import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import MapPicker from '@pluginjs/spinner'

const element = query('.example-default', render(html, query('#default')))

MapPicker.of(element, {})
