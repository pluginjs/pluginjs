import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Draggable from '@pluginjs/draggable'

const element = query('.draggable', render(html, query('#events')))
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
