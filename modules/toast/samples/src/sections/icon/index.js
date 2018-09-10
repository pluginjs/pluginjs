import { query } from '@pluginjs/dom'
import Toast from '@pluginjs/toast'

const success = query('#icon .example-success')
const info = query('#icon .example-info')
const warning = query('#icon .example-warning')
const danger = query('#icon .example-danger')
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
