import { query } from '@pluginjs/dom'
import Swipe from '@pluginjs/swipe'

const element = query('#default .swipe')
Swipe.of(element, {
  /** options **/
  desktopColumn: 1,
  tabletColumn: 1,
  imageStretch: true,
  gutter: 20,
  arrows: {
    theme: 'light'
  }
})
