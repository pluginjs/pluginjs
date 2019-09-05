import { queryAll } from '@pluginjs/dom'
import Parallax from '@pluginjs/parallax'

const elements = queryAll('#default .parallax')
elements.forEach(el =>
  Parallax.of(el, {
    container: '.section',
    speed: 0.5
  })
)
