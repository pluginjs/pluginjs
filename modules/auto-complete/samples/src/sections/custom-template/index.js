import { countries } from 'countries-list'
import { query } from '@pluginjs/dom'
import AutoComplete from '@pluginjs/auto-complete'

const source = Object.values(countries).map(country => {
  return {
    name: country.name,
    emoji: country.emoji
  }
})

const element = query('#custom-template .example')
AutoComplete.of(element, {
  source,
  itemLabel(item) {
    return item.name
  },
  itemValue(item) {
    return item.name
  },
  templates: {
    item() {
      return '<div class="{classes.ITEM}" data-value="{value}">{label}<span style="float:right">{item.emoji}</span></div>'
    }
  }
})
