import { query } from '@pluginjs/dom'
import Modal from '@pluginjs/modal'

const root = query('#button')
const btnColor = {
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
  buttonAlignment: 'right',
  theme: 'wideDialog',
  title: 'this is title',
  buttons: {
    cancel: {
      label: 'Cancel',
      classes: 'pj-btn pj-btn-primary',
      fn: resolve => {
        console.log('clicked Cancel!', this)
        resolve()
      }
    },
    success: {
      label: 'Success',
      classes: 'pj-btn pj-btn-success'
    }
  }
}
query('.color', root).addEventListener('click', () => {
  Modal.open(btnColor)
})
query('.btn-location', root).addEventListener('click', () => {
  Modal.open({
    content: 'this is a modal',
    buttonAlignment: 'center',
    close: false,
    buttons: {
      cancel: {
        label: 'Cancel',
        classes: 'pj-btn pj-modal-btn-alignment pj-btn-outline'
      },
      delete: {
        label: 'Delete',
        classes: 'pj-btn pj-modal-btn-alignment pj-btn-danger',
        fn: resolve => {
          console.log('clicked Delete!')
          resolve()
        }
      }
    }
  })
})
