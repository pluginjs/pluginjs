import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import AutoComplete from '@pluginjs/auto-complete'

const element = query('.auto-complete-basic', render(html, query('#basic')))
AutoComplete.of(element, {})
