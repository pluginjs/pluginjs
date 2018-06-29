import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Modal from '@pluginjs/modal'

const root = render(html, query('#types'))
query('.basic-modal', root).addEventListener('click', () => {
  Modal.open({
    content: 'hello world'
  })
})

query('.alert', root).addEventListener('click', () => {
  Modal.alert('This is an alert')
})

query('.alert-title', root).addEventListener('click', () => {
  Modal.alert('Alert', 'This is an alert')
})

query('.confirm', root).addEventListener('click', () => {
  Modal.confirm(
    'Confirm please?',
    () => {
      console.info('yes')
    },
    () => {
      console.info('no')
    }
  )
})

query('.confirm-title', root).addEventListener('click', () => {
  Modal.confirm(
    'Title Confirm',
    'Confirm please?',
    () => {
      console.info('yes')
    },
    () => {
      console.info('no')
    }
  )
})
