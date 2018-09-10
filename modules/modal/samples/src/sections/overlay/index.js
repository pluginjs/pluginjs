import { query } from '@pluginjs/dom'
import Modal from '@pluginjs/modal'

const root = query('#overlay')
query('.overlay', root).addEventListener('click', () => {
  Modal.open({
    content: 'hello world',
    overlay: false
  })
})
