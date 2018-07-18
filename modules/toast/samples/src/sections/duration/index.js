import { query } from '@pluginjs/dom'
import Toast from '@pluginjs/toast'

const btn1 = query('#duration .hidenull')
const btn2 = query('#duration .hideater')
btn1.addEventListener('click', () => {
  Toast.open({
    duration: false
  })
})
btn2.addEventListener('click', () => {
  Toast.open()
})
