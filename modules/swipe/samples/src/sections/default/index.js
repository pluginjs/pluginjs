import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Swipe from '@pluginjs/swipe'

const element = query('.swipe', render(html, query('#default')))
Swipe.of(element, {
  arrows: true,
  pagination: true,
  drag: true,
  loop: true
})
