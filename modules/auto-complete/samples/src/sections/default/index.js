import { countries } from 'countries-list'
import { query } from '@pluginjs/dom'
import AutoComplete from '@pluginjs/auto-complete'

const source = Object.values(countries).map(country => {
  return {
    name: country.name,
    continent: country.continent
  }
})

const element = query('#default .example')
let api = AutoComplete.of(element, {
  source,
  itemLabel(item) {
    return item.name
  },
  itemValue(item) {
    return item.name
  }
})

query('.api').addEventListener('click', event => {
  const el = event.target
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector;
  }
  
  if (!el.matches('[data-api]')) {
    return
  }

  switch (el.dataset.api) {
    case 'init':
      api = AutoComplete.of(element)
      break
    case 'getItem':
      console.info(api.getItem())
      break
    case 'setItem':
      api.setItem({
        name: 'United States',
        continent: 'NA'
      })
      break
    case 'get':
      console.info(api.get())
      break
    case 'set':
      api.set('France')
      break
    case 'val':
      console.info(api.val())
      break
    case 'val_set':
      api.val('China')
      break
    case 'clear':
      api.clear()
      break
    case 'disable':
      api.disable()
      break
    case 'enable':
      api.enable()
      break
    case 'destroy':
      api.destroy()
      break
    default: {
      console.info(el.dataset.api)
    }
  }
})
