import { countries } from 'countries-list'
import { query } from '@pluginjs/dom'
import AutoComplete from '@pluginjs/auto-complete'

const source = {}
Object.values(countries).forEach(country => {
  source[country.phone] = country.name
})

const element = query('#simple-object .example')
AutoComplete.of(element, {
  source
})
