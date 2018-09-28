import { query } from '@pluginjs/dom'
import Modal from '@pluginjs/modal'

const root = query('#design-stype')

query('.prompt', root).addEventListener('click', () => {
  Modal.open({
    content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse',
    title: 'New Modal',
    theme: 'prompt',
    buttons: {
      btn1: {
        title: 'Save changes'
      }
    }
  })
})

query('.prompt-wide', root).addEventListener('click', () => {
  Modal.open({
    content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse',
    title: 'New Modal',
    theme: 'prompt lg',
    buttons: {
      btn1: {
        title: 'Save changes'
      }
    }
  })
})

query('.prompt-light', root).addEventListener('click', () => {
  Modal.open({
    content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse',
    title: 'New Modal',
    theme: 'prompt-light',
    buttons: {
      btn1: {
        title: 'Save changes'
      }
    }
  })
})
