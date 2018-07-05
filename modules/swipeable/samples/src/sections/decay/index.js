import { query } from '@pluginjs/dom'
import Swipeable from '@pluginjs/swipeable'

const element = query('#decay .swipeable')
Swipeable.of(element, {
  container: '.decay',
  decay: true
})
