import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Modal from '@pluginjs/modal'

const root = render(html, query('#locale'))
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
