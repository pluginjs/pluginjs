import AutoComplete from '@pluginjs/auto-complete'
import { deepMerge } from '@pluginjs/utils'

export const namespace = 'placeComplete'
export const events = deepMerge(AutoComplete.events, {
  ERROR: 'error',
  PLACECHANGE: 'placeChange'
})

export const classes = deepMerge(AutoComplete.classes, {
  NAMESPACE: 'pj-autoComplete',
  WRAP: '{namespace} pj-autoComplete-place',
  ITEMQUERY: '{namespace}-item-query',
  ITEMSECONDARY: '{namespace}-item-secondary'
})

export const methods = deepMerge(AutoComplete.methods, [])

export const defaults = deepMerge(AutoComplete.defaults, {
  apiKey: '',
  minChars: 2,
  searchOptions: {},
  country: null, // []
  types: 'geocode',
  match(data) {
    return data
  },
  itemLabel(item) {
    return item.description
  },
  itemValue(item) {
    return item.description
  },
  templates: {
    item() {
      return `<div class="{classes.ITEM}" data-value="{value}">
  <span class="{classes.ITEMQUERY}">{item.structured_formatting.main_text}</span>
  <span class="{classes.ITEMSECONDARY}">{item.structured_formatting.secondary_text}</span>
</div>`
    }
  }
})

export const dependencies = ['auto-complete']
