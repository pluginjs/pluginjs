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

const element = query('#ajax .example')
Cascader.of(element, {
  source(resolve) {
    setTimeout(() => {
      resolve(data)
    }, 3000)
  }
})
