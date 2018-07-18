import { query } from '@pluginjs/dom'
import Toast from '@pluginjs/toast'

const btn1 = query('#bgcolor .background1')
const btn2 = query('#bgcolor .background2')
btn1.addEventListener('click', () => {
  Toast.open({
    bgColor: '#55A4F2',
    loaderBgColor: '#AAD2F9',
    titleColor: '#fff',
    icon: '',
    closeBtnColor: '#fff'
  })
})
btn2.addEventListener('click', () => {
  Toast.open({
    bgColor: '#F86B67',
    loaderBgColor: '#FCB5B3',
    titleColor: '#fff',
    icon: '',
    closeBtnColor: '#fff'
  })
})
