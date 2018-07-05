import { query } from '@pluginjs/dom'
import Arrows from '@pluginjs/arrows'

const element = query('#vertical .example-vertical')
Arrows.of(element, {
  direction: 'vertical'
})
