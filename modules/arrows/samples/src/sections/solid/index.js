import { query } from '@pluginjs/dom'
import Arrows from '@pluginjs/arrows'

const element = query('#solid .example-solid')
Arrows.of(element, {
  type: 'circle solid'
})
