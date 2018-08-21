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
      title: 'cancel',
      class: 'pj-btn pj-btn-outline'
    },
    btn2: {
      title: 'success',
      class: 'pj-btn pj-btn-success'
    },
    btn3: {
      title: 'info',
      class: 'pj-btn pj-btn-info'
    },
    btn4: {
      title: 'danger',
      class: 'pj-btn pj-btn-danger'
    },
    btn5: {
      title: 'warning',
      class: 'pj-btn pj-btn-warning'
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
        title: 'cancel',
        class: 'pj-btn pj-modal-btn-alignment pj-btn-outline'
      },
      btn2: {
        title: 'delete',
        class: 'pj-btn pj-modal-btn-alignment pj-btn-danger'
      }
    }
  })
})
