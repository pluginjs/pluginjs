import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Spinner from '@pluginjs/spinner'

const element = query('.example-disabled', render(html, query('#disabled')))

Spinner.of(element, { disabled: true })
