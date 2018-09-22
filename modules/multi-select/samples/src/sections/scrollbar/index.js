import { query } from '@pluginjs/dom'
import MultiSelect from '@pluginjs/multi-select'

const data = []

for (let i = 0; i < 100; i++) {
  data.push({
    value: i,
    label: `Option ${i}`
  })
}

const element = query('#scrollbar .example')
MultiSelect.of(element, {
  source: data
})
