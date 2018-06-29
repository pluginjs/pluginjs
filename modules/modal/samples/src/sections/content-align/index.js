import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Modal from '@pluginjs/modal'

const root = render(html, query('#content-align'))
const alignContent = {
  content: 'this is a modal',
  buttonAlignment: 'center',
  contentAlignment: 'center',
  close: false,
  buttons: {
    btn1: {
      title: 'cancel'
    },
    btn2: {
      title: 'ok'
    }
  }
}
query('.content-align-right', root).addEventListener('click', () => {
  Modal.open({
    content: 'this is a modal',
    buttonAlignment: 'right',
    close: false,
    buttons: {
      btn1: {
        title: 'cancel',
        class: 'pj-btn pj-btn-outline'
      },
      btn2: {
        title: 'ok',
        class: 'pj-btn pj-btn-success'
      }
    }
  })
})

query('.content-align-center', root).addEventListener('click', () => {
  // Modal.setDefaults({buttonAlignment:'center'});
  Modal.open(alignContent)
})
