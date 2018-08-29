import { query } from '@pluginjs/dom'
import Swipe from '@pluginjs/swipe'

const element = query('#group .swipe')
Swipe.of(element, {
  itemNums: 3,
  gutter: 16,
  group: true,
  pagination: true,
  dotConfig: {
    type: 'square light'
  }
})
