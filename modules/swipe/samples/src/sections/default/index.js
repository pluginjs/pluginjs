import { query } from '@pluginjs/dom'
import Swipe from '@pluginjs/swipe'

const element = query('#default .swipe')
Swipe.of(element, {
  itemNums: 4,
  gutter: 20,
  pagination: {
    type: 'square light'
  }
})
