import { query } from '@pluginjs/dom'
import Swipeable from '@pluginjs/swipeable'

const element = query('#decayWithRebound .swipeable')
Swipeable.of(element, {
  container: '.decayRebound',
  decay: true,
  rebound: true
})
