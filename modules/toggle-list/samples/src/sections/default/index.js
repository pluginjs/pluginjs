import { query } from '@pluginjs/dom'
import ToggleList from '@pluginjs/toggle-list'

const element = query('#default .example-default')
const data = [
  {
    title: 'Interfaces',
    checked: true
  },
  {
    title: 'UI Design',
    checked: false
  },
  {
    title: 'Web Design',
    checked: false
  },
  {
    title: 'Typography',
    checked: true
  },
  {
    title: 'Landing',
    checked: false
  }
]
ToggleList.of(element, { data })
