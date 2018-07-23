import { queryAll } from '@pluginjs/dom'
import Arrows from '@pluginjs/arrows'

const elementAttr = queryAll('#solid .example-solid')
elementAttr.forEach(e =>
  Arrows.of(e, {
    type: 'circle solid'
  })
)
