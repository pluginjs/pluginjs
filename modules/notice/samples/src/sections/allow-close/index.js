import { query } from '@pluginjs/dom'
import Notice from '@pluginjs/notice'

const closetrue = query('#allow-close .closetrue')
const closenull = query('#allow-close .closenull')
closetrue.addEventListener('click', () => {
  Notice.show({
    content: 'Check Out And Download Premui Psd Template',
    allowClose: true,
    closeBottonColor: '#b3b3b3'
  })
})
closenull.addEventListener('click', () => {
  Notice.show({
    content: 'Check Out And Download Premui Psd Template',
    allowClose: false
  })
})
