import { query } from '@pluginjs/dom'
import Swipe from '@pluginjs/swipe'

const element = query('#multiple .swipe')
Swipe.of(element, {
  /** options **/
  gutter: 20,
  multiple: true
})
