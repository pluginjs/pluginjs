import { query } from '@pluginjs/dom'
import Draggable from '@pluginjs/draggable'

const element = query('#grid .draggable')
Draggable.of(element, {
  grid: [30, 30]
})
