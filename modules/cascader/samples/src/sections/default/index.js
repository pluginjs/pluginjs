import { query } from '@pluginjs/dom'
import Cascader from '@pluginjs/cascader'

const years = [2015, 2016, 2017, 2018, 2019, 2020]
const months = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December'
}

function daysInMonth(year, month) {
  const max = new Date(year, month, 0).getDate()
  const days = []
  for (let i = 1; i <= max; i++) {
    days.push({
      value: i,
      label: i
    })
  }

  return days
}

function monthsInYear(year) {
  return Object.keys(months).map(month => {
    return {
      value: month,
      label: months[month],
      children: daysInMonth(year, month)
    }
  })
}

const data = years.map(year => {
  return {
    value: year,
    label: year,
    children: monthsInYear(year)
  }
})

const element = query('#default .example')
let api = Cascader.of(element, {
  source: data
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
      api = Cascader.of(element)
      break
    case 'select':
      api.select(0, 2018)
      break
    case 'unselect':
      api.unselect(0, 2018)
      break
    case 'get':
      console.info(api.get())
      break
    case 'set':
      api.set([2019, '2', 8])
      break
    case 'val':
      console.info(api.val())
      break
    case 'val_set':
      console.info(api.val('[2018,6,1]'))
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
