import { query } from '@pluginjs/dom'
import Swipe from '@pluginjs/swipe'

const element = query('#outside .swipe')
Swipe.of(element, {
  /** options **/
  gutter: 20,
  outside: true
})
