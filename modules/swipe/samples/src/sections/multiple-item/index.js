import { query } from '@pluginjs/dom'
import Swipe from '@pluginjs/swipe'

const element = query('#multiple-item .swipe')
Swipe.of(element, {
  itemNums: 3
})
