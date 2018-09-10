import { query } from '@pluginjs/dom'
import Swipe from '@pluginjs/swipe'

const element = query('#group .swipe')
Swipe.of(element, {
  itemNums: 3,
  gutter: 20,
  group: true,
  pagination: true,
  arrows: true,
  dotConfig: {
    type: 'square light'
  }
})
