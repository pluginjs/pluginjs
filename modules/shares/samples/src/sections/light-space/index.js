import { queryAll } from '@pluginjs/dom'
import Shares from '@pluginjs/shares'

const elements = queryAll('#light-space .pj-shares')
elements.forEach(element => {
  Shares.of(element, {
    /** options **/
  })
})
