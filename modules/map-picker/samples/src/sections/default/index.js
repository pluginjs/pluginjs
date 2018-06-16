import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import MapPicker from '@pluginjs/map-picker'

const element = query('.example-default', render(html, query('#default')))

const address = 'fuzhou'

MapPicker.of(element, { address })
