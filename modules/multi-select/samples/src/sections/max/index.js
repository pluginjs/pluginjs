import { query } from '@pluginjs/dom'
import MultiSelect from '@pluginjs/multi-select'

const element = query('#max .example')
MultiSelect.of(element, {
  max: 2,
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
