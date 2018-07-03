import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Swipeable from '@pluginjs/swipeable'

const element = query('.swipeable', render(html, query('#decayWithRebound')))
Swipeable.of(element, {
  containment: '.decayRebound',
  decay: true,
  rebound: true
})
