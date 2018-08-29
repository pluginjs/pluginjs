import { query } from '@pluginjs/dom'
import Swipe from '@pluginjs/swipe'

const element = query('#drag-free .swipe')
Swipe.of(element, {
  itemNums: 3,
  gutter: 16,
  arrows: true,
  pagination: true,
  decay: true,
  loop: true,
  dotConfig: {
    type: 'square light'
  }
})
