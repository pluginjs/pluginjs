import { query } from '@pluginjs/dom'
import Swipe from '@pluginjs/swipe'

const element = query('#center .swipe')
Swipe.of(element, {
  center: true,
  gutter: 10,
  itemNums: 2,
  arrows: true,
  pagination: true,
  dragFree: true
  // defaultActive: 1,
  // dotConfig: {
  //   default: 1
  // }
})
