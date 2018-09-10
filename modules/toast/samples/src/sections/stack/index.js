import { query } from '@pluginjs/dom'
import Toast from '@pluginjs/toast'

const btn1 = query('#stack .example-stack1')
const btn2 = query('#stack .example-stack6')
btn1.addEventListener('click', () => {
  Toast.open({
    stack: 1
  })
})
btn2.addEventListener('click', () => {
  Toast.open()
})
