import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Swipeable from '@pluginjs/swipeable'

const element = query('.swipeable', render(html, query('#vertical')))
Swipeable.of(element, {
  axis: 'y',
  container: '.vertical',
  decay: true,
  rebound: true
})
