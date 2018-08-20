import { queryAll } from '@pluginjs/dom'
import Arrows from '@pluginjs/arrows'

const elementAttr = queryAll('#shadow .example-shadow')
const elementAttrLight = queryAll('#shadow .example-shadow-light')
elementAttr.forEach(e => {
  Arrows.of(e, {
    type: 'circle shadow'
  })
})

elementAttrLight.forEach(e => {
  Arrows.of(e, {
    type: 'circle shadow light'
  })
})
