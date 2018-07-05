import { query } from '@pluginjs/dom'
import Modal from '@pluginjs/modal'

const root = query('#locale')
query('.locale', root).addEventListener('click', () => {
  Modal.open({
    locale: 'zh',
    content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse',
    title: 'New Modal',
    theme: 'dialog',
    buttons: {
      btn1: {
        title: 'Cancel'
      },
      btn2: {
        title: 'Yes'
      }
    }
  })
})
