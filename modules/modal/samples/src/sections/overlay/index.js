import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Modal from '@pluginjs/modal'

const root = render(html, query('#overlay'))
query('.overlay', root).addEventListener('click', () => {
  Modal.open({
    theme: 'sm',
    content: 'hello world',
    overlay: false
  })
})
