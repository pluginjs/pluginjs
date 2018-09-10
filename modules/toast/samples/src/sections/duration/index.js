import { query } from '@pluginjs/dom'
import Toast from '@pluginjs/toast'

const btn1 = query('#duration .example-hidenull')
const btn2 = query('#duration .example-hideater')
btn1.addEventListener('click', () => {
  Toast.open({
    duration: false
  })
})
btn2.addEventListener('click', () => {
  Toast.open()
})
