import { query } from '@pluginjs/dom'
import List from '@pluginjs/list'

const element = query('#simple .example-simple')
List.of(element, {
  data: ['hello', 'world']
})
