import { query } from '@pluginjs/dom'
import Toast from '@pluginjs/toast'

const element = query('#default .fadeUp')
element.addEventListener('click', () => {
  Toast.open({
    effect: 'fade',
    position: 'bottom-left'
  })
})
