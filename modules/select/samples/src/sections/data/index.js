import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Select from '@pluginjs/select'

const data = [
  {
    group: 'true',
    label: 'group-one',
    options: [
      {
        value: 'a',
        label: 'beijing',
        slug: 'beijing'
      },
      {
        value: 'b',
        label: 'nanjing',
        slug: 'nanjing'
      }
    ]
  },
  {
    group: 'true',
    label: 'group-two',
    options: [
      {
        value: 'c',
        label: 'fujian',
        slug: 'fujian'
      },
      {
        value: 'd',
        label: 'guangdong',
        slug: 'guangdong'
      }
    ]
  }
]

const element = query('.example-data', render(html, query('#data')))

Select.of(element, { data })
