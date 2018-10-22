import { query } from '@pluginjs/dom'
import Modal from '@pluginjs/modal'

const root = query('#content-align')
const alignContent = {
  content: 'this is a modal',
  contentAlignment: 'center',
  close: false,
  buttons: {
    cancel: {
      label: 'Cancel',
      classes: 'pj-btn pj-btn-outline'
    },
    ok: {
      label: 'Ok',
      classes: 'pj-btn pj-btn-primary'
    }
  }
}
query('.content-align-right', root).addEventListener('click', () => {
  Modal.open({
    content: 'this is a modal',
    buttonAlignment: 'right',
    close: false,
    buttons: {
      cancel: {
        label: 'Cancel',
        classes: 'pj-btn pj-btn-outline'
      },
      ok: {
        label: 'Ok',
        classes: 'pj-btn pj-btn-primary'
      }
    }
  })
})

query('.content-align-center', root).addEventListener('click', () => {
  // Modal.setDefaults({buttonAlignment:'center'});
  Modal.open(alignContent)
})
