import { query } from '@pluginjs/dom'
import Swipe from '@pluginjs/swipe'

const element = query('#pagination .swipe')
Swipe.of(element, {
  pagination: true
})
