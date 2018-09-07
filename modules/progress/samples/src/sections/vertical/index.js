import { queryAll } from '@pluginjs/dom'
import Progress from '@pluginjs/progress'

const element = queryAll('#with-label .pj-progress')

element.forEach(element => Progress.of(element, {}).start())
