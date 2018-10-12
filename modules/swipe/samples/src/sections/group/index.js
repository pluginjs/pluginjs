import { query } from '@pluginjs/dom'
import Swipe from '@pluginjs/swipe'

const element = query('#group .swipe')
Swipe.of(element, {
  itemNums: 3,
  gutter: 20,
  group: true,
  arrows: true,
  pagination: {
    type: 'square light'
  }
})
