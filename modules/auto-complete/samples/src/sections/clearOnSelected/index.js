import { countries } from 'countries-list'
import { query } from '@pluginjs/dom'
import AutoComplete from '@pluginjs/auto-complete'

const source = Object.values(countries).map(country => {
  return country.name
})

const element = query('#clearOnSelected .example')
AutoComplete.of(element, {
  source,
  clearOnSelected: true,
  onSelect(item) {
    console.info(item)
  }
})
