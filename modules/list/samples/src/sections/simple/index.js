import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import List from '@pluginjs/list'

const element = query('.example-simple', render(html, query('#simple')))
List.of(element, {
  data: ['hello', 'world']
})
