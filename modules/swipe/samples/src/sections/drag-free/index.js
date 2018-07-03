import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Swipe from '@pluginjs/swipe'

const element = query('.swipe', render(html, query('#drag-free')))
const a = Swipe.of(element, {
  itemNums: 3,
  gutter: 15,
  arrows: true,
  pagination: true,
  dragFree: true
})
console.log(a)
