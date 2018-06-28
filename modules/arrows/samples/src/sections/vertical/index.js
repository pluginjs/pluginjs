import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Arrows from '@pluginjs/arrows'

const element = query('.example-vertical', render(html, query('#vertical')))
Arrows.of(element, {
  direction: 'vertical'
})
