import { query } from '@pluginjs/dom'
import Notice from '@pluginjs/notice'

const element = query('#events .example-event')
element.addEventListener('click', () => {
  Notice.show({
    content: 'Check Out And Download Premui Psd Template',
    closeBottonColor: '#b3b3b3'
  })
})
