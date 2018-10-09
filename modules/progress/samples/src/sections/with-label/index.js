import { queryAll } from '@pluginjs/dom'
import Progress from '@pluginjs/progress'

const element = queryAll('#vertical .pj-progress')

setTimeout(() => {
  element.forEach(element => Progress.of(element, {}).start())
}, 2000)
