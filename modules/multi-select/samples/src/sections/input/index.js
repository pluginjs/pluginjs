import { query } from '@pluginjs/dom'
import MultiSelect from '@pluginjs/multi-select'

const element = query('#input .example')
MultiSelect.of(element, {
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
    },
    {
      value: 6,
      label: 'Option 6'
    }
  ]
})
