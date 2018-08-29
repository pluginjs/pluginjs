import { query } from '@pluginjs/dom'
import Swipe from '@pluginjs/swipe'

const element = query('#default .swipe')
Swipe.of(element, {
  pagination: true,
  itemNums: 5,
  gutter: 30,
  loop: true,
  dotConfig: {
    type: 'square light'
  }
})
