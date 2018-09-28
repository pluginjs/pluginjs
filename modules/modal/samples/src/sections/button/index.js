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
    btn1: {
      title: 'Cancel',
      class: 'pj-btn pj-btn-outline'
    },
    btn2: {
      title: 'Success',
      class: 'pj-btn pj-btn-success'
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
      btn1: {
        title: 'Cancel',
        class: 'pj-btn pj-modal-btn-alignment pj-btn-outline'
      },
      btn2: {
        title: 'Delete',
        class: 'pj-btn pj-modal-btn-alignment pj-btn-danger'
      }
    }
  })
})
