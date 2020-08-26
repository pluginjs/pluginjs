import { query } from '@pluginjs/dom'
import Swipe from '@pluginjs/swipe'

const element = query('#caption .swipe')
Swipe.of(element, {
  /** options **/
  gutter: 20,
  arrows: {
    theme: 'light'
  }
})
