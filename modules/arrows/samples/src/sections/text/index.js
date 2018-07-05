import { query } from '@pluginjs/dom'
import Arrows from '@pluginjs/arrows'

const element = query('#text .example-text')
Arrows.of(element, {
  valueFrom: 'text'
})
