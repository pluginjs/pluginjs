import { query } from '@pluginjs/dom'
import Modal from '@pluginjs/modal'

const root = query('#design-stype')

query('.dialog', root).addEventListener('click', () => {
  Modal.open({
    content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse',
    title: 'New Modal',
    theme: 'dialog',
    buttons: {
      btn1: {
        title: 'Save changes'
      }
    }
  })
})

query('.verification', root).addEventListener('click', () => {
  Modal.open({
    content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse',
    title: 'New Modal',
    theme: 'verification',
    buttons: {
      btn1: {
        title: 'Save changes'
      }
    }
  })
})

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

query('.wideDialog', root).addEventListener('click', () => {
  Modal.open({
    content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse',
    title: 'New Modal',
    theme: 'wideDialog',
    buttons: {
      btn1: {
        title: 'Save changes'
      }
    }
  })
})
