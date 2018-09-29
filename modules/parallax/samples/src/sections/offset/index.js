import { queryAll } from '@pluginjs/dom'
import Parallax from '@pluginjs/parallax'

const elements = queryAll('#offset .card')
elements.forEach(el =>
  Parallax.of(el, {
    container: '.background'
  })
)
