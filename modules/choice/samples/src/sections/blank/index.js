import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Choice from '@pluginjs/choice'

const element = query('.blank', render(html, query('#blank')))
Choice.of(element, {
  value: 'default',
  data: {
    on: {
      label: 'on'
    },
    off: {
      label: 'off'
    },
    default: {
      label: 'default'
    }
  },
  multiple: false
})
