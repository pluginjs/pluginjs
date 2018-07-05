import { query } from '@pluginjs/dom'
import Swipe from '@pluginjs/swipe'

const element = query('#default .swipe')
Swipe.of(element, {
  arrows: true,
  pagination: true,
  drag: true,
  loop: true
})
