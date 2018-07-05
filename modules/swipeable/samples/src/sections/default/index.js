import { query } from '@pluginjs/dom'
import Swipeable from '@pluginjs/swipeable'

const element = query('#default .swipeable')
Swipeable.of(element, {
  container: '.default'
})
