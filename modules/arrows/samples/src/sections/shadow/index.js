import { query } from '@pluginjs/dom'
import Arrows from '@pluginjs/arrows'

const element = query('#shadow .example-shadow')
Arrows.of(element, {
  type: 'circle shadow'
})
