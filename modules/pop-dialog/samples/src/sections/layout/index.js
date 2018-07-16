import { queryAll } from '@pluginjs/dom'
import popDialog from '@pluginjs/pop-dialog'

queryAll('#layout [data-toggle="pop-dialog"]').map(element =>
  popDialog.of(element, {
    /** options **/
  })
)
