import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Spinner from '@pluginjs/spinner'

const element = query('.example-rule', render(html, query('#rule')))
// day month hour minute second
Spinner.of(element, { rule: 'month' })
