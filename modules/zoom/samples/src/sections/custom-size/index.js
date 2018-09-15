import { queryAll } from '@pluginjs/dom'
import Zoom from '@pluginjs/zoom'

const elements = queryAll('#custom-size .zoom')
elements.forEach(el => {
  Zoom.of(el, {
    /** options **/
  })
})
