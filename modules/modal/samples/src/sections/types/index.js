import { query } from '@pluginjs/dom'
import Modal from '@pluginjs/modal'

const root = query('#types')

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
    resolve => {
      console.info('yes')
      resolve()
    },
    resolve => {
      console.info('no')
      resolve()
    }
  )
})

query('.confirm-title', root).addEventListener('click', () => {
  Modal.confirm(
    'Title Confirm',
    'Confirm please?',
    resolve => {
      console.info('yes')
      resolve()
    },
    resolve => {
      console.info('no')
      resolve()
    }
  )
})

query('.confirm-locale', root).addEventListener('click', () => {
  Modal.confirm(
    'Title Confirm',
    'Confirm please?',
    resolve => {
      console.info('yes')
      resolve()
    },
    resolve => {
      console.info('no')
      resolve()
    },
    {
      locale: 'zh'
    }
  )
})
