import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Modal from '@pluginjs/modal'

const element = query('.modal', render(html, query('#icons')))
Modal.of(element, {
  /** options **/
})