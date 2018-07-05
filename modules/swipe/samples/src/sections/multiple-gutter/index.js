import { query } from '@pluginjs/dom'
import Swipe from '@pluginjs/swipe'

const element = query('#multiple-gutter .swipe')
Swipe.of(element, {
  pagination: true,
  itemNums: 3,
  gutter: 20
})
