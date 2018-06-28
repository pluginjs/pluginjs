import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Swipe from '@pluginjs/swipe'

const element = query('.swipe', render(html, query('#center')))
Swipe.of(element, {
  center: true,
  gutter: 10,
  itemNums: 2,
  arrows: true,
  pagination: true,
  dragFree: true,
  defaultActive: 1,
  dotConfig: {
    default: 1
  }
})
