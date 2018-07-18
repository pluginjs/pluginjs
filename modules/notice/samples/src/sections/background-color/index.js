import { query } from '@pluginjs/dom'
import Notice from '@pluginjs/notice'

const background1 = query('#background-color .background1')
const background2 = query('#background-color .background2')
background1.addEventListener('click', () => {
  Notice.show({
    content: 'Check Out And Download Premui Psd Template',
    backgroundColor: '#2DB578'
  })
})
background2.addEventListener('click', () => {
  Notice.show({
    content: 'Check Out And Download Premui Psd Template',
    backgroundColor: '#F6D851'
  })
})
