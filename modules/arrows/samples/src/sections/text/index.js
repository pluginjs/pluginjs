import { queryAll } from '@pluginjs/dom'
import Arrows from '@pluginjs/arrows'

const element = queryAll('#text .example-text')
const elementLight = queryAll('#text .example-text-light')
element.forEach(e =>
  Arrows.of(e, {
    valueFrom: 'text'
  })
)
elementLight.forEach(e =>
  Arrows.of(e, {
    type: 'light'
  })
)
