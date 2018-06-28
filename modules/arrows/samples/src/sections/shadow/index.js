import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Arrows from '@pluginjs/arrows'

const element = query('.example-shadow', render(html, query('#shadow')))
Arrows.of(element, {
  type: 'circle shadow'
})
