import { query } from '@pluginjs/dom'
import Select from '@pluginjs/select'

const element = query('#placeholder .example')
Select.of(element, {
  source: [
    {
      value: 1,
      label: 'Option 1'
    },
    {
      value: 2,
      label: 'Option 2'
    },
    {
      value: 3,
      label: 'Option 3'
    },
    {
      value: 4,
      label: 'Option 4'
    },
    {
      value: 5,
      label: 'Option 5'
    }
  ]
})
