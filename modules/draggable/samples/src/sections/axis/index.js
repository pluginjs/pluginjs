import { query } from '@pluginjs/dom'
import Draggable from '@pluginjs/draggable'

const element = query('#axis .draggable')
Draggable.of(element, {
  axis: 'x'
})
