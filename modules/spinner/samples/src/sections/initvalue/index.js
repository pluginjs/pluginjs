import { html as render, query } from '@pluginjs/dom'
import html from './index.html'
import Spinner from '@pluginjs/spinner'

const element = query('.example-input', render(html, query('#initvalue')))

Spinner.of(element, {})
