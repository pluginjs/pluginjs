import { query } from '@pluginjs/dom'
import Select from '@pluginjs/select'

const data = []

for (let i = 0; i < 100; i++) {
  data.push({
    value: i,
    label: `Option ${i}`
  })
}

const element = query('#scrollbar .example')
Select.of(element, {
  source: data
})
