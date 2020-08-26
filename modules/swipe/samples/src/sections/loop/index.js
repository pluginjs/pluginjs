import { query } from '@pluginjs/dom'
import Swipe from '@pluginjs/swipe'

const element = query('#loop .swipe')
Swipe.of(element, {
  /** options **/
  gutter: 20,
  loop: true,
  arrows: {
    theme: 'light'
  }
})
