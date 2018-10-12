import { query } from '@pluginjs/dom'
import Swipe from '@pluginjs/swipe'

const element = query('#center .swipe')
Swipe.of(element, {
  center: true,
  gutter: 20,
  itemNums: 2,
  arrows: {
    type: 'solid'
  },
  pagination: {
    type: 'square light'
  }
})
