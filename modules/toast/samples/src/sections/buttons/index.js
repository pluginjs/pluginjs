import { query } from '@pluginjs/dom'
import Toast from '@pluginjs/toast'

const btn1 = query('#buttons .example-buttons1')
const btn2 = query('#buttons .example-buttons2')

btn1.addEventListener('click', () => {
  Toast.open({
    buttons: {
      btn1: {
        title: 'Undo',
        class: 'pj-btn pj-btn-flat'
      }
    }
  })
})

btn2.addEventListener('click', () => {
  Toast.open({
    close: false,
    buttons: {
      btn1: {
        title: 'Undo',
        class: 'pj-btn pj-btn-flat'
      }
    }
  })
})
