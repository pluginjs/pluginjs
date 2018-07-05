import { query } from '@pluginjs/dom'
import Draggable from '@pluginjs/draggable'

const element = query('#events .draggable')
Draggable.of(element, {
  onDragstart() {
    message(this, 'DragStart')
  },
  onDragmove() {
    message(this, 'DragMove')
  },
  onDragend() {
    message(this, 'DragEnd')
  },
  onPointer() {
    message(this, 'Pointer')
  }
})

const message = (drag, type) => {
  query('.code').innerHTML = `${type} <br>
    pointer at ${drag.pointer.x} ${drag.pointer.y} <br>
    drag position at ${drag.position.x} ${drag.position.y}`
}
