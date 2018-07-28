import { query } from '@pluginjs/dom'
import Notice from '@pluginjs/notice'

const fixed1 = query('#fixed-width .fixed1')
const fixed2 = query('#fixed-width .fixed2')
fixed1.addEventListener('click', () => {
  Notice.show({
    content: 'Check Out And Download Premui Psd Template',
    fixedWidth: true,
    contentAlignment: 'center',
    buttonAlign: 'center',
    closeBottonColor: '#b3b3b3'
  })
})
fixed2.addEventListener('click', () => {
  Notice.show({
    content: 'Check Out And Download Premui Psd Template',
    fixedWidth: true,
    contentAlignment: 'left',
    buttonAlign: 'right',
    closeBottonColor: '#b3b3b3'
  })
})
