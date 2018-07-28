import { query } from '@pluginjs/dom'
import Notice from '@pluginjs/notice'

const fontwhite = query('#font-color .fontred')
const fontblack = query('#font-color .fontblue')
fontwhite.addEventListener('click', () => {
  Notice.show({
    content: 'Check Out And Download Premui Psd Template',
    fontColor: '#f73e4d',
    closeBottonColor: '#b3b3b3'
  })
})
fontblack.addEventListener('click', () => {
  Notice.show({
    content: 'Check Out And Download Premui Psd Template',
    fontColor: '#215fdb',
    closeBottonColor: '#b3b3b3'
  })
})
