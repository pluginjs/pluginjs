import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Arrows from '@pluginjs/arrows'

const element = query('.example-solid', render(html, query('#solid')))
Arrows.of(element, {
  type: 'circle solid'
})
