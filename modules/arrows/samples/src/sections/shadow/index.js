import { queryAll } from '@pluginjs/dom'
import Arrows from '@pluginjs/arrows'

const elementAttr = queryAll('#shadow .example-shadow')
elementAttr.forEach(e => {
  Arrows.of(e, {
    type: 'circle shadow'
  })
})
