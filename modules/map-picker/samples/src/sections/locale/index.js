import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import MapPicker from '@pluginjs/map-picker'

const element = query('.example-locale', render(html, query('#locale')))

MapPicker.of(element, { locale: 'zh' })