import { query } from '@pluginjs/dom'
import popDialog from '@pluginjs/pop-dialog'

const element = query('#buttons [data-toggle="default-button"]')
popDialog.of(element, {
  buttons: [
    {
      action: 'cancel',
      label: 'Dismiss'
    },
    {
      action: 'ok',
      label: 'OK',
      classes: 'pj-btn-primary',
      fn: resolve => {
        console.info('clicked OK!')
        resolve()
      }
    }
  ]
})
