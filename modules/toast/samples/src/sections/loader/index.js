import { query } from '@pluginjs/dom'
import Toast from '@pluginjs/toast'

const btn1 = query('#loader .loader')
const btn2 = query('#loader .loadercolor')
btn1.addEventListener('click', () => {
  Toast.open()
})
btn2.addEventListener('click', () => {
  Toast.open({
    loaderBgColor: '#EC3C3C'
  })
})
