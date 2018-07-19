import { query } from '@pluginjs/dom'
import Notice from '@pluginjs/notice'

const btncenter = query('#button-align .btncenter')
const btnright = query('#button-align .btnright')
btncenter.addEventListener('click', () => {
  Notice.show({
    content: 'Check Out And Download Premui Psd Template',
    buttonAlign: 'center'
  })
})
btnright.addEventListener('click', () => {
  Notice.show({
    content: 'Check Out And Download Premui Psd Template',
    buttonAlign: 'right'
  })
})