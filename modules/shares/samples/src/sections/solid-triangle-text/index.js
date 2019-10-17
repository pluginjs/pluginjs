import { queryAll } from '@pluginjs/dom'
import Shares from '@pluginjs/shares'

const elements = queryAll('#solid-triangle-text .pj-shares')
elements.forEach(element => {
  Shares.of(element, {
    /** options **/
  })
})
