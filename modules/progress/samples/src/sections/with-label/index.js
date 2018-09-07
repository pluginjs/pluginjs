import { queryAll } from '@pluginjs/dom'
import Progress from '@pluginjs/progress'

const element = queryAll('#vertical .pj-progress')

element.forEach(element => Progress.of(element, {}).start())
