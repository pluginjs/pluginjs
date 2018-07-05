import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Swipeable from '@pluginjs/swipeable'

const element = query('.swipeable', render(html, query('#position')))
Swipeable.of(element, {
  container: '.position',
  decay: true,
  rebound: true,
  reboundPos: 50
})
