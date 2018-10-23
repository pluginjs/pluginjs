import { query } from '@pluginjs/dom'
import Toast from '@pluginjs/toast'

const btn1 = query('#buttons .example-buttons1')
const btn2 = query('#buttons .example-buttons2')

btn1.addEventListener('click', () => {
  Toast.open({
    duration: 'false',
    buttons: {
      undo: {
        label: 'Undo',
        classes: 'pj-btn pj-btn-primary',
        fn: resolve => {
          console.log('click btn!')
          resolve()
        }
      }
    },
    content: 'My name is Inigo Montoya. You killed my father, prepare to die!'
  })
})

btn2.addEventListener('click', () => {
  Toast.open({
    buttons: {
      undo: {
        label: 'Undo',
        classes: 'pj-btn pj-btn-outline'
      }
    }
  })
})
