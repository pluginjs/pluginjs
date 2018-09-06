import { query } from '@pluginjs/dom'
import Swipe from '@pluginjs/swipe'

const element = query('#default .swipe')
Swipe.of(element, {
  pagination: true,
  itemNums: 4,
  gutter: 20,
  loop: true,
  dotConfig: {
    type: 'square light'
  }
})
