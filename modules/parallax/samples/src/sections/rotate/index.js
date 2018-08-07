import { queryAll } from '@pluginjs/dom'
import Parallax from '@pluginjs/parallax'

const elements = queryAll('#rotate .card')
elements.forEach(el =>
  Parallax.of(el, {
    /** options **/
  })
)
