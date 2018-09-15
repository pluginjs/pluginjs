import { query } from '@pluginjs/dom'
import popDialog from '@pluginjs/pop-dialog'

const element = query('#buttons [data-toggle="default-button"]')
popDialog.of(element, {
  buttons: {
    cancel: {
      label: 'Dismiss'
    },
    ok: {
      label: 'OK',
      classes: 'pj-btn-primary',
      fn: resolve => {
        console.info('clicked OK!')
        resolve()
      }
    }
  }
})
