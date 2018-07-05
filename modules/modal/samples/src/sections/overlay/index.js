import { query } from '@pluginjs/dom'
import Modal from '@pluginjs/modal'

const root = query('#overlay')
query('.overlay', root).addEventListener('click', () => {
  Modal.open({
    theme: 'sm',
    content: 'hello world',
    overlay: false
  })
})
