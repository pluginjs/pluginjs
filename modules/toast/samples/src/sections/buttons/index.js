import { query } from '@pluginjs/dom'
import Toast from '@pluginjs/toast'

const btn1 = query('#buttons .buttons1')
const btn2 = query('#buttons .buttons2')
btn1.addEventListener('click', () => {
  Toast.open({
    buttons: {
      btn1: {
        title: 'confirm',
        class: 'btn-cancel'
      }
    }
  })
})
btn2.addEventListener('click', () => {
  Toast.open({
    buttons: {
      btn1: {
        title: 'cancel',
        class: 'btn-cancel'
      },
      btn2: {
        title: 'confirm',
        class: 'btn-blue'
      }
    }
  })
})
