import { query } from '@pluginjs/dom'
import Modal from '@pluginjs/modal'

const root = query('#multi-level')
const prompt = {
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  title: 'Modal title',
  buttons: {
    active: {
      label: 'Open Modal',
      classes: 'pj-btn',
      fn: resolve => {
        resolve()
        Modal.open(pop)
      }
    }
  }
}
const pop = {
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  contentAlignment: '',
  buttons: {
    active: {
      label: 'Open Modal',
      classes: 'pj-btn',
      fn: resolve => {
        resolve()
        Modal.open(alert)
      }
    }
  }
}

const alert = {
  contentAlignment: '',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
}

query('.multi-level', root).addEventListener('click', () => {
  Modal.open(prompt)
})
