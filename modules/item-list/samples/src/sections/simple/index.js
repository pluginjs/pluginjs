import { query } from '@pluginjs/dom'
import ItemList from '@pluginjs/item-list'

const element = query('#simple .example-simple')
ItemList.of(element, {
  data: ['hello', 'world'],
  onClickAdd() {
    this.add('test')
  }
})
