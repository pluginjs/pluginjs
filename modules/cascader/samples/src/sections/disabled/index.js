import { query } from '@pluginjs/dom'
import Cascader from '@pluginjs/cascader'

const element = query('#disabled .example')
Cascader.of(element, {
  source: {
    1: 'Option 1',
    2: 'Option 2',
    3: 'Option 3',
    4: 'Option 4',
    5: 'Option 5'
  }
})
