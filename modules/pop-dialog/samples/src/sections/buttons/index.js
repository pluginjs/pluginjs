import { query } from '@pluginjs/dom'
import popDialog from '@pluginjs/pop-dialog'

const element = query('#buttons [data-toggle="default-button"]')
popDialog.of(element, {
  /** options **/
  buttons: {
    ok: {
      label: 'OK!',
      color: 'primary',
      fn: resolve => {
        console.info('clicked OK!')
        resolve()
      }
    }
  }
})
