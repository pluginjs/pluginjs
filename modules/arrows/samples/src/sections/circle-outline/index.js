import { queryAll } from '@pluginjs/dom'
import Arrows from '@pluginjs/arrows'

const elementAttr = queryAll('#circle-outline .example-circle-outline')
elementAttr.forEach(e =>
  Arrows.of(e, {
    type: 'outline circle'
  })
)
