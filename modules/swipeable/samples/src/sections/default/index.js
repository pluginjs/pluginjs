import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Swipeable from '@pluginjs/swipeable'

const element = query('.swipeable', render(html, query('#default')))
Swipeable.of(element, {
  axis: 'x',
  decay: true
})
