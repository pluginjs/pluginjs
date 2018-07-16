import { queryAll } from '@pluginjs/dom'
import popDialog from '@pluginjs/pop-dialog'

queryAll('#close [data-toggle="pop-dialog"]').map(element =>
  popDialog.of(element, {})
)
