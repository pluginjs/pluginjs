import { queryAll } from '@pluginjs/dom'
import Arrows from '@pluginjs/arrows'

const elementAttr = queryAll('#square-outline .example-square-outline')
elementAttr.forEach(e =>
  Arrows.of(e, {
    type: 'outline square'
  })
)
