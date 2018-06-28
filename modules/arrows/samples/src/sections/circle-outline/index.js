import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Arrows from '@pluginjs/arrows'

const element = query(
  '.example-circle-outline',
  render(html, query('#circle-outline'))
)
Arrows.of(element, {
  type: 'outline circle'
})
