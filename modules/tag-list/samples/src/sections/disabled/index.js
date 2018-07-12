import { query } from '@pluginjs/dom'
import TagList from '@pluginjs/tag-list'

const element = query('#disabled .example-default')
const datas = ['hello', 'world']
TagList.of(element, {
  data: datas,
  disabled: true
})
