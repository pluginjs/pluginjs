import { query } from '@pluginjs/dom'
import Toast from '@pluginjs/toast'

const btn1 = query('#allow-close .example-closetrue')
const btn2 = query('#allow-close .example-closenull')
btn1.addEventListener('click', () => {
  Toast.open()
})
btn2.addEventListener('click', () => {
  Toast.open({
    allowClose: false,
    content: 'this is Chaoxi<a href="#">Hello</a>'
  })
})
