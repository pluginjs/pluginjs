import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Spinner from '@pluginjs/spinner'

const element = query('.example-default', render(html, query('#default')))

Spinner.of(element, {})
