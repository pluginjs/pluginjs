import { query } from '@pluginjs/dom'
import ScrollEnd from '@pluginjs/scroll-end'
import Toast from '@pluginjs/toast'

const handler = () =>
  Toast.open({
    effect: 'fade',
    position: 'top-right',
    title: 'Scrollend...'
  })

query('#default .api-attach').addEventListener('click', () =>
  ScrollEnd.on(handler)
)

query('#default .api-detach').addEventListener('click', () =>
  ScrollEnd.off(handler)
)
