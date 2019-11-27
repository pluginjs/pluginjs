import { query } from '@pluginjs/dom'
import Swipe from '@pluginjs/swipe'

const element = query('#arrows .swipe')
Swipe.of(element, {
  /** options **/
  itemNums: 2,
  gutter: 20,
  arrows: {
    type: 'solid'
  }
})
