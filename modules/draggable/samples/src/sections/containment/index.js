import { query } from '@pluginjs/dom'
import Draggable from '@pluginjs/draggable'

const element = query('#containment .draggable')
Draggable.of(element, {
  containment: '.container'
})
