import { query } from '@pluginjs/dom'
import Modal from '@pluginjs/modal'

const root = query('#button')
query('.btn-default', root).addEventListener('click', () => {
  Modal.open({
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    title: 'This is title',
    buttons: [
      {
        action: 'cancel',
        label: 'Cancel',
        classes: 'pj-btn pj-btn-primary'
      },
      {
        action: 'success',
        label: 'Success',
        classes: 'pj-btn pj-btn-success'
      }
    ]
  })
})
query('.btn-callback', root).addEventListener('click', () => {
  Modal.open({
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    title: 'This is title',
    closeable: false,
    buttons: [
      {
        action: 'cancel',
        label: 'Cancel',
        classes: 'pj-btn pj-modal-btn-alignment pj-btn-primary',
        fn: resolve => {
          resolve()
          Modal.alert('Cancel callback!')
          console.log('Cancel callback!')
        }
      },
      {
        action: 'success',
        label: 'Success',
        classes: 'pj-btn pj-modal-btn-alignment pj-btn-success',
        fn: resolve => {
          resolve()
          Modal.alert('Success callback!')
          console.log('Success callback!')
        }
      }
    ]
  })
})
