import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import List from '@pluginjs/list'

const element = query('.example-input', render(html, query('#initialized')))
List.of(element, {})
