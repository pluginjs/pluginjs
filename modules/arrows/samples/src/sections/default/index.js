import { queryAll } from '@pluginjs/dom'
import Arrows from '@pluginjs/arrows'

const elementAttr = queryAll('#default .example-default')
const elementAttrLight = queryAll('#default .example-default-light')
elementAttr.forEach(e => Arrows.of(e, {}))

elementAttrLight.forEach(e =>
  Arrows.of(e, {
    type: 'light'
  })
)
