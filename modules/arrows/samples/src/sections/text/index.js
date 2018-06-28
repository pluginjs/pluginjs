import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Arrows from '@pluginjs/arrows'

const element = query('.example-text', render(html, query('#text')))
Arrows.of(element, {
  valueFrom: 'text'
})
