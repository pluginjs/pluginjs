import { query } from '@pluginjs/dom'
import Arrows from '@pluginjs/arrows'

const element = query('#circle-outline .example-circle-outline')
Arrows.of(element, {
  type: 'outline circle'
})
