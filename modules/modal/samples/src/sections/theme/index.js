import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Modal from '@pluginjs/modal'

const root = render(html, query('#theme'))
query('.theme-sm', root).addEventListener('click', () => {
  Modal.open({
    theme: 'sm',
    content: 'hello world'
  })
})
