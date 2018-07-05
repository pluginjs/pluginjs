import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Thumbnails from '@pluginjs/thumbnails'

const element = query('.thumbnails', render(html, query('#vertical')))
Thumbnails.of(element, {})
