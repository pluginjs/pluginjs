import { queryAll } from '@pluginjs/dom'
import Arrows from '@pluginjs/arrows'

const elementAttr = queryAll('#circle-outline .example-circle-outline')
const elementAttrLight = queryAll(
  '#circle-outline .example-circle-outline-light'
)
elementAttr.forEach(e =>
  Arrows.of(e, {
    type: 'outline circle'
  })
)
elementAttrLight.forEach(e =>
  Arrows.of(e, {
    type: 'outline circle light'
  })
)
