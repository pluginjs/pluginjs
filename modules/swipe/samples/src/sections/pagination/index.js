import { query } from '@pluginjs/dom'
import Swipe from '@pluginjs/swipe'

const element = query('#pagination .swipe')
Swipe.of(element, {
  /** options **/
  itemNums: 2,
  gutter: 20,
  pagination: {
    type: 'square light'
  }
})
