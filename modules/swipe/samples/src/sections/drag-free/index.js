import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Swipe from '@pluginjs/swipe'

const element = query('.swipe', render(html, query('#drag-free')))
Swipe.of(element, {
  itemNums: 3,
  gutter: 20,
  arrows: true,
  pagination: true,
  dragFree: true,
  loop: true
})
