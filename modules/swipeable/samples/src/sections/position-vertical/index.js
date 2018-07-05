import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Swipeable from '@pluginjs/swipeable'

const element = query('.swipeable', render(html, query('#position-vertical')))
Swipeable.of(element, {
  axis: 'y',
  container: '.position-vertical',
  decay: true,
  rebound: true,
  reboundPos: 50,
  offset: 50
})
