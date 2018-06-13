import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Offset from '@pluginjs/offset'

const element = query('.example-attribute', render(html, query('#attribute')))

Offset.of(element, {})
