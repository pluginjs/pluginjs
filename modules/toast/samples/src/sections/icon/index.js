import { query } from '@pluginjs/dom'
import Toast from '@pluginjs/toast'

const success = query('#icon .success')
const info = query('#icon .info')
const warning = query('#icon .warning')
const danger = query('#icon .danger')
success.addEventListener('click', () => {
  Toast.open({
    icon: 'success'
  })
})
info.addEventListener('click', () => {
  Toast.open({
    icon: 'info'
  })
})
warning.addEventListener('click', () => {
  Toast.open({
    icon: 'warning'
  })
})
danger.addEventListener('click', () => {
  Toast.open({
    icon: 'danger'
  })
})
