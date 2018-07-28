import { query } from '@pluginjs/dom'
import Notice from '@pluginjs/notice'

const element = query('#layout .layout')
element.addEventListener('click', () => {
  Notice.show({
    content: 'Check Out And Download Premui Psd Template',
    layout: 'bottom',
    closeBottonColor: '#b3b3b3'
  })
})
