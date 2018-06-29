import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Modal from '@pluginjs/modal'

const root = render(html, query('#icons'))
query('.iconleft', root).addEventListener('click', () => {
  Modal.open({
    content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse',
    title: 'Success Title',
    icon: 'success'
  })
})
query('.iconcenter', root).addEventListener('click', () => {
  Modal.open({
    content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse',
    title: 'Success Title',
    icon: 'success',
    contentAlignment: 'center',
    titleAlignment: 'center'
  })
})
query('.success', root).addEventListener('click', () => {
  Modal.open({
    content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse',
    title: 'Success Title',
    icon: 'success',
    contentAlignment: 'center',
    titleAlignment: 'center'
  })
})
query('.info', root).addEventListener('click', () => {
  Modal.open({
    content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse',
    title: 'Success Title',
    icon: 'info',
    contentAlignment: 'center',
    titleAlignment: 'center'
  })
})
query('.error', root).addEventListener('click', () => {
  Modal.open({
    content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse',
    title: 'Errorr Title',
    icon: 'error',
    contentAlignment: 'center',
    titleAlignment: 'center'
  })
})
