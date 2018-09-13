import { queryAll } from '@pluginjs/dom'
import Scrollbar from '@pluginjs/scrollbar'

// const element = query('.example-scrollbar-horizontal')
// Scrollbar.of(element, {
//   direction: 'horizontal',
//   minHandleLength: 200,
//   handleLength: 100
// })
queryAll('.example-scrollbar-horizontal').map(element =>
  Scrollbar.of(element, {
    direction: 'horizontal',
    handleLength: 100,
    keyboard: true
  })
)
