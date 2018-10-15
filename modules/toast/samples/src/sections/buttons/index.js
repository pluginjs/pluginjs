import { query } from '@pluginjs/dom'
import Toast from '@pluginjs/toast'

const btn1 = query('#buttons .example-buttons1')
const btn2 = query('#buttons .example-buttons2')

btn1.addEventListener('click', () => {
  Toast.open({
    duration: 'false',
    buttons: {
      btn1: {
        title: 'Undo',
        class: 'pj-btn pj-btn-flat'
      }
    },
    content: 'My name is Inigo Montoya. You killed my father, prepare to die!'
  })
})

btn2.addEventListener('click', () => {
  Toast.open({
    buttons: {
      btn1: {
        title: 'Undo',
        class: 'pj-btn pj-btn-flat'
      }
    }
  })
})
