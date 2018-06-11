import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import AutoComplete from '@pluginjs/auto-complete'

const element = query('[data-plugin]', render(html, query('#demo')))
AutoComplete.of(element, {})
