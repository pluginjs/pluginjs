import { query } from '@pluginjs/dom'
import Modal from '@pluginjs/modal'

const root = query('#auto-destroy')
let instance = null
query('.autoDestroy_init', root).addEventListener('click', () => {
  instance = Modal.init({
    content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse',
    title: 'New Modal',
    theme: 'dialog',
    buttons: {
      btn1: {
        label: 'Save changes',
        classes: 'pj-btn pj-btn-outline'
      }
    }
  })
})
// show
query('.autoDestroy_open', root).addEventListener('click', () => {
  if (!instance) {
    instance = Modal.init({
      content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse',
      title: 'New Modal',
      theme: 'dialog',
      buttons: {
        btn1: {
          label: 'Save changes',
          classes: 'pj-btn pj-btn-outline'
        }
      }
    })
  }
  instance.open()
})
// hide
query('.autoDestroy_close', root).addEventListener('click', () => {
  if (!instance) {
    instance = Modal.init({
      content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse',
      title: 'New Modal',
      theme: 'dialog',
      buttons: {
        btn1: {
          label: 'Save changes',
          classes: 'pj-btn pj-btn-outline'
        }
      }
    })
    instance.open()
  }
  instance.close()
})
