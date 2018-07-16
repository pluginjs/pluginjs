import { query } from '@pluginjs/dom'
import popDialog from '@pluginjs/pop-dialog'

const element = query('#default [data-toggle="pop-dialog"]')
popDialog.of(element, {
  /** options **/
})
