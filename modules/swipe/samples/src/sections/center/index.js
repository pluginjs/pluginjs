import { query } from '@pluginjs/dom'
import Swipe from '@pluginjs/swipe'

const element = query('#center .swipe')
Swipe.of(element, {
  /** options **/
  itemNums: 2,
  center: true,
  gutter: 20,
  defaultActive: 1,
  arrows: {
    type: 'solid'
  },
  pagination: {
    type: 'square light'
  }
})
