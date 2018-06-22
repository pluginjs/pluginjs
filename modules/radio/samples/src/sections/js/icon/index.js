import { html as render, query, queryAll } from '@pluginjs/dom'
import html from './index.html'
import Radio from '@pluginjs/radio'

const element = queryAll('input', render(html, query('#jsIcon')))
element.forEach(value => {
  Radio.of(value, {
    classes: {
      icon: 'icon-check-mini'
    }
  })
})
