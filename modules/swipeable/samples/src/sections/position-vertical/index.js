import { query } from '@pluginjs/dom'
import Swipeable from '@pluginjs/swipeable'

const element = query('#position-vertical .swipeable')
Swipeable.of(element, {
  axis: 'y',
  container: '.position-vertical',
  decay: true,
  rebound: true,
  reboundPos: 50,
  offset: 50
})
