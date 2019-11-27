import { query } from '@pluginjs/dom'
import Swipe from '@pluginjs/swipe'

const element = query('#center-loop .swipe')
Swipe.of(element, {
  /** options **/
  itemNums: 2,
  center: true,
  gutter: 20,
  loop: true,
  arrows: {
    type: 'solid'
  },
  pagination: {
    type: 'square light'
  }
})
