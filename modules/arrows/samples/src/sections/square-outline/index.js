import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Arrows from '@pluginjs/arrows'

const element = query(
  '.example-square-outline',
  render(html, query('#square-outline'))
)
Arrows.of(element, {
  type: 'outline square'
})
