import { query } from '@pluginjs/dom'
import Swipeable from '@pluginjs/swipeable'

const element = query('#vertical .swipeable')
Swipeable.of(element, {
  axis: 'y',
  container: '.vertical',
  decay: true,
  rebound: true
})
