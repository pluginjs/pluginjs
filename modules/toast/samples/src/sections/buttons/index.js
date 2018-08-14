import { query } from '@pluginjs/dom'
import Toast from '@pluginjs/toast'

const btn1 = query('#buttons .buttons1')
const btn2 = query('#buttons .buttons2')
btn1.addEventListener('click', () => {
  Toast.open({
    buttons: {
      btn1: {
        title: 'confirm',
        class: 'pj-btn'
      }
    }
  })
})
btn2.addEventListener('click', () => {
  Toast.open({
    allowClose: false,
    buttons: {
      btn1: {
        title: 'Cancel',
        class: 'pj-btn'
      },
      btn2: {
        title: 'Confirm',
        class: 'pj-btn-primary'
      }
    }
  })
})
