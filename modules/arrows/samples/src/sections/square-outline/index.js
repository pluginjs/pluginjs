import { queryAll } from '@pluginjs/dom'
import Arrows from '@pluginjs/arrows'

const elementAttr = queryAll('#square-outline .example-square-outline')
const elementAttrLight = queryAll(
  '#square-outline .example-square-outline-light'
)
elementAttr.forEach(e =>
  Arrows.of(e, {
    type: 'outline square'
  })
)
elementAttrLight.forEach(e =>
  Arrows.of(e, {
    type: 'outline square light'
  })
)
