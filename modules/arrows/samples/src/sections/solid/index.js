import { queryAll } from '@pluginjs/dom'
import Arrows from '@pluginjs/arrows'

const elementAttr = queryAll('#solid .example-solid')
const elementAttrLight = queryAll('#solid .example-solid-light')
elementAttr.forEach(e =>
  Arrows.of(e, {
    type: 'circle solid'
  })
)
elementAttrLight.forEach(e =>
  Arrows.of(e, {
    type: 'circle solid light'
  })
)
