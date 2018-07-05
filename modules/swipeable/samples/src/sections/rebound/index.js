import { query } from '@pluginjs/dom'
import Swipeable from '@pluginjs/swipeable'

const element = query('#rebound .swipeable')
Swipeable.of(element, {
  container: '.rebound',
  rebound: true
})
