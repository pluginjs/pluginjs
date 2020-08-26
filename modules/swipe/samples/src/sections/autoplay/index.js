import { query } from '@pluginjs/dom'
import Swipe from '@pluginjs/swipe'

const element = query('#autoplay .swipe')
Swipe.of(element, {
  /** options **/
  gutter: 20,
  autoplay: true,
  loop: true,
  arrows: {
    theme: 'light'
  }
})
