import { query } from '@pluginjs/dom'
import Swipe from '@pluginjs/swipe'

const element = query('#multiple .swipe')
Swipe.of(element, {
  itemNums: 3,
  gutter: 32,
  pagination: true,
  multiple: true,
  power: 1,
  dotConfig: {
    type: 'square light'
  }
})
