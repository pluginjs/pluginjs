import { query } from '@pluginjs/dom'
import Toast from '@pluginjs/toast'

const btn1 = query('#stack .stack1')
const btn2 = query('#stack .stack6')
btn1.addEventListener('click', () => {
  Toast.open({
    stack: 1
  })
})
btn2.addEventListener('click', () => {
  Toast.open()
})
