import { query } from '@pluginjs/dom'
import Swipeable from '@pluginjs/swipeable'

const element = query('#position .swipeable')
Swipeable.of(element, {
  container: '.position',
  decay: true,
  rebound: true,
  reboundPos: 50
})
