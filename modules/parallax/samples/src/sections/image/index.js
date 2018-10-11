import { queryAll } from '@pluginjs/dom'
import Parallax from '@pluginjs/parallax'

const elements = queryAll('#image .parallax')
elements.forEach(el =>
  Parallax.of(el, {
    container: '.section'
  })
)
