import { query } from '@pluginjs/dom'
import Swipe from '@pluginjs/swipe'

const element = query('#group .swipe')
Swipe.of(element, {
  /** options **/
  gutter: 20,
  group: true,
  arrows: {
    theme: 'light'
  }
})
