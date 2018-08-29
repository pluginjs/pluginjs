import { query } from '@pluginjs/dom'
import Modal from '@pluginjs/modal'

const root = query('#close-destroy-automate')
let instance = null
query('.autoDestroy_init', root).addEventListener('click', () => {
  instance = Modal.init({
    content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse',
    title: 'New Modal',
    theme: 'dialog',
    buttons: {
      btn1: {
        title: 'Save changes'
      }
    }
  })
})

console.log(root)
// show
query('.autoDestroy_open', root).addEventListener('click', () => {
  if (!instance) {
    instance = Modal.init({
      content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse',
      title: 'New Modal',
      theme: 'dialog',
      buttons: {
        btn1: {
          title: 'Save changes'
        }
      }
    })
  }
  instance.open()
})
console.log(instance)
// hide
query('.autoDestroy_close', root).addEventListener('click', () => {
  if (!instance) {
    instance = Modal.init({
      content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse',
      title: 'New Modal',
      theme: 'dialog',
      buttons: {
        btn1: {
          title: 'Save changes'
        }
      }
    })
    instance.open()
  }
  instance.close()
})
