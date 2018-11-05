import { query } from '@pluginjs/dom'
import Modal from '@pluginjs/modal'

const root = query('#icons')
query('.success', root).addEventListener('click', () => {
  Modal.open({
    content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse',
    title: 'Success Title',
    icon: 'success'
  })
})
query('.info', root).addEventListener('click', () => {
  Modal.open({
    content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse',
    title: 'Info Title',
    icon: 'info'
  })
})
query('.error', root).addEventListener('click', () => {
  Modal.open({
    content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse',
    title: 'Errorr Title',
    icon: 'error'
  })
})
