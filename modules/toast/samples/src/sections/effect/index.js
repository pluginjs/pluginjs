import { query } from '@pluginjs/dom'
import Toast from '@pluginjs/toast'

const btn1 = query('#effect .example-fadeUp')
const btn2 = query('#effect .example-bounceInLeft')
btn1.addEventListener('click', () => {
  Toast.open({
    effect: 'fade',
    position: 'bottom-left'
  })
})
btn2.addEventListener('click', () => {
  Toast.open({
    effect: 'slide',
    position: 'bottom-left'
  })
})
