import { query } from '@pluginjs/dom'
import Swipe from '@pluginjs/swipe'

const element = query('#test .swipe')
Swipe.of(element, {
  arrows: {
    type: 'solid'
  },
  itemNums: 2,
  loop: true,
  // decay: true,
  gutter: 20,
  // multiple: true,
  center: true,
  // group: true,
  pagination: {
    type: 'square light'
  }
})
