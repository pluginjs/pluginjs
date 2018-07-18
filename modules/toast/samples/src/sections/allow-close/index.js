import { query } from '@pluginjs/dom'
import Toast from '@pluginjs/toast'

const btn1 = query('#allow-close .closetrue')
const btn2 = query('#allow-close .closenull')
btn1.addEventListener('click', () => {
  Toast.open()
})
btn2.addEventListener('click', () => {
  Toast.open({
    allowClose: false,
    content: 'this is Chaoxi<a href="#">Hello</a>'
  })
})
