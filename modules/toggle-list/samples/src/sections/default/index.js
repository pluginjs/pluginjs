import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import ToggleList from '@pluginjs/toggle-list'

const element = query('.example-default', render(html, query('#default')))
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
