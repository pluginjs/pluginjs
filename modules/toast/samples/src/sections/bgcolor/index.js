import { query } from '@pluginjs/dom'
import Toast from '@pluginjs/toast'

const btn1 = query('#bgcolor .example-dark')
const btn2 = query('#bgcolor .example-light')
btn1.addEventListener('click', () => {
  Toast.open({
    bgColor: '#333',
    loaderBgColor: '#636363',
    titleColor: '#e6e6e6',
    icon: '',
    closeBtnColor: '#fff'
  })
})
btn2.addEventListener('click', () => {
  Toast.open()
})
