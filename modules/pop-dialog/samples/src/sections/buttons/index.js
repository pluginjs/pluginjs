import { query } from '@pluginjs/dom'
import popDialog from '@pluginjs/pop-dialog'

const element = query('#buttons [data-toggle="default-button"]')
popDialog.of(element, {
  /** options **/
  buttons: {
    dismiss: {
      label: 'Dismiss'
    },
    ok: {
      label: 'OK',
      types: 'pj-btn-primary',
      color: 'primary',
      fn: resolve => {
        console.info('clicked OK!')
        resolve()
      }
    }
  }
})
