import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Draggable from '@pluginjs/draggable'

const element = query('.draggable', render(html, query('#events')))
const drag = Draggable.of(element, {})
drag.on('tap', () => {
  query('.code').innerHTML = `${drag.type} <br>
pointer at ${drag.pointer.x} ${drag.pointer.y} <br>
drag position at ${drag.position.x} ${drag.position.y}`
})

drag.on('dragStart', () => {
  query('.code').innerHTML = `${drag.type} <br>
pointer at ${drag.pointer.x} ${drag.pointer.y} <br>
drag position at ${drag.position.x} ${drag.position.y}`
})

drag.on('dragMove', () => {
  query('.code').innerHTML = `${drag.type} <br>
pointer at ${drag.pointer.x} ${drag.pointer.y} <br>
drag position at ${drag.position.x} ${drag.position.y}`
})

drag.on('dragEnd', () => {
  query('.code').innerHTML = `${drag.type} <br>
pointer at ${drag.pointer.x} ${drag.pointer.y} <br>
drag position at ${drag.position.x} ${drag.position.y}`
})
