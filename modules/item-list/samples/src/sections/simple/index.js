import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import ItemList from '@pluginjs/item-list'

const element = query('.example-simple', render(html, query('#simple')))
ItemList.of(element, {
  data: ['hello', 'world'],
  onClickAddBtn() {
    this.insert('test')
  }
})
