import { query } from '@pluginjs/dom'
import Swipe from '@pluginjs/swipe'

const element = query('#multiple-center .swipe')
Swipe.of(element, {
  /** options **/
  center: true,
  itemNums: 3,
  gutter: 20,
  multiple: true,
  arrows: {
    type: 'solid'
  },
  pagination: {
    type: 'square light'
  }
})
