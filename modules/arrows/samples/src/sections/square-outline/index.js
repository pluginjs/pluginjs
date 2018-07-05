import { query } from '@pluginjs/dom'
import Arrows from '@pluginjs/arrows'

const element = query('#square-outline .example-square-outline')
Arrows.of(element, {
  type: 'outline square'
})
