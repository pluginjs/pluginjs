import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Draggable from '@pluginjs/draggable'

const element = query('.draggable', render(html, query('#axis')))
Draggable.of(element, {
  axis: 'x'
})
