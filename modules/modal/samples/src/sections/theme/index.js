import { query } from '@pluginjs/dom'
import Modal from '@pluginjs/modal'

const root = query('#theme')
query('.theme-sm', root).addEventListener('click', () => {
  Modal.open({
    theme: 'sm',
    content: 'hello world'
  })
})

query('.theme-lg', root).addEventListener('click', () => {
  Modal.open({
    theme: 'lg',
    content: 'hello world'
  })
})
