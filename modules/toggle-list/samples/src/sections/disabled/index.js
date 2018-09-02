import { query } from '@pluginjs/dom'
import ToggleList from '@pluginjs/toggle-list'

const element = query('#disabled .example-default')
const data = [
  {
    label: 'Interfaces',
    checked: true
  },
  {
    label: 'UI Design',
    checked: false
  },
  {
    label: 'Web Design',
    checked: false
  },
  {
    label: 'Typography',
    checked: true
  },
  {
    label: 'Landing',
    checked: false
  }
]
ToggleList.of(element, { data, disabled: true })
