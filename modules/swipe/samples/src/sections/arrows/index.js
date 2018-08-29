import { query } from '@pluginjs/dom'
import Swipe from '@pluginjs/swipe'

const element = query('#arrows .swipe')
Swipe.of(element, {
  arrows: true,
  loop: true,
  arrowConfig: {
    type: 'solid'
  }
})
