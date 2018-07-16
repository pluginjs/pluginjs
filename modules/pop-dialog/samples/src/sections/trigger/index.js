import { queryAll } from '@pluginjs/dom'
import popDialog from '@pluginjs/pop-dialog'

queryAll('#trigger [data-toggle="pop-dialog"]').map(element =>
  popDialog.of(element, {
    /** options **/
  })
)
