import { query } from '@pluginjs/dom'
import Swipe from '@pluginjs/swipe'

const element = query('#inside .swipe')
Swipe.of(element, {
  /** options **/
  gutter: 20,
  inside: true,
  arrows: {
    theme: 'light'
  },
  pagination: {
    theme: 'dark',
    type: 'square light'
  }
})
