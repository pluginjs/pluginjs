import { query } from '@pluginjs/dom'
import Select from '@pluginjs/select'

const element = query('#simple-data .example')
Select.of(element, {
  source: {
    1: 'Option 1',
    2: 'Option 2',
    3: 'Option 3',
    4: 'Option 4',
    5: 'Option 5'
  }
})
