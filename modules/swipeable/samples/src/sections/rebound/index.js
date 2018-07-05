import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Swipeable from '@pluginjs/swipeable'

const element = query('.swipeable', render(html, query('#rebound')))
Swipeable.of(element, {
  container: '.rebound',
  rebound: true
})
