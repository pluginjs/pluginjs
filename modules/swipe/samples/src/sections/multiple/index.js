import { query } from '@pluginjs/dom'
import Swipe from '@pluginjs/swipe'

const element = query('#multiple .swipe')
Swipe.of(element, {
  itemNums: 3,
  gutter: 20,
  pagination: true,
  multiple: true,
  dragFree: true,
  power: 1
})
