import { queryAll } from '@pluginjs/dom'
import Parallax from '@pluginjs/parallax'

const elements = queryAll('#translate .card')
elements.forEach(el =>
  Parallax.of(el, {
    /** options **/
  })
)
