import { html as render, queryAll, query } from '@pluginjs/dom'
import html from './index.html'
import Radio from '@pluginjs/radio'

const element = queryAll('input', render(html, query('#cssIcon')))
Radio.of(element, {
  classes: {
    icon: 'icon-check-mini'
  }
})
