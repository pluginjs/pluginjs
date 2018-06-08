import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Dropdown from '@pluginjs/dropdown'

const element = query('.dropdown-json', render(html, query('#json')))

const data = [
  {
    label: 'label11'
  },
  {
    label: 'label22'
  },
  {
    label: 'label33'
  }
]

const jsonApi = Dropdown.of(element, {
  data,
  imitateSelect: true,
  inputLabel: true,
  select: 'label1'
})

document.querySelector('.replace-data').addEventListener('click', () => {
  jsonApi.replaceByData([
    { label: 'label44' },
    { label: 'label55' },
    { label: 'label66' }
  ])
})
document.querySelector('.append-data').addEventListener('click', () => {
  jsonApi.appendByData([
    { label: 'label44' },
    { label: 'label55' },
    { label: 'label66' }
  ])
})
