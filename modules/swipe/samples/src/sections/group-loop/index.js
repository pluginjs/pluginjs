import { query } from '@pluginjs/dom'
import Swipe from '@pluginjs/swipe'

const element = query('#group-loop .swipe')
Swipe.of(element, {
  /** options **/
  itemNums: 3,
  gutter: 20,
  group: true,
  loop: true,
  arrows: {
    type: 'solid'
  },
  pagination: {
    type: 'square light'
  }
})
