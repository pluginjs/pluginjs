import { query } from '@pluginjs/dom'
import Toast from '@pluginjs/toast'

const btn1 = query('#loader .example-loader')
const btn2 = query('#loader .example-loadercolor')
btn1.addEventListener('click', () => {
  Toast.open()
})
btn2.addEventListener('click', () => {
  Toast.open({
    loaderBgColor: '#e6e6e6'
  })
})
