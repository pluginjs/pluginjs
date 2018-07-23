import { queryAll } from '@pluginjs/dom'
import Arrows from '@pluginjs/arrows'

const elementAttrAttr = queryAll('#vertical .example-vertical')
elementAttrAttr.forEach(e =>
  Arrows.of(e, {
    direction: 'vertical'
  })
)
