import { queryAll } from '@pluginjs/dom'
import Arrows from '@pluginjs/arrows'

const elementAttr = queryAll('#vertical .example-vertical')
const elementAttrLight = queryAll('#vertical .example-vertical-light')
elementAttr.forEach(e =>
  Arrows.of(e, {
    vertical: true
  })
)
elementAttrLight.forEach(e =>
  Arrows.of(e, {
    vertical: true,
    type: 'light'
  })
)
