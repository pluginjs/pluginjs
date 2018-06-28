import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Swipe from '@pluginjs/swipe'

const element = query('.swipe', render(html, query('#multiple-gutter')))
Swipe.of(element, {
  pagination: true,
  itemNums: 3,
  gutter: 20
})
